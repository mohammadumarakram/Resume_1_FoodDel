import React, { useContext, useEffect, useState } from 'react'
import "./placeorder.css"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext);

  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

const onChangeHandler=(event)=>{
  const name=event.target.name;
  const value=event.target.value;
  setData(data=>({...data,[name]:value}))
}

const placeOrder= async (event)=>{
  event.preventDefault();
  let orderItems=[];
  food_list.map((item)=>{
    if(cartItems[item._id]>0){
      let itemInfo=item;
      itemInfo["quantity"]=cartItems[item._id];
      orderItems.push(itemInfo)

    }

  })

 let orderData={
  address:data,
  items:orderItems,
  amount:getTotalCartAmount()+5,

 }


//  let response=await axios.post(url+"api/order/place",orderData,{headers:{token}})

//  if(response.data.success){
//   const {session_url}=response.data;
//   window.location.replace(session_url);

//  }

//  else{
//   alert("Error");
//  }
  
  

// }


const res = await axios.post(url + "api/order/place", orderData, { headers: { token } });

    if (res.data.success) {
      const { key, order, orderId } = res.data;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Food Delivery App",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await axios.post(url + "api/order/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId,
          });
          if (verifyRes.data.success) {
            window.location.replace(`/verify?success=true&orderId=${orderId}`);
          } else {
            window.location.replace(`/verify?success=false&orderId=${orderId}`);
          }
        },
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone,
        },
        theme: { color: "#3399cc" },
      };

      console.log("Order received:", res.data);

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert("Error creating order");
    }
  };


  const navigate=useNavigate()
useEffect(() => {
  if(!token){
    navigate('/cart')

  }

  else if(getTotalCartAmount()==0){
    navigate('/cart')
  }




}, [token])







  return (
   <form className="place-order" onSubmit={placeOrder}>


    <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
            <input required  name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
            <input  name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' required />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email}  type="email" placeholder='Email address' />


        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />

         <div className="multi-fields">
            <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
            <input name="state" onChange={onChangeHandler} value={data.state}  type="text" placeholder='State ' required/>
        </div>

        <div className="multi-fields">
            <input name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zipcode '  required/>
            <input name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'  required />
        </div>

        <input name="phone" onChange={onChangeHandler} value={data.phone}  type="text" placeholder='Phone' required />





    </div>
    
    
    
    <div className="place-order-right">
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delievery Fee</p>
              <p>${getTotalCartAmount()==0?0:5}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total </b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+5} </b>
            </div>

            
          </div>

          <button type='submit' >Process to Payment</button>
        </div>

    </div>
</form>
  )
}

export default PlaceOrder




