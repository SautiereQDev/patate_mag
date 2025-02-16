import express, {Application, Request, Response} from 'express';
import articleRoutes from './routes/articlesRoutes';
import imageRoutes from './routes/imagesRoutes';
import cors from 'cors';

export const app: Application = express();

const corsOptions = {
	origin:
		process.env.NODE_ENV === 'development'
			? `http://localhost:${process.env.PORT}`
			: 'https://quentinsautiere.com',
	methods: 'GET,HEAD,PUT,POST,DELETE',
	credentials: true, // corrigé de widthCredentials
	optionsSuccessStatus: 204
};

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));

// Routes
app.use('/articles', articleRoutes);
app.use('/images', imageRoutes);

app.use((err: Error, req: Request, res: Response) => {
	console.error('Erreur : ', err.message);
	res.status(500).json({error: err.message});
});

export default app;