// controllers/itemController.ts
import { RequestHandler } from "express";
import Item from "../models/itemModel";
import { uploadToCloudinary } from "../utils/cloudinary";
import { analyzeImage } from "../utils/vision";

// POST /api/items/scan
export const scanItems: RequestHandler = async (req, res, next) => {
	try {
		if (!req.file) {
			// send 400 and exit with void
			res.status(400).json({ message: "Image is required" });
			return;
		}

		// העלה את התמונה ל-Cloudinary
		const imageUrl = await uploadToCloudinary(req.file.path);

		// 🔥 קריאה ל-Vision API לזיהוי
		const labels = await analyzeImage(imageUrl);

		// 🔍 חפש את הפריטים במסד הנתונים לפי השמות שזוהו
		const matchedItems = await Item.find({ name: { $in: labels } });

		// מחזיר רק name, quantity, description
		const response = matchedItems.map((item) => ({
			name: item.name,
			quantity: item.quantity,
			description: item.description,
		}));

		// send JSON and exit with void
		res.json(response);
		return;
	} catch (err) {
		next(err);
	}
};
