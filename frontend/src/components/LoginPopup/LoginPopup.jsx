import React, { useContext, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'
import  axios  from 'axios'
import { StoreContext } from '../../context/StoreContext'

const LoginPopup = ({ setShowLogin }) => {

    const [currState, setCurrState] = useState("Login")
    const {setToken} = useContext(StoreContext)
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (e) => {
        let newUrl;
        e.preventDefault();
        if(currState==="Login")
        {
            newUrl="http://localhost:4000/api/user/login"
        }
        else
        {
            newUrl="http://localhost:4000/api/user/register"
        }

        const res = await axios.post(newUrl,data);

        if(res.data.success)
        {
            setToken(res.data.token);
            localStorage.setItem("token",res.data.token)
            setShowLogin(false)
        }
        else
        {
            alert(res.data.message)
        }

    }
    

    return (
        <div className='login-popup' >
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {
                        currState === "Login" ? <></> : <input type="text" onChange={onChangeHandler} value={data.name} placeholder='Your Name' required name="name" id="" />
                    }
                    <input onChange={onChangeHandler} value={data.email}  type="email" placeholder='Your Email' required name="email" id="" />
                    <input onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required name="password" id="" />
                </div>
                <button type='submit' >{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {
                    currState === "Login" ? <p>Create a New Account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
                        :
                        <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
                }


            </form>
        </div>
    )
}

export default LoginPopup