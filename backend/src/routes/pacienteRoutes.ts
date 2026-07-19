import express from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import { listarPsicologos, criarConsulta, getConsultas, cancelarConsulta } from '../controllers/pacienteController';

const router = express.Router();

router.use(authenticate);
router.use(authorize('paciente'));

router.get('/psicologos', listarPsicologos);
router.post('/consultas', criarConsulta);
router.get('/consultas', getConsultas);
router.put('/consultas/:id/cancelar', cancelarConsulta);

export default router;