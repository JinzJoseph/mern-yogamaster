import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation } from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";
import CheckOutPaymentPage from "./CheckOutPaymentPage";
const stripepromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const MyPayment = () => {
  const location = useLocation();
  console.log(location);
  const price = location?.state.price;
  const cartItem = location?.state.itemId || null;
  if (!price) {
    return <Navigate to={"/dashboard/my-selected"} />;
  }
  return (
    <div className="my-40 stripe-custom-class">
      <Elements stripe={stripepromise}>
        <CheckOutPaymentPage price={price} cartItem={cartItem} />
      </Elements>
    </div>
  );
};

export default MyPayment;
