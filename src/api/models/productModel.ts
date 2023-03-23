import CustomError from "../../classes/CustomError";
import createDbConnection from "../../database/db";
import {OrderDetail} from "../../interface/OrderDetail";
import {Product} from "../../interface/Product";

const db = createDbConnection();

const getProductByProductName = async (productName: string): Promise<Product[]> => {
    const response = new Promise((resolve, reject) => {
        db.all(`SELECT * FROM Products WHERE ProductName LIKE '%${productName}%'`, [], (err: string, rows: Product[]) => {
            if (err) {
                throw new CustomError(err, 404);
            } else {
                resolve(rows);
            }
        });
    });
    return response as Promise<Product[]>;
}

export {getProductByProductName}