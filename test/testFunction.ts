import request from 'supertest';
import expect from 'expect';
import {OrderDetailWithProduct} from "../src/interface/OrderDetail";

const getNotFound = (url: string | Function) => {
    return new Promise((resolve, reject) => {
        request(url)
            .get('/what-is-this')
            .expect(404, (err, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response.body);
                }
            });
    });
};

const testGetAllOrders = (url: string | Function): Promise<OrderDetailWithProduct[]> => {
    return new Promise((resolve, reject) => {
        request(url)
            .get('/api/v1/orders')
            .expect(200, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    const orders = res.body as OrderDetailWithProduct[];
                    orders.forEach((order) => {
                        expect(order).toHaveProperty('OrderID');
                        expect(order.OrderID).toBeGreaterThan(0);
                        expect(order).toHaveProperty('CustomerID');
                        expect(order).toHaveProperty('EmployeeID');
                        expect(order).toHaveProperty('OrderDate');
                        expect(order).toHaveProperty('RequiredDate');
                        expect(order).toHaveProperty('ShippedDate');
                        expect(order).toHaveProperty('ShipVia');
                        expect(order).toHaveProperty('Freight');
                        expect(order).toHaveProperty('ShipName');
                        expect(order).toHaveProperty('ShipAddress');
                        expect(order).toHaveProperty('ShipCity');
                        expect(order).toHaveProperty('ShipRegion');
                        expect(order).toHaveProperty('ShipPostalCode');
                        expect(order).toHaveProperty('ShipCountry');
                        expect(order).toHaveProperty('OrderDetails');
                        expect(order).toHaveProperty('CustomerDetails');
                    });
                    resolve(orders);
                }
            });
    });
}


export {testGetAllOrders, getNotFound}
