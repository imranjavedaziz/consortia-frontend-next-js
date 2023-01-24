import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Box, Button } from "@mui/material";
import { publicAxios } from "../../api";
import { LoadingButton } from "@mui/lab";
import { useAuthContext } from "../../context/AuthContext";

const stripePromise = loadStripe("pk_test_hj0mJ31oqbPjRQxdP6h0BDTX00b3L7vsR6");

const VerifyIdentity = () => {
  const [stripe, setStripe] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { isStripeModalOpen, setIsStripeModalOpen } = useAuthContext();

  const getStripe = async () => {
    setStripe(await stripePromise);
  };

  useEffect(() => {
    getStripe();
  }, []);
  console.log(stripe);

  const handleClick = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const { data } = await publicAxios.post(
      "create-verification-session",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    console.log(data);
    const { error } = await stripe.verifyIdentity(data?.data);

    if (error) {
      console.log("[error]", error);
      setSubmitting(false);
      setIsStripeModalOpen(false);
    } else {
      console.log("Verification submitted!");
      setSubmitting(false);
      setIsStripeModalOpen(false);
    }
  };
  return (
    <Box width={230}>
      <LoadingButton
        loading={submitting}
        onClick={handleClick}
        disabled={Object.keys(stripe).length === 0}
        variant="gradient"
        size="large"
        sx={{ fontSize: { xs: "10px", md: "20px" } }}
      >
        Verify Identity
      </LoadingButton>
    </Box>
  );
};

export default VerifyIdentity;
