import { z } from 'zod';
import * as schemas from '../schemas';

export type TMovie = z.infer<typeof schemas.movie>;
