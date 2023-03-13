import AWS from 'aws-sdk'
import sendResponse from '../../lib/sendResponse';
const dynamodb = new AWS.DynamoDB.DocumentClient();
async function get_package(event, context){
    let data
        try{
            const result = await dynamodb.get({
                TableName: process.env.SERVICE_TABLE,
                Key: {id: "service"}
            }).promise()
            data = result.Item
        }catch(err){
            console.error(err)
            return sendResponse(501, {message: err.message})
        }
        
    return sendResponse(200, {message: data})
}

export const handler = get_package


