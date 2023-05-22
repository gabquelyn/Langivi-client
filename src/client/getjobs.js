import AWS from "aws-sdk";
import sendResponse from "../../lib/sendResponse";
const dynamodb = new AWS.DynamoDB.DocumentClient();
async function getjobs(event, context) {
  const user = event.requestContext.authorizer.jwt.claims.username;

  const params = {
    TableName: process.env.ORDERS_TABLE,
    IndexName: "clientOrders",
    KeyConditionExpression: "#owner = :owner",
    ExpressionAttributeNames: {
      "#owner": "owner",
    },
    ExpressionAttributeValues: {
      ":owner": user,
    },
  };

 const ALL = await dynamodb.query(params).promise();
  
  const translated_jobs = ALL.Items.filter(
    (job) => job.standing === "translating" && job.cancelled !== "true"
  );

 const proofread_jobs = ALL.Items.filter(
    (job) => job.standing === "proofreading" && job.cancelled !== "true"
  );


  const revision_jobs = ALL.Items.filter(
    (job) => job.standing === "revision" && job.cancelled !== "true"
  );

  const completed_jobs = ALL.Items.filter(
    (job) => job.standing === "completed" && job.cancelled !== "true"
  );

 return sendResponse(200, {translated_jobs, proofread_jobs, revision_jobs, completed_jobs})
}

export const handler = getjobs;
