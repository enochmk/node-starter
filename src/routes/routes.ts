import 'express-async-errors';
import express from 'express';
import requestIdMiddleware from '../middlewares/requestId.middleware';
import loggerMiddleware from '../middlewares/logger.middleware';
import route from './test.route';

const router = express.Router();

router.use(requestIdMiddleware);
router.use(loggerMiddleware);
router.use(route);

export default router;
