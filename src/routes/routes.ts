import 'express-async-errors';
import express from 'express';
import requestLogger from '../middlewares/requestLogger.middleware';
import route from './test.route';

const router = express.Router();

router.use(requestLogger);
router.use(route);

export default router;
