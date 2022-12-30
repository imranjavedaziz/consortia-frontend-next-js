import React, {
  createContext,
  useLayoutEffect,
  useContext,
  useEffect,
  useState,
} from "react";

const Context = createContext();

export const AuthContext = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => useContext(Context);
