import axios from "axios";
import {PAYPAL_API, HOST, PAYPAL_API_CLIENT, PAYPAL_API_SECRET} from "../config.js";

/**
 * The function creates a PayPal order with a specified amount and application context, and returns the
 * order data.
 * @param _req - This parameter represents the request object in an Express route handler function. It
 * contains information about the incoming HTTP request such as headers, query parameters, and request
 * body.
 * @param res - `res` is the response object that will be sent back to the client making the request.
 * It contains methods to send the response back to the client, such as `json()` to send a JSON
 * response, `send()` to send a plain text response, and `status()` to set the HTTP
 * @returns a JSON response containing the data returned from the PayPal API after creating a new
 * order. If there is an error, it will return a 500 status code with the message "Something goes
 * wrong".
 */
export const createOrder = async (_req, res) => {
  try {
    /* This code block is creating an object called `order` that contains information about the
    purchase units and application context for a PayPal order. The `intent` property is set to
    "CAPTURE", which means that the payment will be immediately captured when the order is created.
    The `purchase_units` array contains an object with information about the amount and currency
    code for the purchase. The `application_context` object contains information about the branding,
    landing page, user action, and return/cancel URLs for the PayPal checkout flow. The values for
    `brand_name`, `return_url`, and `cancel_url` are set using the `HOST` variable from the
    `config.js` file. */
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "105.70",
          },
        },
      ],
      application_context: {
        brand_name: `${HOST}`,
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${HOST}/capture-order`,
        cancel_url: `${HOST}/cancel-payment`,
      },
    };

    /* This code block is creating a new instance of the `URLSearchParams` object and assigning it to
    the constant variable `params`. The `URLSearchParams` object provides a way to construct and
    manipulate the query string parameters of a URL. */
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    /* This code block is making a POST request to the PayPal API to obtain an access token for the
    application to use in subsequent API requests. The response from the API contains an object with
    a `data` property, which contains the access token. The code is using destructuring assignment
    to extract the `access_token` property from the `data` object and assign it to a constant
    variable with the same name. The access token is then used in the headers of the subsequent API
    request to create a new PayPal order. */
    const {
      data: {access_token},
    } = await axios.post("https://api-m.sandbox.paypal.com/v1/oauth2/token", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_SECRET,
      },
    });

    /* This code block is making a POST request to the PayPal API to create a new order with the
    specified `order` object and authorization token in the headers. The `PAYPAL_API` variable
    contains the base URL for the PayPal API, and the `/v2/checkout/orders` endpoint is used to
    create a new order. The `access_token` is included in the `Authorization` header using the
    `Bearer` scheme. The response from the API is assigned to the `response` constant variable. */
    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log(response.data);

    return res.json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something goes wrong");
  }
};

/**
 * This function captures a PayPal order using a provided token and redirects to a "payed" page upon
 * success.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, query parameters, and request body.
 * @param res - `res` is the response object that is sent back to the client after the function is
 * executed. It contains information such as the status code, headers, and body of the response. In
 * this case, the function is redirecting the client to the "/payed" page after successfully capturing
 * the order
 * @returns If the captureOrder function is successful, it will redirect the user to the "/payed" page.
 * If there is an error, it will return a JSON object with a message property of "Internal Server
 * error" and a status code of 500.
 */
export const captureOrder = async (req, res) => {
  const {token} = req.query;

  try {
    /* This code block is making a POST request to the PayPal API to capture a previously created order
    using the provided `token`. The `PAYPAL_API` variable contains the base URL for the PayPal API,
    and the `/v2/checkout/orders//capture` endpoint is used to capture the order. The `auth`
    object is included in the request headers to authenticate the request using the
    `PAYPAL_API_CLIENT` and `PAYPAL_API_SECRET` credentials. The response from the API is assigned
    to the `response` constant variable. */
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );

    console.log(response.data);

    res.redirect("/payed");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({message: "Internal Server error"});
  }
};

export const cancelPayment = (req, res) => res.redirect("/");
