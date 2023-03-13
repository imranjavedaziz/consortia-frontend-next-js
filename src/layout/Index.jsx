import React, { useState } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Index({ children }) {
  const router = useRouter();
  const sectionStyle = {
    minHeight: "100vh",
    height: "100%",
    backgroundImage: `url(/assets/images/mainBackgound.svg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  const [openForMobile, setopenForMobile] = useState(false);
  const openSidebar = () => {
    setopenForMobile(true);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box style={sectionStyle}>
        <Box
          sx={{
            paddingX: { xs: "20px", md: "30", lg: "120px" },
            width: "100%",
          }}
        >
          <Header />
          {children}
        </Box>
        <Box
          sx={{
            paddingX: { xs: "24px", sm: "40px", lg: "120px" },
            width: "100%",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            marginTop: { xs: "33px", sm: "120px" },
          }}
        >
          <Footer />
        </Box>
      </Box>
    </>
  );
}
