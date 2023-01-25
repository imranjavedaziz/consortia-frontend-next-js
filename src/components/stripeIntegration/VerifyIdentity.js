import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Box, Button, Dialog, DialogContent } from "@mui/material";
import { publicAxios } from "../../api";
import { LoadingButton } from "@mui/lab";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const stripePromise = loadStripe("pk_test_hj0mJ31oqbPjRQxdP6h0BDTX00b3L7vsR6");

const VerifyIdentity = () => {
  const { push } = useRouter();

  const [stripe, setStripe] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const {
    isStripeModalOpen,
    setIsStripeModalOpen,
    isVerifyIdentityModalOpen,
    setIsVerifyIdentityModalOpen,
    handleVerifyIdentityModalClose,
  } = useAuthContext();

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
      toast.success("Verification submitted!");
      handleVerifyIdentityModalClose();
      setSubmitting(false);
      setIsStripeModalOpen(false);
      push("/nftWallet/NftWallet");
    }
  };
  return (
    <Dialog
      open={isVerifyIdentityModalOpen}
      //   TransitionComponent={Transition}
      keepMounted
      onClose={handleVerifyIdentityModalClose}
      PaperProps={{
        sx: {
          backgroundColor: "secondary.purpleGray",
          borderRadius: "24px",
          //   width: "571px",
          // height: "397px",
          padding: "40px 38px",
        },
      }}
    >
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  );
};

export default VerifyIdentity;
