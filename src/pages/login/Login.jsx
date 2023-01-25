import React, { useContext } from 'react';
import { useRef } from 'react';
import { login } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import "./login.css";

const Login = () => {
    const email = useRef();
    const password = useRef();
    const {isFetching,dispatch} = useContext(AuthContext);

    const handleChange=(e)=>{
        e.preventDefault();
        login({email:email.current.value,password:password.current.value},dispatch);
    }


  return (
    <div className='login'>
        <form  className="loginForm">
            <input type="email" ref={email} placeholder='email' className='loginInput' name="email" id="email" />
            <input type="password" ref={password} placeholder='password' name="password" id="password" className="loginInput" />
            <button disabled={isFetching} type="submit" onClick={handleChange} className='loginButton'>Login</button>
        </form>
    </div>
  )
}

export default Login;