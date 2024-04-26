import React, { createContext, useEffect, useState } from 'react'
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post("http://localhost:4000/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post("http://localhost:4000/api/cart/remove", { itemId }, { headers: { token } })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        // iterate object access using key value
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                // because in cartItem we have only product Id
                // using that id we find in food_list and retrive price according cartItem id
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    // fetch food list
    const fetchFoodList = async () => {
        const res = await axios.get("http://localhost:4000/api/food/list");
        setFoodList(res.data.data);
    }

    // reload the page then load the cart data
    const loadCartData = async (token) => {
        const res = await axios.post("http://localhost:4000/api/cart/get", {}, { headers: { token } });
        setCartItems(res.data.cartData || {})
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            // for reload page and user not logout 
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData({token:localStorage.getItem("token")});
            }
        }

        loadData();
    }, [])

    return (
        <StoreContext.Provider value={contextValue} >
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;