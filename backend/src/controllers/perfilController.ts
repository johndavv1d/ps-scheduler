import { Request, Response } from 'express';
import prisma from '../prisma';
import { hashPassword } from '../utils/hash';

export const atualizarPerfil = async (req: Request, res: Response): Promise<void> => {
  const user = (req as any).user;
  const { nome, email, telefone, empresa, horarios } = req.body;

  if (!user) {
    res.status(401).json({ error: 'Não autenticado' });
    return;
  }

  try {
    let updated: any = null;

    switch (user.tipo) {
      case 'admin': {
        updated = await prisma.admin.update({
          where: { id: user.id },
          data: {
            ...(nome !== undefined && { nome }),
            ...(email !== undefined && { email }),
          },
        });
        break;
      }
      case 'psicologo': {
        updated = await prisma.psicologo.update({
          where: { id: user.id },
          data: {
            ...(nome !== undefined && { nome }),
            ...(email !== undefined && { email }),
            ...(telefone !== undefined && { telefone }),
            ...(horarios !== undefined && { horarios }),
          },
        });
        break;
      }
      case 'paciente': {
        updated = await prisma.paciente.update({
          where: { id: user.id },
          data: {
            ...(nome !== undefined && { nome }),
            ...(email !== undefined && { email }),
            ...(telefone !== undefined && { telefone }),
            ...(empresa !== undefined && { empresa }),
          },
        });
        break;
      }
      default: {
        res.status(400).json({ error: 'Tipo de usuário inválido' });
        return;
      }
    }

    const nomeRet = updated.nome || 'Administrador';

    res.json({
      id: updated.id,
      nome: nomeRet,
      email: updated.email,
      tipo: user.tipo,
      ...(updated.telefone && { telefone: updated.telefone }),
      ...(updated.empresa && { empresa: updated.empresa }),
      ...(updated.horarios && { horarios: updated.horarios }),
    });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      res.status(400).json({ error: 'Email já está em uso por outro usuário' });
      return;
    }
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
};