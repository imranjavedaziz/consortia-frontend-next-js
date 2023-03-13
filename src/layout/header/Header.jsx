import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthContext } from "../../context/AuthContext";

export const ImageLogo = styled("div")({
  display: "flex",
  // justifyContent: "start",
  alignItems: "center",
});

const NavigationList = styled(ImageLogo)({
  padding: { xs: "unset", md: "0px 100px" },
});

const StyledListItem = styled(ListItem)({
  paddingRight: "0px",
  "& .MuiTypography-root": {},
  "& .MuiListItemButton-root": {
    // borderRadius: "10px",
    color: "#616161",
  },
  "& .Mui-selected": {
    background:
      "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%) !important",
    color: "rgba(59,130,246,.5) !important",
    borderLeft: "3px solid #FFFFFF",
  },
  "& .MuiListItemIcon-root": {
    minWidth: "0px",
  },
  "& .MuiListItemText-root": {
    paddingLeft: "10px",
  },
});

const Header = () => {
  const { route, push } = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();

  const [drawer, setDrawer] = useState(false);

  const isNotLap = useMediaQuery("(max-width:900px)");
  const belowSm = useMediaQuery((theme) =>
    theme.breakpoints.between("xs", "sm")
  );
  const betweenMdAndXl = useMediaQuery((theme) =>
    theme.breakpoints.between("md", "xl")
  );
  const betweenSmMd = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "md")
  );
  useEffect(() => {
    if (!belowSm) setDrawer(false);
  }, [belowSm]);

  const isActive = (path) => {
    return route == path;
  };
  useEffect(() => {
    const token = localStorage.getItem("access");
    const profileInfo = JSON.parse(localStorage.getItem("profile_info"));
    // if (token) {
    //   setIsLoggedIn(true);
    // } else {
    //   setIsLoggedIn(false);
    // }
    if (profileInfo?.user?.role === "Practitioner") {
      if (token && profileInfo?.user?.practitionerType) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        // push("/auth/signup");
      }
    } else {
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, []);

  const navigationItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Training + Community",
      path: "https://consortia.mn.co/sign_in?from=https%3A%2F%2Fconsortia.mn.co%2F",
      target: "_blank",
    },
    {
      name: "About Certified Asset",
      path: "/about-certified-asset",
    },
    {
      name: "Order Certified Asset",
      path: "https://consortia.typeform.com/to/eu6OzeyT#hubspot_utk=xxxxx&hubspot_page_name=xxxxx&hubspot_page_url=xxxxx",
      target: "_blank",
    },
    {
      name: "Contact us",
      path: "https://consortia.typeform.com/inquiry",
      target: "_blank",
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const betweenMdXlMenuItems = navigationItems.slice(0, 3);
  const moreMenuItems = [
    {
      name: "Order Certified Asset",
      path: "https://consortia.typeform.com/to/eu6OzeyT#hubspot_utk=xxxxx&hubspot_page_name=xxxxx&hubspot_page_url=xxxxx",
      target: "_blank",
    },
    {
      name: "Contact us",
      path: "https://consortia.typeform.com/inquiry",
      target: "_blank",
    },
  ];
  const forHamburgerItems = betweenMdXlMenuItems.concat(moreMenuItems);
  forHamburgerItems.push({
    name: "Signup",
    path: "/auth/signup",
    target: "",
  });
  let betweenSmMdItems = navigationItems.slice(0, 2);
  if (betweenSmMd) {
    moreMenuItems.unshift({
      name: "About Certified Asset",
      path: "/about-certified-asset",
    });
  }
  const list = (anchor) => (
    <Box
      sx={{
        width: 250,
        height: "100%",
        background:
          "linear-gradient(94.09deg, #12134D 3.97%, #10053C 51.03%, #12134D 95.99%)",
      }}
      // role="presentation"

      // onKeyDown={() => setDrawer(false)}
    >
      <Box sx={{ display: "flex", justifyContent: "center", padding: "24px" }}>
        <ImageLogo>
          <Image
            src="/assets/images/consortiaLogo.svg"
            width={152}
            height={29}
            alt="Logo"
          />
        </ImageLogo>
      </Box>
      <List>
        {forHamburgerItems.map((text, index) => (
          <StyledListItem
            key={text.name}
            disablePadding
            onClick={() => {
              setDrawer(false), push(text.path);
            }}
          >
            <ListItemButton selected={text.path === route}>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText
                primary={<Typography variant="h5">{text.name}</Typography>}
              />
            </ListItemButton>
          </StyledListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      {!belowSm ? (
        <Grid
          container
          alignItems={"center"}
          sx={{ padding: "50px 0px 80px 0px" }}
        >
          <Grid item xs={2} sm={1}>
            <ImageLogo>
              <Image
                src="/assets/images/consortiaLogo.svg"
                width={isNotLap ? 100 : 111}
                height={58}
                alt="Logo"
              />
            </ImageLogo>
          </Grid>
          <Grid item xs={7} sm={isLoggedIn ? 10 : 8}>
            <NavigationList
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: { xs: 1, md: 2, lg: 3 },
              }}
            >
              {(betweenMdAndXl
                ? betweenMdXlMenuItems
                : betweenSmMd
                ? betweenSmMdItems
                : navigationItems
              ).map((item, i) => {
                return (
                  <Link
                    key={i}
                    href={item.path}
                    target={item.target}
                    passHref={true}
                    style={{ textDecoration: "none" }}
                  >
                    {isActive(item.path) ? (
                      <Typography
                        varaint="h6"
                        fontWeight={500}
                        sx={{
                          // textDecoration: "underline",

                          position: "relative",
                          "::after": {
                            content: "''",
                            width: "100%",
                            position: "absolute",
                            left: "0",
                            bottom: "-1px",
                            height: "3px",
                            background:
                              "linear-gradient(253.4deg, #B731FF 16.47%, #1D2CDF 95.2%)",
                          },
                          textDecorationColor:
                            "linear-gradient(253.4deg, #B731FF 16.47%, #1D2CDF 95.2%)",
                        }}
                      >
                        {item.name}
                      </Typography>
                    ) : (
                      <Typography
                        varaint="h6"
                        fontWeight={500}
                        sx={{ opacity: 0.5 }}
                      >
                        {item.name}
                      </Typography>
                    )}
                  </Link>
                );
              })}
              {(betweenMdAndXl || betweenSmMd) && (
                <Typography
                  varaint="h6"
                  fontWeight={500}
                  sx={{ opacity: 0.5, cursor: "pointer" }}
                  onClick={handleClick}
                >
                  More
                </Typography>
              )}
            </NavigationList>
          </Grid>

          <Grid
            item
            xs={3}
            sm={isLoggedIn ? 1 : 3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              gap: { xs: 1, lg: 3, xl: 3 },
            }}
          >
            {isLoggedIn ? (
              <Link
                href="/dashboard/landing"
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    push("/dashboard/landing");
                  }}
                  sx={{
                    background:
                      "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                    borderRadius: "24px",
                    width: { xs: "70px", md: "140px" },
                    padding: { xs: " 0px 50px", md: "10px 10px" },
                    height: { xs: "25px", md: "33px", xl: "37px" },
                    fontSize: { xs: "13px", xl: "17px" },
                    textTransform: "capitalize",
                  }}
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => push("/auth/signup")}
                  sx={{
                    background:
                      "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                    borderRadius: "24px",
                    width: { xs: "70px", md: "120px" },
                    padding: { xs: "0px", md: "10px 0px" },
                    height: { xs: "25px", md: "33px", xl: "37px" },
                    fontSize: { xs: "13px", xl: "17px" },
                    fontWeight: 700,
                  }}
                >
                  Signup
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => push("/auth/login")}
                  sx={{
                    background:
                      "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                    borderRadius: "24px",

                    width: { xs: "70px", md: "120px" },
                    padding: { xs: "0px", xl: "10px 0px" },
                    height: { xs: "25px", md: "33px", xl: "37px" },
                    fontSize: { xs: "13px", xl: "16px" },
                    fontWeight: 700,
                  }}
                  // onClick={handleClose}
                >
                  Login
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "30px 0px",
            }}
          >
            <Box onClick={() => setDrawer(true)}>
              {/* <ImageLogo> */}
              <Image
                src="/assets/icons/hamburger.svg"
                width={24}
                height={24}
                alt="Logo"
              />
              {/* </ImageLogo> */}
            </Box>
            <Box>
              <ImageLogo>
                <Image
                  src="/assets/images/consortiaLogo.svg"
                  width={isNotLap ? 100 : 180}
                  height={29}
                  alt="Logo"
                />
              </ImageLogo>
            </Box>
            {isLoggedIn ? (
              <Link
                href="/dashboard/landing"
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    push("/dashboard/landing");
                  }}
                  sx={{
                    background:
                      "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                    borderRadius: "24px",
                    width: { xs: "100px", md: "140px" },
                    padding: { xs: "10px 10px" },
                    height: { xs: "25px", md: "33px", xl: "37px" },
                    fontSize: { xs: "13px", xl: "17px" },
                    textTransform: "capitalize",
                  }}
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                {/* <Button
                  variant="contained"
                  color="primary"
                  onClick={() => push("/auth/signup")}
                  sx={{
                    background:
                      "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                    borderRadius: "24px",
                    width: { xs: "70px", md: "120px" },
                    padding: { xs: "0px", md: "10px 0px" },
                    height: { xs: "25px", md: "33px", xl: "37px" },
                    fontSize: { xs: "13px", xl: "17px" },
                    fontWeight: 700,
                  }}
                >
                  Signup
                </Button> */}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => push("/auth/login")}
                  sx={{
                    background:
                      "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                    borderRadius: "24px",

                    width: { xs: "70px", md: "120px" },
                    padding: { xs: "0px", xl: "10px 0px" },
                    height: { xs: "25px", md: "33px", xl: "37px" },
                    fontSize: { xs: "13px", xl: "16px" },
                    fontWeight: 700,
                  }}
                  // onClick={handleClose}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </>
      )}
      <SwipeableDrawer
        // anchor={anchor}
        open={drawer}
        onClose={() => setDrawer(false)}
        onOpen={() => setDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
      {/* <GradientBorderButton btnText='login' /> */}

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {/* <Paper sx={{ width: 320, maxWidth: "100%" }}> */}
        <MenuList>
          {moreMenuItems.map((item, i) => (
            <Link
              key={i}
              href={item.path}
              target={item.target}
              passHref={true}
              style={{ textDecoration: "none" }}
            >
              <MenuItem>
                <ListItemText>
                  <Typography
                    varaint="h6"
                    fontWeight={500}
                    sx={{ opacity: 0.5 }}
                  >
                    {item.name}
                  </Typography>
                </ListItemText>
              </MenuItem>
            </Link>
          ))}
        </MenuList>
        {/* </Paper> */}
      </Menu>
    </>
  );
};

export default Header;
