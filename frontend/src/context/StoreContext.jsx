import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios"




export const StoreContext = createContext(null);
 
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url="http://localhost:4000/";
  const [token,setToken]=useState("");

  const [food_list, setFood_list] = useState([]);


const addToCart = async (itemId) => {
  // 1️⃣ Update state first
  setCartItems((prev) => {
    if (!prev[itemId]) {
      return { ...prev, [itemId]: 1 };
    } else {
      return { ...prev, [itemId]: prev[itemId] + 1 };
    }
  });

  // 2️⃣ Then sync with backend if logged in
  if (token) {
    try {
      await axios.post(url + "api/cart/add", { itemId }, { headers: { token } });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }
};



  const removeFromCart = async (itemId) => {
  setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

  if(token){
    await axios.post(url+"api/cart/remove",{itemId},{headers:{token}})
  }
}



  const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems){
      if(cartItems[item]>0){

        let itemInfo=food_list.find((product)=>product._id=== item);
      totalAmount+=itemInfo.price* cartItems[item];


      }


    }


    return totalAmount;
  } 

  const fetchFoodList=async ()=>{
    const response=await axios.get(url+"api/food/list");
    setFood_list(response.data.data);

  }


  const loadCartData=async (token) => {
    const response=await axios.post(url+"api/cart/get",{},{headers:{token}});

    setCartItems(response.data.cartData);

    
  }


 useEffect(() => {
 

  async function loadData() {
    await fetchFoodList();
     if(localStorage.getItem("token")){
    setToken(localStorage.getItem("token"));
    await loadCartData(localStorage.getItem("token"))
  }

    
  }


loadData();

 }, [])
 

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

 
  




  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
