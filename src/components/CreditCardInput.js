import React, { useRef, useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import toast from "react-hot-toast";
import qs from "qs";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";
import { publicAxios } from "../api";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { GradiantTextField } from "./common/CustomInputField";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import {
  MINT_PRACTITIONER_NFT,
  MINT_PROPERTY_NFT,
  STRIPE_VERIFY_IDENTITY,
} from "../constants/endpoints";

const inputFields = [
  {
    type: "tel",
    name: "number",
    placeholder: "Card Number",
    pattern: "[d| ]{16,22}",
  },
  {
    type: "text",
    name: "name",
    placeholder: "Name",
  },
  {
    type: "tel",
    name: "expiry",
    placeholder: "Valid Thru",
    pattern: "dd/dd",
  },
  {
    type: "tel",
    name: "cvc",
    placeholder: "CVC",
    pattern: "d{3,4}",
  },
];

const CreditCardInput = ({ mintNFTData, isPractitionerNFT }) => {
  const { push } = useRouter();
  const {
    isCreditCardModalOpen,
    setIsCreditCardModalOpen,
    handleCreditCardModalClose,
    setIsVerifyIdentityModalOpen,
    setOpenVerificationSuccess,
    setOpenVerificationFailure,
    stripe,
    isCreditCardProcessing,
    setIsCreditCardProcessing,
    setSuccessData,
  } = useAuthContext();
  const [open, setOpen] = useState(true);
  const [data, setData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  });
  const ref = useRef(null);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setData({ ...data, issuer });
    }
  };
  const handleInputFocus = ({ target }) => {
    setData({ ...data, focused: target.name });
  };
  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }
    setData({ ...data, [target.name]: target.value });
  };

  // Start Payment Processing
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreditCardProcessing(true);
    // setVerifyModalOpen(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var cardData = qs.stringify({
      "card[number]": data.number,
      "card[exp_month]": data.expiry.split("/")[0],
      "card[exp_year]": data.expiry.split("/")[1],
      "card[cvc]": data.cvc,
      type: "card",
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: cardData,
      redirect: "follow",
    };
    fetch("https://api.stripe.com/v1/payment_methods", requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.error) {
          setIsCreditCardProcessing(false);
          // setVerifyModalOpen(false);

          toast.error(result?.error?.message);
          return;
        }
        try {
          // if (mintNFTData?.stripe_identity_status) {
          //   setIsCreditCardProcessing(false);
          //   setVerifyModalOpen(true);
          // }

          const res = await publicAxios.post(
            isPractitionerNFT ? MINT_PRACTITIONER_NFT : MINT_PROPERTY_NFT,
            {
              payment_intent_id: result?.id,
              "3d_secure": false,
              [isPractitionerNFT ? "practitioner_nft_id" : "property_nft_id"]:
                mintNFTData?.id,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          );
          console.log(res);
          // setIsCreditCardProcessing(false);
          // setOpenVerificationSuccess(true);
          // handleCreditCardModalClose();

          if (res?.data?.data?.requires_action) {
            const confirmationData = await stripe.confirmCardPayment(
              res?.data?.data?.payment_intent_client_secret
            );

            if (confirmationData?.error) {
              toast.error(confirmationData?.error?.message);
              setIsCreditCardProcessing(false);
              return;
            }
            const mintNftAfterPayment = await publicAxios.post(
              isPractitionerNFT ? MINT_PRACTITIONER_NFT : MINT_PROPERTY_NFT,
              {
                payment_intent_id: confirmationData?.paymentIntent?.id,
                "3d_secure": true,
                [isPractitionerNFT ? "practitioner_nft_id" : "property_nft_id"]:
                  mintNFTData?.id,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
              }
            );
            console.log("mintNftAfterPayment", mintNftAfterPayment);
            toast.success(mintNftAfterPayment?.data?.message);
          }

          if (mintNFTData?.stripe_identity_status) {
            setIsCreditCardProcessing(false);
            setVerifyModalOpen(true);
          }
          if (res?.data?.data?.identity_secret) {
            // const { data } = await publicAxios.post(
            //   "create-verification-session",
            //   {
            //     [isPractitionerNFT ? "practitioner_nft" : "property_nft"]:
            //       res?.data?.data?.identity_secret,
            //   },
            //   {
            //     headers: {
            //       Authorization: `Bearer ${localStorage.getItem("access")}`,
            //     },
            //   }
            // );
            const { error } = await stripe.verifyIdentity(
              res?.data?.data?.identity_secret
            );
            if (error) {
              setIsCreditCardProcessing(false);
              setOpenVerificationFailure(true);
              handleCreditCardModalClose();
              console.log("[error]", error);
              return;
            } else {
              setIsCreditCardProcessing(false);
              setOpenVerificationSuccess(true);
              handleCreditCardModalClose();
              return;
            }
          }
          if (res?.data?.data == "") {
            setIsCreditCardProcessing(false);
            setOpenVerificationSuccess(true);
            handleCreditCardModalClose();
          }
        } catch (error) {
          console.log(error);
          setIsCreditCardProcessing(false);
          if (typeof error?.data?.message == "string") {
            if (error?.data?.message.includes(":")) {
              toast.error(error?.data?.message?.split(":")[1]);
            } else {
              toast.error(error?.data?.message);
            }
          } else {
            if (Array.isArray(error?.data?.message)) {
              toast.error(error?.data?.message?.error?.[0]);
            } else {
              toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
            }
          }
        }
      })
      .catch((error) => console.log(error));
  };

  console.log(data.formData);

  return (
    <>
      <Dialog
        open={isCreditCardModalOpen}
        //   TransitionComponent={Transition}
        keepMounted
        onClose={handleCreditCardModalClose}
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
        <DialogTitle>
          <Typography variant="h3">
            {isPractitionerNFT ? "Practitioner NFT $20" : "Property NFT $1"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div className="App-payment">
            <h4>Please enter your payment information</h4>
            <Card
              number={data.number}
              name={data.name}
              expiry={data.expiry}
              cvc={data.cvc}
              focused={data.focused}
              callback={handleCallback}
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              marginTop={2}
            >
              <form
                ref={ref}
                onSubmit={handleSubmit}
                style={{
                  width: "80%",
                  display: "flex",
                  flexDirection: "column",
                  alignItmes: "center",
                  justifyContent: "center",
                  rowGap: 10,
                }}
              >
                {inputFields.map(
                  ({ name, placeholder, type, pattern }, index) => (
                    <div
                      key={index}
                      style={{
                        background: false
                          ? "rgba(255,0,0,0.7)"
                          : "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                        display: "flex",
                        justifyContent: "center",
                        borderRadius: "24px",
                        alignItems: "center",
                      }}
                    >
                      <GradiantTextField
                        fullWidth
                        variant="standard"
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        pattern={pattern}
                        required
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        style={{
                          background: false
                            ? "rgba(29, 6, 104, 1)"
                            : "rgba(29, 6, 104, 1)",
                          margin: "2px 2px 2px 2px",
                          borderRadius: "24px",
                        }}
                      />
                    </div>
                  )
                )}

                <input type="hidden" name="issuer" value={data.issuer} />
                <LoadingButton
                  loading={isCreditCardProcessing}
                  variant="gradient"
                  size="large"
                  type="submit"
                >
                  Pay and continue to verification
                </LoadingButton>
              </form>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={verifyModalOpen}
        // TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "secondary.purpleGray",
            borderRadius: "24px",
            width: "400px",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={3}
        >
          <Typography variant="h5">Verifying your documents</Typography>
          <CircularProgress size={70} />
        </Box>
      </Dialog>
    </>
  );
};

export default CreditCardInput;
