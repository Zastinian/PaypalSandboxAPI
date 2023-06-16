import "dotenv/config";
export const PAYPAL_API_CLIENT = process.env.CLIENT;
export const PAYPAL_API_SECRET = process.env.SECRET;
export const PAYPAL_API = process.env.PAYPAL_API;

export const PORT = process.env.PORT || 3000;
export const HOST = process.env.NODE_ENV === "production" ? process.env.HOST : "http://localhost:" + PORT;
