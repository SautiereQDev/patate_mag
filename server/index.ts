import express from 'express';
import { connectDB } from './database';
import articleRoutes from './routes/articles';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT ?? 5000;

const corsOptions = {
  origin: '*', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.get('/', articleRoutes);

app.get('/:id', articleRoutes);

app.post('/', articleRoutes);

app.put('/', articleRoutes);

app.delete('/:id', articleRoutes);

// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database', error);
  });
