import AWS from 'aws-sdk'
import sendResponse from '../../lib/sendResponse';
const dynamodb = new AWS.DynamoDB.DocumentClient();
async function get_orders(event, context){
  const user = event.requestContext.authorizer.jwt.claims.username;
  const params = {
    TableName: process.env.ORDERS_TABLE,
    IndexName: 'clientOrders',
    KeyConditionExpression: '#owner = :owner',
    ExpressionAttributeNames: {
        '#owner' : 'owner'
    },
    ExpressionAttributeValues: {
        ":owner" : user
    }
  }
    try{
      const result = await dynamodb.query(params).promise();
        return sendResponse(200, {message: result.Items})
    }catch(err){
        console.error(err)
        return sendResponse(501, {message: err.message})
    }
}

export const handler = get_orders