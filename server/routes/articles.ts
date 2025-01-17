import express from 'express';
import { z } from 'zod';
import { Article } from '../models/Article';
import { validateRequest } from '../middleware/validRequest';

const router = express.Router();

const articleSchema = z.object({
  title: z.string().min(3, 'Le titre est requis'),
  excerpt: z.string().min(3, "L'extrait est requis"),
  content: z.string().min(3, 'Le contenu est requis'),
  image: z.string().url("L'URL de l'image doit être valide"),
  author: z.string().min(3, "L'auteur est requis"),
});

// Create a new article
router.post('/', validateRequest(articleSchema), async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ error: 'Failed to create trip' });
  }
});

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Get a single article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// Update an article by ID
router.put('/:id', validateRequest(articleSchema), async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// Delete an article by ID
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

export default router;
