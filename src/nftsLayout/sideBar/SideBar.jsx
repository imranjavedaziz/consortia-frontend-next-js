import { useEffect } from "react";
// @mui
import { Box, useMediaQuery } from "@mui/material";
import SidebarList from "./SidebarList";

// ----------------------------------------------------------------------


 const Sidebar = ({setopenForMobile}) => {

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
      }}
    >
      <Box>
        <SidebarList setopenForMobile={setopenForMobile} />
      </Box>
    </Box>
  );
};

export default Sidebar;