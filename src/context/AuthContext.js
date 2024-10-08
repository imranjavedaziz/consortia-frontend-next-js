import React, { createContext, useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const stripeLivePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_LIVE_PUBLISHABLE_KEY
);

const Context = createContext();

export const AuthContext = ({ children }) => {
  const { route } = useRouter();
  const [stripe, setStripe] = useState({});
  const [liveStripe, setLiveStripe] = useState({});
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [choosePractitionerOpen, setChoosePractitionerOpen] = useState(true);
  const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);
  const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState(false);
  const [isVerifyIdentityModalOpen, setIsVerifyIdentityModalOpen] =
    useState(false);
  const [openVerficationModal, setOpenVerficationModal] = useState(false);
  const [openVerificationSuccess, setOpenVerificationSuccess] = useState(false);
  const [openVerificationFailure, setOpenVerificationFailure] = useState(false);
  const [isCreditCardProcessing, setIsCreditCardProcessing] = useState(false);
  const [stripeVerificationCode, setStripeVerificationCode] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [successData, setSuccessData] = useState("");
  const [refetchFromLocalStorage, setRefetchFromLocalStorage] = useState(false);
  const [creditCardData, setCreditCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  });
  const [editNftData, setEditNftData] = useState(null);
  const [editPractitionerNftData, setEditPractitionerNftData] = useState(null);

  useEffect(() => {
    handleCreditCardModalClose();
  }, [route]);

  const handleCreditCardModalClose = () => {
    setIsCreditCardProcessing(false);
    setIsCreditCardModalOpen(false);
    setCreditCardData({
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      issuer: "",
      focused: "",
      formData: null,
    });
  };
  const handleVerifyIdentityModalClose = () => {
    setIsVerifyIdentityModalOpen(false);
  };

  const getStripe = async () => {
    setStripe(await stripePromise);
  };

  const getLiveStripe = async () => {
    setLiveStripe(await stripeLivePromise);
  };

  useEffect(() => {
    // if (localStorage.getItem("access")) {
    //   setIsLoggedIn(true);
    // } else {
    //   setIsLoggedIn(false);
    // }
    const token = localStorage.getItem("access");
    const profileInfo = JSON.parse(localStorage.getItem("profile_info"));
    if (profileInfo?.user?.role === "Practitioner") {
      if (token && profileInfo?.user?.practitionerType) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        // push("/auth/signup");
      }
    } else {
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
    getStripe();
    !!process.env.NEXT_PUBLIC_IS_LIVE_STRIPE && getLiveStripe();
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
        setOpenVerficationModal,
        openVerficationModal,
        openVerificationSuccess,
        setOpenVerificationSuccess,
        openVerificationFailure,
        setOpenVerificationFailure,
        stripe,
        liveStripe,
        setStripe,
        isCreditCardProcessing,
        setIsCreditCardProcessing,
        successData,
        setSuccessData,
        stripeVerificationCode,
        setStripeVerificationCode,
        creditCardData,
        setCreditCardData,
        editNftData,
        setEditNftData,
        refetchFromLocalStorage,
        setRefetchFromLocalStorage,
        editPractitionerNftData,
        setEditPractitionerNftData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => useContext(Context);
