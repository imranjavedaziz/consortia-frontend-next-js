"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Header from "./header/Header";
import SideBar from "./sideBar/SideBar";
import { useTheme } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Dialog, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useTitle } from "../utils/Title";
import toast, { Toaster } from "react-hot-toast";
import CompletePractitionerProfile from "../components/modals/CompletePractitionerProfile";
import ConsumerProfilePopup from "../../src/components/modals/ConsumerProfilePopup";
// import { loadStripe } from "@stripe/stripe-js";
import { publicAxios } from "../api";
import VerificationModal from "../components/modals/verificationModal/VerificationModal";
import ChangePasswordDumpUsers from "../components/modals/changePasswordDumpUsers/ChangePasswordDumpUsers";

function NftsLayout({ children }) {
  useTitle("Dashboard");

  const { push } = useRouter();
  const {
    isStripeModalOpen,
    openVerificationSuccess,
    setOpenVerificationSuccess,
    openVerificationFailure,
    setOpenVerificationFailure,
    successData,
    stripeVerificationCode,
    setStripeVerificationCode,
    stripe,
    liveStripe,
  } = useAuthContext();
  const [completeProfileOpen, setCompleteProfileOpen] = useState(false);
  const [profileImagePopup, setProfileImagePopup] = useState(false);

  const [dumpUserOpen, setDumpUserOpen] = useState(false);

  const isLaptop = useMediaQuery("(min-width:900px)");

  const [openForMobile, setopenForMobile] = useState(false);
  const openSidebar = () => {
    setopenForMobile(true);
  };
  const theme = useTheme();
  // useEffect(() => {
  //   const token = localStorage.getItem("access");
  //   if (!token) push("/auth/login");
  // }, []);
  const sectionStyle = {
    minHeight: "100vh",
    height: "100%",
    backgroundImage: `url(/assets/images/dashboardBackground.svg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  useEffect(() => {
    const profile_info = JSON.parse(localStorage.getItem("profile_info"));
    if (!profile_info?.user?.stripe_identity_status) {
      // setIsStripeModalOpen(true);
    }
    // if (!!profile_info && !profile_info?.user?.onBoarded) {
    //   publicAxios
    //     .get("kyc", {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("access")}`,
    //       },
    //     })
    //     .then((data) => {
    //       console.log(data);
    //       localStorage.clear();
    //       push(data?.data?.data?.accountLink?.url);
    //     })
    //     .catch((err) => console.log(err));
    //   return;
    // }
    //
    if (profile_info?.user?.reset_password) {
      setDumpUserOpen(true);
    } else {
      if (
        !!profile_info &&
        profile_info?.user?.role == "Practitioner" &&
        !profile_info?.user?.bio
      ) {
        setCompleteProfileOpen(true);
      }
        // to add consumer profile photo
      if (
        profile_info?.user?.email_verified &&
        profile_info?.user?.role === "Consumer" &&
        !profile_info?.user?.headshot
      ) {
        setProfileImagePopup(true);
      }

    }

    if (stripeVerificationCode.length > 1) {
      const [nft, User_token] = stripeVerificationCode;
      const verifyStripeIdentity = async () => {
        try {
          const { data } = await publicAxios.post(
            "nft_data_for_identity_verification",
            {
              nft,
              User_token,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          );
          const { error } = await (process.env.NEXT_PUBLIC_IS_LIVE_STRIPE ==
          "true"
            ? liveStripe
            : stripe
          ).verifyIdentity(data?.data);
          if (error) {
            setStripeVerificationCode([]);
            toast.error("Unable to verify identity at this time!");
          } else {
            toast.success("Thank you for verifying your identity");
            setStripeVerificationCode([]);
          }
        } catch (error) {
          console.log(error);
        }
      };

      verifyStripeIdentity();
    }
  }, []);

  return (
    <>
      <VerificationModal
        open={openVerificationFailure}
        setOpen={setOpenVerificationFailure}
        title="Verification failed!"
        imageSrc="/assets/icons/verificationFailedIcon.svg"
        text="Unable to verify your identity at this time. Please try again later."
      />
      <VerificationModal
        open={openVerificationSuccess}
        setOpen={setOpenVerificationSuccess}
        title="Congratulations!"
        imageSrc="/assets/icons/verificationSuccessIcon.svg"
        text={
          successData.length > 1
            ? successData
            : "Thank you for your order. Your property nft will be minted as soon as the verification process is complete, for your security the identification process may take up to three days"
        }
      />
      <ChangePasswordDumpUsers
        open={dumpUserOpen}
        setOpen={setDumpUserOpen}
        // title="Reset Password"
        // text="Please enter your email address and phone number and we will send you otp to reset your password."
        // btnText="Send Request"
        // placeholder="Mail@example.com"
        // removeCorssForDumpUser={true}
      />
      <CompletePractitionerProfile
        open={completeProfileOpen}
        setOpen={setCompleteProfileOpen}
        title="Complete Profile"
        text="Please complete your practitioner profile to start minting NFTs"
        btnText1="consumer"
        btnText2="practitioner"
      />
      <ConsumerProfilePopup
        open={profileImagePopup}
        setOpen={setProfileImagePopup}
        title="Complete Profile"
        text="Please complete your Consumer profile to start minting NFTs"
        btnText1="consumer"
        btnText2="practitioner"
      />
      <Dialog
        open={isStripeModalOpen}
        // TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "secondary.purpleGray",
            borderRadius: "24px",
            // width: "400px",
            // height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 38px",
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
          <Typography variant="h5">
            You need to verify your identity before minting NFTs
          </Typography>
        </Box>
      </Dialog>

      <Box
        sx={{
          display: {
            md: "flex",
          },
        }}
        style={sectionStyle}
      >
        {isLaptop ? (
          <Box
            sx={{
              minWidth: "290px",
              minHeight: "100vh",
              background: theme.palette.background.default,
            }}
          >
            <SideBar />
          </Box>
        ) : !openForMobile ? (
          <Box sx={{ display: "flex" }}>
            <IconButton color="primary" onClick={() => openSidebar()}>
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                // paddingLeft: { xs: "40px" },
                width: "100%",
              }}
            >
              <Header />
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: { xs: "200px", sm: "310px" },
              minHeight: "100vh",
              height: "100%",
              background: theme.palette.background.default,
              position: "absolute",
              zIndex: 4,
            }}
          >
            <SideBar setopenForMobile={setopenForMobile} />
          </Box>
        )}
        <Box
          sx={{
            paddingX: { xs: "10px", md: "40px" },
            width: "100%",
          }}
        >
          {isLaptop && <Header />}
          <Box>{children}</Box>
        </Box>
      </Box>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default NftsLayout;
