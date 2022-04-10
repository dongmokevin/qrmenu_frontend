import React, { useState, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { createPaymentIntent } from "../apis";
import AuthContext from "../contexts/AuthContex";

const PaymentForm = ({ amount, items, onDone }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const auth = useContext(AuthContext);
  const params = useParams();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log("LLLLLLLLLLLLLLLLL");
    console.log(error);
    if (!error) {
      setLoading(true);
      const json = await createPaymentIntent(
        {
          payment_method: paymentMethod,
          amount,
          place: params.id,
          table: params.table,
          detail: items,
        },
        auth.token
      );

      console.log("PPPPPPPPPPPPPPPPPPPPPP");
      console.log(json);
      if (json?.success) {
        toast(`Your Order #${json.order} is processing`, {
          type: "success",
        });
        onDone();
        setLoading(false);
      } else if (json?.error) {
        toast(json.error, { type: "error" });
        setLoading(false);
      }
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <Button
        variant="standard"
        className="mt-4"
        block
        type="submit"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay"}
      </Button>
    </Form>
  );
};

const stripePromise = loadStripe(
  "pk_test_51KilyTJbEnmabVlFQAI2bDH5aRcWQK6NKwOLVqRtsjjXSxF1wAKOALXkTOkyF7IIJ8lK7FPOs0ONaeuw10UwJe4z004Xehy8Yn"
);

const StripeContext = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentForm {...props} />
  </Elements>
);

export default StripeContext;
