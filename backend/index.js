import router from './routes/Routes.js'
import protectedRouter from './routes/protectedRoutes.js'
import verifyToken from './middlewares/tokenVerification.js'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

const app = express()
app.use(cors())
dotenv.config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);
app.use('/api/protected' , verifyToken , protectedRouter );

app.listen(3000, () => console.log('APP is running on localhost:3000 '))