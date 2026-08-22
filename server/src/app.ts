import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js'

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use('/api/v1', userRouter)

export default app