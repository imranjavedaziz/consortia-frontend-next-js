import React from "react";

import Image from "next/image";
import { Divider, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";

function Footer() {
  const upSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const belowSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
    { name: "About Certified Asset", path: "/about-certified-asset" },
    {
      name: "Order Certified Asset",
      path: "https://reconsortia.com/order-certified-asset",
      target: "_blank",
    },
    { name: "Privacy Policy", path: "privacy-policy" },
    { name: "Term of Services", path: "/terms-of-services" },
    {
      name: "Contact us",
      path: "https://consortia.typeform.com/inquiry?typeform-source=reconsortia.com",
      target: "_blank",
    },
  ];
  return (
    <>
      <Box
        sx={{
          padding: { xs: "24px 0px 12px 0px", sm: "40px 0px 20px 0px" },
          display: "flex",
          justifyContent: { xs: "space-between", md: "space-between" },
          // flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "space-between" },
          }}
        >
          <Image
            src="/assets/images/consortiaLogo.svg"
            alt="Logo"
            height={upSm ? 74 : belowSm ? 20 : 34}
            width={upSm ? 126 : belowSm ? 114 : 208}
          />

          {/* <Box
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
          </Box> */}
          {/* <Box sx={{ display: "flex" }}>
            {socilaIcons.map((item, i) => {
              return (
                <Box
                  key={i}
                  sx={{ paddingRight: { xs: "8px", sm: "12px", lg: "16px" } }}
                >
                  <Image
                    src={item?.icon}
                    height={upSm ? 24 : belowSm ? 20 : 36}
                    width={upSm ? 24 : belowSm ? 20 : 36}
                    alt="SocialIcons"
                  />
                </Box>
              );
            })}
          </Box> */}
        </Box>
        {/* {!belowSm && (
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
        )} */}

        {true && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            {footerContent.map((item, i) => {
              return (
                <Link
                  href={item.path}
                  target={item.target}
                  style={{
                    textDecoration: "none",
                  }}
                  key={i}
                >
                  <Box
                    key={item.name + i}
                    sx={{
                      paddingRight: "12px",
                      paddingTop: { xs: "15px", sm: "0px" },
                    }}
                  >
                    <Typography variant="subtitle2">{item.name}</Typography>
                  </Box>
                </Link>
              );
            })}
          </Box>
        )}
        {!belowSm && (
          <Box>
            <Box>
              <Typography variant="h6" sx={{ textDecoration: "underline" }}>
                POWERED BY BLOCKCHAIN
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      <Box>
        <Box>
          <Divider
            sx={{
              borderBottomWidth: "1px",
              margin: { xs: "8px 0px 4px 0px", sm: "20px 0px 13px 0px" },
            }}
          />
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingBottom: { xs: "8px", sm: "16px" },
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
