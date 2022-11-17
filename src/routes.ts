import express from 'express';
import crudRoute from './routes/testRoute';

const router = express.Router();

router.use(crudRoute);

export default router;
