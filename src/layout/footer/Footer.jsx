import React from "react";

import Image from "next/image";
import { Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";

function Footer() {
  const betweenSmAndLg = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "lg")
  );
  const belowSm = useMediaQuery((theme) =>
    theme.breakpoints.between("xs", "lg")
  );

  const socilaIcons = [
    {
      icon: "/assets/icons/facebookIcon.svg",
    },
    {
      icon: "/assets/icons/twitterIcon.svg",
    },
    {
      icon: "/assets/icons/discordIcon.svg",
    },
    {
      icon: "/assets/icons/instagramIcon.svg",
    },
    {
      icon: "/assets/icons/redditIcon.svg",
    },
  ];
  const footerContent = [
    { name: "Privacy Policy" },
    { name: "Term of Services" },
    { name: "About us" },
    { name: "Contact us" },
  ];
  return (
    <>
      <Box
        sx={{
          padding: { xs: "24px 0px 12px 0px", sm: "40px 0px 32px 0px" },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Image
            src="/assets/images/colorConsortiaLogo.svg"
            alt="Logo"
            height={betweenSmAndLg ? 22 : belowSm ? 20 : 34}
            width={betweenSmAndLg ? 126 : belowSm ? 114 : 208}
          />
          <Box
            sx={{
              paddingTop: { xs: "12px", sm: "20px" },
              paddingBottom: { xs: "8px", sm: "32px" },
            }}
          >
            <Typography
              variant="body2"
              fontSize="14px"
              sx={{
                opacity: 0.72,
              }}
            >
              Consortia put the world&apos;s largest asset class, <br />
              American residential real estate, on our private,
              <br /> patent pending blockchain.
              <br />
              We use the blockchain to immutably track events tied to real
              estate.
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            {socilaIcons.map((item, i) => {
              return (
                <Box
                  key={i}
                  sx={{ paddingRight: { xs: "8px", sm: "12px", lg: "16px" } }}
                >
                  <Image
                    src={item?.icon}
                    height={betweenSmAndLg ? 24 : belowSm ? 20 : 36}
                    width={betweenSmAndLg ? 24 : belowSm ? 20 : 36}
                    alt="SocialIcons"
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
        {!belowSm && (
          <>
            <Box>
              <Box>
                <Typography variant="h6">MarketPlace</Typography>
              </Box>
              <Box sx={{ paddingTop: "20px" }}>
                {["Lorem Ipsum", "Lorem Ipsum"].map((item, i) => (
                  <Box key={i}>
                    <Typography
                      variant="body2"
                      paddingY={0.5}
                      sx={{
                        opacity: 0.72,
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
              <Box>
                <Typography variant="h6">My Account</Typography>
              </Box>
              <Box sx={{ paddingTop: "20px" }}>
                {["Lorem Ipsum", "Lorem Ipsum"].map((item, i) => (
                  <Box key={i}>
                    <Typography
                      variant="body2"
                      paddingY={0.5}
                      sx={{
                        opacity: 0.72,
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
              <Box>
                <Typography variant="h6">Stay in the loop</Typography>
              </Box>
              <Box sx={{ paddingTop: "20px" }}>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.72,
                  }}
                >
                  Join our mailing list to stay in the loop with our newest
                  <br /> feature releases, NFT drops, and tips and tricks for
                  <br /> navigating NFTs.
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
      {!belowSm && (
        <Box>
          <Box>
            <Typography variant="h6" sx={{ textDecoration: "underline" }}>
              POWERED BY BLOCKCHAIN
            </Typography>
          </Box>
        </Box>
      )}
      {belowSm && <Box sx={{display:'flex',justifyContent:'center',width:'100%',}}>
        {footerContent.map((item, i) => {
          return (
            <Box key={item.name + i} sx={{paddingRight:'12px'}}>
              <Typography variant="body2">{item.name}</Typography>
            </Box>
          );
        })}
      </Box>}
      <Box>
        <Box>
          <Divider
            sx={{ borderBottomWidth: "1px", margin: {xs:"8px 0px 4px 0px", sm:"20px 0px 13px 0px"} }}
          />
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingBottom: {xs:'8px',sm:"16px"},
          }}
        >
          <Typography variant="subtitle2">
            Copyright © 2022 REAL ESTATE CONSORTIA - All Rights Reserved
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
