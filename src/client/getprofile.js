import { get } from "../../lib/actions";
import sendResponse from "../../lib/sendResponse";
const tableName = process.env.CLIENT_TABLE
async function profile(event, context){
  const user = event.requestContext.authorizer.jwt.claims.username

  const result = await get(tableName, {email: user})
  if(result.error){
    return sendResponse(404, {message: "User not found!"})
  }
  return {
    statusCode: 200,
    body: JSON.stringify({message: result.data.profile}),
  };
}


export const handler = profile