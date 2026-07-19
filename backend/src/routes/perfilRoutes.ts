import express from 'express';
import { authenticate } from '../middlewares/auth';
import { atualizarPerfil } from '../controllers/perfilController';

const router = express.Router();

router.use(authenticate);

router.put('/', atualizarPerfil);

export default router;