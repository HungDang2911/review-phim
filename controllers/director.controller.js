const model = require('../models/director.model');

module.exports.getDirector = async (req, res) => {
  const directorId = req.params.id;
  const [[director]] = await model.getById(directorId);
  const [movies] = await model.getMovieByDirectorId(directorId);
  
  res.render('director', {director, movies});
}
