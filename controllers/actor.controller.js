const model = require('../models/actor.model');

module.exports.getActor = async (req, res) => {
  const actorId = req.params.id;
  const [[actor]] = await model.getById(actorId);
  const [movies] = await model.getMovieByActorId(actorId);
  
  res.render('actor', {actor, movies});
}
