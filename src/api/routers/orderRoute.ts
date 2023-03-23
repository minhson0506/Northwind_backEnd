import express from 'express';
import {orderListGet} from '../controllers/orderController';
import {getOrderWithDetailByProductName} from '../models/orderModel';

const router = express.Router();

router.route('/').get(orderListGet);

router.route('/search/:search').get(getOrderWithDetailByProductName);

export default router;