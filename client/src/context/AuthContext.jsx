import { createContext, useEffect, useReducer } from "react";

const intial_state = {
  token: JSON.parse(localStorage.getItem("token")) || null,
  username: JSON.parse(localStorage.getItem("username")) || null,
  email: JSON.parse(localStorage.getItem("email")) || null,
};

const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        token: action.token,
        username: null,
        email: null,
      };
    case "LOGOUT":
      return {
        token: null,
        username: null,
        email: null,
      };
    case "SET_USER":
      return {
        username: action.username,
        email: action.email,
        token: action.token,
      };

    default:
      return state;
  }
};

const AuthcontextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intial_state);
  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(state.token));
    localStorage.setItem("username", JSON.stringify(state.username));
    localStorage.setItem("email", JSON.stringify(state.email));
  }, [state.token, state.username, state.email]);
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        username: state.username,
        email: state.email,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthcontextProvider };
