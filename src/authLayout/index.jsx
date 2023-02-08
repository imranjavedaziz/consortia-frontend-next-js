import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function Index({ children }) {
  const { push } = useRouter();
  const { setShowSecondForm } = useAuthContext();

  useEffect(() => {
    const token = localStorage.getItem("access");
    const profileInfo = JSON.parse(localStorage.getItem("profile_info"));
    console.log("profileInfo", profileInfo);
    if (profileInfo?.user?.role === "Practitioner") {
      if (token && profileInfo?.user?.practitionerType ) {
        push("/dashboard/landing");
      } else {
        // setShowSecondForm(true)
        push("/auth/login");
      }
    } else {
      if (token) push("/dashboard/landing");
    }
  }, []);
  const sectionStyle = {
    minHeight: "100vh",
    height: "100%",
    backgroundImage: `url(/assets/images/dashboardBackground.svg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <>
      <Head>
        <title>Consortia </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Toaster position="top-center" reverseOrder={false} />

      <Box sx={{ height: "100%", minHeight: "100vh" }} style={sectionStyle}>
        {children}
      </Box>
    </>
  );
}

export default Index;
