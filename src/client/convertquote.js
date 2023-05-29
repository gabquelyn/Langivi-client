import AWS from "aws-sdk";
import sendResponse from "../../lib/sendResponse";
import { put } from "../../lib/actions";
const dynamodb = new AWS.DynamoDB.DocumentClient();
async function convert(event, context) {
  const user = event.requestContext.authorizer.jwt.claims.username;
  const { dummyId } = JSON.parse(event.body);

  const quote_result = await dynamodb
    .get({
      TableName: process.env.DUMMYORDERS_TABLE,
      Key: { id: dummyId },
    })
    .promise();

  if (quote_result.Item.length === 0) {
    return sendResponse(404, { message: "Quote not found" });
  }

  const order_details = {
    ...quote_result.Item,
    catTools: "false",
    translation_due: "",
    proofreading_due: "",
    order_due: "",
    owner: user,
    cancelled: "false",
    paid: 0,
    translator: "null",
    proofreader: "null",
    standing: "unapproved",
    mandate_proofread: "true",
    allow_automatic: "false",
    translator_file_url: [],
    mate_data:{},
    proofreader_file_url: [],
    translator_request: {
      translator_notes: "",
      admin_notes: "",
    },
  };

  const result = await put(process.env.ORDERS_TABLE, order_details);
  if (result.error) {
    return sendResponse(501, { message: result.error.message });
  }
}

export const handler = convert;
