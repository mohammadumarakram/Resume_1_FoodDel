import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import "./cart.css"
import { StoreContext } from '../../context/StoreContext'

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url} = useContext(StoreContext);

  const navigate= useNavigate()

  return (
    <div className='cart'>
      
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>$ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>$ {item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                </div>
                <hr />
              </div>
            )
          }
          return null;
        })}
      </div>

      {/* ✅ Fixed Div Placement */}
      <div className="cart-bottom">

        {/* Cart Total Section */}
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

          <button onClick={()=>navigate('/order')}>Process to Checkout</button>
        </div>

        {/* Promo Code Section */}
        <div className="cart-promo-code">
          <div>
            <p>If you have a promo code, Enter it here</p>

            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default Cart
