export class AppError extends Error {
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode
    }
}



export const errorMiddleware =  (err,req,res,next) => {
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || "Server is down";
    return res.json({errorStatus:errorStatus,errorMessage:errorMessage})
}