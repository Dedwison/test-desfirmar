import express from 'express';
import { getFichas, putDesfirmar } from './../controllers/fichaController';
import { validatePutDesfirmar } from './../middlewares/validatePutDesfirmar';

const router = express.Router();

// GET /api/fichas -> optiene todas las fichas firmadas
router.get('/', getFichas);

// PUT /api/fichas/:id_ficha/desfirmar
router.put('/:id_ficha/desfirmar', validatePutDesfirmar ,putDesfirmar);

export default router;
