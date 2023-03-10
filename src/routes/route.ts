import express from 'express';
import { testGetController } from '../controllers/controller';

const router = express.Router();

router.route('/api/test').get(testGetController);

export default router;
