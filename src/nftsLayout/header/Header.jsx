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
import { useRouter } from "next/router";
import { useAuthContext } from "../../context/AuthContext";
import { removeCookies } from "../../utils/cookies/Cookie";
// import { publicAxios } from "../../api";
// import { STRIPE_VERIFY_IDENTITY } from "../../constants/endpoints";
// import toast from "react-hot-toast";

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
  const {
    setChoosePractitionerOpen,
    setShowSecondForm,
    refetchFromLocalStorage,
    // setOpenVerificationFailure,
    // setOpenVerificationSuccess,
  } = useAuthContext();
  const { push } = useRouter();
  const [profileImg, setProfileImg] = React.useState(null);
  React.useEffect(() => {
    const profile_img = JSON.parse(localStorage.getItem("profile_info"))?.user
      ?.headshot;
    if (typeof profile_img == "string" && profile_img?.length > 1) {
      setProfileImg(profile_img);
    }
  }, [refetchFromLocalStorage]);

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:1000px)");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const icons = [
    { path: "/assets/icons/setting.svg", name: "setting" },
    // { path: "/assets/icons/notifications.svg", name: "notifications" },
    { path: "/assets/icons/profileImage.svg", name: "userProfile" },
  ];
  const handleClick = (event) => {
    // console.log(event.target.alt)
    if (event.target.alt === "setting") {
      setAnchorEl(event.currentTarget);
    }
    if (event.target.alt === "userProfile") {
      push("/dashboard/edit-profile");
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuItems = [
    {
      name: "Profile",
      path: "/assets/icons/profile.svg",
      rel: "/dashboard/edit-profile",
    },
    // { name: "Edit Profile", path: "", rel: "edit-profile" },
    {
      name: "Change Password",
      path: "/assets/icons/changePassword.svg",
      rel: "/dashboard/change-password",
    },
    // {
    //   name: "NFT Wallet",
    //   path: "/assets/icons/wallet.svg",
    //   rel: "/nftWallet/NftWallet",
    // },
    // { name: "Night Mode", path: "/assets/icons/nightMode.svg" },
    // { name: "Verify Identity", path: "/assets/icons/profile.svg" },
    { name: "Logout", path: "/assets/icons/logout.svg" },
  ];

  // const verifyStripeIdentity = async () => {
  //   debugger
  //   try {
  //     const { data } = await publicAxios.post(
  //       "create-verification-session",
  //       {
  //         // [true ? "practitioner_nft" : "property_nft"]: res?.data?.data?.id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("access")}`,
  //         },
  //       }
  //     );

  //     const { error } = await stripe.verifyIdentity(data?.data);
  //     if (error) {
  //       const res = await publicAxios.post(
  //         STRIPE_VERIFY_IDENTITY,
  //         {
  //           stripe_identity_progress: "cancelled",
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("access")}`,
  //           },
  //         }
  //       );
  //       setOpenVerificationFailure(true);
  //     } else {
  //       const res = await publicAxios.post(
  //         STRIPE_VERIFY_IDENTITY,
  //         {
  //           stripe_identity_progress: "completed",
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("access")}`,
  //           },
  //         }
  //       );
  //       const old_profile_info = JSON.parse(
  //         localStorage.getItem("profile_info")
  //       );
  //       const new_profile_info = {
  //         ...old_profile_info,
  //         user: {
  //           ...old_profile_info.user,
  //           stripe_identity_status: true,
  //         },
  //       };
  //       localStorage.setItem("profile_info", JSON.stringify(new_profile_info));
  //       setOpenVerificationSuccess(true);
  //     }
  //   } catch (error) {
  //     if (Array.isArray(error?.data?.message)) {
  //       toast.error(error?.data?.message?.error?.[0]);
  //     } else {
  //       if (typeof error?.data?.message === "string") {
  //         toast.error(error?.data?.message);
  //       } else {
  //         toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
  //       }
  //     }
  //   }
  // };
  return (
    <>
      <Box
        sx={{
          margin: !isTablet ? "37px 0px 56px 0px" : "10px 10px",
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
              justifyContent: isMobile ? "end" : isTablet ? "end" : "end",
            }}
          >
            {/* <Typography sx={{ flexGrow: 1 }}>News</Typography>
             */}
            {/* <GradiantTextField
              variant="body2"
              id="outlined-adornment-amount"
              placeholder="Search"
              autoComplete="off"
              Width={isTablet ? "unset" : "455px"}
              Height={isMobile ? "40px" : "50px"}
              startAdornment={
                <InputAdornment position="start">
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
            /> */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                // width:isMobile ? "100%":"auto"
              }}
            >
              {icons.map((item, i) =>
                item.name == "userProfile" ? (
                  <IconButton
                    key={item.name + i}
                    onClick={handleClick}
                    sx={{
                      borderRadius: "50%",
                      border: "2px solid #1D2CDF",
                      overflow: "hidden",
                      width: "30px",
                      height: "30px",
                    }}
                  >
                    <Image
                      src={
                        item.name == "userProfile" && !!profileImg
                          ? profileImg
                          : item.path
                      }
                      layout="fill"
                      objectFit="cover"
                      // height={isMobile ? 20 : 33}
                      // width={33}
                      alt={item.name}
                    />
                  </IconButton>
                ) : (
                  <IconButton key={item.name + i} onClick={handleClick}>
                    <Image
                      src={item.path}
                      height={isMobile ? 20 : 33}
                      width={33}
                      alt={item.name}
                    />
                  </IconButton>
                )
              )}
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
          ".MuiMenu-paper": {
            backgroundColor: "#fff",
          },
        }}
      >
        {menuItems.map((item, i) => {
          return (
            <>
              <MenuItem
                onClick={() => {
                  if (item.name === "Logout") {
                    setShowSecondForm(false);
                    setChoosePractitionerOpen(true);
                    localStorage.removeItem("access");
                    localStorage.removeItem("profile_info");
                    removeCookies("access");
                    removeCookies("signup_info");
                    removeCookies("profile_info");
                    push("/");
                  }

                  // if (item.name === "Verify Identity") {
                  //   verifyStripeIdentity();
                  // }

                  item?.rel && push(item?.rel);
                  handleClose();
                }}
              >
                <Box>
                  {item.path && (
                    <Image
                      src={item.path}
                      alt={item.name}
                      height={18}
                      width={18}
                    />
                  )}
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "black", paddingLeft: "14px" }}
                >
                  {item.name}
                </Typography>
              </MenuItem>
            </>
          );
        })}
      </Menu>
    </>
  );
}
