import { Request, Response } from 'express';
import { Article } from '../models/Article';

export class ArticleController {
	static async getAllArticles(_: any, res: Response): Promise<void> {
		try {
			const articles = await Article.find();
			res.status(200).json(articles);
		} catch (error) {
			res.status(500).json({ error: 'Failed to fetch articles' });
		}
	}
	static async createArticle(req: Request, res: Response): Promise<void> {
		try {
			const article = new Article(req.body);
			await article.save();
			res.status(201).json(article);
		} catch (error) {
			console.error('Error creating trip:', error);
			res.status(500).json({ error: 'Failed to create trip' });
		}
	}

	static async getArticleById(req: Request, res: Response): Promise<void> {
		try {
			const article = await Article.findById(req.params.id);
			if (!article) {
				res.status(404).json({ error: 'Article not found' });
			}
			res.status(200).json(article);
		} catch (error) {
			res.status(500).json({ error: 'Failed to fetch article' });
		}
	}

	static async updateArticle(req: Request, res: Response): Promise<void> {
		try {
			const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});
			if (!article) {
				res.status(404).json({ error: 'Article not found' });
			}
			res.status(200).json(article);
		} catch (error) {
			res.status(500).json({ error: 'Failed to update article' });
		}
	}

	static async deleteArticle(req: Request, res: Response): Promise<void> {
		try {
			const article = await Article.findByIdAndDelete(req.params.id);
			if (!article) {
				res.status(404).json({ error: 'Article not found' });
			}
			res.status(200).json({ message: 'Article deleted successfully' });
		} catch (error) {
			res.status(500).json({ error: 'Failed to delete article' });
		}
	}
}

export default ArticleController;
