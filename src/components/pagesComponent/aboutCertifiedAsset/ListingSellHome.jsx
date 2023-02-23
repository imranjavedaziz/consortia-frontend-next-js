import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

function ListingSellHome() {
  const staticData = [
    {
      heading: "THE SAN FRANCISCO PROCESS: A COMMITMENT TO THE AMERICAN DREAM",
      paragraph:
        "CERIFIED ASSET HAVE BEEN COMMON PRACTICE IN SAN FRANCISCO FOR DECADES. WE DO ALL THE UNDERWRITING ABOUT THE HOME BEFORE LISTING ON THE MLS. AS A RESULT, WE  MOVE QUICKLY THROUGH LISTING AND ESCROW.  WE NOW DO THIS PROCESS EITHER BEFORE THE LISTING GOES ON THE MLS OR AS SOON AS THE PROPERTY GOES INTO CONTRACT. ",
    },
    {
      heading: "DO YOU WANT TO WIN MORE LISTINGS AND SELL HOMES FASTER?",
      paragraph:
        "THE DATA SHOWS US THAT CERTIFIED ASSET GO INTO CONTRACT WITHIN 3-10 DAYS. LENDERS CLOSE LOANS IN 14 DAYS INSTEAD OF 30-45. WHY IS THIS IMPORTANT? BECAUSE LOAN ORIGINATION NOW COSTS OVER $11,000 PER FILE. WHO PAYS THOSE FEES? OUR CLIENTS. LET'S MAKE HOME OWNERSHIP MORE AFFORDABLE BY GETTING ALL OUR LISTINGS THROUGH UNDERWRITING FASTER USING CERTIFIED LISTINGS WITH CONSORTIA.",
    },
    {
      heading: "WHO PAYS FOR THE CERTIFIED ASSET REPORTS?",
      paragraph:
        "EITHER THE BUYER OR SELLER OR THEIR AGENTS CAN PAY FOR THESE REPORTS.",
    },
    {
      heading: "WHO COMPLETES THE CERTIFIED ASSET REPORTS?",
      paragraph:
        "CONSORTIA ONLY CONTRACTS WITH THE HIGHEST CALLIBUR SOC2 PROVIDERS WHICH PRODUCE INSTITUTIONAL GRADE REPORTS FOR BANKS AND LENDERS. ",
    },
  ];
  return (
    <>
      <Box
        sx={{
          paddingX: { xs: "24px", sm: "40px", lg: "120px" },
          paddingY: "100px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          marginTop: { xs: "33px", sm: "120px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          <Typography variant="h2">
            GET MORE LISTINGS & SELL HOMES FASTER
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={4}>
            <Image
              src="/assets/images/sellHome.jpg"
              alt="home"
              height={191}
              width={379}
            />
          </Grid>
          <Grid item xs={8}>
            {staticData.map((item, i) => (
              <Box key={i}>
                <Box pb="10px" pt="10px">
                  <Typography variant="body1" color="#fff">
                    {item.heading}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="rgb(145, 145, 145)">
                    {item.paragraph}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ListingSellHome;
