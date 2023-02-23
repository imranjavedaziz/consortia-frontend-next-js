import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

function BlockchainInfo() {
  const [profileInfo, setProfileInfo] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("access");
    const userData = JSON.parse(localStorage.getItem("profile_info"));
    setProfileInfo({ token, userData: userData?.user });
  }, []);
  console.log(profileInfo);
  const sectionStyle = {
    // minHeight: "100vh",
    backgroundImage: `url(/assets/images/houseBackground.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "250px",
    backgroundPosition: "center",
  };
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
        <Box></Box>
        <Grid container>
          <Grid item xs={6}>
            <Box>
              <Image
                src="/assets/images/teresaSheila.jpg"
                height={300}
                width={550}
                alt="pic"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Typography variant="body2" sx={{ color: "rgb(169, 169, 169)" }}>
                Because keeping you out of an orange jumpsuit is important
              </Typography>
            </Box>
            <Box>
              <Typography variant="h2">
                WHAT IS BLOCKCHAIN? WHAT BLOCKCHAIN IS LEGAL?
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" fontWeight={400}>
                CONSORTIA BLOCKCHAIN COMPLIANCE DESIGNATION (CBCD) Learn
                everything you need to know about web 3.0, blockchain and real
                estate. Go at your own pace. Once you earn your designation,
                you&apos;ll know all the laws and sales opportunities in web 3.0
                Consortia Blockchain Compliance Certification
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
                href="https://consortia.mn.co/"
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
                  I WANT TO GET CERTIFIED
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Box style={sectionStyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="h2">WANT TO SELL FASTER?</Typography>
            <Link
              href="https://consortia.typeform.com/to/eu6OzeyT?typeform-source=localhost#hubspot_utk=xxxxx&hubspot_page_name=xxxxx&hubspot_page_url=xxxxx"
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
                CERTIFY YOUR ASSET TODAY
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>

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
            CERTIFY YOUR PROPERTY BEFORE LISTING OR AS SOON AS YOU GO INTO
            ESCROW
          </Typography>
          <Typography
            variant="subtitle2"
            color="rgb(145, 145, 145)"
            sx={{ padding: "20px 0px" }}
          >
            GET MORE LISTINGS AND GET BUYERS INTO HOMES FASTER
          </Typography>
          <Link
            href="/about-certified-asset"
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
              LEARN MORE ABOUT CERTIFIED ASSET
            </Button>
          </Link>
        </Box>
      </Box>

      <Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", margin: "50px 0px" }}
        >
          <Typography variant="h2">WANT TO MINT YOUR NFTS?</Typography>
        </Box>
        <Grid container>
          <Grid item xs={1.5}></Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <Image
                src="/assets/images/property.jpg"
                height={300}
                width={300}
                style={{ borderRadius: "300px" }}
              />
            </Box>
            <Box sx={{ padding: "10px 0px" }}>
              <Typography variant="h5">PROPERTY NFT</Typography>
            </Box>
            <Box>
              <Typography
                variant="body1"
                fontWeight={400}
                sx={{ textAlign: "center" }}
              >
                The Property NFT is the digital twin of your past sales in web
                3.0. It&apos;s what connects the agent to capital markets for
                the benefit of the homeowner. Now, lenders and secondary markets
                can reference the Consortia Blockchain and YOU the agent as the
                home hero for the life of the property! Map all of your past
                sales on the Consortia global digital twin metaverse.
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
                href={profileInfo?.token ? "/property/mint-nft" : "/auth/login"}
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
                  MINT PROPERTY NFT
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <Image
                src="/assets/images/practitioner.jpg"
                height={300}
                width={300}
                style={{ borderRadius: "300px" }}
              />
            </Box>
            <Box sx={{ padding: "10px 0px" }}>
              <Typography variant="h5">PRACTITIONER NFT</Typography>
            </Box>
            <Box>
              <Typography
                variant="body1"
                fontWeight={400}
                sx={{ textAlign: "center" }}
              >
                What&apos;s the good of a Property NFT if it can&apos;t be tied
                to client&apos;s properties? Your practitioner NFT is what ties
                you to all your past sales and relationships on the Consortia
                Blockchain Global Digital Twin blockchain ledger. Practitioner
                NFTs are available for real estate, title and escrow, and loan
                professionals.
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "30px 0px 10px 0px",
                display: "flex",
                justifyContent: "center",
              }}
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
                MINT PRACTITIONER NFT
              </Button>
            </Box>
          </Grid>
          <Grid item xs={1.5}></Grid>
        </Grid>
      </Box>

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
          <Grid item xs={5}>
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
          <Grid item xs={5}>
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
          <Grid item xs={5}>
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
          <Grid item xs={5}>
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

      <Grid container sx={{ padding: "40px 0px 0px 0px" }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h2">FOR THE LOVE OF THE INDUSTRY</Typography>
          </Box>
          <Box sx={{ paddingTop: "15px" }}>
            <Typography>
              Consortia put the world&apos;s largest asset class, American
              residential real estate, on our private, patent pending
              blockchain.
            </Typography>
          </Box>
          <Box sx={{ paddingTop: "15px" }}>
            <Typography>
              We use the blockchain to immutably track events tied to real
              estate.
            </Typography>
          </Box>
          <Box sx={{ paddingTop: "15px" }}>
            <Typography>
              Consortia was invented by real estate practitioners in San
              Francisco, CA for the betterment of the entire real estate
              industry.
            </Typography>
          </Box>
          <Box sx={{ paddingTop: "15px" }}>
            <Typography>
              Consortia is a proud member of the National Association of
              REALTORS(R) Second Century Ventures REACH global portfolio of
              companies.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </>
  );
}

export default BlockchainInfo;
