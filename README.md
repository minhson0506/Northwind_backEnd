# NORTHWIND backend 

[Servers app](https://northwind-be.onrender.com)

Northwind backend is a REST API was created to help organize orders in northwind database.

The Northwind sample database was provided with Microsoft Access as a tutorial schema for managing small business customers, orders, inventory, purchasing, suppliers, shipping, and employees. Northwind is an excellent tutorial schema for a small-business ERP, with customers, orders, inventory, purchasing, suppliers, shipping, employees, and single-entry accounting.

All the TABLES and VIEWS from the MSSQL-2000 version have been converted to Sqlite3 and included here. Included is a single version prepopulated with data. Should you decide to, you can use the included python script to pump the database full of more data.

## Structure

<p align="center">
  <img src="https://user-images.githubusercontent.com/73076333/227781359-8bd8d552-8577-48a3-86af-6292b6370224.png" width="750"> 
</p>

## Endpoint

/api/v1/orders

## Response

Response example:
```
[
    {
        "OrderID": 10248,
        "CustomerID": "VINET",
        "EmployeeID": 5,
        "OrderDate": "2016-07-04",
        "RequiredDate": "2016-08-01",
        "ShippedDate": "2016-07-16",
        "ShipVia": 3,
        "Freight": 32.38,
        "ShipName": "Vins et alcools Chevalier",
        "ShipAddress": "59 rue de l-Abbaye",
        "ShipCity": "Reims",
        "ShipRegion": "Western Europe",
        "ShipPostalCode": "51100",
        "ShipCountry": "France",
        "OrderDetails": [
            {
                "OrderID": 10248,
                "ProductID": 11,
                "UnitPrice": 14,
                "Quantity": 12,
                "Discount": 0,
                "ProductDetails": {
                    "ProductID": 11,
                    "ProductName": "Queso Cabrales",
                    "SupplierID": 5,
                    "CategoryID": 4,
                    "QuantityPerUnit": "1 kg pkg.",
                    "UnitPrice": 21,
                    "UnitsInStock": 22,
                    "UnitsOnOrder": 30,
                    "ReorderLevel": 30,
                    "Discontinued": "0"
                }
            },
            {
                "OrderID": 10248,
                "ProductID": 42,
                "UnitPrice": 9.8,
                "Quantity": 10,
                "Discount": 0,
                "ProductDetails": {
                    "ProductID": 42,
                    "ProductName": "Singaporean Hokkien Fried Mee",
                    "SupplierID": 20,
                    "CategoryID": 5,
                    "QuantityPerUnit": "32 - 1 kg pkgs.",
                    "UnitPrice": 14,
                    "UnitsInStock": 26,
                    "UnitsOnOrder": 0,
                    "ReorderLevel": 0,
                    "Discontinued": "1"
                }
            },
            {
                "OrderID": 10248,
                "ProductID": 72,
                "UnitPrice": 34.8,
                "Quantity": 5,
                "Discount": 0,
                "ProductDetails": {
                    "ProductID": 72,
                    "ProductName": "Mozzarella di Giovanni",
                    "SupplierID": 14,
                    "CategoryID": 4,
                    "QuantityPerUnit": "24 - 200 g pkgs.",
                    "UnitPrice": 34.8,
                    "UnitsInStock": 14,
                    "UnitsOnOrder": 0,
                    "ReorderLevel": 0,
                    "Discontinued": "0"
                }
            }
        ],
        "CustomerDetails": {
            "CustomerID": "VINET",
            "CompanyName": "Vins et alcools Chevalier",
            "ContactName": "Paul Henriot",
            "ContactTitle": "Accounting Manager",
            "Address": "59 rue de l'Abbaye",
            "City": "Reims",
            "Region": "Western Europe",
            "PostalCode": "51100",
            "Country": "France",
            "Phone": "26.47.15.10",
            "Fax": "26.47.15.11"
        }
    }
]
```

## Installation

1. Clone northwind_backEnd to local:
```
$ git clone git@github.com:minhson0506/northwind_backEnd.git
```
2. Build and run project:
```
$ cd northwind_backEnd
$ npm i
$ npm run dev
```
3. Test project:
```
$ npm run test
```
