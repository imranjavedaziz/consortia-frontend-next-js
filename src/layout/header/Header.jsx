import React from "react";
import { Grid, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const ImageLogo = styled("div")({
  display: "flex",
  // justifyContent: "start",
  alignItems: "center",
});
const NavigationList = styled(ImageLogo)({
  padding: "0px 100px",
});
const Header = () => {
  const { route } = useRouter();
  const isActive = (path) => {
    return route == path;
  };

  const navigationItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Community",
      path: "/community/Community",
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
    {
      name: "About",
      path: "/about-us",
    },
    {
      name: "Contact",
      path: "/contact-us",
    },
  ];
  return (
    <>
      <Grid container sx={{ padding: "50px 0px 80px 0px" }}>
        <Grid item xs={2}>
          <ImageLogo>
            <Image
              src="/assets/images/consortiaLogo.svg"
              width={180}
              height={29}
              alt="Logo"
            />
          </ImageLogo>
        </Grid>
        <Grid item xs={8}>
          <NavigationList
            sx={{ display: "flex", justifyContent: "space-around" }}
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
          xs={2}
          sx={{ display: "flex", justifyContent: "end" }}
        ></Grid>
      </Grid>
    </>
  );
};

export default Header;
