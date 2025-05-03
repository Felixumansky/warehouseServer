import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient();

export const analyzeImage = async (imageUrl: string): Promise<string[]> => {
	const [result] = await client.labelDetection(imageUrl);
	const labels = (result.labelAnnotations ?? [])
		.filter((label) => label.description)
		.map((label) => label.description!.toLowerCase());
	return labels;
};
