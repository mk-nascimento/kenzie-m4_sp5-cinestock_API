import { Router } from 'express';
import * as mw from '../middlewares';
import * as schemas from '../schemas';
import * as ctrl from '../controllers';

const movieRouter: Router = Router();

movieRouter.post(
  '',
  mw.validateBody(schemas.movieRequest),
  mw.validateName,
  ctrl.createMovieController
);

movieRouter.get('', ctrl.readMoviesController);

export default movieRouter;
