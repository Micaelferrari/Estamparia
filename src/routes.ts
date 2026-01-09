import { Router } from 'express'
import clientsRoutes from './routes/clientsRoutes';

const routes = Router();

routes.use('/clients',  clientsRoutes);



export default routes;