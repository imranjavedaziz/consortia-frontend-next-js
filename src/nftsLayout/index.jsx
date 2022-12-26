import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./header/Header";
import SideBar from "./sideBar/SideBar";
import { useTheme } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; 

function NftsLayout({ children }) {
  const isLaptop = useMediaQuery("(min-width:900px)");
  const isMobile= useMediaQuery("(max-width:600px)");

  console.log("isLaptop", isLaptop);
  const [openForMobile, setopenForMobile] = useState(false);
  const openSidebar = () => {
    console.log("opening");
    setopenForMobile(true);
  };
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: {
            md: "flex",
          },
        }}
      >
        <CssBaseline />
        {isLaptop ? ( 
          <Box
            sx={{
              width: "290px",
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
              width: "310px",
              minHeight: "100vh",
              background: theme.palette.background.default,
              position:'absolute',
              zIndex:1
              
            }}
          >
            <SideBar setopenForMobile={setopenForMobile} />
          </Box>
        )}
        <Box
          sx={{
            paddingX: { xs: "40px" },
            width: "100%",
          }}
        >
     {isLaptop &&     <Header />}
          <Box >{children}</Box>
        </Box>
      </Box>
    </>
  );
}

export default NftsLayout;
