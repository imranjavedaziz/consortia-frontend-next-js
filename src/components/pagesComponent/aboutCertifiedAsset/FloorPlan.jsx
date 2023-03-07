import React from "react";
import { Box, Typography, Grid } from "@mui/material";

function FloorPlan() {
  return (
    <>
      <Box
        sx={{
          paddingX: { xs: "24px", sm: "40px", lg: "120px" },
          paddingY: "100px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          //   marginTop: { xs: "33px", sm: "120px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="/assets/images/floorPlan.jpg"
            alt="pic"
            style={{
              maxWidth: "1232px",
              maxHeight: "616px",
              height: "80%",
              width: "80%",
            }}
          />
        </Box>
        <Box sx={{ padding: "30px 0px" }}>
          <Typography variant="h2" textAlign="center">
            DESKTOP, HYBRID, PDR/PDC COMPATIBLE PATENTED FLOOR PLAN
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={2.5}></Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="body1" sx={{ padding: "20px 0px" }}>
              STEP 2: HOW DO I PRICE THE LISTING PERFECTLY? (Pre-appraisal
              package)
            </Typography>
            <Box>
              <Typography variant="h6" color="rgb(145, 145, 145)">
                SOLUTION: MEASURE THE HOUSE TO THE CENTIMETER with the RemoteVal
                Pre-Appraisal Package. The accurate square footage helps you set
                the PPRSF perfectly ensuring your calculations are on par with
                the appraisal.
              </Typography>
              <Typography variant="h6" color="rgb(145, 145, 145)">
                Also, be 100% Desktop Appraisal ready by having the official
                floor plan done AHEAD of your listing. Desktop Appraisals are
                done in half the time. Fannie/Freddie loans 90% LTV or less are
                eligible for Desktop Appraisal. The package includes GSE
                compliant digital floor plan, data points and pictures required
                by the GSEs. Once you’re in escrow, this package is given to the
                appraiser to complete the appraisal report, helping you sell the
                home faster.
              </Typography>
              <Typography variant="h6" color="rgb(145, 145, 145)">
                BENEFITS: PROMOTES FAIR HOUSING, REDUCE APPRAISAL AND LOAN FEES,
                AND SHORTENS THE APPRAISAL CONTINGENCY PERIOD.
              </Typography>
              <Typography variant="h6" color="rgb(145, 145, 145)">
                - Make your listing desktop appraisal ready
              </Typography>
              <Typography variant="h6" color="rgb(145, 145, 145)">
                - Reduce appraisal fees and time with desktop appraisals
              </Typography>
              <Typography variant="h6" color="rgb(145, 145, 145)">
                - Desktop appraisals are 100% GSE (Fannie and Freddie) approved
                for 90% LTV loans
              </Typography>
              <Typography variant="h6" color="rgb(145, 145, 145)">
                - Do the walk through in 10 minutes
              </Typography>
              <Typography variant="h6" color="rgb(145, 145, 145)">
                - Do it yourself, hire your photographer, or homeowner or tenant
                (perfect to prevent COVID delays!)
              </Typography>
              <Typography variant="h6" color="rgb(145, 145, 145)">
                - Automatically generates 3D Mesh/Measurement via AI and
                ComputerVision Compliant Floorplan created from 3D Mesh
              </Typography>
              <Typography variant="h6" color="rgb(145, 145, 145)">
                - Floor plans uploaded and shareable on blockchain
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2.5}></Grid>
        </Grid>
      </Box>
    </>
  );
}

export default FloorPlan;
