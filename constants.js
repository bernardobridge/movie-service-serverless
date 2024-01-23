const SERVICE_NAME = "movies-service";
const REGION = process.env.DEPLOYMENT_REGION || "eu-west-2";

if(!process.env.DDB_TABLE_NAME || (!process.env.SERVICE_NAME && !process.env.ENVIRONMENT)) {
    throw new Error('TABLE_NAME environment variable not set');
}

const TABLE_NAME = process.env.DDB_TABLE_NAME || `${SERVICE_NAME}-${ENVIRONMENT}`;

module.exports = {
    REGION,
    TABLE_NAME,
}