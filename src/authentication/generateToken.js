import token from "../../lib/accessToken";
import AWS from 'aws-sdk'
import { update } from "../../lib/actions";
import sendResponse from "../../lib/sendResponse";
AWS.config.update({region: 'us-east-1'})
const sqs = new AWS.SQS();
async function sendToken(event, context){
    const {email} = JSON.parse(event.body)
    const accessToken = token(5);
    const tableName = process.env.CLIENT_TABLE
    const params  = {
        TableName: tableName,
        Key: {email},
        UpdateExpression: 'set #token = :t',
        ExpressionAttributeValues: {
            ':t' : accessToken
        },
        ExpressionAttributeNames: {
            '#token' : 'authToken'
        }
    }

    const email_params = {
        QueueUrl: process.env.MAIL_QUEUE_URL,
        MessageBody: JSON.stringify({
            subject: 'Verify your email address',
            body: `Your email verification code is ${accessToken}`,
            recipient: email
        })
    }

    const result = await update(params);
    if(result.error){
        return sendResponse(501, {message: result.error.message})
    }


    try{
        const output = await sqs.sendMessage(email_params).promise()
        console.log(output);
    }catch(err){
        console.error(err)
        return sendResponse(501, {messgae: err.message});
    }

}

export const handler = sendToken;