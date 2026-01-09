import React, { useContext, useEffect, useState } from "react";
import "./myorder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const Myorder = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

//   const fetchOrders = async () => {
    
//       const response = await axios.post(url + "api/order/userorders", {} ,{
//         headers: { token },
//       });
//       setData(response.data.data);
//       console.log(response.data.data);
      
      
//        };

const fetchOrders = async () => {
  try {
    const response = await axios.post(url + "api/order/userorders", {}, {
      headers: { token },
    });

    console.log("All orders from backend:", response.data.data);

    // ✅ Filter only paid orders
    const paidOrders = response.data.data.filter(order => order.payment === true);

    setData(paidOrders);

    console.log("Filtered (paid) orders:", paidOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};






  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);





  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      <div className="container">
        {data.length === 0 ? (
          <p>No orders found.</p>
        ) : ( 
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="parcel" />

              <p>
                {order.items.map((item, idx) => {
                  const itemText = `${item.name} x ${item.quantity}`;
                  return idx === order.items.length - 1
                    ? itemText
                    : itemText + ", ";
                })}
              </p>

              <p>${order.amount}</p>
              <p>Items: {order.items.length}</p>

             <p>
  <span
    style={{
      color:
        order.status === "Delivered"
          ? "green"
          : order.status === "Out for Delivery"
          ? "orange"
          : "blue", // Food Processing or any other status
    }}
  >
    ●
  </span>{" "}
  <b>{order.status}</b>
</p>


              <button onClick={fetchOrders}>Track order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );















};

export default Myorder;
