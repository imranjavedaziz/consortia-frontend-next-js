import { useEffect } from "react";
// @mui
import { Box, Typography, useMediaQuery } from "@mui/material";
import SidebarList from "./SidebarList";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthContext } from "../../context/AuthContext";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------

const SideBarParent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  paddingBottom: "80px",
  borderRight: `0.5px solid ${theme.palette.secondary.darkGray}`,
}));
const Sidebar = ({ setopenForMobile }) => {
  const { push } = useRouter();
  const { setChoosePractitionerOpen } = useAuthContext();

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0, minHeight: "100vh", height: "100%" },
      }}
    >
      <SideBarParent>
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
              setChoosePractitionerOpen(true);
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
      </SideBarParent>
    </Box>
  );
};

export default Sidebar;
