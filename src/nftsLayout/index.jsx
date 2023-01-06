"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./header/Header";
import SideBar from "./sideBar/SideBar";
import { useTheme } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useTitle } from "../utils/Title";
import { Toaster } from "react-hot-toast";
import CompletePractitionerProfile from "../components/modals/CompletePractitionerProfile";

function NftsLayout({ children }) {
  useTitle("Dashboard");

  const { push } = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const [completeProfileOpen, setCompleteProfileOpen] = useState(false);

  const isLaptop = useMediaQuery("(min-width:900px)");
  const isMobile = useMediaQuery("(max-width:600px)");

  const [openForMobile, setopenForMobile] = useState(false);
  const openSidebar = () => {
    setopenForMobile(true);
  };
  const theme = useTheme();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
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
    if (
      !!profile_info &&
      profile_info?.user?.role == "practitioner" &&
      !profile_info?.user?.bio
    ) {
      setCompleteProfileOpen(true);
    }
  }, []);

  return (
    <>
      <CompletePractitionerProfile
        open={completeProfileOpen}
        setOpen={setCompleteProfileOpen}
        title="Complete Profile"
        text="Please complete your practitioner profile to start minting NFTs"
        btnText1="consumer"
        btnText2="practitioner"
      />
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
