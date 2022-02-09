export const initialState = {
     user : null,
     userInfo:null,

  };
  
  export const actionTypes = {
    SET_USER : "SET_USER",
    SET_USERINFO : "SET_USERINFO",
  };
  
  const reducer = (state, action) => {

    switch (action.type) {
      case actionTypes.SET_USERINFO:
        return {
          ...state,
          userInfo: action.userInfo,
        };

      case actionTypes.SET_USER:
        return {
          ...state,
          user: action.user,
        };
      
      default:
        return state;
    }
  };
  
  export default reducer;
  