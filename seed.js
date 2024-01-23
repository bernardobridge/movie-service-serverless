const AWS = require('aws-sdk');
const { REGION, TABLE_NAME } = require('./constants');

const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: REGION });
const movies = require('./tmdb_movies.json');

async function uploadMovie(movie) {
    const params = {
        TableName: TABLE_NAME,
        Item: movie,
    };

    try {
        await dynamoDb.put(params).promise();
        console.log(`Movie added: ${movie.title}`);
    } catch (error) {
        console.error(`Error adding movie: ${movie.title}`, error);
    }
}

async function uploadAllMovies() {
    for (const movie of movies) {
        await uploadMovie(movie);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

uploadAllMovies().then(() => console.log('All movies uploaded'));