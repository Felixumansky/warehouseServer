import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(err);
	res.status(500).json({ message: err.message || "Server Error" });
};

export default errorMiddleware;
