const connection = require("../models/dbconnection");

module.exports.getMovieById = (req, res) => {
    const movieId = req.params.id;
    connection.query('SELECT `movieName`,`genre`,`releaseDate`,`movieTime`,`trailerLink`,`posterLink`,`imdb`,`rottenTomatoes`,`metacritic`,`movieDescription` FROM `movies` WHERE `movieId` = (?)', [movieId], function(err, results) {
        const movie = results[0];
        connection.query('SELECT actors.actorId,`actorName`,`imageLink` FROM `actors` LEFT JOIN `movies_actors` ON actors.actorId = movies_actors.actorId WHERE movies_actors.movieId = (?)', [movieId], function(err, results) {
            const actors = results;
            connection.query('SELECT directors.directorId,`directorName`,`imageLink` FROM `directors` LEFT JOIN `movies_directors` ON directors.directorId = movies_directors.directorId WHERE movies_directors.movieId = (?)', [movieId], function(err, results) {
                const directors = results;
                res.render('movie', {movie, actors, directors});
            })
        });
    })

    const movie = await connection.execute('SELECT `movieName`,`genre`,`releaseDate`,`movieTime`,`trailerLink`,`posterLink`,`imdb`,`rottenTomatoes`,`metacritic`,`movieDescription` FROM `movies` WHERE `movieId` = (?)', [movieId]);
    const actors = await connection.execute('SELECT actors.actorId,`actorName`,`imageLink` FROM `actors` LEFT JOIN `movies_actors` ON actors.actorId = movies_actors.actorId WHERE movies_actors.movieId = (?)', [movieId]);
    const directors = await connection.execute('SELECT directors.directorId,`directorName`,`imageLink` FROM `directors` LEFT JOIN `movies_directors` ON directors.directorId = movies_directors.directorId WHERE movies_directors.movieId = (?)', [movieId]);
    console.log({movie, actors, directors});
    res.render('movie', {movie, actors, directors});
};

module.exports.postCommentAboutMovie = (req, res) => {

};
