const AWS = require('aws-sdk');
const { REGION, TABLE_NAME } = require('./constants');

const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: REGION });
const movies = require('./tmdb_movies.json');

async function uploadMoviesBatch(moviesBatch) {
    const params = {
        RequestItems: {
            [TABLE_NAME]: moviesBatch.map(movie => ({
                PutRequest: {
                    Item: movie,
                },
            })),
        },
    };

    try {
        await dynamoDb.batchWrite(params).promise();
        const movieTitles = moviesBatch.map(movie => movie.title);
        console.log(`Movies batch added:`, movieTitles);
    } catch (error) {
        console.error('Error adding movies batch', error);
    }
}

async function uploadAllMovies() {
    const BATCH_SIZE = 25;
    for (let i = 0; i < movies.length; i += BATCH_SIZE) {
        const moviesBatch = movies.slice(i, i + BATCH_SIZE);
        await uploadMoviesBatch(moviesBatch);
        await new Promise(resolve => setTimeout(resolve, 100)); // Throttling
    }
}

uploadAllMovies().then(() => console.log('All movies uploaded'));