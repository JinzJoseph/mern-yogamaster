import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { Await, Navigate } from "react-router-dom";
import axios from "axios";

const CheckOutPaymentPage = ({ price, cartItem }) => {
  const baseUrl = "http://localhost:3000/payment-info";
  const url = cartItem ? `${baseUrl}?classId=${cartItem}` : baseUrl;

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
    if (currentUser?.email) {
      axiosSecure
        .get(`/cart/${currentUser.email}`)
        .then((res) => {
          const classId = res.data.map((item) => item._id);
          setCart(classId);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", {
        price,
        description: "Payment for purchase",
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.log(err));
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
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
      setMessage(error.message);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: currentUser?.name || "Unknown",
            email: currentUser?.email || "Anonymous",
            address: {
              line1: "Your Address Line 1",
              line2: "Your Address Line 2",
              city: "Your City",
              state: "Your State",
              postal_code: "Your Postal Code",
              country: "IN",
            },
          },
        },
      });
    console.log("[payment intent]", paymentIntent);
    if (confirmError) {
      console.log("[confirm Error]", confirmError);
      setMessage(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setSucceeded(true);
      setMessage("Payment succeeded!");
      const transitionId = paymentIntent.id;
      const paymentMethod = paymentIntent.payment_method;
      const amount = paymentIntent.amount / 100;
      const currency = paymentIntent.currency;
      const paymentStatus = paymentIntent.status;
      const userName = currentUser?.name;
      const userEmail = currentUser?.email;
      const data = {
        transitionId,
        paymentMethod,
        amount,
        currency,
        paymentStatus,
        userName,
        userEmail,
        classId: cartItem ? [cartItem] : cart,
        date: new Date(),
      };
      console.log(data);
     await axios
        .post(
          url,
          {
            body: data
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bear ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
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
        >
          {isLoading ? "Processing..." : "Pay"}
        </button>
      </form>
      {message && (
        <div id="payment-message" className="text-red-500 mt-3">
          {message}
        </div>
      )}
      {succeeded && <p className="text-green-400 mt-3">Payment succeeded!</p>}
    </div>
  );
};

export default CheckOutPaymentPage;
