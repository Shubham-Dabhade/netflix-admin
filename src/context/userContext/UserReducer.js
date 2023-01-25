const UserReducer = (state,action)=>{
    switch (action.type){
        case "GET_USER_START":
            return {
                users:[],
                isFetching:true,
                error:false,
            };
        case "GET_USER_SUCCESS":
            return {
                users:action.payload,
                isFetching: false,
                error: false,
            };
        case "GET_USER_FAILURE":
            return {
                users: [],
                isFetching: false,
                error: true,
            };
            default:
                return {...state};
    }
}


export default UserReducer;