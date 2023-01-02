import React, {
  createContext,
  useLayoutEffect,
  useContext,
  useEffect,
  useState,
} from "react";

const Context = createContext();

export const AuthContext = ({ children }) => {
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [choosePractitionerOpen, setChoosePractitionerOpen] = useState(true);

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
        showSecondForm,
        setShowSecondForm,
        choosePractitionerOpen,
        setChoosePractitionerOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => useContext(Context);
