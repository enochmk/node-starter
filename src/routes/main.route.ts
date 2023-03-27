import express from 'express';
import { testGetController } from '../controllers/test.controller';

const router = express.Router();

router.route('/').get(testGetController);

export default router;
