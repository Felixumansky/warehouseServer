import express from "express";
import multer from "multer";
import {
	getItems,
	getItemById,
	createItem,
	updateItem,
	deleteItem,
} from "../controllers/itemController";
import { scanItems } from "../controllers/itemScanController";
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getItems);
router.get("/:id", getItemById);
router.post("/", upload.single("image"), createItem);
//router.post("/", createItem);
router.post("/scan", upload.single("image"), scanItems);

router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
