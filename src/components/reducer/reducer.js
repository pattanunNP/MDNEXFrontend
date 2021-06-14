export default function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true };

    case "LOGIN_SUCCESS":
      return { ...state, loading: false, data: action.payload };

    case "LOGIN_FIALED":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return;
    default:
      return state;
  }
}
