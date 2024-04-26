import React, { useEffect, useState } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';

const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const navigate = useNavigate();

    console.log(success,orderId);

    const verifyPayment = async ()=>{
        const res = await axios.post("http://localhost:4000/api/order/verify",{success,orderId})
        if(res.data.success)
        {
            navigate("/myorders")
            console.log("success payment");
        }
        else
        {
            navigate("/")
            console.log("payment fail");
        }
    }

    useEffect(() => {
        verifyPayment()
    },[])

  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify