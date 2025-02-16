import { Router } from 'express';
import { ImageController } from '../controllers/ImageController';
import { uploadMiddleware } from '../middlewares/uploadMiddleware';

const router = Router();

/**
 * - "image" correspond au nom du champ attendu dans le formulaire
 *   (ex: <input type="file" name="image" />)
 */
router.post('/upload', uploadMiddleware.single('image'), ImageController.uploadImage);

export default router;
