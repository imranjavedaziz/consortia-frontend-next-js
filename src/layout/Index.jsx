import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Index({children}) {
  const router =  useRouter()
  const sectionStyle = {
    minHeight: "100vh",
    height: '100%',
    backgroundImage: `url(/assets/images/mainBackgound.svg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  // console.log('router.sdplit(/',router.pathname.split('/'))

  return (
    <>
     <Head>
      <title>{router.pathname.slice(1)}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
      <Paper
        style={sectionStyle}
      >
        <Box sx={{
          paddingX: { xs: "120px" },
          width:'100%'
        }}>
        <Header />
        {children}
        </Box>
        <Box sx={{
          paddingX: { xs: "120px" },
          width:'100%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
        <Footer />
        </Box>
        

      </Paper>
    </>
  );
}
