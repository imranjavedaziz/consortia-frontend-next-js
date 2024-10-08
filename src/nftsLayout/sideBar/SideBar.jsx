import { Box } from "@mui/material";
import SidebarList from "./SidebarList";
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
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0, minHeight: "100vh", height: "100%" },
      }}
    >
      <SideBarParent>
        <SidebarList setopenForMobile={setopenForMobile} />
        {/* <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              setShowSecondForm(false);
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
        </Box> */}
      </SideBarParent>
    </Box>
  );
};

export default Sidebar;
