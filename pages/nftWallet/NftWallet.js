import React, { useEffect, useState } from "react";
import { Box, Typography, styled } from "@mui/material";
import Image from "next/image";
import NftsLayout from "../../src/nftsLayout";
import NftCard from "../../src/components/common/NftCard";
import { publicAxios } from "../../src/api";

const GradientMintPropertyNfts = styled(Box)(({ theme }) => ({
  width: "100%",
  background: theme.palette.border.default,
  borderRadius: "24px",
  padding: "1px",
  marginTop: "40px",
  marginBottom: "120px",
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

function NftWallet() {
  const [profileInfo, setProfileInfo] = useState({});
  const [nftData, setNftData] = useState([]);
  const [practitionerNftData, setPractitionerNftData] = useState([]);
  useEffect(() => {
    setProfileInfo(JSON.parse(localStorage.getItem("profile_info")));
    const isPractitioner =
      JSON.parse(localStorage.getItem("profile_info"))?.user?.role ==
      "Practitioner";
    isPractitioner && getPractitionerNftData();
    getNftData();
  }, []);

  const getNftData = async () => {
    try {
      const res = await publicAxios.get("/nft/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setNftData(res?.data?.nfts);

      console.log("res", res?.data?.nfts);

      // setUserData(res?.data?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };
  const getPractitionerNftData = async () => {
    try {
      const res = await publicAxios.get("/nft/practitioner", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if(res?.data?.nfts){
        setPractitionerNftData([res?.data?.nfts]);
      }else{
        setPractitionerNftData([]);

      }
    } catch (error) {
      console.log(error);
    }
  };

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
                {nftData.length >= 1 &&
                  nftData.map(({ title, address, image }, i) => (
                    <NftCard
                      title={title}
                      address={address}
                      image={image}
                      key={i}
                    />
                  ))}
              </Box>
            </NftsCards>

            {profileInfo?.user?.role === "Practitioner" && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "40px",
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
                    {practitionerNftData.length>=1 && practitionerNftData?.map(({ name, address, image }, i) => (
                      <NftCard
                        key={i}
                        title={name}
                        address={address}
                        image={image}
                      />
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
}

export default NftWallet;
NftWallet.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};
