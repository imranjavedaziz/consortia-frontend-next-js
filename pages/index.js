import { Box, Typography, useMediaQuery } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import PolygonButton from "../src/components/common/PolygonButton";
import BlockchainInfo from "../src/components/homePageComponents/blockchainInfo/BlockchainInfo";
import NftLandingPageSection from "../src/components/NftLandingPageSection";
import { useTitle } from "../src/utils/Title";
import styles from "../styles/Home.module.css";

export default function Home() {
  useTitle("Home");

  const betweenSmAndLg = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "lg")
  );
  const belowSm = useMediaQuery((theme) =>
    theme.breakpoints.between("xs", "sm")
  );
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Box>
          <Box>
            <Typography variant="h3">
              THE ONLY SEC AND RESPA
              <br /> COMPLIANT BLOCKCHAIN <br />
              SOLUTION
            </Typography>
          </Box>
          <Box
            sx={{
              padding: { xs: "8px 0px 20px 0px", sm: "32px 0px 40px 0px" },
            }}
          >
            <Typography
              variant="body1"
              fontWeight={400}
              sx={{ color: "#FAFBFC" }}
            >
              Consortia is the only NFT and training solution led by an <br />
              SEC registered investment banker, real estate broker and
              <br /> mortgage loan originator. We focus on SEC rules, RESPA,
              <br /> and Good Funds laws to protect the industry.Consortia is
              <br />
              NOT a crypto. We do NOT sell homes as NFTs.
            </Typography>
            <PolygonButton />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "start", xs: "center" },
            }}
          >
            <Box sx={{ paddingRight: { lg: "40px", sm: "20px", xs: "12px" } }}>
              <Typography variant="h2">98K+</Typography>
              <Typography variant="h5" fontWeight={600}>
                Properties
              </Typography>
            </Box>
            <Box sx={{ paddingRight: { lg: "40px", sm: "20px", xs: "12px" } }}>
              <Typography variant="h2">12K+</Typography>
              <Typography variant="h5" fontWeight={600}>
                Practitioner
              </Typography>
            </Box>
            <Box sx={{ paddingRight: { lg: "40px", sm: "20px", xs: "12px" } }}>
              <Typography variant="h2">15K+</Typography>
              <Typography variant="h5" fontWeight={600}>
                Consumer
              </Typography>
            </Box>
          </Box>
        </Box>
        {!belowSm && (
          <Box>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Image
                src="/assets/images/landingPageBuilding.svg"
                alt="Logo"
                height={betweenSmAndLg ? 330 : 564}
                width={betweenSmAndLg ? 349 : 597}
                style={{ width: "100%" }}
                // sizes="(max-width: 600px) 349px,
                // (max-width: 1200px) 50vw,
                // 33vw"
              />
            </Box>
          </Box>
        )}
      </Box>
      <NftLandingPageSection />
      <BlockchainInfo />
    </>
  );
}
