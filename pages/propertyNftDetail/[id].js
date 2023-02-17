import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  styled,
  Grid,
  CardMedia,
  Button,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import NftsLayout from "../../src/nftsLayout";
import Image from "next/image";
import NftCard from "../../src/components/common/NftCard";
import TransactiionHistoryTable from "../../src/components/transactiionHistoryTable/TransactiionHistoryTable";
import {
  PROPERTY_NFT_DETAIL,
  PROPERTY_NFT_BLOCKCHAIN_DATA,
} from "../../src/constants/endpoints";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { publicAxios } from "../../src/api";
import DialogForBlockchainData from "../../src/components/modals/dialogForBlockchainData/DialogForBlockchainData";
import { LoadingButton } from "@mui/lab";
import { useAuthContext } from "../../src/context/AuthContext";

const GradientBorderContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  background: theme.palette.border.default,
  borderRadius: "24px",
  padding: "1px",
  marginTop: "40px",
  marginBottom: "48px",
  "@media only screen and (max-width:425px)": {
    background: "none",
    marginTop: "16px",
    padding: "0px",
  },
}));
const NftDetailPageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  background: theme.palette.background.default,
  borderRadius: "24px",
  padding: "33px 40px 40px 40px",
  "@media only screen and (max-width:425px)": {
    padding: "16px 13px 40px 13px",
  },
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
  // console.log("query", query);

  const [localData, setLocalData] = useState({});
  const [nftDetail, setNftDetail] = useState({});
  const [fetching, setFetching] = useState(false);
  const [blockchainDataModal, setBlockchainDataModal] = useState(false);
  const [blockchainData, setBlockchainData] = useState();
  const { setEditNftData } = useAuthContext();

  useEffect(() => {
    const profileInfo = JSON.parse(localStorage.getItem("profile_info"));
    setLocalData(profileInfo);
    getNftData();
  }, [query?.id]);

  const getNftData = async () => {
    // debugger
    if (query?.id) {
      try {
        const res = await publicAxios.get(
          `${PROPERTY_NFT_DETAIL}/${query?.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        // console.log('res', res)
        setNftDetail(res?.data?.data);

        // console.log("res", res?.data?.nfts);

        // setUserData(res?.data?.data?.user);
      } catch (error) {
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
    }
  };

  const getBlockchainData = async () => {
    if (query?.id) {
      try {
        setFetching(true);
        const res = await publicAxios.get(
          PROPERTY_NFT_BLOCKCHAIN_DATA + `?id=${query?.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        setFetching(false);
        setBlockchainData(res?.data?.data);
        setBlockchainDataModal(true);
      } catch (error) {
        setFetching(false);
        if (Array.isArray(error?.data?.message)) {
          toast.error(error?.data?.message?.error?.[0]);
        } else {
          if (typeof error?.data?.message === "string") {
            toast.error(error?.data?.message);
          } else {
            if (error?.data?.message) {
              toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
            }
          }
        }
      }
    }
  };

  const headerData = ["Token ID", "Action", "Document Type", "Timestamp"];
  const rowData = [
    {
      text1: nftDetail.tx_id ? `${nftDetail.tx_id?.slice(0, 12)}...` : "_ _",
      text2: nftDetail?.is_minted ? "Mint" : "_ _",
      text3: nftDetail?.docCategory,
      text4: nftDetail?.updated_at,
    },
  ];
  const belowSm = useMediaQuery((theme) =>
    theme.breakpoints.between("xs", "sm")
  );
  const editNftDataHandler = () => {
    setEditNftData(nftDetail);
    push("/property/mint-nft");
  };

  const donwloadAsPdf = (url) => {
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "Document.pdf";
        a.click();
      });
    });
  };

  return (
    <>
      <DialogForBlockchainData
        open={blockchainDataModal}
        setOpen={setBlockchainDataModal}
        title="Blockchain Data"
        resData={blockchainData}
        // endpoint={PROPERTY_NFT_BLOCKCHAIN_DATA}
        // text="Please enter your email address and we will email you a link to reset your password."
        // btnText="Send Request"
        placeholder="Mail@example.com"
      />
      <Box>
        <Box>
          <Typography variant="h3">Property NFT Details</Typography>
        </Box>
        <GradientBorderContainer>
          <NftDetailPageContainer>
            <Grid container>
              <Grid
                item
                xs={6}
                md={5}
                lg={3}
                sx={{
                  display: "flex",
                  // order: { xs: 2, md: 1 }
                }}
              >
                <CardMedia
                  component="img"
                  height={belowSm ? "159px" : "328px"}
                  // width="250px"
                  alt="nft card Icon"
                  image={nftDetail?.image}
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
                xs={6}
                md={7}
                lg={9}
                sx={{
                  paddingLeft: { md: "33px", xs: "0px" },
                  paddingBottom: { md: "0px", xs: "20px" },
                  display: "flex",
                  justifyContent: "space-between",
                  // order: { xs: 1, md: 2 },
                }}
              >
                <Box
                  sx={{ width: "100%", paddingLeft: { md: "0px", xs: "12px" } }}
                >
                  <Typography variant="h5" sx={{ padding: "0px 0px 12px 0px" }}>
                    {nftDetail?.title}
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
                        <IconButton
                          // onClick={handleClick}
                          sx={{
                            borderRadius: "50%",
                            border: "2px solid #1D2CDF",
                            overflow: "hidden",
                            width: "48px",
                            height: "48px",
                          }}
                        >
                          <Image
                            src={
                              localData?.user?.headshot ||
                              "/assets/icons/profileImage.svg"
                            }
                            layout="fill"
                            objectFit="cover"
                            // height={isMobile ? 20 : 33}
                            // width={33}
                            alt={nftDetail.name}
                          />
                        </IconButton>
                        <Typography
                          variant="subtitle1"
                          sx={{ padding: "0px 8px" }}
                        >
                          {nftDetail?.name}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ padding: "10px 0px" }}>
                    <Typography variant="body2">
                      {nftDetail?.failed_reason}
                    </Typography>
                  </Box>
                  {nftDetail?.is_minted && (
                    <Box
                      sx={{ maxWidth: "220px", padding: "10px 0px 0px 0px" }}
                    >
                      <LoadingButton
                        loading={fetching}
                        disabled={!nftDetail?.is_minted}
                        variant="gradient"
                        size="large"
                        onClick={() => getBlockchainData()}
                      >
                        {belowSm ? "Blockchain" : "View Blockchain Data"}
                      </LoadingButton>
                    </Box>
                  )}

                  {!nftDetail?.is_minted && (
                    <Box
                      sx={{ maxWidth: "220px", padding: "10px 0px 0px 0px" }}
                    >
                      <LoadingButton
                        sx={{
                          backgroundColor: "secondary.purpleGray",
                          color: "#fff",
                          borderRadius: "8px",
                          padding: "5px 17px",
                          fontSize: "12px",
                          textTransform: "capitalize",
                        }}
                        loading={fetching}
                        // disabled={!nftDetail?.is_minted}
                        // backgroundColor="secondary.purpleGray"
                        size="large"
                        onClick={() => editNftDataHandler()}
                      >
                        Edit Details
                      </LoadingButton>
                    </Box>
                  )}
                </Box>
                <Box>
                  {!belowSm && (
                    <Box
                      onClick={() => donwloadAsPdf(nftDetail?.document_preview)}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        ":hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      {/* <Typography variant="h5">Transaction History</Typography> */}
                      <Image
                        src="/assets/icons/export.svg"
                        height={40}
                        width={40}
                      />
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{ padding: { md: "40px 0px", xs: "0px 0px" } }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h5">Transaction History</Typography>
                  {belowSm && (
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
                  )}
                </Box>
                <Box sx={{ paddingTop: { md: "40px", xs: "0px" } }}>
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
