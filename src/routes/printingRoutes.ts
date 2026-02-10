import { Router } from "express";
import * as printingController from '../controller/printingController';

const printingRoutes = Router();

printingRoutes.get('/', printingController.get);
printingRoutes.get('/:id', printingController.getById)
printingRoutes.post('/', printingController.create);
printingRoutes.delete('/:id', printingController.deletePrinting);
printingRoutes.put('/:id', printingController.update)

export default printingRoutes;