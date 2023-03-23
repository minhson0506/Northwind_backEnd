import CustomError from "../../classes/CustomError";
import createDbConnection from "../../database/db"
import {Order, OrderWithDetails} from "../../interface/Order";
import {OrderDetail} from "../../interface/OrderDetail";
import {getProductByProductName} from "./productModel";

const db = createDbConnection();

const getAllOrders = async (): Promise<Order[]> => {
    const response = new Promise((resolve, reject) => {
        db.all(`SELECT * FROM Orders WHERE orderId = 10249`, [], (err: string, rows: Order[]) => {
            if (err) {
                throw new CustomError(err, 404);
            } else {
                resolve(rows);
            }
        });
    });
    return response as Promise<Order[]>;
}

const getOrderDetailById = async (id: number): Promise<OrderDetail[]> => {
    console.log('get detail', id)
    const response = new Promise((resolve, reject) => {
        db.all(`SELECT * FROM "Order Details" WHERE orderId = ${id}`, [], (err: string, rows: OrderDetail[]) => {
            if (err) {
                throw new CustomError(err, 404);
            } else {
                resolve(rows);
            }
        });
    });
    return response as Promise<OrderDetail[]>;
}

const getOrderDetailByProductId = async (productID: number): Promise<OrderDetail[]> => {
    const response = new Promise((resolve, reject) => {
        db.all(`SELECT * FROM "Order Details" WHERE productId = ${productID}`, [], (err: string, rows: OrderDetail[]) => {
            if (err) {
                throw new CustomError(err, 404);
            } else {
                resolve(rows);
            }
        });
    });
    return response as Promise<OrderDetail[]>;
}

const getOrderWithDetailByProductName = async (productName: string): Promise<OrderDetail[]> => {
    const products = await getProductByProductName(productName);
    const orderDetails = await Promise.all(products.map(async (product) => {
        const orderDetail = await getOrderDetailByProductId(product.ProductID);
        return orderDetail;
    }));
    return orderDetails as unknown as OrderDetail[];
}

export {getAllOrders, getOrderDetailById, getOrderWithDetailByProductName}