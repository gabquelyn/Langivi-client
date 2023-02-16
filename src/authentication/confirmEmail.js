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
        data = result;
    }catch(err){
        console.error(err)
        return{
            statusCode: 501,
            body: JSON.stringify({message: err.message})
        }
    }
    if(data.Authtoken == token){
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
        try{
           await cognito.adminUpdateUserAttributes(params).promise()
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
            message: JSON.stringify({message: "Incorrect authentication code"})
        }
    }
}


export const handler = confirm_email