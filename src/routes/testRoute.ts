import express from 'express';
import * as controllers from '@/controllers/testController';

const router = express.Router();

router.route('/api/test').get(controllers.testGetController);

export default router;
