import 'express-async-errors';
import express from 'express';
import route from './test.route';

const router = express.Router();

router.use(route);

export default router;
