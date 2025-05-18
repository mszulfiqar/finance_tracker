import { AppError } from "../utils/errorMiddleware.js";
import prisma from "../utils/prisma.js"

export const createTransaction = async (req, res,next) => {
    const { title, amount, category, type, description, date } = req.body;
    console.log(title)
    if (!title || !amount || !category || !type || !date || !description) {
        throw new AppError("Please fill the form", 400)
    }
    try {
        await prisma.transaction.create({
            data: {
                title:title,
                description,
                date:new Date(date),
                type,
                category,
                amount
            }
        });
        return res.status(200).json({message:"Transcation created!"})
    } catch (error) {
        next(error)
    }
}

export const getTransactions = async (req,res, next) => {
    try {
        const transactions = await prisma.transaction.findMany()
        return res.json({transactions:transactions})
    } catch (error) {
        next(error)
    }
}