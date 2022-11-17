import express from 'express';
import crudRoute from './routes/testRoute';

const router = express.Router();

console.log('This is all the routers');
router.use(crudRoute);

export default router;
