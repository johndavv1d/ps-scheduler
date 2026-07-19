import express from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import { cadastrarPsicologo, cadastrarPaciente, removerFicha } from '../controllers/adminController';

const router = express.Router();

router.use(authenticate);
router.use(authorize('admin'));

router.post('/psicologo', cadastrarPsicologo);
router.post('/paciente', cadastrarPaciente);
router.delete('/ficha/:tipo/:id', removerFicha);

export default router;