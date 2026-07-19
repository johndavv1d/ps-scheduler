import { Request, Response } from 'express';
import prisma from '../prisma';
import { hashPassword } from '../utils/hash';

export const cadastrarPsicologo = async (req: Request, res: Response): Promise<void> => {
  const { nome, email, telefone, erp, senha } = req.body;

  try {
    const senhaHash = await hashPassword(senha);
    
    const psicologo = await prisma.psicologo.create({
      data: {
        nome,
        email,
        telefone,
        erp,
        senha: senhaHash
      }
    });

    res.status(201).json(psicologo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar psicólogo' });
  }
};

export const cadastrarPaciente = async (req: Request, res: Response): Promise<void> => {
  const { nome, email, telefone, empresa, senha } = req.body;

  try {
    const senhaHash = await hashPassword(senha);
    
    const paciente = await prisma.paciente.create({
      data: {
        nome,
        email,
        telefone,
        empresa,
        senha: senhaHash
      }
    });

    res.status(201).json(paciente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar paciente' });
  }
};

export const removerFicha = async (req: Request, res: Response): Promise<void> => {
  const { id, tipo } = req.params;

  try {
    if (tipo === 'paciente') {
      await prisma.paciente.delete({ where: { id: Number(id) } });
    } else if (tipo === 'psicologo') {
      await prisma.psicologo.delete({ where: { id: Number(id) } });
    } else {
      res.status(400).json({ error: 'Tipo inválido' });
      return;
    }

    res.json({ message: 'Ficha removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover ficha' });
  }
};