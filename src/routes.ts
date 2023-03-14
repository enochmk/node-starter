import express from 'express';
import route from './routes/route';

const router = express.Router();

router.use(route);

export default router;
