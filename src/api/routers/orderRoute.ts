import express from 'express';
import {orderListGet, orderSearchGet} from '../controllers/orderController';

const router = express.Router();

router.route('/').get(orderListGet);

router.route('/:productName').get(orderSearchGet);

export default router;