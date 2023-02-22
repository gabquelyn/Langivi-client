import sendResponse from "../../lib/sendResponse";
import multipart from 'lambda-multipart-parser'
async function createOrder(event, context) {
  const result = await multipart.parse(event)
  return sendResponse(200, {message: result})
}

export const handler = createOrder;
