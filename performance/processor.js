let movies;

function getRandomMovieId(req, res, context, ee, next) {
    if (!movies) {
        movies = JSON.parse(res.body);
    }

    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    context.vars.movieId = randomMovie.id;
    next();
};

module.exports = {
    getRandomMovieId
}

