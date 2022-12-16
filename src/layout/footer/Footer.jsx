import React from "react";

import { Grid, Typography } from "@mui/material";
import Image from "next/image";
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
      <Box sx={{padding:'40px 0px',display:'flex',justifyContent:'space-between'}}>
        <Box>
          <Image
            src="/assets/images/colorConsortiaLogo.svg"
            height={34}
            width={208}
          />
          <Box sx={{paddingTop:'20px',paddingBottom:'32px'}}>
            Consortia put the world's largest asset class, <br />
            American residential real estate, on our private,
            <br /> patent pending blockchain.
          </Box>
          <Box sx={{ display: "flex" }}>
            {socilaIcons.map((item) => {
              return (
                <Box sx={{ paddingRight: "16px" }}>
                  <Image src={item?.icon} height={36} width={36} />
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box>
          <Box >Market Place</Box>
          <Box sx={{paddingTop:'20px'}}>
          {[
            "All NFTs",
            "Artworks",
            "Sports",
            "Utility",
            "Music",
            "Terms & Conditions",
            "FAQs",
          ].map((item) => (
            <Box>
              <Typography>{item}</Typography>
            </Box>
          ))}
          </Box>
          
        </Box>
        <Box>
          <Box>My Account</Box>
          <Box sx={{paddingTop:'20px'}}>
          {["Profile", "Lorem Ipsum", "My Collections", "Lorem Ipsum"].map(
            (item) => (
              <Box >
                <Typography>{item}</Typography>
              </Box>
            )
          )}
        </Box>
        </Box>
        <Box>
          <Box>Stay in the loop</Box>
          <Box sx={{paddingTop:'20px'}}>
            Join our mailing list to stay in the loop with our newest<br/> feature
            releases, NFT drops, and tips and tricks for<br/> navigating NFTs.
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
