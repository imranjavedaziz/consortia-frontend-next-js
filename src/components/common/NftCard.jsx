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

const NftCard = ({ title, address }) => {
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
        component="img"
        height="220px"
        // width="250px"
        image="/assets/images/nftCard.png"
        sx={{ borderRadius: "18px" }}
      ></CardMedia>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">US-06041-N</Typography>
          <Stack direction="row" gap={0.8} alignItems="center">
            <CardMedia
              component="img"
              height={10}
              image="/assets/icons/heart.svg"
            />
            <Typography variant="body2"> 0</Typography>
            <CardMedia
              component="img"
              height={10}
              image="/assets/icons/eye.svg"
            />
            <Typography variant="body2"> 0</Typography>
          </Stack>
        </Box>
        <Box width="170px">
          <Typography
            variant="body2"
            fontSize="12px"
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
        >
          Buy
        </Button>
      </CardActions>
    </Card>
  );
};

export default NftCard;
