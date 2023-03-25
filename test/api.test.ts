import app from "../src/app";
import {getNotFound, testGetAllOrders} from "./testFunction";

describe('API', () => {
    // test not found
    it('responds with a not found message', async () => {
        await getNotFound(app);
      });
      
    // test get all orders
    it('should get all orders', async () => {
        await testGetAllOrders(app);
    });
    
});
