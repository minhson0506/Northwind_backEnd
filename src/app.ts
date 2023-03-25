require('dotenv').config()
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import MessageResponse from './interface/MessageResponse'
import {errorHandler, notFound} from './middlewares'
import api from './api'

const app = express()
app.use(morgan('dev'))
app.use(helmet())
app.use(cors({
    origin: '*'
}))

app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', "true");

    // Pass to next layer of middleware
    next();
});

app.get<{}, MessageResponse>('/', (req, res) => {
    res.json({
        message: 'API northwind: api/v1',
    });
});

app.use('/api/v1', api)

app.use(notFound)
app.use(errorHandler)

export default app;