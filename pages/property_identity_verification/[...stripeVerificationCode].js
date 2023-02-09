import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthContext } from "../../src/context/AuthContext";

const StripeVerificationCode = () => {
  const {
    stripeVerificationCode,
    setStripeVerificationCode,
    isLoggedIn,
    setIsLoggedIn,
  } = useAuthContext();
  const { push, query } = useRouter();

  useEffect(() => {
    const verificationCode = query?.stripeVerificationCode;
    console.log(verificationCode);
    if (verificationCode) setStripeVerificationCode(verificationCode);
    if (isLoggedIn) {
      push("/dashboard/landing");
    } else {
      push("/auth/login");
    }
  }, [query?.stripeVerificationCode]);

  return <div></div>;
};

export default StripeVerificationCode;
