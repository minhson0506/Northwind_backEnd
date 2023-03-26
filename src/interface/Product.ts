interface Product {
    ProductID: number;
    ProductName: string;
    SupplierID: number | null;
    CategoryID: number | null;
    QuantityPerUnit: string | null;
    UnitPrice: number | null;
    UnitsInStock: number | null;
    UnitsOnOrder: number | null;
    ReorderLevel: number | null;
    Discontinued: string;
}

export {Product}