const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { stripeWebhook } = require('../controller/StripeWebhookController');

router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);


module.exports = router;





