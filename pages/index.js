import { Box, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import PolygonButton from "../src/components/common/PolygonButton";
import NftLandingPageSection from "../src/components/NftLandingPageSection";
import { useTitle } from "../src/utils/Title";
import styles from "../styles/Home.module.css";

export default function Home() {
  useTitle("Home");

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
          <Box sx={{ padding: "32px 0px 40px 0px" }}>
            <Typography
              variant="body1"
              fontWeight={400}
              sx={{ color: "#FAFBFC" }}
            >
              Consortia is the only NFT and training solution led by an <br />
              SEC registered investment banker, real estate broker and
              <br /> mortgage loan originator. We focus on SEC rules, RESPA,
              <br /> and Good Funds laws to protect the industry.
            </Typography>
            <PolygonButton />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ paddingRight: "40px" }}>
              <Typography variant="h2">98K+</Typography>
              <Typography variant="h5">Properties</Typography>
            </Box>
            <Box sx={{ paddingRight: "40px" }}>
              <Typography variant="h2">12K+</Typography>
              <Typography variant="h5">Practitioner</Typography>
            </Box>
            <Box sx={{ paddingRight: "40px" }}>
              <Typography variant="h2">15K+</Typography>
              <Typography variant="h5">Consumer</Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Image
              src="/assets/images/landingPageBuilding.svg"
              alt="Logo"
              height={564}
              width={597}
              style={{ width: "100%" }}
            />
          </Box>
        </Box>
      </Box>
      <NftLandingPageSection />
    </>
  );
}
