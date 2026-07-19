import express from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import { getConsultas, darParecer, enviarEmail } from '../controllers/psicologoController';

const router = express.Router();

router.use(authenticate);
router.use(authorize('psicologo'));

router.get('/consultas', getConsultas);
router.put('/parecer/:id', darParecer);
router.post('/email', enviarEmail);

export default router;