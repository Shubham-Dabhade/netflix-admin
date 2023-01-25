export const getUserStart= ()=>({
    type:"GET_USER_START",
});

export const getUserSuccess= (users)=>({
    type:"GET_USER_SUCCESS",
    payload:users,
});

export const getUserFailure= ()=>({
    type:"GET_USER_FAILURE",
});


export const deleteMovieStart= ()=>({
    type:"DELETE_MOVIE_START",
});

export const deleteMovieSuccess= (movieId)=>({
    type:"DELETE_MOVIE_SUCCESS",
    payload:movieId,
});

export const deleteMovieFailure= ()=>({
    type:"DELETE_MOVIE_FAILURE",
});



export const createMovieStart= ()=>({
    type:"CREATE_MOVIE_START",
});

export const createMovieSuccess= (movie)=>({
    type:"CREATE_MOVIE_SUCCESS",
    payload:movie,
});

export const createMovieFailure= ()=>({
    type:"CREATE_MOVIE_FAILURE",
});



export const updateMovieStart= ()=>({
    type:"UPDATE_MOVIE_START",
});

export const updateMovieSuccess= (movie)=>({
    type:"UPDATE_MOVIE_SUCCESS",
    payload:movie,
});

export const updateMovieFailure= ()=>({
    type:"UPDATE_MOVIE_FAILURE",
});