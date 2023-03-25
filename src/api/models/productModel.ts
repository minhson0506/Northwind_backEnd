import CustomError from "../../classes/CustomError";
import createDbConnection from "../../database/db";
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

const getProductById = async (id: number): Promise<Product> => {
    const response = new Promise((resolve, reject) => {
        db.get(`SELECT * FROM Products WHERE ProductID = ${id}`, (err: string, row: Product) => {
            if (err) {
                throw new CustomError(err, 404);
            } else {
                resolve(row);
            }
        });
    });
    return response as Promise<Product>;
}

export {getProductByProductName, getProductById}