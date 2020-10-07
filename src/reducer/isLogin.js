const isLogin = (state = { islogin: true }, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          islogin: true,
        };
      case "unlogin":
        return {
          ...state,
          islogin: false,
        };
      default:
        return state;
    }
  };
  
  export default isLogin;
  