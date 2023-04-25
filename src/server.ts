import app from './app';
import AppDataSource from './data-source';

AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected', [console]);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  })
  .catch((err: any) => console.error(err));
