import {Router} from "express";
import {createOrder, captureOrder, cancelPayment} from "../controllers/payment.js";

const router = Router();

/* `router.get("/", (_req, res) => res.render("index.ejs"));` is setting up a GET route for the root
endpoint ("/") and associating it with a function that renders the "index.ejs" view. When a GET
request is made to the root endpoint, the function will be executed and the "index.ejs" view will be
rendered and sent as a response. This route is likely used to display the homepage or landing page
of the website. */
router.get("/", (_req, res) => res.render("index.ejs"));

/* `router.get("/payed", (_req, res) => res.render("payed.ejs"));` is setting up a GET route for the
"/payed" endpoint and associating it with a function that renders the "payed.ejs" view. When a GET
request is made to the "/payed" endpoint, the function will be executed and the "payed.ejs" view
will be rendered and sent as a response. This route is likely used to display a confirmation page to
the user after a successful payment has been made. */
router.get("/payed", (_req, res) => res.render("payed.ejs"));

/* `router.post("/create-order", createOrder);` is setting up a POST route for the "/create-order"
endpoint and associating it with the `createOrder` function from the "../controllers/payment.js"
module. When a POST request is made to the "/create-order" endpoint, the `createOrder` function will
be executed. This route is used to create a new payment order. */
router.post("/create-order", createOrder);

/* `router.get("/capture-order", captureOrder);` is setting up a GET route for the "/capture-order"
endpoint and associating it with the `captureOrder` function from the "../controllers/payment.js"
module. When a GET request is made to the "/capture-order" endpoint, the `captureOrder` function
will be executed. */
router.get("/capture-order", captureOrder);

/* `router.get("/cancel-order", cancelPayment);` is setting up a GET route for the "/cancel-order"
endpoint and associating it with the `cancelPayment` function from the "../controllers/payment.js"
module. When a GET request is made to the "/cancel-order" endpoint, the `cancelPayment` function
will be executed. */
router.get("/cancel-order", cancelPayment);

export default router;
