import { Request, Response } from 'express';
import prisma from '../prisma';

export const getConsultas = async (req: Request, res: Response): Promise<void> => {
  try {
    const psicologoId = (req as any).user?.id;
    
    if (!psicologoId) {
      res.status(401).json({ error: 'Usuário não autenticado' });
      return;
    }

    const consultas = await prisma.consulta.findMany({
      where: { psicologoId },
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

export const darParecer = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { parecer } = req.body;

  try {
    const consulta = await prisma.consulta.update({
      where: { id: Number(id) },
      data: { parecer, status: 'REALIZADA' }
    });

    res.json(consulta);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar parecer' });
  }
};

export const enviarEmail = async (req: Request, res: Response): Promise<void> => {
  const { pacienteEmail, categoria, mensagem } = req.body;

  try {
    console.log(`📧 Email enviado para ${pacienteEmail}`);
    console.log(`📂 Categoria: ${categoria}`);
    console.log(`📝 Mensagem: ${mensagem}`);
    
    res.json({ message: 'Email enviado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar email' });
  }
};