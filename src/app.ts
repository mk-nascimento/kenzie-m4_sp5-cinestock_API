import express, { Application, json } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import * as routers from './routers';
import * as err from './error';

const app: Application = express();
app.use(json());

app.use('/movies', routers.movieRouter);

app.use(err.handleError);

export default app;
