import express from 'express';
import {orderListGet} from '../controllers/orderController';

const router = express.Router();

// define route for get all orders
router.route('/').get(orderListGet);

export default router;