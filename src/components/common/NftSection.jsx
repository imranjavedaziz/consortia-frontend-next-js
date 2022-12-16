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
const NftSection = ({ title }) => {
  return (
    <Stack gap={3} marginTop={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h3">{title}</Typography>
        <Typography variant="h5">See all</Typography>
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
        {[1, 2, 3, 4, 5].map((item, i) => (
          <NftCard key={i} />
        ))}
      </Box>
    </Stack>
  );
};

export default NftSection;
