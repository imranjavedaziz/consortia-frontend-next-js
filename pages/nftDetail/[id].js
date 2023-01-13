// import React from 'react'
// import ComingSoon from '../../src/components/common/comingSoon/ComingSoon'

// function DetailPage() {
//   return (
//     <><ComingSoon /></>
//   )
// }

// export default DetailPage

import React, { useEffect, useState } from "react";
import { Box, Typography, styled, Grid, CardMedia } from "@mui/material";
import NftsLayout from "../../src/nftsLayout";
import Image from "next/image";
import NftCard from "../../src/components/common/NftCard";
import TransactiionHistoryTable from "../../src/components/transactiionHistoryTable/TransactiionHistoryTable";

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
  marginBottom: "120px",
}));

const DetailPage = () => {
  const [localData, setLocalData] = useState({})

  useEffect(() => {
   const profileInfo = JSON.parse(localStorage.getItem('profile_info'))
   setLocalData(profileInfo)
   console.log('profileInfo', profileInfo)
  }, [])
  
  return (
    <>
      <Box>
        <Box>
          <Typography variant="h3">NFT Details</Typography>
        </Box>
        <GradientBorderContainer>
          <NftDetailPageContainer>
            <Grid container>
              <Grid item xs={3} sx={{ display: "flex" }}>
                <CardMedia
                  component="img"
                  height="328px"
                  // width="250px"
                  alt="nft card Icon"
                  image="/assets/images/nftCard.png"
                  sx={{ borderRadius: "16px" }}
                ></CardMedia>

                {/* <Box sx={{ padding: "24px 0px 16px 0px" }}>
                  <Typography variant="h5">Selected Category:</Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography variant="body2" sx={{ paddingRight: "8px" }}>
                    Document Name:
                  </Typography>
                  <Typography variant="body2">Deed</Typography>
                </Box> */}
              </Grid>
              <Grid
                item
                xs={9}
                sx={{
                  paddingLeft: "33px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Typography variant="h5" sx={{ padding: "0px 0px 12px 0px" }}>
                    US-06041-N
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Box
                      sx={
                        {
                          // display: "flex",
                          // flexDirection: "column",
                          // alignItems: "center",
                          // paddingRight: "45px",
                        }
                      }
                    >
                      <Typography variant="body5" fontWeight={600}>
                        Minter
                      </Typography>
                      <Box
                        sx={{
                          padding: "8px 0px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          height={48}
                          width={48}
                          // width="250px"
                          alt="Minter avtar"
                          src="/assets/icons/profileImage.svg"
                          sx={{ borderRadius: "50px" }}
                        />
                        <Typography
                          variant="subtitle1"
                          sx={{ padding: "0px 8px" }}
                        >
                          Sam Anderson
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {/* <Typography variant="h5">Transaction History</Typography> */}
                    <Image
                      src="/assets/icons/export.svg"
                      height={40}
                      width={40}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sx={{ padding: "40px 0px" }}>
                <Box>
                  <Typography variant="h5">Transaction History</Typography>
                </Box>
                <Box sx={{ paddingTop: "40px" }}>
                  <TransactiionHistoryTable />
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
            {localData?.user?.role === "practitioner" ? 'Practitioner' : 'Consumer'} NFT
          </Typography>
          {localData?.user?.role === "practitioner" ? '' :<Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", paddingRight: "10px" }}>
              <Image src="/assets/icons/viewAll.svg" height={20} width={20} />
            </Box>
            <Typography variant="body1">View All</Typography>
          </Box>}
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
            { (localData?.user?.role === "practitioner" ? [1] : [1,2,3,4]).map((item, i) => (
              <NftCard key={i} />
            ))}
          </Box>
        </NftsCards>
      </Box>
    </>
  );
};

export default DetailPage;
DetailPage.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};
