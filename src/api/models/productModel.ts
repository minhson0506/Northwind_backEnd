import CustomError from "../../classes/CustomError";
import createDbConnection from "../../database/db";
import {Product} from "../../interface/Product";

// create connection to database
const db = createDbConnection();

// get product by id
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

export {getProductById}