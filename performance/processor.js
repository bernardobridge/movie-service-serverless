const moviesData = require('../tmdb_movies.json');

function myBeforeScenarioHandler(context, ee, next) {
    const randomMovie = moviesData[Math.floor(Math.random() * moviesData.length)];

    context.vars.movieId = randomMovie.id;

    next();
};

module.exports = {
    myBeforeScenarioHandler
}