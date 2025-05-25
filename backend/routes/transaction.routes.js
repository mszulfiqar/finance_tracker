import express from "express"
import { budgetStats, createBudget, createTransaction, deleteBudget, deleteTransaction, getBudget, getPieChartExpenses, getTransactions, overviewtrnsaction, updateBudget, updateTransaction } from "../controllers/transactions.controller.js";

const transactionRouter = express.Router();

transactionRouter.post("/create-transcation",createTransaction)
transactionRouter.get("/get-transcation",getTransactions)
transactionRouter.delete("/delete-transcation/:id",deleteTransaction)
transactionRouter.put("/update-transcation/:id",updateTransaction)
// Budget
transactionRouter.post("/create-budget",createBudget)
transactionRouter.get("/get-budget",getBudget)
transactionRouter.get("/get-budgetstats",budgetStats)
transactionRouter.put("/update-budget",updateBudget)
transactionRouter.delete("/delete-budget/:id",deleteBudget)

transactionRouter.get("/get-transcation-overview",overviewtrnsaction)
transactionRouter.get("/get-expense-overview",getPieChartExpenses)

export default transactionRouter;