import express from 'express';
import {orderListGet, orderSearchGet} from '../controllers/orderController';

const router = express.Router();

router.route('/:shipped').get(orderListGet);

router.route('/:shipped/:productName').get(orderSearchGet);


export default router;