import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js'

const app = express()

app.use(express.json())
app.use(cors({
    origin: ['https://chat-app-two-ochre-87.vercel.app', 'http://localhost:3000']
}))
app.use('/api/v1', userRouter)

export default app