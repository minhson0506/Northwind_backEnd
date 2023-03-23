import {OrderDetail} from "./OrderDetail";

interface Order {
    OrderID: number;
    CustomerID: number | null;
    EmployeeID: number | null;
    OrderDate: string | null;
    RequiredDate: string | null;
    ShippedDate: string | null;
    ShipVia: number | null;
    Freight: number | null;
    ShipName: string | null;
    ShipAddress: string | null;
    ShipCity: string | null;
    ShipRegion: string | null;
    ShipPostalCode: string | null;
    ShipCountry: string | null;
}

interface OrderWithDetails extends Order {
    OrderDetails: OrderDetail[];
}

export {Order, OrderWithDetails}