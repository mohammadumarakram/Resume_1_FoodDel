import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./veirfy.css";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const handleGoToOrders = () => {
    navigate("/myorders");
  };

  return (
    <div className="verify">
      {success === "true" ? (
        <>
          <h2>✅ Payment Successful! </h2>
          <h2> Order ID: {orderId} </h2>
          <button onClick={handleGoToOrders} className="verify-btn">
            Go to My Orders
          </button>
        </>
      ) : (
        <>
          <h2>❌ Payment Failed. Please try again.</h2>
          <button onClick={() => navigate("/")} className="verify-btn">
            Back to Home
          </button>
        </>
      )}
    </div>
  );
};

export default Verify;
