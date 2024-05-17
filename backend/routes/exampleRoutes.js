import express from 'express';
import { exampleController } from '../Controllers/exampleController';

const router = express.Router();

router.get('/example', exampleController);

export default router;