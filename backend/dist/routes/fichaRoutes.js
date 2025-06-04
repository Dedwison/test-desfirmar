"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fichaController_1 = require("./../controllers/fichaController");
const validatePutDesfirmar_1 = require("./../middlewares/validatePutDesfirmar");
const router = express_1.default.Router();
// GET /api/fichas -> optiene todas las fichas firmadas
router.get('/', fichaController_1.getFichas);
// PUT /api/fichas/:id_ficha/desfirmar
router.put('/:id_ficha/desfirmar', validatePutDesfirmar_1.validatePutDesfirmar, fichaController_1.putDesfirmar);
exports.default = router;
