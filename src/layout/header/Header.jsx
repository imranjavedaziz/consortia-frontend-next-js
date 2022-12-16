import React from "react";
import { Grid } from "@mui/material";
import { Box, styled } from "@mui/system";
import Image from "next/image";
import Link from "next/link";

const ImageLogo = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const NavigationList = styled(ImageLogo)({
  padding: "0px 100px",
});
const Header = () => {
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
      <Grid container sx={{ paddingTop: "50px" }}>
        <Grid item xs={2}>
          <ImageLogo>
            <Image
              src="/assets/images/consortiaLogo.svg"
              width={180}
              height={29}
            />
          </ImageLogo>
        </Grid>
        <Grid item xs={8}>
          <NavigationList
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            {navigationItems.map((item, i) => {
              return (
                <>
                  <Link
                    href={item.path}
                    passHref={true}
                    style={{ textDecoration: "none" }}
                  >
                    <Box sx={{ color: "white" }}>{item.name}</Box>
                  </Link>
                </>
              );
            })}
          </NavigationList>
        </Grid>
        <Grid item xs={2} sx={{ display: "flex", justifyContent: "end" }}>
          button
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
