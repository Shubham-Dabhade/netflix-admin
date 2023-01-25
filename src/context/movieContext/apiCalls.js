import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMovieFailure, getMovieStart, getMovieSuccess } from "./MovieActions"
import axios from "axios";


export const getMovies = async (dispatch) => {
    dispatch(getMovieStart());
    try {
      const res = await axios.get("https://netflix-api-nurw.onrender.com/api/movie", {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(getMovieSuccess(res.data));
    } catch (err) {
      dispatch(getMovieFailure());
    }
  };

//delete movie
export const deleteMovie = async (id,dispatch) => {
    dispatch(deleteMovieStart());
    try {
        await axios.delete("https://netflix-api-nurw.onrender.com/api/movie/"+id, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(deleteMovieSuccess(id));
    } catch (err) {
      dispatch(deleteMovieFailure());
    }
  };

//create a movie
export const createMovie = async (movie,dispatch) => {
  dispatch(createMovieStart());
  try {
      const res=await axios.post("https://netflix-api-nurw.onrender.com/api/movie/",movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createMovieSuccess(res.data));
  } catch (err) {
    dispatch(createMovieFailure());
  }
};

