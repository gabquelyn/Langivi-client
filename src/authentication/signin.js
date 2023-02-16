import AWS from "aws-sdk";
const UserPoolId = process.env.USER_POOL_ID
const ClientId = process.env.CLIENT_ID
const cognito = new AWS.CognitoIdentityServiceProvider();
export async function login(event, context){
    const {email, password} = JSON.parse(event.body);
    const params = {
        AuthFlow: "ADMIN_NO_SRP_AUTH",
        UserPoolId,
        ClientId,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password
        }
    }

    try{
        const response = await cognito.adminInitiateAuth(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Success',
                token: response.AuthenticationResult.IdToken
            })
        }
    }catch(err){
        console.error(err)
        return {
            statusCode: 501,
            body: JSON.stringify({
                message: err.message
            })
        }
    }
}

export const handler = login;