import { Router } from 'express'
import clientsRoutes from './routes/clientsRoutes';
import printingRoutes from './routes/printingRoutes'

const routes = Router();

routes.use('/client',  clientsRoutes);
routes.use('/printing', printingRoutes)



export default routes;