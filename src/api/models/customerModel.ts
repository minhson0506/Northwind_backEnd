import CustomError from "../../classes/CustomError";
import createDbConnection from "../../database/db";
import {Customer} from "../../interface/Customer";

const db = createDbConnection();

const getCustomer = async (id: string): Promise<Customer> => {
    const response = new Promise((resolve, reject) => {
        db.get(`SELECT * FROM Customers WHERE CustomerID = '${id}'`, (err: string, row: Customer) => {
            if (err) {
                throw new CustomError(err, 404);
            } else {
                resolve(row);
            }
        });
    });
    return response as Promise<Customer>;
}

export {getCustomer}
