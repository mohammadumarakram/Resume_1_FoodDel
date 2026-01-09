import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: "rzp_test_Rc3Wbecxs9bIeq",
  key_secret: "I0l0XUnNtZW1DoSki81vTod8",
});

razorpay.orders.create({
  amount: 50000,
  currency: "INR",
  receipt: "test123",
}).then(console.log).catch(console.error);
