import AWS from 'aws-sdk'
import sendResponse from '../../lib/sendResponse'
const dynamodb = new AWS.DynamoDB.DocumentClient();
async function get_pair_cost(event, context){
const {from , to} = JSON.parse(event.body);
const source = from.toLowerCase();
const target = to.toLowerCase();
 const params = {
    TableName: process.env.LANGUAGE_PAIR_TABLE,
    FilterExpression: "#source = :s AND #target = :t",
    ExpressionAttributeValues: {
        ':s' : source,
        ':t' : target
    },
    ExpressionAttributeNames: {
        "#source" : 'source',
        '#target' : 'target'
    }
 }

 try{
    const result = await dynamodb.scan(params).promise();
    if(result.Items.length === 0){
     return sendResponse(404, {message: "Pair not found"})
    }
    return sendResponse(200, {cost: result.Items[0].cost})
 }catch(err){
     console.log(err)
    return sendResponse(501, {message: err.message})
 }
}

export const handler = get_pair_cost