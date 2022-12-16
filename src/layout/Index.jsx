import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";

export default function Index({children}) {
  const sectionStyle = {
    minHeight: "100vh",
    height: '100%',
    backgroundImage: `url(/assets/images/mainBackgound.svg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <>
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
