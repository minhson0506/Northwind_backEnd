import CustomError from "../../classes/CustomError";
import createDbConnection from "../../database/db"
import {Order, OrderWithDetails} from "../../interface/Order";
import {OrderDetail} from "../../interface/OrderDetail";
import {getCustomer} from "./customerModel";
import {getProductByProductName} from "./productModel";

const db = createDbConnection();

const getAllOrders = async (shipped: string): Promise<OrderWithDetails[]> => {
    const shippedBool = shipped === 'true' ? true : false;
    if (!shipped) {
        const response: Promise<Order[]> = new Promise((resolve, reject) => {
            db.all(`SELECT * FROM Orders ShippedDate IS NULL`, [], (err: string, rows: Order[]) => {
                if (err) {
                    throw new CustomError(err, 404);
                } else {
                    resolve(rows);
                }
            });
        });
       
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
    } else {
        const response: Promise<Order[]> = new Promise((resolve, reject) => {
            db.all(`SELECT * FROM Orders WHERE ShippedDate IS NOT NULL`, [], (err: string, rows: Order[]) => {
                if (err) {
                    throw new CustomError(err, 404);
                } else {
                    resolve(rows);
                }
            });
        });
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
}

const getOrderById = async (shipped: boolean, id: number): Promise<Order> => {
    if (!shipped) {
    const response = new Promise((resolve, reject) => {
        db.get(`SELECT * FROM Orders WHERE orderId = ${id} AND ShippedDate IS NULL`, (err: string, row: Order) => {
            if (err) {
                throw new CustomError(err, 404);
            } else {
                resolve(row);
            }
        });
    });
    return response as Promise<Order>;
    } else {
        const response = new Promise((resolve, reject) => {
            db.get(`SELECT * FROM Orders WHERE orderId = ${id} AND ShippedDate IS NOT NULL`, (err: string, row: Order) => {
                if (err) {
                    throw new CustomError(err, 404);
                } else {
                    resolve(row);
                }
            });
        });
        return response as Promise<Order>;
    }
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
        db.all(`SELECT * FROM "Order Details" WHERE productId = ${productID}`, (err: string, rows: OrderDetail[]) => {
            if (err) {
                throw new CustomError(err, 404);
            } else {
                resolve(rows);
            }
        });
    });
    return response as Promise<OrderDetail[]>;
}

const getOrderWithDetailByProductName = async (shipped: string, productName: string): Promise<OrderWithDetails[]> => {
    console.log('productName', productName)
    const shippedBool = shipped === 'true' ? true : false;
    const products = await getProductByProductName(productName);

    // get order details for each product
    const orderDetailFromProduct = await Promise.all(products.map(async (product) => {
        return await getOrderDetailByProductId(product.ProductID);
    }));

    // convert array[][] of product to array[][] of order detail
    const orderDetails = orderDetailFromProduct.flatMap((orderDetail) => orderDetail);
    const orderDetailUnique = [...new Map(orderDetails.map(item => [item['OrderID'], item])).values()];


    //get order detail for each order id and remove order id that does not exist when get with null value
    const orders = await Promise.all(orderDetailUnique.map(async (orderDetail) => {
        const result = await getOrderById(shippedBool, orderDetail.OrderID);
        if (!result) {
            return;
        }
        if (result.CustomerID === null || result.CustomerID === undefined) {
            return {...result, OrderDetails: orderDetails.filter((value) => value.OrderID === orderDetail.OrderID), CustomerDetails: null};
        } else {
            console.log('result.CustomerID', result.CustomerID)
            const customer = await getCustomer(result.CustomerID);
            return {...result, OrderDetails: orderDetails.filter((value) => value.OrderID === orderDetail.OrderID), CustomerDetails: customer};
        }
    }));

    const result = orders.filter((order) => order !== undefined);

    return result as OrderWithDetails[];
}

export {getAllOrders, getOrderDetailById, getOrderWithDetailByProductName}