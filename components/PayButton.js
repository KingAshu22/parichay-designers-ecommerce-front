import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/router";
import axios from "axios";

export default function PayButton({
  amount,
  name,
  email,
  mobile,
  streetAddress,
  city,
  postalCode,
  country,
  cartProducts,
}) {
  const router = useRouter();
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [keyId, setKeyId] = useState("");

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await axios.get("/api/config");
        setKeyId(response.data.RAZORPAY_KEY_ID);
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    }

    fetchConfig();
  }, []);

  const makePayment = async () => {
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    const data = await fetch("/api/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        name,
        email,
        mobile,
        streetAddress,
        city,
        postalCode,
        country,
        cartProducts,
      }),
    }).then((t) => t.json());

    var options = {
      key: keyId,
      name: "Parichay Designer",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thank you for your Order",
      image: "https://manuarora.in/logo.png",
      handler: async function (response) {
        const body = { ...response };
        const res = await axios.post("/api/validate", body);
        if (res.data.msg === "Success") {
          setIsPaymentSuccess(true);
          router.push("/cart?success=1");
        } else {
          router.push("/cart?failure=1");
        }
      },
      prefill: {
        name,
        email,
        contact: mobile,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const initializeRazorpay = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = (error) => {
        reject(new Error("Failed to load Razorpay SDK"));
        reject(error);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <div>
      {!isPaymentSuccess && (
        <Button black block onClick={() => makePayment()}>
          Pay {amount} now
        </Button>
      )}
    </div>
  );
}
