import React from "react";

import Image from "next/image";
import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

function Footer() {
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
  return (
    <>
      <Box
        sx={{
          padding: "40px 0px 32px 0px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Image
            src="/assets/images/colorConsortiaLogo.svg"
            alt="Logo"
            height={34}
            width={208}
          />
          <Box sx={{ paddingTop: "20px", paddingBottom: "32px" }}>
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
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            {socilaIcons.map((item, i) => {
              return (
                <Box key={i} sx={{ paddingRight: "16px" }}>
                  <Image
                    src={item?.icon}
                    height={36}
                    width={36}
                    alt="SocialIcons"
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box>
          <Box>
            <Typography variant="h6">MarketPlace</Typography>
          </Box>
          <Box sx={{ paddingTop: "20px" }}>
            {["Lorem Ipsum", "Lorem Ipsum"].map((item, i) => (
              <Box key={i}>
                <Typography
                  variant="body2"
                  fontSize="14px"
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
                  fontSize="14px"
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
              fontSize="14px"
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
      </Box>
      <Box>
        <Box>
          <Typography variant='h6' sx={{textDecoration:'underline'}}>POWERED BY BLOCKCHAIN</Typography>
        </Box>
      </Box>
      <Box>
        <Box><Divider sx={{borderBottomWidth:'1px',margin:'20px 0px 13px 0px'}} /></Box>
      </Box>
      <Box>
        <Box sx={{width:'100%', display:'flex',justifyContent:'center', paddingBottom:'16px'}}>
          <Typography variant='subtitle2'>Copyright © 2022 REAL ESTATE CONSORTIA - All Rights Reserved</Typography>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
