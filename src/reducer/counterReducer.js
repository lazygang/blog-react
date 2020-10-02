const counterReducer = (state = { count: 1 }, action) => {
  switch (action.type) {
    case "addcount":
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};

export default counterReducer;
