import { useEffect } from "react";
// @mui
import { Box, Typography, useMediaQuery } from "@mui/material";
import SidebarList from "./SidebarList";
import Image from "next/image";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------

const Sidebar = ({ setopenForMobile }) => {
  const { push } = useRouter();

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0, minHeight: "100vh", height: "100%" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          paddingBottom: "80px",
        }}
      >
        <SidebarList setopenForMobile={setopenForMobile} />
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("profile_info");
              push("/");
              // setIsLoggedIn(false);
            }}
          >
            <Image
              src="/assets/icons/logout.svg"
              height={32}
              width={32}
              alt="logout"
            />
            <Typography variant="h5" sx={{ paddingLeft: "12px" }}>
              Logout
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
