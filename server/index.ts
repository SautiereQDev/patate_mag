import express from 'express';
import { connectDB } from './database';
import articleRoutes from './routes/articles';

const app = express();
const PORT = process.env.PORT ?? 5000;

// Middleware
app.use(express.json());

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