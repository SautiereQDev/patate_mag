import {app} from './app';
import { connectDB } from './database';

const PORT = process.env.PORT ?? 3000;

connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error('Failed to connect to the database', error);
	});
