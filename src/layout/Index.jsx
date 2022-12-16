import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";

export default function Index({children}) {
  const sectionStyle = {
    height: "100vh",
    backgroundImage: `url(/assets/images/mainBackgound.svg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <>
      <Paper
        sx={{
          paddingX: { xs: "120px" },
        }}
        style={sectionStyle}
      >
        <Header />
        {children}
        <Footer />
      </Paper>
    </>
  );
}
