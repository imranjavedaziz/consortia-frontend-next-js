import React from "react";
import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { Box, styled } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import GradientBorderButton from "../../components/common/gradientBorderButton/GradientBorderButton";
import { useAuthContext } from "../../context/AuthContext";

export const ImageLogo = styled("div")({
  display: "flex",
  // justifyContent: "start",
  alignItems: "center",
});

const NavigationList = styled(ImageLogo)({
  padding: { xs: "unset", md: "0px 100px" },
});

const Header = () => {
  const { route, push } = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();

  const isNotLap = useMediaQuery("(max-width:900px)");

  const isActive = (path) => {
    return route == path;
  };

  const goToSignup = () => {};

  const navigationItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Community",
      path: "/community",
    },
    {
      name: "Training",
      path: "/training",
    },
    {
      name: "About us",
      path: "/about-us",
    },
    {
      name: "Contact us",
      path: "/contact-us",
    },
  ];
  return (
    <>
      <Grid
        container
        alignItems={"center"}
        sx={{ padding: "50px 0px 80px 0px" }}
      >
        <Grid item xs={2}>
          <ImageLogo>
            <Image
              src="/assets/images/consortiaLogo.svg"
              width={isNotLap ? 100 : 180}
              height={29}
              alt="Logo"
            />
          </ImageLogo>
        </Grid>
        <Grid item xs={7}>
          <NavigationList
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: { xs: 1, md: 2, lg: 4 },
            }}
          >
            {navigationItems.map((item, i) => {
              return (
                <Link
                  key={i}
                  href={item.path}
                  passHref={true}
                  style={{ textDecoration: "none" }}
                >
                  {isActive(item.path) ? (
                    <Typography
                      varaint="h6"
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
                    <Typography varaint="h6" sx={{ opacity: 0.5 }}>
                      {item.name}
                    </Typography>
                  )}
                </Link>
              );
            })}
          </NavigationList>
        </Grid>

        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: { xs: 1, lg: 3, xl: 4 },
          }}
        >
          {isLoggedIn ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                localStorage.removeItem("access_token");
                setIsLoggedIn(false);
              }}
              sx={{
                background:
                  "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                borderRadius: "24px",
                width: { xs: "70px", md: "120px" },
                padding: { xs: "0px", md: "10px 0px" },
                height: { xs: "25px", md: "33px", xl: "37px" },
                fontSize: { xs: "13px", xl: "17px" },
              }}
            >
              Logout
            </Button>
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
                }}
                // onClick={handleClose}
              >
                Login
              </Button>
            </>
          )}
        </Grid>
      </Grid>
      {/* <GradientBorderButton btnText='login' /> */}
    </>
  );
};

export default Header;
