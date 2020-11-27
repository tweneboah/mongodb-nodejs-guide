import expressAsyncHandler from 'express-async-handler';
import { Episode } from '../models/queryByDateModel/episodeModel';
import { Post } from '../models/PostsModel';

const createEpisodeController = expressAsyncHandler(async (req, res) => {
  try {
    const newEpisode = await Episode.create(req.body);
    res.status(200).json(newEpisode);
  } catch (error) {
    res.json(error);
  }
});

//Filter by date
const fetchEpisodeByDateController = expressAsyncHandler(async (req, res) => {
  try {
    const episodes = await Episode.find({
      aireAt: new Date(req.body.searchDate),
    });

    res.status(200).json(episodes);
  } catch (error) {
    res.status(500).json(error);
  }
});

//sort by date range
const fetchEpisodeByDateRangeController = expressAsyncHandler(
  async (req, res) => {
    try {
      const episodes = await Episode.find({
        aireAt: { $gte: req.body.from, $lte: req.body.to },
      }).sort({ aireAt: 1 });

      res.status(200).json(episodes);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export {
  createEpisodeController,
  fetchEpisodeByDateController,
  fetchEpisodeByDateRangeController,
};
