import express from 'express';
import crudRoute from './routes/route';

const router = express.Router();

router.use(crudRoute);

export default router;
