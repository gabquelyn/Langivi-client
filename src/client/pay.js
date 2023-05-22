// @ts-ignore
import { get, update } from "../../lib/actions";
import sendResponse from "../../lib/sendResponse";
import Iyzipay from "iyzipay";
const iyzipay = new Iyzipay({
  apiKey: process.env.API_KEY,
  secretKey: process.env.SECRET_KEY,
  uri: process.env.URI,
});

async function makepayment(event, context) {
  // const user = event.requestContext.authorizer.jwt.claims.username
  const { cardHolderName, cardNumber, expireMonth, expireYear, cvc } =
    JSON.parse(event.body);
  const { orderId } = event.pathParameters;
  const order_result = await get(process.env.ORDERS_TABLE, { id: orderId });

  //  Check for a unique order
  if (order_result.error) {
    return sendResponse(501, { message: order_result.error.message });
  }
  if (!order_result.data) {
    return sendResponse(404, {
      message: `order with id: ${orderId} not found`,
    });
  }

  if (order_result.data.standing !== "awaiting payment") {
    return sendResponse(405, {
      message: "Payment has not been requested for yet!",
    });
  }

  if (order_result.data.cancelled === "true") {
    return sendResponse(405, { message: "Ooops!, Offer has been rejected." });
  }

  if (order_result.data.paid === 1) {
    return sendResponse(200, {
      message: `order with id: ${orderId} is already paid for`,
    });
  }

  const user_result = await get(process.env.CLIENT_TABLE, {
    email: order_result?.data?.owner,
  });

  // Check for a unique user
  if (!user_result.data) {
    return sendResponse(404, {
      message: `user with email: ${user_result.data.email} not found`,
    });
  }
  if (user_result.error) {
    return sendResponse(501, { message: order_result.error.message });
  }

  // check if it has been paid for already

  const { cost, subject, meta_data } = order_result.data;
  const { firstname, phone, addressline, lastname } = user_result.data.profile;
  // // process the payment

  var request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: "123456789",
    price: "1",
    paidPrice: "1.2",
    currency: Iyzipay.CURRENCY.TRY,
    basketId: "B67832",
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: "https://www.merchant.com/callback",
    enabledInstallments: [2, 3, 6, 9],
    buyer: {
      id: "BY789",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905350000000",
      email: "email@email.com",
      identityNumber: "74300864791",
      lastLoginDate: "2015-10-05 12:43:35",
      registrationDate: "2013-04-21 15:12:09",
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "Jane Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      zipCode: "34742",
    },
    billingAddress: {
      contactName: "Jane Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      zipCode: "34742",
    },
    basketItems: [
      {
        id: "BI101",
        name: "Binocular",
        category1: "Collectibles",
        category2: "Accessories",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: "0.3",
      },
      {
        id: "BI102",
        name: "Game code",
        category1: "Game",
        category2: "Online Game Items",
        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
        price: "0.5",
      },
      {
        id: "BI103",
        name: "Usb",
        category1: "Electronics",
        category2: "Usb / Cable",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: "0.2",
      },
    ],
  };

  const paidAt = new Date();

  const translation_due = new Date(paidAt);
  translation_due.setDate(paidAt.getDate() + +meta_data.tdue);

  const proofreading_due = new Date(paidAt);
  proofreading_due.setDate(paidAt.getDate() + +meta_data.pdue + +meta_data.tdue);

  const total = +meta_data.tdue + +meta_data.pdue + +meta_data.odue;
  const order_due = new Date(paidAt);
  order_due.setDate(paidAt.getDate() + total);
  

  const params = {
    TableName: process.env.ORDERS_TABLE,
    Key: { id: orderId },
    UpdateExpression:
      "set #paid = :true, #t_due = :td, meta_data.payment_date = :pd, #o_due = :od, #state =:s, #p_due = :d",
    ExpressionAttributeValues: {
      ":true": 1,
      ":td": translation_due.toISOString(),
      ":pd": proofreading_due.toISOString(),
      ":od": order_due.toISOString(),
      ":s": "unassigned translation",
      ":d": paidAt.toISOString(),
    },
    ExpressionAttributeNames: {
      "#paid": "paid",
      "#t_due": "translation_due",
      "#p_due": "proofreading_due",
      "#o_due": "order_due",
      "#state": "standing",
    },
  };

  let result
  try {
    result = await iyzipay.payment.create(request);
  } catch (err) {
    console.error(err);
    return sendResponse(501, { message: err.message });
  }

  const response = await update(params);
  if(response.error){
    return sendResponse(500, {error: response.error})
  }

  return sendResponse(200, {
    message: `order with id: ${orderId} is successfully paid for`, result
  });
}

export const handler = makepayment;

