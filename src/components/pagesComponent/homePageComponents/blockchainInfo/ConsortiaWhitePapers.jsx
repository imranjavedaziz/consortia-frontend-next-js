import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";

function ConsortiaWhitePapers() {
  return (
    <>
      <Box
        sx={{
          paddingX: { xs: "24px", sm: "40px", lg: "120px" },
          paddingY: "30px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          marginTop: { xs: "33px", sm: "120px" },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h2">CONSORTIA WHITEPAPERS</Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                padding: "10px 0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" color="#fff">
                THE CONSORTIA VISION
              </Typography>
            </Box>
            <Box>
              <Typography>
                Consortia put the world&apos;s largest asset class, American
                real estate, on blockchain. Consortia filed for the patent
                regarding all things real estate, blockchain and NFTs in 2018.
                Consortia&apos;s purpose is to satisfy Dodd Frank, fair housing,
                and housing accessibility.
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "30px 0px 10px 0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link
                href="https://docsend.com/view/je7nsx4eyunmyenb"
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
                  READ THE WHITEPAPER
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                padding: "10px 0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" color="#fff">
                REAL ESTATE, NFTS & THE LAW
              </Typography>
            </Box>
            <Box>
              <Typography>
                New digital real estate ownership stuctures are being invented
                every day. What are they and what is legal? This article
                explains the regulatory considerations you need to know to stay
                on the right side of transfer laws, good funds laws, the SEC and
                RESPA.
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "30px 0px 10px 0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link
                href="https://docsend.com/view/mbsghvgbshaiidv7"
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
                  LEARN WHAT&apos;S LEGAL
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                padding: "10px 0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" color="#fff">
                RE DAO
              </Typography>
            </Box>
            <Box>
              <Typography>
                Real estate brokerages, title insurance, escrow settlement
                providers, warranty companies, capital markets lenders, and
                underwriting companies are invited to join the Consortia DAO and
                the future of real estate web 3.0.
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "30px 0px 10px 0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link
                href="https://docsend.com/view/4t7iij3zf89dh3sr"
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
                  JOIN THE RE DAO
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                padding: "10px 0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" color="#fff">
                CONSORTIA FOR CAPITAL MARKETS
              </Typography>
            </Box>
            <Box>
              <Typography>
                Blockchain. It&apos;s the latest buzzword in the tech world, and
                it&apos;s quickly gaining traction in a variety of industries.
                So what is blockchain, and how could it revolutionize real
                estate underwriting and capital markets?
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "30px 0px 10px 0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link
                href="https://docsend.com/view/y3pigaa28xzym36w"
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
                  CAPITAL MARKETS
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ConsortiaWhitePapers;
