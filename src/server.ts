import 'reflect-metadata';
import app from './app';
import 'dotenv/config';
import { dataSource } from './repositories/repos';

const PORT = process.env.PORT || 3000;

dataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error('TypeORM connection error: ', error));
