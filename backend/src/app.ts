import express, {Application, Request, Response} from 'express';
import articleRoutes from './routes/articlesRoutes';
import imageRoutes from './routes/imagesRoutes';

export const app: Application = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/patate-mag/articles', articleRoutes);
app.use('/patate-mag/images', imageRoutes);

app.use((err: Error, req: Request, res: Response) => {
	console.error('Erreur : ', err.message);
	res.status(500).json({error: err.message});
});

export default app;