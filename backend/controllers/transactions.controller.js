import { AppError } from "../utils/errorMiddleware.js";
import prisma from "../utils/prisma.js"

export const createTransaction = async (req, res, next) => {
    const { title, amount, category, type, description, date } = req.body;
    if (!title || !amount || !category || !type || !date || !description) {
        throw new AppError(400, "Please fill the form")
    }
    try {
        await prisma.transaction.create({
            data: {
                title: title,
                description,
                date: new Date(date),
                type,
                category,
                amount: parseInt(amount)
            }
        });

        // if (type == "expense") {
        //     const aggregate = await prisma.transaction.aggregate({
        //         _sum: { amount: true },
        //         where: { category: category }
        //     })
        //     const spent = aggregate._sum.amount || 0;

        //     const budget = await prisma.budget.findFirst({
        //         where: { category }
        //     });
        //     // console.log(budget.amount)
        //     if (budget) {
        //         const remaining = budget.budgeted - spent;
        //         const progressbar = Math.min(Math.floor((spent / budget.budgeted) * 100), 100);

        //         await prisma.budget.update({
        //             where: { id: budget.id },
        //             data: { spent, remaining, progressbar }
        //         })

        //         // res.status(201).json({message:""});
        //     }
        // }
        // console.log(budget.amount)
        return res.status(200).json({ message: "Transcation created!" })
    } catch (error) {
        next(error)
    }
}

export const getTransactions = async (req, res, next) => {
    try {
        const transactions = await prisma.transaction.findMany()
        return res.json({ transactions: transactions })
    } catch (error) {
        next(error)
    }
}

export const deleteTransaction = async (req, res, next) => {
    try {
        const { id } = req.params;

        const findTransaction = await prisma.transaction.findFirst({
            where: {
                id: parseInt(id)
            }
        })

        if (!findTransaction) {
            throw new AppError("Transaction not found!", 401)
        }

        await prisma.transaction.delete({
            where: {
                id: parseInt(id)
            }
        })
        // if (findTransaction.type == "expense") {
        //     const budget = await prisma.budget.findFirst({
        //         where: { category: findTransaction.category }
        //     })
        //     if (budget) {
        //         const spentAmount = budget.spent - findTransaction.amount;
        //         const remaining = budget.budgeted - spentAmount;
        //         const newProgress = Math.min(Math.floor((spentAmount / budget.budgeted) * 100), 100);

        //         await prisma.budget.update({
        //             where: { id: budget.id },
        //             data: {
        //                 spent: spentAmount,
        //                 remaining: remaining,
        //                 progressbar: newProgress
        //             }
        //         })
        //     }
        // }
        return res.status(200).json({ message: "Transcation deleted!" })
    } catch (error) {
        next(error)
        console.log(error)
    }
}

// update transaction
export const updateTransaction = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, amount, category, type, description, date } = req.body;
        if (!title || !amount || !category || !type || !date || !description) {
            throw new AppError("Please fill the form", 400)
        }
        await prisma.transaction.update({
            where: { id: parseInt(id) },
            data: {
                title: title,
                description,
                date: new Date(date),
                type,
                category,
                amount: parseInt(amount)
            }
        });

        return res.status(200).json({ message: "Transcation Updated!" })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

// create budget
export const createBudget = async (req, res, next) => {
    try {
        const { category, budget } = req.body;

        if (!category || !budget) {
            // return res.status(405).json({message:"Please fill th form"})
            throw new AppError("Please fill th form", 400)
        }
        const finding_budget = await prisma.budget.findFirst({
            where: { category }
        })
        if (finding_budget) throw new AppError("Already Exists", 400)
        const budgetParsed = parseInt(budget)
        await prisma.budget.create({
            data: {
                category,
                budgeted: budgetParsed,
            }
        })
        res.status(201).json({ message: "Done" });
    } catch (error) {
        console.log(error)
        next(error)
    }
}

// get budgets
export const getBudget = async (req, res, next) => {
    try {
        const budgets = await prisma.budget.findMany();
        const transactions = await prisma.transaction.findMany();
        const budgetWithStats = budgets.map((budget) => {
            const categorizeTransactions = transactions.filter((item) => item.category == budget.category);
            const Totalspent = categorizeTransactions.reduce((sum, tx) => sum + tx.amount, 0);
            const remaining = budget.budgeted - Totalspent;
            const progressbar = budget.budgeted > 0
                ? Math.min(Math.floor((Totalspent / budget.budgeted) * 100), 100)
                : 0;
            return {
                ...budget,
                Totalspent,
                remaining,
                progressbar
            };
        })
        // console.log(budgetWithStats)
        res.status(200).json(budgetWithStats);
    } catch (error) {
        // console.log(error)
        next(error)
    }
}

// update budget
export const updateBudget = async (req, res, next) => {
    try {
        const { category, budget } = req.body;

        if (!category || !budget) {
            throw new AppError(400, "Please fill th form")
        }

        const budget_db = await prisma.budget.findFirst({
            where: { category: category },
        })

        if (!budget_db) throw new AppError("Budget nor found!", 404)

        await prisma.budget.update({
            where: { id: budget_db.id },
            data: { budgeted: parseInt(budget) }
        })
        res.status(201).json({ message: "Done" });
    } catch (error) {
        // console.log(error)
        next(error)
    }
}

export const deleteBudget = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) throw new AppError("Budget not found", 400);

        const parsedId = parseInt(id);

        const budget = await prisma.budget.findFirst({
            where: { id: parsedId }
        })

        if (!budget) throw new AppError("Budget not found", 400);

        await prisma.budget.delete({
            where: { id: budget.id }
        });

        return res.status(201).json({ message: "Deleted Successfully" })

    } catch (error) {
        // console.log(error)
        next(error)
    }
}


export const budgetStats = async (req, res, next) => {
    try {
        // 1. Get all budgets and transactions
        const budgets = await prisma.budget.findMany();
        const transactions = await prisma.transaction.findMany();

        // 2. Total budgeted
        const totalBudgeted = budgets.reduce((sum, b) => sum + b.budgeted, 0);

        // 3. Total spent (only from budget categories)
        const validCategories = budgets.map(b => b.category);
        const filteredTransactions = transactions.filter(tx =>
            validCategories.includes(tx.category)
        );
        const totalSpent = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);

        // 4. Total remaining
        const totalRemaining = totalBudgeted - totalSpent;

        // 5. Send response
        res.status(200).json({
            totalBudgeted,
            totalSpent,
            totalRemaining
        });
    } catch (error) {
        // console.log(error)
        next(error)
    }
}

export const overviewtrnsaction = async (req, res, next) => {
    try {
        const totalIncome = await prisma.transaction.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                type: 'income',
            },
        });
        const totalexpense = await prisma.transaction.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                type: 'expense',
            },
        });
        res.status(201).json({totalIncome:totalIncome._sum.amount,totalexpense:totalexpense._sum.amount});
    } catch (error) {
        next(error)
    }
}

export const getPieChartExpenses = async (req,res,next) => {
    try {
        console.log("dfbudfbd")
        const expenses = await prisma.transaction.findMany({
            where:{
                type:"expense"
            },
            select:{
                // type:true,
                category:true,
                amount:true
            }
        })
        console.log(expenses)
        res.status(201).json(expenses);
    } catch (error) {
        console.log(error)
        next(error)
    }
}