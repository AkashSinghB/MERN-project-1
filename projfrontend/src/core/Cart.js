import React, { useState, useEffect } from "react";
import Base from "./Base";
import { loadCart } from "./helper/cartHelper";
import Card from "./Card";
import Paymentb from "./PaymentB";

const Cart = () => {
  const [products, setProducts] = useState([]);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]); //if you want to reload or remount any component then pass it in these square brackets

  const loadAllProducts = (products) => {
    return (
      <div className=" col-sm-6">
        <h2>This section is to load products</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div className="">
        <h2>This section is for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to Checkout">
      <div className="row ">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No products in cart</h3>
          )}
        </div>
        <div className="col-sm-6">
          <Paymentb products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
