import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';

export const validateRequest =
	(schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				res.status(400).json({ error: error.errors });
			} else {
				res.status(400).json({ error: 'Unknown error' });
			}
		}
	};
