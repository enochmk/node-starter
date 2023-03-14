import express from 'express';
import { testGetController } from '../controllers/controller';

const router = express.Router();

router.route('/').get(testGetController);

export default router;
