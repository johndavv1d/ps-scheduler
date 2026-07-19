import { Request, Response } from 'express';
import prisma from '../prisma';

export const criarConsulta = async (req: Request, res: Response): Promise<void> => {
  const { psicologoId, data } = req.body;
  const pacienteId = req.user?.id;

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
    const pacienteId = req.user?.id;
    
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