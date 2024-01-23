const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");

const { REGION, TABLE_NAME } = require('../constants');

const ddbClient = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(ddbClient);

const getMovieById = async (event) => {

    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: Number(event.pathParameters.id),
        },
    };

    try {
        const data = await docClient.send(new GetCommand(params));
        if (!data.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Movie not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data.Item),
        };
    } catch (error) {
        console.error("Error getting movie by ID:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not fetch movie' }),
        };
    }
};

module.exports = { getMovieById };