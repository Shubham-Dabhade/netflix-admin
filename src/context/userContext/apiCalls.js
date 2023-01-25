import axios from "axios";
import { getUserFailure, getUserStart, getUserSuccess } from "./UserAction";


export const getUsers = async (dispatch) => {
    dispatch(getUserStart());
    try {
      const res = await axios.get("https://netflix-api-nurw.onrender.com/api/user/", {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(getUserSuccess(res.data));
    } catch (err) {
      dispatch(getUserFailure());
    }
  };