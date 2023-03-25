import CustomError from "../../classes/CustomError";
import createDbConnection from "../../database/db"
import {Order, OrderWithDetails} from "../../interface/Order";
import {OrderDetail, OrderDetailWithProduct} from "../../interface/OrderDetail";
import {getCustomer} from "./customerModel";
import {getProductById} from "./productModel";

// create connection to database
const db = createDbConnection();

// get all orders
const getAllOrders = async (): Promise<OrderWithDetails[]> => {
    const response: Promise<Order[]> = new Promise((resolve, reject) => {
        db.all(`SELECT * FROM Orders`, [], (err: string, rows: Order[]) => {
            if (err) {
                throw new CustomError(err, 404);
            } else {
                resolve(rows);
            }
        });
    });

    // get order details for each order
    const orders = await Promise.all((await response).map(async (order: Order) => {
        const orderDetail = await getOrderDetailById(order.OrderID)
        if (order.CustomerID) {
            const customer = await getCustomer(order.CustomerID);
            return {...order, OrderDetails: orderDetail, CustomerDetails: customer}
        } else {
            return {...order, OrderDetails: orderDetail, CustomberDetails: null}
        }
    }));
    return orders as OrderWithDetails[];

}

// get order details by order id
const getOrderDetailById = async (id: number): Promise<OrderDetailWithProduct[]> => {
    const response: Promise<OrderDetail[]> = new Promise((resolve, reject) => {
        db.all(`SELECT * FROM "Order Details" WHERE orderId = ${id}`, [], (err: string, rows: OrderDetail[]) => {
            if (err) {
                throw new CustomError(err, 404);
            } else {
                resolve(rows);
            }
        });
    });

    // get product details for each order detail
    const orderDetails = await Promise.all((await response).map(async (orderDetail: OrderDetail) => {
        const product = await getProductById(orderDetail.ProductID);
        return {...orderDetail, ProductDetails: product};
    }));

    return orderDetails as OrderDetailWithProduct[];
}

export {getAllOrders}