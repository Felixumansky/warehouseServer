import { Request, Response, NextFunction } from "express";
import Item from "../models/itemModel";
import { uploadToCloudinary } from "../utils/cloudinary";
import { RequestHandler } from "express";
import fs from "fs";

// GET /api/items
export const getItems = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.query.userId as string;
		if (!userId) {
			res.status(404).json({ message: "User not found" });
			return; // ← return void, don’t return the `res` call
		}
		const items = await Item.find({ userId });
		res.json(items);
	} catch (err) {
		next(err);
	}
};

// GET /api/items/:id
export const getItemById: RequestHandler = async (req, res, next) => {
	try {
		const item = await Item.findById(req.params.id);
		if (!item) {
			res.status(404).json({ message: "Item not found" });
			return; // ← return void, don’t return the `res` call
		}
		res.json(item); // ← final `res.json` also returns a Response, but we don’t return it
	} catch (err) {
		next(err);
	}
};

// POST /api/items
export const createItem = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		let imageUrl = "";
		if (req.file) {
			imageUrl = await uploadToCloudinary(req.file.path);
			// מחיקת הקובץ המקומי אחרי ההעלאה
			fs.unlinkSync(req.file.path);
		}

		const newItem = new Item({
			name: req.body.name,
			quantity: req.body.quantity,
			description: req.body.description,
			imageUrl: imageUrl,
			location: req.body.location,
			userId: req.body.userId,
		});

		const savedItem = await newItem.save();
		res.status(201).json(savedItem);
	} catch (err) {
		next(err);
	}
};

// PUT /api/items/:id
export const updateItem: RequestHandler = async (req, res, next) => {
	try {
		const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		if (!updatedItem) {
			res.status(404).json({ message: "Item not found" });
			return; // just return void, don't return the result of res.status(...)
		}

		res.json(updatedItem);
	} catch (err) {
		next(err);
	}
};

// DELETE /api/items/:id
export const deleteItem: RequestHandler = async (req, res, next) => {
	try {
		const deletedItem = await Item.findByIdAndDelete(req.params.id);
		if (!deletedItem) {
			res.status(404).json({ message: "Item not found" });
			return; // void return after sending response
		}

		res.json({ message: "Item deleted" });
	} catch (err) {
		next(err);
	}
};
