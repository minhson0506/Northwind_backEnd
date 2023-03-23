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

const getOrderById = async (id: number): Promise<Order> => {
    const response = new Promise((resolve, reject) => {
        db.get(`SELECT * FROM Orders WHERE orderId = ${id}`, [], (err: string, row: Order) => {
            if (err) {
                throw new CustomError(err, 404);
            } else {
                resolve(row);
            }
        });
    });
    return response as Promise<Order>;
}

const getOrderDetailById = async (id: number): Promise<OrderDetail[]> => {
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

const getOrderWithDetailByProductName = async (productName: string): Promise<OrderWithDetails[]> => {
    console.log('productName', productName)
    const products = await getProductByProductName(productName);

    // get order details for each product
    const orderDetailFromProduct = await Promise.all(products.map(async (product) => {
        return await getOrderDetailByProductId(product.ProductID);
    }));

    // convert array[][] of product to array[][] of order detail
    const orderDetails = orderDetailFromProduct.flatMap((orderDetail) => orderDetail);
    const orderDetailUnique = [...new Map(orderDetails.map(item => [item['OrderID'], item])).values()];
    

    //get order detail for each order id
    const orders: OrderWithDetails[] = await Promise.all(orderDetailUnique.map(async (orderDetail) => {
        const result = await getOrderById(orderDetail.OrderID);
        return {...result, OrderDetails: orderDetails.filter((value)=> value.OrderID === orderDetail.OrderID)} as OrderWithDetails;
    }));

    console.log('orders', orders)

    return orders;
}

export {getAllOrders, getOrderDetailById, getOrderWithDetailByProductName}