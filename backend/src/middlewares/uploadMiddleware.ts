import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// Configuration du stockage : ici, on enregistre les fichiers dans "uploads/"
const storage = multer.diskStorage({
	destination: (req: Request, file: Express.Multer.File, cb) => {
		cb(null, path.join(__dirname, '../../uploads'));
	},
	filename: (req: Request, file: Express.Multer.File, cb) => {
		// On peut générer un nom de fichier unique
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		const extension = path.extname(file.originalname);
		cb(null, file.fieldname + '-' + uniqueSuffix + extension);
	},
});

// Filtrage basique, par exemple : n'autoriser que les images
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
	if (file.mimetype.startsWith('image/')) {
		cb(null, true); // on accepte le fichier
	} else {
		cb(new Error('Format de fichier non supporté : uniquement des images.'));
	}
};

export const uploadMiddleware = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 }, // limite de 5MB pour l'exemple
});
