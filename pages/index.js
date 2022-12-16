import { Box, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
    >
      <Box>
        <Box>
          <Typography>
            THE ONLY SEC AND RESPA
            <br /> COMPLIANT BLOCKCHAIN <br />
            SOLUTION
          </Typography>
        </Box>
        <Box sx={{ padding: "32px 0px 40px 0px" }}>
          <Typography>
            Consortia is the only NFT and training solution led by an <br />
            SEC registered investment banker, real estate broker and
            <br /> mortgage loan originator. We focus on SEC rules, RESPA,
            <br /> and Good Funds laws to protect the industry.
          </Typography>
        </Box>
        <Box sx={{display:'flex'}}>
          <Box sx={{paddingRight:"40px"}}>
            <Typography>
              98K+
            </Typography>
            <Typography>
            Properties
            </Typography>
          </Box>
          <Box sx={{paddingRight:"40px"}}>
            <Typography>
              12K+
            </Typography>
            <Typography>
            Practitioner
            </Typography>
          </Box>
          <Box sx={{paddingRight:"40px"}}>
            <Typography>
              15K+
            </Typography>
            <Typography>
            Consumer
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box>
          <Image
            src="/assets/images/landingPageBuilding.svg"
            height={564}
            width={597}
          />
        </Box>
      </Box>
    </Box>
  );
}
