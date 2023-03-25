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
app.use(cors())
app.use(express.json())

app.get<{}, MessageResponse>('/', (req, res) => {
    res.json({
        message: 'API northwind: api/v1',
    });
});

app.use('/api/v1', api)

app.use(notFound)
app.use(errorHandler)

export default app;