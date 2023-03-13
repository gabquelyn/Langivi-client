import AWS from 'aws-sdk'
import sendResponse from '../../lib/sendResponse'
const dynamodb = new AWS.DynamoDB.DocumentClient();
async function get_topic_cost(event, context){
const {topic} = JSON.parse(event.body);
const related_topic = topic.toLowerCase();
const params = {
    TableName: process.env.TOPICS_TABLE,
    FilterExpression: "topic = :t",
    ExpressionAttributeValues: {
      ":t": related_topic,
    },
  };

try{
   const result = await dynamodb.scan(params).promise();
   if(result.Items.length === 0){
    return sendResponse(404, {message: "Topic not found"})
   }
   const data = {
    unit: result.Items[0].unit,
    type: result.Items[0].type
   }
   return sendResponse(200, {message: data})
}catch(err){
    console.log(err)
   return sendResponse(501, {message: err.message})
}

}

export const handler = get_topic_cost