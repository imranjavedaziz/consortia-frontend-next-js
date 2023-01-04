import React, { useEffect, useState } from "react";
import NftsLayout from "../../src/nftsLayout";
import {
  Box,
  Typography,
  styled,
  Button,
  Radio,
  Checkbox,
  Grid,
} from "@mui/material";
import Image from "next/image";
import NftCard from "../../src/components/common/NftCard";

const GradientMintPropertyNfts = styled(Box)(({ theme }) => ({
  width: "100%",
  background: theme.palette.border.default,
  borderRadius: "24px",
  padding: "1px",
  marginTop: "40px",
  marginBottom:'120px'
}));
const MintPropertyNfts = styled(Box)(({ theme }) => ({
  width: "100%",
  background: theme.palette.background.default,
  borderRadius: "24px",
  padding: "40px",
}));
const NftsCards = styled(Box)(({ theme }) => ({
  marginTop: "48px",
}));

const Credits = () => {
  const [profileInfo, setProfileInfo] = useState({});
  useEffect(() => {
    setProfileInfo(JSON.parse(localStorage.getItem("profile_info")));
  }, []);

  console.log("profileInfo", profileInfo);
  return (
    <>
      <Box>
        <Box>
          <Typography variant="h3">My Wallet</Typography>
        </Box>
        <GradientMintPropertyNfts>
          <MintPropertyNfts>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" fontWeight={600}>
                Mint Property NFTs
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ display: "flex", paddingRight: "10px" }}>
                  <Image
                    src="/assets/icons/viewAll.svg"
                    height={20}
                    width={20}
                  />
                </Box>
                <Typography variant="body1">View All</Typography>
              </Box>
            </Box>
            <NftsCards>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "space-between" },
                  rowGap: 2,
                  flexWrap: "wrap",
                }}
              >
                {[1, 2, 3,4].map((item, i) => (
                  <NftCard key={i} />
                ))}
              </Box>
            </NftsCards>

            {profileInfo?.user?.role === "practitioner" && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop:'40px'
                  }}
                >
                  <Typography variant="h4" fontWeight={600}>
                    Mint Practitioner NFTs
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ display: "flex", paddingRight: "10px" }}>
                      <Image
                        src="/assets/icons/viewAll.svg"
                        height={20}
                        width={20}
                      />
                    </Box>
                    <Typography variant="body1">View All</Typography>
                  </Box>
                </Box>
                <NftsCards>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "center", md: "space-between" },
                      rowGap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    {[1, 2, 3,4].map((item, i) => (
                      <NftCard key={i} />
                    ))}
                  </Box>
                </NftsCards>
              </>
            )}
          </MintPropertyNfts>
        </GradientMintPropertyNfts>
      </Box>
    </>
  );
};

export default Credits;
Credits.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};
