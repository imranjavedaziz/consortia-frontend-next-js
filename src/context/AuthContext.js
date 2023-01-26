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
  const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);
  const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState(false);
  const [isVerifyIdentityModalOpen, setIsVerifyIdentityModalOpen] =
    useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleCreditCardModalClose = () => {
    setIsCreditCardModalOpen(false);
  };
  const handleVerifyIdentityModalClose = () => {
    setIsVerifyIdentityModalOpen(false);
  };
  useEffect(() => {
    if (localStorage.getItem("access")) {
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
        isStripeModalOpen,
        setIsStripeModalOpen,
        isCreditCardModalOpen,
        setIsCreditCardModalOpen,
        handleCreditCardModalClose,
        isVerifyIdentityModalOpen,
        setIsVerifyIdentityModalOpen,
        handleVerifyIdentityModalClose,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => useContext(Context);
