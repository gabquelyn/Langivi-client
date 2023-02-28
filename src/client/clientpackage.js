import AWS from 'aws-sdk'
import sendResponse from '../../lib/sendResponse';
const dynamodb = new AWS.DynamoDB.DocumentClient();
async function get_package(event, context){
    let data
    if(event.queryStringParameters){
        const {plan} = event.queryStringParameters;
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
        
        if(plan == 'basic'){
            return sendResponse(200, {message: data._package.basic})
        }else if(plan == 'premium'){
            return sendResponse(200, {message: data._package.premium})
        }else if(plan == 'professional'){
            return sendResponse(200, {message: data._package.professional})
        }else{
            return sendResponse(200, {message: data._additional_service})
        }
    }
    return sendResponse(200, {message: 'Choose a package in the query parameter!'})
}

export const handler = get_package


