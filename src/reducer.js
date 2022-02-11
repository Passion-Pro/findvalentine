export const initialState = {
     user : null,
     userInfo:null,
     showPop:true,
     showPopIn:false,
  };
  
  export const actionTypes = {
    SET_USER : "SET_USER",
    SET_USERINFO : "SET_USERINFO",
    SET_SHOW_POP:'SET_SHOW_POP',
    SET_SHOW_POP:'SET_SHOW_POP_IN'
  };
  
  const reducer = (state, action) => {

    switch (action.type) {
      case actionTypes.SET_SHOW_POP:
        return {
          ...state,
          showPop: action.showPop,
        };

      case actionTypes.SET_SHOW_POP_IN:
        return {
          ...state,
          showPopIn: action.showPopIn,
        };

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
  