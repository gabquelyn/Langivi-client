import token from "../../lib/accessToken";
import AWS from 'aws-sdk'
const dynamodb = AWS.DynamoDB.DocumentClient();
const sqs = new AWS.SQS();
async function sendToken(event, context){
    const {email} = JSON.parse(event.body)
    const accessToken = token(5);
    const params  = {
        TableName: tableName,
        Key: {email},
        UpdateExpression: 'set #token = :t',
        ExpressionAttributeValues: {
            ':t' : accessToken
        },
        ExpressionAttributeNames: {
            '#token' : 'token'
        }
    }

    try{
        const result = await dynamodb.update(params).promise();
        console.log(result);
    }catch(err){
        console.error(err)
    }
    
    //send the eamil and delete the accessToken after 2 hours
    const sendToken = sqs.sendMessage({
        QueueUrl: process.env.MAIL_QUEUE_URL,
        MessageBody: JSON.stringify({
            subject: 'Verify Email Address',
            body: `Your email verification code is ${accessToken}, it experies in 3 hours`,
            recipient: email,
        }),
    }).promise()

    setTimeout(async() => {
        const params  = {
            TableName: tableName,
            Key: {email},
            UpdateExpression: 'set #token = :t',
            ExpressionAttributeValues: {
                ':t' : "null"
            },
            ExpressionAttributeNames: {
                '#token' : 'token'
            }
        }
        try{
            const result = await dynamodb.update(params).promise();
            console.log(result);
        }catch(err){
            console.error(err)
        }
        
    }, 2 * 60 * 60 * 1000);
}

export const handler = sendToken;