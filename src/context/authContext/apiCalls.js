import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";



export const login = async(userCredentials,dispatch)=>{
    dispatch(loginStart);
    try{
        const res = await axios.post("https://netflix-api-nurw.onrender.com/api/auth/login",userCredentials);
        //if success
        if(res.data.isAdmin){
             dispatch(loginSuccess(res.data));
        }else{
            dispatch(loginFailure("some error occured while authenticating the data"));
        }
    }catch(err){
        dispatch(loginFailure(err));
    }
};  

