import {Request, Response, NextFunction} from 'express';
import {Order} from '../../interface/Order';
import {getAllOrders} from '../models/orderModel';

// get all orders
const orderListGet = async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    try {
        const orders = await getAllOrders() as Order[];
        res.json(orders);
    } catch (error) {
        next(error);
    }
}

export {orderListGet};