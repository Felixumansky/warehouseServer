import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
	name: string;
	quantity: number;
	description?: string;
	imageUrl?: string;
	location: string;
	userId: string;
}

const itemSchema = new Schema<IItem>({
	name: { type: String, required: true },
	quantity: { type: Number, required: true },
	description: { type: String },
	imageUrl: { type: String },
	location: { type: String, required: true },
	userId: { type: String, required: true },
});

export default mongoose.model<IItem>("Item", itemSchema);
