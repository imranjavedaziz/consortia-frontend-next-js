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
import NftCard from "./NftCard";
import Image from "next/image";

const NftSection = ({ title }) => {
  return (
    <Stack gap={3} marginTop={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h3">{title}</Typography>
        <Box sx={{display:'flex',alignItems:'center'}}>
         <Box sx={{display:'flex',paddingRight:'10px'}}>
           <Image src='/assets/icons/viewAll.svg' height={20} width={20} />
         </Box>
        <Typography variant="h5">View All</Typography>
        </Box>
      </Stack>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "space-between" },
          rowGap: 2,
          flexWrap: "wrap",
        }}
      >
        {[1, 2, 3, 4].map((item, i) => (
          <NftCard key={i} />
        ))}
      </Box>
    </Stack>
  );
};

export default NftSection;
