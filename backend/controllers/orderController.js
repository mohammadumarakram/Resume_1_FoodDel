// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js"

// import Stripe from "stripe";

// const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)


// //placing user order from frontend
// const placeOrder=async (req,res)=>{
//     const frontend_url= "http://localhost:5173"

//     try {
//         const newOrder=new orderModel({
//             userId:req.body.userId,
//             items:req.body.items,
//             amount:req.body.amount,
//             address:req.body.address
//         })

//         await newOrder.save();

//         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

//         const line_items=req.body.items.map((item)=>({
//             price_data:{
//                 currency:"inr",
//                 product_data:{
//                     name:item.name
//                 },

//                 unit_amount:item.price*100*80


//             },
//             quantity:item.quantity


//         }))

//         line_items.push({
//             price_data:{
//                 currency:"inr",
//                 product_data:{
//                     name:"Delievery Charges"

//                 },
                
//             unit_amount:2*100*80


//             },

//             quantity:1


//         })


// const session=await stripe.checkout.sesssion.create({
//     line_items:line_items,
//     mode:'payment',
//     success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//     cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`



// })

// res.json({success:true,session_url:session.url})
        
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
        
        
//     }








// }


// export {placeOrder}











import Razorpay from "razorpay";
import crypto from "crypto";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ✅ Create Razorpay order and save DB record
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: false,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const options = {
      amount: Math.round(req.body.amount * 85* 100),
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    const razorOrder = await razorpay.orders.create(options);

    res.json({
      success: true,
      order: razorOrder,
      orderId: newOrder._id,
      key: process.env.RAZORPAY_KEY,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error creating Razorpay order" });
  }
};

// ✅ Verify Razorpay signature and handle failed payments
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // Construct signature check
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // ✅ Payment successful
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      // ❌ Payment failed or invalid signature — delete order
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error(error);
    // ❌ Delete order on any exception (safety)
    if (req.body.orderId) await orderModel.findByIdAndDelete(req.body.orderId);
    res.json({ success: false, message: "Error verifying payment" });
  }
};





const userOrders = async (req, res) => {
  try {
    const { userId } = req.body; // comes from authMiddleware
    const orders = await orderModel.find({ userId }); // get all orders of user
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.json({ success: false, message: "Error fetching user orders" });
  }
};




// listing orders for admin
const listOrder=async (req,res) => {
  try {
    const orders=await orderModel.find({});
    res.json({success:true,data:orders})

    
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
    
    
  }
  
}


//changing status
const updateStatus=async (req,res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
    
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
    
  }

  
}



export { placeOrder, verifyPayment,userOrders,listOrder,updateStatus};





