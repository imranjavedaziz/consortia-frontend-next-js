import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, styled, Grid, Skeleton, Avatar } from "@mui/material";
import NftsLayout from "../../src/nftsLayout";
import Image from "next/image";
import NftCard from "../../src/components/common/NftCard";
import TransactiionHistoryTable from "../../src/components/transactiionHistoryTable/TransactiionHistoryTable";
import {
  GET_PROPERTY_NFTS,
  PRACTITIONER_NFT_DETAIL,
  PRACTITIONER_NFT_BLOCKCHAIN_DATA,
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

const PractitionerDetailPage = () => {
  const { push, query } = useRouter();
  const { setEditPractitionerNftData } = useAuthContext();

  const [propertyNftsData, setPropertyNftsData] = useState([]);

  const [loading, setLoading] = useState([]);
  const [blockchainData, setBlockchainData] = useState();
  const [fetching, setFetching] = useState(false);
  const [nftDetail, setNftDetail] = useState({});
  const [blockchainDataModal, setBlockchainDataModal] = useState(false);

  useEffect(() => {
    getNftData();
    getPropertyNftData();
  }, [query?.id]);

  const getNftData = async () => {
    if (query?.id) {
      try {
        setLoading(true);
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
    }
  };
  const editPracNftDataHandler = () => {
    if (nftDetail?.id) {
      setEditPractitionerNftData(nftDetail);
      push("/practitionerNfts/mint-nft");
    }
  };
  const getPropertyNftData = async () => {
    if (query?.id) {
      try {
        const res = await publicAxios.get(GET_PROPERTY_NFTS, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        setPropertyNftsData(res?.data?.results);
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
          PRACTITIONER_NFT_BLOCKCHAIN_DATA + `?id=${query?.id}`,
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
  const CopyPrivateTextRef = useRef(null);
  const CopyPrivateTextHandler = () => {
    const text = CopyPrivateTextRef.current.innerText;
    if (text) {
      toast.success("copied");
      navigator.clipboard.writeText(text);
    }
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
      text1: item.tx_id ? `${item.tx_id?.slice(0, 12)}...` : "_ _",
      text2: item.address,
      text3: item.title,
      text4: item.docCategory,
      text5: item.updated_at,
    };
  });
  return (
    <>
      <DialogForBlockchainData
        open={blockchainDataModal}
        setOpen={setBlockchainDataModal}
        resData={blockchainData}
        title="Blockchain Data"
        endpoint={PRACTITIONER_NFT_BLOCKCHAIN_DATA}
        // text="Please enter your email address and we will email you a link to reset your password."
        // btnText="Send Request"
        placeholder="Mail@example.com"
      />
      <Box>
        <Box>
          <Typography variant="h3">Practitioner NFT Details</Typography>
        </Box>
        <GradientBorderContainer>
          <NftDetailPageContainer>
            <Grid
              container
              bgcolor="secondary.purpleGray"
              sx={{
                borderRadius: "24px",
                padding: { md: "24px 40px", xs: "0px" },
              }}
            >
              <Grid
                item
                xs={12}
                md={5}
                lg={2}
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center" },
                  //  order: { xs: 2, md: 1 }
                }}
              >
                <Box>
                  <Box sx={{ padding: { xs: "14px 0px 0px 0px", md: "0px" } }}>
                    {/* <Image src={nftDetail?.image} height={149} width={149} alt='image' /> */}
                    {loading ? (
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        // width={150}
                        // height={150}
                        sx={{
                          height: { md: "150px", xs: "48px" },
                          width: { md: "150px", xs: "48px" },
                        }}
                      />
                    ) : (
                      <Avatar
                        alt="nft card Icon"
                        src={nftDetail?.image}
                        sx={{
                          height: { md: "150px", xs: "48px" },
                          width: { md: "150px", xs: "48px" },
                        }}
                      />
                    )}
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
                  // order: { xs: 1, md: 2 },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: { xs: "flex", md: "block" },
                    flexDirection: { xs: "column" },
                    justifyContent: { xs: "center", md: "start" },
                    alignItems: { xs: "center", md: "start" },
                    // padding: { xs: "14px 0px 0px 0px", md: "0px" },
                  }}
                >
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
                        {loading ? (
                          <Skeleton />
                        ) : (
                          nftDetail?.wallet_address?.replaceAll("-", "")
                        )}
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
                  <Box sx={{ padding: "10px 0px" }}>
                    <Typography variant="body2">
                      {nftDetail?.failed_reason}
                    </Typography>
                  </Box>
                  {nftDetail?.is_minted && (
                    <Box
                      sx={{
                        maxWidth: "220px",
                        padding: "14px 0px 0px 0px",
                      }}
                    >
                      <LoadingButton
                        loading={fetching}
                        variant="gradient"
                        size="large"
                        onClick={() => getBlockchainData()}
                      >
                        View Blockchain Data
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
                        onClick={() => editPracNftDataHandler()}
                      >
                        View Details
                      </LoadingButton>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{ padding: { xs: "16px 0px", md: "40px 0px" } }}
              >
                <Box>
                  <Typography variant="h5">Transaction History</Typography>
                </Box>
                <Box sx={{ paddingTop: { xs: "16px", md: "40px" } }}>
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
