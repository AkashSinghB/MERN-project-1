import React, { useState, useEffect } from "react";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentbhelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const Paymentb = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const uId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (uId, token) => {
    getmeToken(uId, token).then((info) => {
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showBraintreeDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-success btn-block" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(uId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };

      processPayment(uId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("Payment Success");
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
            count: 1,
          };
          // console.log("");
          createOrder(uId, token, orderData);
          cartEmpty(() => {
            // console.log("we got a crash");
          });
          setReload(!reload);
        })
        .catch((err) => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>Your Bill is {getAmount()} $</h3>
      {showBraintreeDropIn()}
    </div>
  );
};

export default Paymentb;
