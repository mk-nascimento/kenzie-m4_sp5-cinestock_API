import express, { Application, json } from 'express';
import 'reflect-metadata';
import * as routers from './routers';

const app: Application = express();
app.use(json());

app.use('/route', routers.movieRouter);

export default app;
