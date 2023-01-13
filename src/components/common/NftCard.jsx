import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

const NftCard = ({ title, address }) => {
  const {push } = useRouter()
  return (
    <Card
      sx={{
        minWidth: "270px",
        border: "2.5px solid #170858",
        background: "#313770",
        backdropFilter: "blur(10px)",
        padding: 1,
        borderRadius: "15px",
      }}
    >
      <CardMedia
       onClick={() => {const token = localStorage.getItem("access_token");
       if(true)push('/nftDetail/card')}}
        component="img"
        height="220px"
        // width="250px"
        alt="nft card Icon"
        image="/assets/images/nftCard.png"
        sx={{ borderRadius: "18px" ,cursor:'pointer'}}
      ></CardMedia>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={500} fontSize="16px">
            US-06041-N
          </Typography>
          <Stack direction="row" gap={0.8} alignItems="center">
            <CardMedia
              component="img"
              height={10}
              image="/assets/icons/heart.svg"
              alt="Heart Icon"
            />
            <Typography variant="body2"> 0</Typography>
            <CardMedia
              component="img"
              height={10}
              image="/assets/icons/eye.svg"
              alt="Eye Icon"
            />
            <Typography variant="body2"> 0</Typography>
          </Stack>
        </Box>
        <Box width="170px">
          <Typography
            variant="body2"
            fontSize="10px"
            fontWeight={500}
            sx={{ color: "rgba(224, 224, 224, 0.8)" }}
          >
            Address 1111 Stoney View Ln, St. Louis, MO 6...
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            background: "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
            borderRadius: "8px",
            width: "80px",
          }}
          onClick={() => push('/comingSoon')}
        >
          Buy
        </Button>
      </CardActions>
    </Card>
  );
};

export default NftCard;
