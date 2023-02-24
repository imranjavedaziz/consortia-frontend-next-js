import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FloorPlan from "../src/components/pagesComponent/aboutCertifiedAsset/FloorPlan";
import ListingSellHome from "../src/components/pagesComponent/aboutCertifiedAsset/ListingSellHome";
import VirtualSiteInspection from "../src/components/pagesComponent/aboutCertifiedAsset/VirtualSiteInspection";

function AboutCertifiedAsset() {
  return (
    <>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/MkHismvy_00"
            title="The Power of CERTIFIED LISTINGS w/ Blockchain for Real Estate | Consortia Blockchain For Real Estate"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </Box>
      </Box>
      <ListingSellHome />

      <Box sx={{ padding: "70px 0px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="/assets/images/sellHomeInfoForm.jpg"
            alt="pic"
            style={{
              maxWidth: "1223px",
              maxHeight: "616px",
              height: "80%",
              width: "80%",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0px",
          }}
        >
          <Typography variant="h2">TITLE COMMITMENT AND CURATIVE</Typography>
        </Box>
        <Grid container>
          <Grid item xs={2.7}></Grid>
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                // display: "flex",
                // justifyContent: "center",
                padding: "20px 0px",
              }}
            >
              <Typography variant="body1">
                COMPLETE TITLE DUE DILIGENCE FOR LEGAL CONVEYANCE
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                - REDUCE PROCESSOR AND UNDERWRITER TOUCHES ON FILE
              </Typography>
              <Typography variant="h6">
                - COMPLETE TITLE BUNDLE DOCUMENTS INCLUDED IN TITLE NFTSOLUTION:
                PULL THE TITLE REPORT BEFORE LISTING to uncover title defects
                and fix them BEFORE going into escrow. The title commitment is
                100% RESPA compliant. List with confidence. Discover
                encumbrances and title defects, such as tax or solar liens,
                multiple seller signors, etc.
              </Typography>
              <Box sx={{ pt: "20px" }}>
                <Typography variant="h6">
                  - Discover all the title and property claims PRE-LISTING
                </Typography>
                <Typography variant="h6">
                  - Fix title issues BEFORE OR IMMEDIDATELY as you enter escrow
                </Typography>
                <Typography variant="h6">
                  - Title curative begins within 48 hours of finding any issuese
                  on title.{" "}
                </Typography>
                <Typography variant="h6">- Close escrow faster </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={2.3}></Grid>
        </Grid>
      </Box>
      <FloorPlan />
      <VirtualSiteInspection />

      <Box
        sx={{
          paddingX: { xs: "24px", sm: "40px", lg: "120px" },
          paddingY: "50px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          //   marginTop: { xs: "33px", sm: "120px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">
            ORDER YOUR CERTIFIED ASSET NOW
          </Typography>
          <Typography
            variant="subtitle2"
            color="rgb(145, 145, 145)"
            sx={{ padding: "20px 0px" }}
          >
            AND SELL YOUR LISTING FASTER!
          </Typography>
          <Link
            href="https://consortia.typeform.com/to/eu6OzeyT#hubspot_utk=xxxxx&hubspot_page_name=xxxxx&hubspot_page_url=xxxxx"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                background:
                  "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                padding: "15px 40px",
              }}
            >
              ORDER YOUR CERTIFIED ASSET
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default AboutCertifiedAsset;
