// @ts-ignore
import { get} from "../../lib/actions";
import sendResponse from "../../lib/sendResponse";
import util from 'util'
import Iyzipay from "iyzipay";
const iyzipay = new Iyzipay({
  apiKey: process.env.API_KEY,
  secretKey: process.env.SECRET_KEY,
  uri: process.env.URI,
});

async function initializeCheckout(event, context) {
  const { orderId } = event.pathParameters;
  const ipAddress = event.requestContext.http.sourceIp
  const order_result = await get(process.env.ORDERS_TABLE, { id: orderId });
  if (!order_result.data) {
    return sendResponse(404, {
      message: `order with id: ${orderId} not found`,
    });
  }

  if (order_result.data.cancelled === "true") {
    return sendResponse(405, { message: "Ooops!, Offer has been rejected." });
  }

  if (order_result.data.paid === 1) {
    return sendResponse(405, {
      message: `order with id: ${orderId} is already paid for`,
    });
  }

  if (order_result.data.standing !== "awaiting payment") {
    return sendResponse(405, {
      message: "Payment has not been requested for yet!",
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

  const { cost, subject, id } = order_result.data;
  const { firstname, phone, addressline, lastname} =
    user_result.data.profile;
    const total = +cost + 0.5
    var request = {
      locale: Iyzipay.LOCALE.EN,
      conversationId: id,
      price: cost,
      paidPrice: total,
      currency: Iyzipay.CURRENCY.TRY,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      callbackUrl: `https://bbp5cz0pc9.execute-api.us-east-1.amazonaws.com/retrieve/${id}`,
      buyer: {
          id: 'BY789',
          name: firstname,
          surname: lastname,
          gsmNumber: phone,
          email: user_result.data.email,
          identityNumber: phone,
          registrationAddress: addressline,
          ip: ipAddress,
          city: 'Istanbul',
          country: 'Turkey',
      },
      // shippingAddress: {
      //     contactName: 'Jane Doe',
      //     city: 'Istanbul',
      //     country: 'Turkey',
      //     address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
      //     zipCode: '34742'
      // },
      billingAddress: {
          contactName: 'Languvi Limited',
          city: 'Ankara',
          country: 'Turkey',
          address: 'Languvi Ltd. Turgutlu St. No: 10, Ankara, Turkey',
          zipCode: '34742'
      },
      basketItems: [
          {
              id: `translation_${id}`,
              name: subject,
              category1: 'Collectibles',
              category2: 'Documents',
              itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
              price: cost
          },
      ]
    };

function initializeCheckoutForm(request, callback) {
  iyzipay.checkoutFormInitialize.create(request, callback);
}

const promisifiedInitializeCheckoutForm = util.promisify(initializeCheckoutForm);

  try {
    const result = await promisifiedInitializeCheckoutForm(request);
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: result,
      }),
    };
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal Server Error',
      }),
    };
  }
}

export const handler = initializeCheckout;
