import React, { useEffect, useState } from "react";
import { Box, Typography, styled, Grid, CardMedia } from "@mui/material";
import NftsLayout from "../../src/nftsLayout";
import Image from "next/image";
import NftCard from "../../src/components/common/NftCard";

const GradientBorderContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  background: theme.palette.border.default,
  borderRadius: "24px",
  padding: "1px",
  marginTop: "40px",
  marginBottom: "48px",
}));
const NftDetailPageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  background: theme.palette.background.default,
  borderRadius: "24px",
  padding: "33px 40px 40px 40px",
}));
const CheckboxStyled = styled(Box)(({ theme }) => ({
  // '& .MuiCheckbox-root':{
  // color:'red'
  // },
  // '& .Mui-checked':{
  // color:"red"
  // }
}));
const NftsCards = styled(Box)(({ theme }) => ({
  marginTop: "32px",
  marginBottom:'120px'
}));

const Practitioner2 = () => {
  return (
    <>
      <Box>
        <Box>
          <Typography variant="h3"> Detail page</Typography>
        </Box>
        <GradientBorderContainer>
          <NftDetailPageContainer>
            <Grid container>
              <Grid item xs={3}>
                <CardMedia
                  component="img"
                  height="328px"
                  // width="250px"
                  alt="nft card Icon"
                  image="/assets/images/nftCard.png"
                  sx={{ borderRadius: "16px" }}
                ></CardMedia>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ padding: "24px 0px 12px 0px" }}
                  >
                    US-06041-N
                  </Typography>
                </Box>
                <Box
                  sx={{display:'flex'}}
                >
                  <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingRight:'45px'
                  }}>
                    <Typography variant="body2">Minter</Typography>
                    <Box sx={{padding:'8px 0px'}}>
                      <Image
                        height={80}
                        width={80}
                        // width="250px"
                        alt="Minter avtar"
                        src="/assets/icons/profileImage.svg"
                        sx={{ borderRadius: "50px" }}
                      />
                    </Box>
                    <Typography variant="subtitle1">Sam Anderson</Typography>
                  </Box>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                    <Typography variant="body2">Owner</Typography>
                    <Box sx={{padding:'8px 0px'}}>
                      <Image
                        height={80}
                        width={80}
                        // width="250px"
                        alt="Minter avtar"
                        src="/assets/icons/profileImage.svg"
                        sx={{ borderRadius: "50px" }}
                      />
                    </Box>
                    <Typography variant="subtitle1">John Doe</Typography>
                  </Box>
                </Box>
                <Box sx={{padding:'24px 0px 16px 0px'}}>
                  <Typography variant="h5">
                  Selected Category:
                  </Typography>
                </Box>
                <Box sx={{display:'flex'}}>
                  <Typography variant="body2" sx={{paddingRight:'8px'}}>
                  Document Name:
                  </Typography>
                  <Typography variant="body2">
                    Deed
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={9} sx={{paddingLeft:'80px'}}>
                <Box>
                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography variant="h5"> 
                    Transaction History
                    </Typography>
                    <Image src='/assets/icons/export.svg' height={32} width={32} />
                  </Box>
                </Box>

              </Grid>
            </Grid>
          </NftDetailPageContainer>
        </GradientBorderContainer>
        <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" fontWeight={600}>
              Practitioner NFTs 
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
                {[1, 2, 3, 4].map((item, i) => (
                  <NftCard key={i} />
                ))}
              </Box>
            </NftsCards>
      </Box>
    </>
  );
};

export default Practitioner2;
Practitioner2.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};
