import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Button,
  styled,
  IconButton,
  InputAdornment,
  OutlinedInput,
  useMediaQuery,
  MenuItem,
  Menu,
} from "@mui/material";
import Image from "next/image";

const GradiantTextField = styled(OutlinedInput)(({ theme, Width, Height }) => ({
  borderRadius: "16px",
  backgroundColor: theme.palette.secondary.purpleGray,
  height: Height,
  width: Width,
  "& legend": { display: "none" },
  "& fieldset": { top: 0 },
  "& input::placeholder": {
    color: "#fff",
    fontSize: "16px",
  },
}));

export default function Header() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:1000px)");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const icons = [
    { path: "/assets/icons/setting.svg", name: "setting" },
    { path: "/assets/icons/notifications.svg", name: "notifications" },
    { path: "/assets/icons/userProfile.svg", name: "userProfile" },
  ];
  const handleClick = (event) => {
    // console.log(event.target.alt)
    if (event.target.alt === "setting") {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuItems = [
    { name: "Profile", path: "/assets/icons/profile.svg" },
    { name: "Edit Profile", path: "" },
    { name: "Change Password", path: "" },
    { name: "NFT Wallet", path: "/assets/icons/wallet.svg" },
    { name: "Night Mode", path: "/assets/icons/nightMode.svg" },
  ];
  return (
    <>
      <Box
        sx={{
          margin: !isTablet ? "37px 0px 56px 0px" : "10px 0px",
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <AppBar
          position="static"
          sx={{ background: "transparent !important", boxShadow: "none" }}
        >
          <Toolbar
            sx={{
              padding: "0px !important",
              display: "flex",
              justifyContent: isMobile
                ? "space-around"
                : isTablet
                ? "space-around"
                : "space-between",
            }}
          >
            {/* <Typography sx={{ flexGrow: 1 }}>News</Typography>
             */}
            <GradiantTextField
              variant="body2"
              id="outlined-adornment-amount"
              placeholder="Search"
              autoComplete="off"
              Width={isTablet ? "unset" : "455px"}
              Height={isMobile ? "40px" : "50px"}
              startAdornment={
                <InputAdornment position="start">
                  {/* className={classes.searchIcon} */}
                  <span style={{ display: "flex", alignContent: "center" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      height="20px"
                      width="20px"
                      viewBox="0 0 24 24"
                      className="sc-16r8icm-0 coGWQa"
                    >
                      <path
                        d="M16.4153 16.4153L20 20M18.5455 11.2727C18.5455 15.2893 15.2894 18.5454 11.2728 18.5454C7.25612 18.5454 4 15.2893 4 11.2727C4 7.2561 7.25612 4 11.2728 4C15.2894 4 18.5455 7.2561 18.5455 11.2727Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </span>
                </InputAdornment>
              }
              label="Search"
            />
            <Box
              sx={{
                display: "flex",
                // width:isMobile ? "100%":"auto"
              }}
            >
              {icons.map((item, i) => (
                <IconButton key={item.name + i} onClick={handleClick}>
                  <Image
                    src={item.path}
                    height={isMobile ? 20 : 33}
                    width={33}
                    alt={item.name}
                  />
                </IconButton>
              ))}
              {/* <Button color="inherit">Login</Button> */}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
       sx={{
        '.MuiMenu-paper': {
          backgroundColor:'#fff'
        }
       }}
      >
        {menuItems.map((item, i) => {
          return (
            <>
              <MenuItem onClick={handleClose} >
                <Box>
                  {item.path && <Image
                    src={item.path}
                    alt={item.name}
                    height={18}
                    width={18}
                  />}
                </Box>
                <Typography variant="body2" sx={{color:'black', paddingLeft:'14px'}}>{item.name}</Typography>
              </MenuItem>
            </>
          );
        })}
      </Menu>
    </>
  );
}
