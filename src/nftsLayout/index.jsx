import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./header/Header";
import SideBar from "./sideBar/SideBar";

function NftsLayout({ children }) {
  return (
    <>
      <Box
        sx={{
          display: {
            md: "flex",
            width: "100%",
          },
        }}
      >
        <CssBaseline />
        {/* <Header
            drawerWidth={drawerWidth}
            handleDrawerToggle={handleDrawerToggle}
          /> */}
        <Box sx={{ width: "290px" }}>
          <SideBar />
        </Box>
        <Box
          sx={{
            paddingX: { xs: "40px" },
            width: "100%",
          }}
        >
          <Header />
          <Box>{children}</Box>
        </Box>
      </Box>
    </>
  );
}

export default NftsLayout;
