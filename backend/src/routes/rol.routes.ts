//Agregar rutas
import { Router } from 'express';
import { addRol } from '../controllers/rol.controllers';

const router = Router();
// Rutas para manejar roles
router.post('/add-rol', addRol);

export default router