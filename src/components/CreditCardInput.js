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
import { loadStripe } from "@stripe/stripe-js";

// import { useStripe } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";
import { publicAxios } from "../api";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { GradiantTextField } from "./common/CustomInputField";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";

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

const CreditCardInput = ({ mintNFTData }) => {
  const { push } = useRouter();

  const {
    isCreditCardModalOpen,
    setIsCreditCardModalOpen,
    handleCreditCardModalClose,
    setIsVerifyIdentityModalOpen,
  } = useAuthContext();

  const [stripe, setStripe] = useState({});
  const [loading, setLoading] = useState(false);
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
  const getStripe = async () => {
    setStripe(await stripePromise);
  };
  useEffect(() => {
    getStripe();
  }, []);
  console.log({ stripe });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const { issuer } = data;
    // const formData = [...e.target.elements]
    //   .filter((d) => d.name)
    //   .reduce((acc, d) => {
    //     acc[d.name] = d.value;
    //     return acc;
    //   }, {});

    // setData({ ...data, formData: formData });
    // this.form.reset();

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
        try {
          const res = await publicAxios.post(
            "/property_nft",
            {
              payment_intent_id: result?.id,
              "3d_secure": false,
              ...mintNFTData,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          );
          console.log(res);
          //   if (!res?.data?.message == "3D secure") {
          setLoading(false);
          toast.success("Property NFT Minted Successfully");
          handleCreditCardModalClose();
          setIsVerifyIdentityModalOpen(true);
          // push("/nftWallet/NftWallet");
          //   }

          //   debugger;

          //   const result1 = await stripe.confirmCardPayment(
          //     res?.data?.data?.payment_intent_client_secret
          //   );
          //   console.log(result1?.paymentIntent?.id);
          //   const result3 = await publicAxios.post(
          //     "/property_nft",
          //     {
          //       payment_intent_id: result1?.paymentIntent?.id,
          //       "3d_secure": true,
          //       name: "Paul",
          //       title: "test",
          //       price: 10,
          //       image: "https://teams.microsoft.com/_?culture",
          //       description: "description",
          //       address: "address",
          //       document: "https://teams.microsoft.com/_?culture",
          //       docCategory: "deed",
          //       agentId: JSON.parse(localStorage.getItem("profile_info"))?.user
          //         ?.id,
          //     },
          //     {
          //       headers: {
          //         Authorization: `Bearer ${localStorage.getItem("access")}`,
          //       },
          //     }
          //   );
          //   console.log({ result3 });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => console.log(error));
  };

  console.log(data.formData);

  return (
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
      <DialogTitle>Payment</DialogTitle>
      <DialogContent>
        <div className="App-payment">
          <h4>Please enter your card details</h4>
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
                loading={loading}
                variant="gradient"
                size="large"
                type="submit"
              >
                PAY
              </LoadingButton>
            </form>
          </Box>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreditCardInput;
