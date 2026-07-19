import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import { comparePassword } from '../utils/hash';
import { LoginRequest, LoginResponse } from '../@types';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { cpf, senha, tipo }: LoginRequest = req.body;

  try {
    let user: any;

    switch (tipo) {
      case 'psicologo':
        user = await prisma.psicologo.findUnique({ where: { email: cpf } });
        break;
      case 'paciente':
        user = await prisma.paciente.findUnique({ where: { email: cpf } });
        break;
      case 'admin':
        user = await prisma.admin.findUnique({ where: { email: cpf } });
        break;
      default:
        res.status(400).json({ error: 'Tipo de usuário inválido' });
        return;
    }

    if (!user) {
      res.status(401).json({ error: 'Usuário não encontrado' });
      return;
    }

    const senhaValida = await comparePassword(senha, user.senha);
    if (!senhaValida) {
      res.status(401).json({ error: 'Senha incorreta' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, tipo },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    const response: LoginResponse = {
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: tipo as 'paciente' | 'psicologo' | 'admin'
      }
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};