// backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import { comparePassword } from '../utils/hash';

export const login = async (req: Request, res: Response): Promise<void> => {
  // Aceitar tanto 'cpf' quanto 'email'
  const { cpf, email, senha, tipo } = req.body;
  
  // Usar email se cpf não existir
  const identifier = cpf || email;

  console.log('🔐 Tentativa de login:', { identifier, tipo, body: req.body });

  try {
    let user: any = null;

    if (!identifier) {
      res.status(400).json({ error: 'Email/CPF é obrigatório' });
      return;
    }

    switch (tipo) {
      case 'psicologo':
        user = await prisma.psicologo.findUnique({
          where: { email: identifier }
        });
        break;
      case 'paciente':
        user = await prisma.paciente.findUnique({
          where: { email: identifier }
        });
        break;
      case 'admin':
        user = await prisma.admin.findUnique({
          where: { email: identifier }
        });
        break;
      default:
        res.status(400).json({ error: 'Tipo de usuário inválido' });
        return;
    }

    console.log('👤 Usuário encontrado:', user ? 'Sim' : 'Não');

    if (!user) {
      res.status(401).json({ error: 'Usuário não encontrado' });
      return;
    }

    const senhaValida = await comparePassword(senha, user.senha);
    console.log('🔑 Senha válida:', senhaValida);

    if (!senhaValida) {
      res.status(401).json({ error: 'Senha incorreta' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, tipo },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    // Admin pode não ter nome
    const nome = user.nome || 'Administrador';

    res.json({
      token,
      user: {
        id: user.id,
        nome: nome,
        email: user.email,
        tipo: tipo
      }
    });

    console.log('✅ Login bem-sucedido para:', user.email);
  } catch (error) {
    console.error('❌ Erro no login:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};