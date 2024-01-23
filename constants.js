const SERVICE_NAME = "movie-service";
const ENVIRONMENT = process.env.ENVIRONMENT || "dev";
const REGION = process.env.DEPLOYMENT_REGION || "eu-west-2";

module.exports = {
    SERVICE_NAME: 'movie-service',
    REGION,
    TABLE_NAME: process.env.DDB_TABLE_NAME || `${SERVICE_NAME}-${ENVIRONMENT}`,
//     TABLE_NAME,
}