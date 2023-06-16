import {Router} from "express";
import {createOrder, captureOrder, cancelPayment} from "../controllers/payment.js";

const router = Router();

router.get("/", (_req, res) => res.render("index.ejs"));

router.get("/payed", (_req, res) => res.render("payed.ejs"));

router.post("/create-order", createOrder);

router.get("/capture-order", captureOrder);

router.get("/cancel-order", cancelPayment);

export default router;
