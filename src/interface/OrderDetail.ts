import {Product} from "./Product";

interface OrderDetail {
    OrderID: number;
    ProductID: number;
    UnitPrice: number;
    Quantity: number;
    Discount: number;
}

interface OrderDetailWithProduct extends OrderDetail {
    ProductDetails: Product;
}

export {OrderDetail, OrderDetailWithProduct}
