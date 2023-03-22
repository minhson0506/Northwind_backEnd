import express from 'express';
import createDbConnection from '../database/db';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'API northwind: api/v1',
    });
});

let db = createDbConnection()

export default router;
