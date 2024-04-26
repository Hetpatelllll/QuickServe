import React, { useContext, useEffect, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const PlaceOrder = () => {

  const { getTotalCartAmount,token,food_list,cartItems,setCartItems } = useContext(StoreContext);
  const navigate = useNavigate()

  const [data,setData] = useState({
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

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(prev=>({...data,[name]:value}))
    console.log(data);
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
    }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let res = await axios.post("http://localhost:4000/api/order/place",orderData,{headers:{token}})
    if(res.data.success)
    {
      const {session_url}= res.data;
      window.location.replace(session_url)
    }
    else
    {
      alert("Error")
    }
  }

  // when user is not login then don't show order page
  useEffect(() => {
    if(!token)
    {
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0)
    {
      navigate("/cart")
    }
  },[token])


  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>

        <div className="multi-fields">
          <input required onChange={onChangeHandler} value={data.firstName}  type="text" placeholder='First Name' name="firstName" id="" />
          <input required onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' name="lastName" id="lastName" />
        </div>

        <input required onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' name="email" id="" />
        <input required onChange={onChangeHandler} value={data.street} type="text" placeholder='Full street Address' name="street" id="" />

        <div className="multi-fields">
          <input required onChange={onChangeHandler} value={data.city} type="text" placeholder='City' name="city" id="" />
          <input required onChange={onChangeHandler} value={data.state} type="text" placeholder='State' name="state" id="" />
        </div>

        <div className="multi-fields">
          <input required onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' name="zipcode" id="" />
          <input required onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' name="country" id="" />
        </div>
        <input required onChange={onChangeHandler} value={data.phone} type="number" placeholder='Phone' name="phone" />
      </div>

      <div className='place-order-right'>
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fees</p>
              <p>${getTotalCartAmount() === 0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0? 0: getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit' >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder