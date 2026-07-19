import { Request, Response } from 'express';
import prisma from '../prisma';

export const listarPsicologos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const psicologos = await prisma.psicologo.findMany({
      select: { id: true, nome: true, email: true, erp: true, horarios: true },
      orderBy: { nome: 'asc' }
    });

    res.json(psicologos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar psicólogos' });
  }
};

export const criarConsulta = async (req: Request, res: Response): Promise<void> => {
  const { psicologoId, data } = req.body;
  const pacienteId = (req as any).user?.id;

  if (!pacienteId) {
    res.status(401).json({ error: 'Usuário não autenticado' });
    return;
  }

  try {
    const consulta = await prisma.consulta.create({
      data: {
        pacienteId: Number(pacienteId),
        psicologoId: Number(psicologoId),
        data: new Date(data)
      }
    });

    res.status(201).json(consulta);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar consulta' });
  }
};

export const getConsultas = async (req: Request, res: Response): Promise<void> => {
  try {
    const pacienteId = (req as any).user?.id;

    if (!pacienteId) {
      res.status(401).json({ error: 'Usuário não autenticado' });
      return;
    }
    
    const consultas = await prisma.consulta.findMany({
      where: { pacienteId },
      include: {
        paciente: true,
        psicologo: true
      },
      orderBy: { data: 'asc' }
    });

    res.json(consultas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar consultas' });
  }
};

export const cancelarConsulta = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const consulta = await prisma.consulta.update({
      where: { id: Number(id) },
      data: { status: 'CANCELADA' }
    });

    res.json(consulta);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cancelar consulta' });
  }
};