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
        flexShrink: { lg: 0 ,height:'100vh'},
      }}
    >
      <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
        <SidebarList setopenForMobile={setopenForMobile} />
        <Box>
          sfsfaf
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;