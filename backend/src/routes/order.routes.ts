//Agregar rutas
import { Router } from 'express';
import { addOrder, updateOrder, deleteOrder } from '../controllers/order.controllers';

const router = Router();
// Rutas para manejar order
router.post('/add-order', addOrder);
router.put('/up-order/:orderId', updateOrder);
router.delete('/de-order/:orderId', deleteOrder);

export default router;