export class ImageService {
	/**
	 * Traitement après l'upload (sauvegarde en base de données, etc.)
	 */
	public static async processUploadedFile(
		file: Express.Multer.File
	): Promise<{ path: string; filename: string; size: number }> {
		// Si nécessaire, on pourrait interagir ici avec une base de données
		// pour enregistrer le chemin, etc.

		return {
			path: file.path, // Chemin absolu où le fichier est stocké
			filename: file.filename, // Nom du fichier sauvegardé
			size: file.size, // Taille du fichier
		};
	}
}
