const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { REGION, TABLE_NAME } = require('../constants');

const ddbClient = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(ddbClient);

const getAllMovies = async () => {
    const params = {
        TableName: TABLE_NAME
    };

    try {
        const data = await docClient.send(new ScanCommand(params));
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items.map(movie => {
                return {
                    id: movie.id,
                    title: movie.title,
                    year: movie.year,
                    overview: movie.overview,
                    vote_average: movie.vote_average,
                    poster_path: `https://image.tmdb.org/t/p/w45${movie.poster_path}`,
                }
            }))
        };
    } catch (error) {
        console.error("Error getting all movies:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not fetch movies' })
        };
    }
};

module.exports = { getAllMovies };