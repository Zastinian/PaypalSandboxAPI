import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import {PORT} from "./src/config.js";

import paymentRoutes from "./src/routes/payment.js";

const app = express();

/* These lines of code are setting up middleware for the Express application. */
app.use(cors());
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.set("views", path.join("./src", "views"));
app.set("json spaces", 1);

/* `app.use(paymentRoutes)` is mounting the `paymentRoutes` middleware on the Express application. This
means that any requests that match the routes defined in `paymentRoutes` will be handled by that
middleware. */
app.use(paymentRoutes);

/* `app.listen(PORT)` starts the Express application and listens for incoming requests on the specified
`PORT`. */
app.listen(PORT);
console.log(`Server on port http://localhost:${PORT}`);
console.log(`environment: ${process.env.NODE_ENV}`);
