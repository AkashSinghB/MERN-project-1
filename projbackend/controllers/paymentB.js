const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "r73z9xw5vf3vtcmr",
  publicKey: "cwv7tptshp2zzjbz",
  privateKey: "b546f6e009a831895cd45ebb12fe461f",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    // pass clientToken to your front-end
    // const clientToken = response.clientToken
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.json(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;

  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      // deviceData: deviceDataFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};
