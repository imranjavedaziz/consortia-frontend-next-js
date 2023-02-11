import React, { useEffect, useState } from "react";
import { Box, Typography, styled, Grid } from "@mui/material";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import NftsLayout from "../../src/nftsLayout";
import NftCard from "../../src/components/common/NftCard";
import { publicAxios } from "../../src/api";
import {
  GET_PRACTITIONER_NFTS,
  GET_PROPERTY_NFTS,
} from "../../src/constants/endpoints";
import { useRouter } from "next/router";
import CardSkeletonLoader from "../../src/components/common/loader/cardSkeletonLoader/CardSkeletonLoader";

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
  const { push } = useRouter();
  const [profileInfo, setProfileInfo] = useState({});
  const [nftData, setNftData] = useState([]);

  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const res = await publicAxios.get(GET_PROPERTY_NFTS, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setNftData(res?.data?.results);
      setLoading(false);
      // console.log("res", res?.data?.nfts);

      // setUserData(res?.data?.data?.user);
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (Array.isArray(error?.data?.message)) {
        toast.error(error?.data?.message?.error?.[0]);
      } else {
        if (typeof error?.data?.message === "string") {
          toast.error(error?.data?.message);
        } else {
          toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
        }
      }
    }
  };
  const getPractitionerNftData = async () => {
    try {
      setLoading(true);
      const res = await publicAxios.get(GET_PRACTITIONER_NFTS, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      // if(res?.data?.data){
      setPractitionerNftData(res?.data?.results);
      setLoading(false);

      setPractitionerNftData(res?.data?.results);
    } catch (error) {
      setLoading(false);

      if (Array.isArray(error?.data?.message)) {
        toast.error(error?.data?.message?.error?.[0]);
      } else {
        if (typeof error?.data?.message === "string") {
          toast.error(error?.data?.message);
        } else {
          toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
        }
      }
    }
  };

  const handleClick = (data) => {
    push(`/nftsList/${data}`);
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
                Property NFTs
              </Typography>
              {nftData?.length > 4 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleClick("property-nfts")}
                >
                  <Box sx={{ display: "flex", paddingRight: "10px" }}>
                    <Image
                      src="/assets/icons/viewAll.svg"
                      height={20}
                      width={20}
                    />
                  </Box>
                  <Typography variant="body1">View All</Typography>
                </Box>
              )}
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
                <Grid container>
                  {loading
                    ? Array.from(new Array(4)).map((item, i) => {
                        return (
                          <Grid
                            item
                            key={i}
                            xl={3}
                            lg={4}
                            md={6}
                            sm={6}
                            xs={12}
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <CardSkeletonLoader key={i} />
                          </Grid>
                        );
                      })
                    : nftData?.length >= 1 &&
                      nftData
                        ?.slice(0, 4)
                        ?.map(({ title, address, image, id }, i) => (
                          <Grid
                            item
                            xl={3}
                            key={i}
                            lg={4}
                            md={6}
                            sm={6}
                            xs={12}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              paddingTop: "30px",
                            }}
                          >
                            <NftCard
                              title={title}
                              id={id}
                              address={address}
                              image={image}
                              key={i}
                              type="propertyNftDetail"
                            />
                          </Grid>
                        ))}
                </Grid>
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
                    Practitioner NFTs
                  </Typography>
                  {practitionerNftData?.length > 4 && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleClick("practitioner-nfts")}
                    >
                      <Box sx={{ display: "flex", paddingRight: "10px" }}>
                        <Image
                          src="/assets/icons/viewAll.svg"
                          height={20}
                          width={20}
                        />
                      </Box>
                      <Typography variant="body1">View All</Typography>
                    </Box>
                  )}
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
                    <Grid container>
                      {loading
                        ? Array.from(new Array(4)).map((item, i) => {
                            return (
                              <Grid
                                item
                                key={i}
                                xl={3}
                                lg={4}
                                md={6}
                                sm={6}
                                xs={12}
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <CardSkeletonLoader key={i} />
                              </Grid>
                            );
                          })
                        : practitionerNftData.length >= 1 &&
                          practitionerNftData
                            ?.slice(0, 4)
                            ?.map(({ name, address, image, id }, i) => (
                              <Grid
                                item
                                xl={3}
                                key={i}
                                lg={4}
                                md={6}
                                sm={6}
                                xs={12}
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  paddingTop: "30px",
                                }}
                              >
                                <NftCard
                                  key={i}
                                  id={id}
                                  title={name}
                                  address={address}
                                  image={image}
                                  type="practitionerNftDetail"
                                />
                              </Grid>
                            ))}
                    </Grid>
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
