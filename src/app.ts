require('dotenv').config()
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import MessageResponse from './interface/MessageResponse'

const app = express()
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.get<{}, MessageResponse>('/', (req, res) => {
    res.json({
      message: 'API location: api/v1',
    });
  });

  export default app;