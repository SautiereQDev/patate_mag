import express from 'express';
import { z } from 'zod';
import { validateRequest } from '../middlewares/validRequest';
import ArticleController from '../controllers/ArticleController';

const router = express.Router();

const articleSchema = z.object({
	title: z.string().min(3, 'Le titre est requis'),
	excerpt: z.string().min(3, "L'extrait est requis"),
	content: z.string().min(3, 'Le contenu est requis'),
	image: z.string().url("L'URL de l'image doit être valide"),
	author: z.string().min(3, "L'auteur est requis"),
});

// Create a new article
router.post('/', validateRequest(articleSchema), ArticleController.createArticle);

// Get all articles
router.get('/', ArticleController.getAllArticles);

// Get a single article by ID
router.get('/:id', ArticleController.getArticleById);

// Update an article by ID
router.put('/:id', validateRequest(articleSchema), ArticleController.updateArticle);

// Delete an article by ID
router.delete('/:id', ArticleController.deleteArticle);

export default router;
