const userReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case "updateUser":
      return {
        ...state,
        user: action.payload,
      };
    case "clearUser":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
