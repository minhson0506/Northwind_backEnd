import {Customer} from "./Customer";
import {OrderDetailWithProduct} from "./OrderDetail";

interface Order {
    OrderID: number;
    CustomerID: string | null;
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
    OrderDetails: OrderDetailWithProduct[];
    CustomerDetails: Customer | null;
}

export {Order, OrderWithDetails}