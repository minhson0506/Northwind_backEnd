import {Request, Response, NextFunction} from 'express';
import {Order, OrderWithDetails} from '../../interface/Order';
import {OrderDetail} from '../../interface/OrderDetail';
import {getAllOrders, getOrderDetailById, getOrderWithDetailByProductName} from '../models/orderModel';
import {getProductByProductName} from '../models/productModel';

const orderListGet = async (req: Request, res: Response, next: NextFunction) => {
    const result = await getOrderWithDetailByProductName('chai')
    console.log('result', result)
    try {
        const orders = await getAllOrders() as Order[];
        const orderDetails = await getOrderDetailById(orders[0].OrderID)
        const orderWithDetails: OrderWithDetails = {...orders[0], OrderDetails: orderDetails}
        res.json(orderWithDetails);
    } catch (error) {
        next(error);
    }
}

const orderSearchGet = async (req: Request<{search: string}, {}, {}>, res: Response, next: NextFunction) => {
    try {
        const product = await getOrderWithDetailByProductName(req.params.search);
        res.json(product);
    } catch (error) {
        next(error);
    }
}

export {orderListGet, orderSearchGet};