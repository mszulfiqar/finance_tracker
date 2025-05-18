import express from "express"
import { createTransaction, getTransactions } from "../controllers/transactions.controller.js";

const transactionRouter = express.Router();

transactionRouter.post("/create-transcation",createTransaction)
transactionRouter.get("/get-transcation",getTransactions)

export default transactionRouter;