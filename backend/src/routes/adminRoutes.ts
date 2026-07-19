import express from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import { listarPsicologos, listarPacientes, cadastrarPsicologo, cadastrarPaciente, removerFicha } from '../controllers/adminController';

const router = express.Router();

router.use(authenticate);
router.use(authorize('admin'));

router.get('/psicologos', listarPsicologos);
router.get('/pacientes', listarPacientes);
router.post('/psicologo', cadastrarPsicologo);
router.post('/paciente', cadastrarPaciente);
router.delete('/ficha/:tipo/:id', removerFicha);

export default router;