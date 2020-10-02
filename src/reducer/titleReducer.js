const titleReducer = (state = { title: "我的" }, action) => {
  switch (action.type) {
    case "addtitle":
      return {
        ...state,
        title: action.payload,
      };
    default:
      return state;
  }
};

export default titleReducer;
