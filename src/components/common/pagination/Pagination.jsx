import React, { useState } from "react";

import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles((theme) => ({
//   ul: {
//     "& .MuiPaginationItem-root": {
//       color: theme.palette.secondary.white,
//       backgroundColor: theme.palette.primary.dark,
//       fontWeight: "600",
//       fontSize: "14px",
//       fontFamily: "Montserrat",
//     },
//     "& .Mui-selected": {
//       backgroundColor: theme.palette.yellow.primary,
//       color:  theme.palette.black.main,
//       fontWeight: "bold",
//       fontSize: "14px",
//       fontFamily: "Montserrat",
//       "&:hover": {
//         backgroundColor: theme.palette.yellow.primary,
//       },
//     },
//   },

// }));

export default function CustomPagination({
  pageNo,
  pageSize,
  totalCounts,
  totalItems,
  handleChangePage,
}) {
  // debugger;
  // const classes = useStyles();
  // const [pageNo, setPageNo] = useState(1);

  // const change = (event, value) => {
  //   setPageNo(value);
  // };
  return (
    <Grid container xs={12} sx={{ paddingTop: "10px" }}>
      <Grid item md={6} sm={12} xs={12}>
        <Box>
         <Typography variant="subtitle1">
         Showing&#160;{pageNo * pageSize - pageSize + 1} - &#160;
          {pageNo * pageSize - pageSize + totalItems} out of &#160;
          {totalCounts}
           </Typography> 
        </Box>
      </Grid>
      <Grid
        item
        md={6}
        sm={12}
        xs={12}
        sx={{ display: "flex", justifyContent: "end" }}
      >
        <Box>
          <Stack spacing={2}>
            {/* <Pagination count={10} shape="rounded" /> */}
            {/* count={Math.round(totalCounts / pageSize)} */}
            <Pagination
              count={Math.ceil(totalCounts / pageSize)}
              variant="outlined"
              shape="circular"
              // color="red"
              // classes={{ ul: classes.ul }}
              page={pageNo}
              onChange={handleChangePage}
            />
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}
