import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthContext } from "../../src/context/AuthContext";
import AuthLayout from "../../src/authLayout/index";

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
StripeVerificationCode.getLayout = function (page) {
  return <AuthLayout>{page}</AuthLayout>;
};
