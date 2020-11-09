const isLoginReducer = (state = { isLogin: false }, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLogin: true,
      };
    case "unLogin":
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
};

export default isLoginReducer;