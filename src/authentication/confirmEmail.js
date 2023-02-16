import AWS from "aws-sdk"
const dynamodb = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();
async function confirm_email(event, context){
    let data;
    const {token, email} = JSON.parse(event.body);

    try{
        const result = await dynamodb.get({
            TableName: process.env.CLIENT_TABLE,
            Key: {email}
        }).promise()
        data = result.Item;
    }catch(err){
        console.error(err)
        return{
            statusCode: 501,
            body: JSON.stringify({message: err.message})
        }
    }

    if(data.authToken == token){
        const params = {
            UserPoolId: process.env.USER_POOL_ID,
            Username: email,
            UserAttributes: [
                {
                    Name: 'email_verified',
                    Value: 'true'
                }
            ]
        }

        const _params = {
            Password: data.password,
            UserPoolId: process.env.USER_POOL_ID,
            Username: email,
            Permanent: true
        }

        const updateParams = {
            TableName: process.env.CLIENT_TABLE,
            Key: email,
            UpdateExpression: "set #token = :n",
            ExpressionAttributeValues: {
                ':n' : "null"
            },
            ExpressionAttributeNames: {
                '#token' : 'authToken'
            },
            ReturnValues: "ALL_NEW"
        }

        try{
           await cognito.adminUpdateUserAttributes(params).promise();
           await cognito.adminSetUserPassword(_params).promise();
           const result = await dynamodb.update(updateParams).promise()
           console.log(result);
           return{
            statusCode: 200,
            body: JSON.stringify({message: 'Email verified successfully'})
           }
        }catch(err){
            console.error(err.stack);
            return{
                statusCode: 501,
                body: JSON.stringify({message: err.stack})
            }
        }
    }else{
        return {
            statusCode: 404,
            body: JSON.stringify({message: "Incorrect authentication code"})
        }
    }
}


export const handler = confirm_email