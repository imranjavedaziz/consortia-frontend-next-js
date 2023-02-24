import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

function VirtualSiteInspection() {
  return (
    <>
      <Box sx={{ padding: "70px 0px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="/assets/images/virtualSiteInspection.jpg"
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
          <Typography variant="h2">VIRTUAL SITE INSPECTION</Typography>
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
                STEP 3: HOW DO I ACCURATELY AND LEGALLY DISCLOSE THE CONDITION
                OF THE PROPERTY? (Visual documentatio
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                SOLUTION: VISUAL INSPECTION DISCLOSURES with Nationwide Virtual
                Site Inspections. Remove the legal ambiguity of “he said/she
                said” disclosures. Supplement your seller and agent inspection
                disclosures with visual assets to document property condition.
              </Typography>
              <Typography variant="h6">
                BENEFITS: REDUCE SELLER AND BROKER LIABILITY.
              </Typography>

              <Typography variant="h6">
                Capture a virtual site inspection to supplement your agent
                inspection. Reduce liabitilies agent&apos;s written disclosures
                with the following virtual site inspection features:
              </Typography>
              <Typography variant="h6">
                1. Capture time-stamped videos and photographs of agent&apos;s
                inspection disclosures
              </Typography>
              <Typography variant="h6">
                2. All images are geostamped for veracity
              </Typography>
              <Typography variant="h6">
                3. Third party arms-length inspection ensures integrity of your
                inspection process and provides verifiable proof video of your
                walk through. How it works:
              </Typography>
              <Typography variant="h6">
                1. Agent receives an SMS message with a link to join.
              </Typography>
              <Typography variant="h6">
                2. Agent clicks on the link. No app to download.
              </Typography>
              <Typography variant="h6">
                3. Captures images and log GPS location instantly in real time.
              </Typography>
              <Typography variant="h6">
                4. Work with a site inspector virtually as you walk the
                property.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2.3}></Grid>
        </Grid>
      </Box>
    </>
  );
}

export default VirtualSiteInspection;
