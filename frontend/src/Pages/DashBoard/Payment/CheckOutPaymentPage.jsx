import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { Navigate } from "react-router-dom";

const CheckOutPaymentPage = ({ price, cartItem }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading } = useUser();
  
  const [message, setMessage] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [cart, setCart] = useState([]);
  
  if (price <= 0) {
    return <Navigate to="/dashboard/my-selected" replace />;
  }

  useEffect(() => {
    axiosSecure
      .get(`/cart/${currentUser?.email}`)
      .then((res) => {
        const classId = res.data.map((item) => item._id);
        setCart(classId);
      })
      .catch((err) => console.log(err));
  }, [currentUser?.email, axiosSecure]);

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    }).catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    
    if (!stripe || !elements) {
      return;
    }
    
    const cardElement = elements.getElement(CardElement);

    if (cardElement === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log(error);
      setMessage(error.message);
      return;
    }

    console.log("[PaymentMethod]", paymentMethod);

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      setMessage(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setSucceeded(true);
      setMessage("Payment succeeded!");
    } else {
      setMessage("Payment failed.");
    }
  };

  return (
    <div className="text-center items-center">
    <h1 className="font-bold text-2xl">
      Payment Amount: <span className="text-secondary">{price}$</span>
    </h1>
    <form onSubmit={handleSubmit} className="mt-8 max-w-sm mx-auto">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={isLoading || !stripe || !clientSecret}
        className="bg-blue-700 py-3 text-white mt-5 w-full rounded-md hover:bg-blue-600 transition duration-300"
        style={{ maxWidth: "100%" }}
      >
        {isLoading ? "Processing..." : "Pay"}
      </button>
    </form>
    {message && <div id="payment-message" className="text-red-500 mt-3">{message}</div>}
    {succeeded && <p className="text-green-400 mt-3">Payment succeeded!</p>}
  </div>
  );
};

export default CheckOutPaymentPage;
