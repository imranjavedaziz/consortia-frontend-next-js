"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
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
import axios from "axios";
import { publicAxios } from "../api";
import VerificationModal from "../components/modals/verificationModal/VerificationModal";

function NftsLayout({ children }) {
  useTitle("Dashboard");

  const { push } = useRouter();
  const {
    isLoggedIn,
    setIsLoggedIn,
    isStripeModalOpen,
    setIsStripeModalOpen,
    setOpenVerficationModal,
    openVerficationModal,
    openVerificationSuccess,
    setOpenVerificationSuccess,
    openVerificationFailure,
    setOpenVerificationFailure,
    successData,
    stripeVerificationCode,
    setStripeVerificationCode,
    stripe,
  } = useAuthContext();
  const [completeProfileOpen, setCompleteProfileOpen] = useState(false);

  const isLaptop = useMediaQuery("(min-width:900px)");
  const isMobile = useMediaQuery("(max-width:600px)");

  const [openForMobile, setopenForMobile] = useState(false);
  const openSidebar = () => {
    setopenForMobile(true);
  };
  const theme = useTheme();
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) push("/auth/login");
  }, []);
  const sectionStyle = {
    minHeight: "100vh",
    height: "100%",
    backgroundImage: `url(/assets/images/dashboardBackground.svg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  useEffect(() => {
    const profile_info = JSON.parse(localStorage.getItem("profile_info"));
    console.log(profile_info?.user?.stripe_identity_status);
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

    if (
      !!profile_info &&
      profile_info?.user?.role == "Practitioner" &&
      !profile_info?.user?.bio
    ) {
      setCompleteProfileOpen(true);
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
          const { error } = await stripe.verifyIdentity(data?.data);
          if (error) {
            toast.success("Thank you for verifying your identity");
          } else {
            toast.error("Unable to verify identity at this time!");
          }
        } catch (error) {
          console.log(error);
        }
      };

      verifyStripeIdentity();
    }
    console.log(stripe);
  }, []);

  const verifyStripeIdentity = async () => {
    const { error } = await stripe.verifyIdentity("___________");
    if (error) {
      toast.success("Thank you for verifying your identity with Stripe");
    } else {
      toast.error("Unable to verify identity at this time!");
    }
  };

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
            : "THANK YOU FOR YOUR ORDER. YOUR PROPERTY NFT WILL BE MINTED AS SOON AS THE VERIFICATION PROCESS IS COMPLETE, FOR YOUR SECURITY THE IDENTIFICATION PROCESS MAY TAKE UP TO THREE DAYS"
        }
      />
      <CompletePractitionerProfile
        open={completeProfileOpen}
        setOpen={setCompleteProfileOpen}
        title="Complete Profile"
        text="Please complete your practitioner profile to start minting NFTs"
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
              zIndex: 1,
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
