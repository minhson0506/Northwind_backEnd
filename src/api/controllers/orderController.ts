import {Request, Response, NextFunction} from 'express';
import {Order} from '../../interface/Order';
import {getAllOrders, getOrderWithDetailByProductName} from '../models/orderModel';

const orderListGet = async (req: Request<{shipped: string}, {},{}>, res: Response, next: NextFunction) => {
    const result = await getOrderWithDetailByProductName(req.params.shipped, 'cha')
    console.log('result', result)
    try {
        const orders = await getAllOrders(req.params.shipped) as Order[];
        res.json(orders);
    } catch (error) {
        next(error);
    }
}

const orderSearchGet = async (req: Request<{shipped: string, productName: string}, {}, {}>, res: Response, next: NextFunction) => {
    try {
        const orders = await getOrderWithDetailByProductName(req.params.shipped, req.params.productName);
        res.json(orders);
    } catch (error) {
        next(error);
    }
}

export {orderListGet, orderSearchGet};