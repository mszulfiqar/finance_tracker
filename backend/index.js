import express from "express";
import dotenv from "dotenv"
import transactionRouter from "./routes/transaction.routes.js";
import { errorMiddleware } from "./utils/errorMiddleware.js";
import cors from "cors"

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // if you want to allow cookies/auth headers
}));
app.use("/api",transactionRouter);

app.use(errorMiddleware);
app.listen(4000,()=>{
    console.log("Server is runing....")
})