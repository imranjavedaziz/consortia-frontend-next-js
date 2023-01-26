import React from "react";
import { Box, Skeleton } from "@mui/material";

function CardSkeletonLoader() {
  return (
    <>
      <Box>
        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Box>
    </>
  );
}

export default CardSkeletonLoader;
