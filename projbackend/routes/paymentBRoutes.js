const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/paymentB");
const { getUserById } = require("../controllers/user");

//params
router.param("uId", getUserById);

router.get("/payment/gettoken/:uId", isSignedIn, isAuthenticated, getToken);

router.post(
  "/payment/braintree/:uId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
