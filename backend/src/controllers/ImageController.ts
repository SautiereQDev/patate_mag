import { Request, Response, NextFunction } from 'express';
import { ImageService } from '../services/imageService';

export class ImageController {
	public static async uploadImage(req: Request, res: Response, next: NextFunction) {
		try {
			// `req.file` est ajouté par Multer si la route utilise `uploadMiddleware.single(...)`
			if (!req.file) {
				return res.status(400).json({ message: 'Aucune image reçue.' });
			}

			const fileInfo = await ImageService.processUploadedFile(req.file);
			return res.status(201).json({
				message: 'Image uploadée avec succès !',
				data: fileInfo,
			});
		} catch (error) {
			next(error);
		}
	}
}
