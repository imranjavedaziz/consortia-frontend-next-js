import React, { useEffect, useState } from "react";
import { Box, Typography, styled, Grid, CardMedia } from "@mui/material";
import NftsLayout from "../../src/nftsLayout";
import Image from "next/image";
import NftCard from "../../src/components/common/NftCard";
import TransactiionHistoryTable from "../../src/components/transactiionHistoryTable/TransactiionHistoryTable";
import { GET_PRACTITIONER_NFTS, GET_PROPERTY_NFTS } from "../../src/constants/endpoints";
import { publicAxios } from "../../src/api";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

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
    const {push, query} = useRouter()
    // console.log('query', query)
  const [nftsList, setNftsList] = useState([])

  useEffect(() => {
//    const profileInfo = JSON.parse(localStorage.getItem('profile_info'))
//    setLocalData(profileInfo)
query.slug === 'practitioner-nfts' ? getPractitionerNftData(): getNftData()
   
  }, [])


  const getNftData = async () => {
    try {
      const res = await publicAxios.get(GET_PROPERTY_NFTS, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setNftsList(res?.data?.data);

      // console.log("res", res?.data?.nfts);

      // setUserData(res?.data?.data?.user);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error?.data?.message)) {
        toast.error(error?.data?.message?.error?.[0]);
      } else {
        toast.error(Object.values(error?.data?.message)?.[0]?.[0])
      }
    }
  };
  const getPractitionerNftData = async () => {
    try {
      const res = await publicAxios.get(GET_PRACTITIONER_NFTS, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      if(res?.data?.data){
        setNftsList(res?.data?.data);
      }else{
        setNftsList([]);
      }
    } catch (error) {
      if (Array.isArray(error?.data?.message)) {
        toast.error(error?.data?.message?.error?.[0]);
      } else {
        toast.error(Object?.values(error?.data?.message)?.[0]?.[0])
      }
    }
  };
  
  return (
    <>
      <Box>
        <Box>
          <Typography variant="h3">{query.slug === 'practitioner-nfts' ? 'Practitioner' : 'Property'} NFTs </Typography>
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
                      {query.slug === 'practitioner-nfts' ? nftsList.length>=1 && nftsList?.map(({ name, address, image }, i) => (
                      console.log('name,address,image', name,address,image),
                      <NftCard
                        key={i}
                        title={name}
                        address={address}
                        image={image}
                      />
                    )) : nftsList?.length >= 1 &&
                    nftsList?.map(({ title, address, image }, i) => (
                      <NftCard
                        title={title}
                        address={address}
                        image={image}
                        key={i}
                      />
                    ))}
                    
                  </Box>
                </NftsCards>
          </NftDetailPageContainer>
        </GradientBorderContainer>
      </Box>
    </>
  );
};

export default NftsList;
NftsList.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};
