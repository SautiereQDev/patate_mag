import mongoose, { Document, Schema } from 'mongoose';

export interface IArticle extends Document {
	title: string;
	excerpt: string;
	content: string;
	image: string;
	author: string;
	date: string;
}

const ArticleSchema: Schema = new Schema(
	{
		title: { type: String, required: true },
		excerpt: { type: String, required: true },
		content: { type: String, required: true },
		image: { type: String, required: true },
		author: { type: String, required: true },
	},
	{ timestamps: true, collection: 'articles' }
);

export const Article = mongoose.model<IArticle>('Article', ArticleSchema);
