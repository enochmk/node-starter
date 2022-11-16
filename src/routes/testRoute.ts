import express from 'express';
import { testGetController } from '../controllers/testController';

const router = express.Router();

router.route('/api/test').get(testGetController);

export default router;
