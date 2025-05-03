import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import itemRoutes from "./routes/itemRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

mongoose
	.connect(process.env.MONGO_URI || "")
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB error:", err));
app.get("/", (req, res) => {
	res.send("API is running!");
});
app.use("/api/items", itemRoutes);

app.use(errorMiddleware);

export default app;
