import express from 'express';

import {
  createEpisodeController,
  fetchEpisodeByDateRangeController,
  fetchEpisodeByDateController,
} from '../../controllers/queryingWithDateController';

const queryingWithDateRoute = express.Router();

queryingWithDateRoute.post('/create', createEpisodeController);
queryingWithDateRoute.get('/filter-by-date', fetchEpisodeByDateController);
queryingWithDateRoute.get(
  '/filter-by-date-range',
  fetchEpisodeByDateRangeController
);
export { queryingWithDateRoute };
