import React, { useEffect, useState } from "react";
import { Box, Typography, styled, Grid, CardMedia } from "@mui/material";
import NftsLayout from "../../src/nftsLayout";
import Image from "next/image";
import NftCard from "../../src/components/common/NftCard";
import TransactiionHistoryTable from "../../src/components/transactiionHistoryTable/TransactiionHistoryTable";
import {
  GET_PRACTITIONER_NFTS,
  GET_PROPERTY_NFTS,
} from "../../src/constants/endpoints";
import { publicAxios } from "../../src/api";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Pagination from "../../src/components/common/pagination/Pagination";
import CardSkeletonLoader from "../../src/components/common/loader/cardSkeletonLoader/CardSkeletonLoader";

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

const NftsList = () => {
  const { push, query } = useRouter();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [nftsList, setNftsList] = useState([]);

  useEffect(() => {
    // debugger
    //    const profileInfo = JSON.parse(localStorage.getItem('profile_info'))
    //    setLocalData(profileInfo)
    query.slug === "practitioner-nfts" && getPractitionerNftData();
    query.slug === "property-nfts" && getNftData();
  }, [page,query.slug]);

  const getNftData = async () => {
    try {
      setLoading(true);
      const res = await publicAxios.get(
        `${GET_PROPERTY_NFTS}?page_size=${12}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setNftsList(res?.data);

      // console.log("res", res?.data?.nfts);

      // setUserData(res?.data?.data?.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (Array.isArray(error?.data?.message)) {
        toast.error(error?.data?.message?.error?.[0]);
      } else {
        if(typeof(error?.data?.message) === 'string'){
            toast.error(error?.data?.message);
          }else{
            toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
          }
      }
    }
  };
  const getPractitionerNftData = async () => {
    try {
      setLoading(true);
      const res = await publicAxios.get(
        `${GET_PRACTITIONER_NFTS}?page_size=${12}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      // if(res?.data?.data){
      setNftsList(res?.data);
      // }else{
      //   setNftsList([]);
      // }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (Array.isArray(error?.data?.message)) {
        toast.error(error?.data?.message?.error?.[0]);
      } else {
        if(typeof(error?.data?.message) === 'string'){
          toast.error(error?.data?.message);
        }else{
          toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
        }
      }
    }
  };
  const paginationHandler = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Box>
        <Box>
          <Typography variant="h3">
            {query.slug === "practitioner-nfts" ? "Practitioner" : "Property"}{" "}
            NFTs{" "}
          </Typography>
        </Box>
        <GradientBorderContainer>
          <NftDetailPageContainer>
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
                  {query.slug === "practitioner-nfts" &&
                    (loading
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
                      : nftsList?.results?.length >= 1 &&
                        nftsList?.results?.map(
                          ({ name, address, image, id }, i) => (
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
                                paddingTop:'30px'
                              }}
                            >
                              <NftCard
                                key={i}
                                title={name}
                                address={address}
                                image={image}
                                type="practitionerNftDetail"
                                id={id}
                              />
                            </Grid>
                          )
                        ))}
                  {query.slug === "property-nfts" &&
                    (loading
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
                      : nftsList?.results?.length >= 1 &&
                        nftsList?.results?.map(
                          ({ name, address, image, id,title }, i) => (
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
                                paddingTop:'30px'
                              }}
                            >
                              <NftCard
                                title={title}
                                address={address}
                                image={image}
                                key={i}
                                type="propertyNftDetail"
                                id={id}
                              />
                            </Grid>
                          )
                        ))}
                </Grid>
              </Box>
            </NftsCards>
          </NftDetailPageContainer>
        </GradientBorderContainer>
        <Box sx={{ paddingBottom: "40px" }}>
          <Pagination
            handleChangePage={paginationHandler}
            totalItems={nftsList?.results?.length}
            pageSize={12}
            pageNo={page}
            totalCounts={nftsList?.count}
          />
        </Box>
      </Box>
    </>
  );
};

export default NftsList;
NftsList.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};
