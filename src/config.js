import "dotenv/config";
/* This code is exporting constants that are used to configure a PayPal API client. The constants are
retrieving values from environment variables using the `process.env` object. The
`PAYPAL_API_CLIENT`, `PAYPAL_API_SECRET`, and `PAYPAL_API` constants are used to store the client
ID, secret key, and API endpoint URL for the PayPal API. The `PORT` constant is used to store the
port number for the server, and the `HOST` constant is used to store the host URL for the server,
which is either the production host or the local host depending on the `NODE_ENV` environment
variable. */
export const PAYPAL_API_CLIENT = process.env.CLIENT;
export const PAYPAL_API_SECRET = process.env.SECRET;
export const PAYPAL_API = process.env.PAYPAL_API;

/* These lines of code are exporting two constants `PORT` and `HOST`. */
export const PORT = process.env.PORT || 3000;
export const HOST = process.env.NODE_ENV === "production" ? process.env.HOST : "http://localhost:" + PORT;
