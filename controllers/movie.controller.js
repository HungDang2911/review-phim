const model = require('../models/movie.model');

module.exports.getMovie = async (req, res) => {
    const movieId = req.params.id;
    const [[movie],] = await model.getById(movieId);
    const [actors,] = await model.getActorsByMovieId(movieId);
    const [directors,] = await model.getDirectorsByMovieId(movieId);

    res.render('movie', {movie, actors, directors});
}