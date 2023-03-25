import express from 'express';
import MessageResponse from '../interface/MessageResponse';
import orderRoute from './routers/orderRoute';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
    res.json({
        message: 'routes: northwind database',
    });
});

router.use('/order', orderRoute);

export default router;
