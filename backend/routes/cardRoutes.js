import { Router } from 'express';
import CardController from '../controllers/cardController.js';

const router = Router();

router.get('/', CardController.getCard);

export default router;