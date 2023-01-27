import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  styled,
  Grid,
  CardMedia,
  Skeleton,
  Avatar,
} from "@mui/material";
import NftsLayout from "../../src/nftsLayout";
import Image from "next/image";
import NftCard from "../../src/components/common/NftCard";
import TransactiionHistoryTable from "../../src/components/transactiionHistoryTable/TransactiionHistoryTable";
import {
  GET_PROPERTY_NFTS,
  PRACTITIONER_NFT_DETAIL,
} from "../../src/constants/endpoints";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { publicAxios } from "../../src/api";

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

const PractitionerDetailPage = () => {
  const { push, query } = useRouter();

  const [propertyNftsData, setPropertyNftsData] = useState([]);

  const [loading, setLoading] = useState([])

  const [localData, setLocalData] = useState({});
  const [nftDetail, setNftDetail] = useState({});

  useEffect(() => {
    // debugger
    const profileInfo = JSON.parse(localStorage.getItem("profile_info"));
    // setLocalData(profileInfo);
    getNftData();
    getPropertyNftData();
  }, []);

  const getNftData = async () => {
    try {
      setLoading(true)
      const res = await publicAxios.get(
        `${PRACTITIONER_NFT_DETAIL}/${query?.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      // console.log('res', res)
      setNftDetail(res?.data?.data);
      setLoading(false)
      // console.log("res", res?.data?.nfts);

      // setUserData(res?.data?.data?.user);
    } catch (error) {
      setLoading(false)

      console.log(error);
      if (Array.isArray(error?.data?.message)) {
        toast.error(error?.data?.message?.error?.[0]);
      } else {
        toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
      }
    }
  };

  const getPropertyNftData = async () => {
    try {
      const res = await publicAxios.get(GET_PROPERTY_NFTS, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setPropertyNftsData(res?.data?.results);

      // console.log("res", res?.data?.nfts);

      // setUserData(res?.data?.data?.user);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error?.data?.message)) {
        toast.error(error?.data?.message?.error?.[0]);
      } else {
        toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
      }
    }
  };

  const CopyPrivateTextRef = useRef(null);
  const CopyPrivateTextHandler = () => {
    toast.success("copied");
    const text = CopyPrivateTextRef.current.innerText;
    navigator.clipboard.writeText(text);
  };

  const headerData = [
    "Token ID",
    "Address",
    "Google+ Code",
    "Document Type",
    "Timestamp",
  ];
  const rowData = propertyNftsData?.map((item, i) => {
    return {
      text1: `${item.tx_id.slice(0, 12)}...`,
      text2: item.address,
      text3: item.title,
      text4: item.docCategory,
      text5: item.updated_at,
    };
  });
  // console.log("rowData", rowData);
  return (
    <>
      <Box>
        <Box>
          <Typography variant="h3">Practitioner NFT Details</Typography>
        </Box>
        <GradientBorderContainer>
          <NftDetailPageContainer>
            <Grid
              container
              bgcolor="secondary.purpleGray"
              sx={{ borderRadius: "24px", padding: "24px 40px" }}
            >
              <Grid
                item
                xs={12}
                md={5}
                lg={2}
                sx={{ display: "flex", order: { xs: 2, md: 1 } }}
              >
                <Box>
                  <Box>
                    {/* <Image src={nftDetail?.image} height={149} width={149} alt='image' /> */}
                   {loading ?  <Skeleton animation="wave" variant="circular" width={150} height={150} /> : <Avatar
                      alt="nft card Icon"
                      src={nftDetail?.image}
                      sx={{
                        height: "150px",
                        width: "150px",
                      }}
                    />}
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={7}
                lg={10}
                sx={{
                  paddingLeft: { md: "33px", xs: "0px" },
                  paddingBottom: { md: "0px", xs: "20px" },
                  display: "flex",
                  justifyContent: "space-between",
                  order: { xs: 1, md: 2 },
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Box>
                    <Typography variant="h5">{nftDetail?.name}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">{nftDetail?.bio}</Typography>
                  </Box>
                  <Box sx={{ paddingTop: "16px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(29, 6, 104, 0.5)",
                        borderRadius: "8px",
                        maxWidth: "400px",
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={600}>
                        Wallet Address:
                      </Typography>
                      <Typography variant="subtitle1" ref={CopyPrivateTextRef}>
                        {loading ?  <Skeleton animation="wave" variant="circular" width={150} height={150} /> : nftDetail?.wallet_address}
                      </Typography>
                      <Box sx={{ paddingLeft: "10px", cursor: "pointer" }}>
                        <Image
                          src="/assets/icons/copyIcon.svg"
                          height={16}
                          width={16}
                          alt="icon"
                          onClick={CopyPrivateTextHandler}
                        />
                      </Box>
                    </Box>
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
                  <TransactiionHistoryTable
                    tableHeader={headerData}
                    tableRowData={rowData}
                  />
                </Box>
              </Grid>
            </Grid>
          </NftDetailPageContainer>
        </GradientBorderContainer>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            {localData?.user?.role === "Practitioner"
              ? "Practitioner"
              : "Consumer"}{" "}
            NFT
          </Typography>
          {localData?.user?.role === "Practitioner" ? (
            ""
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", paddingRight: "10px" }}>
                <Image src="/assets/icons/viewAll.svg" height={20} width={20} />
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
            {(localData?.user?.role === "Practitioner"
              ? [1]
              : [1, 2, 3, 4]
            ).map((item, i) => (
              <NftCard key={i} />
            ))}
          </Box>
        </NftsCards> */}
      </Box>
    </>
  );
};

export default PractitionerDetailPage;
PractitionerDetailPage.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};
