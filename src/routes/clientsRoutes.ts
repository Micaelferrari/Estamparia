import { Router } from "express";
import * as clientController from '../controller/clientController';

const clientsRoutes = Router();

clientsRoutes.get('/', clientController.get);
clientsRoutes.get('/:id', clientController.getById)
clientsRoutes.post('/', clientController.create);
clientsRoutes.delete('/:id', clientController.deleteClient);
clientsRoutes.put('/:id', clientController.update)

export default clientsRoutes;