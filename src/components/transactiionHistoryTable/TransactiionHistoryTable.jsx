import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
} from "@mui/material";

export default function TransactiionHistoryTable() {
  const headerData = ["Token ID", "Product", "Date & Time ", "Document Type"];
  const rowData = [
    {
      token_id: "9XsaDc11234",
      product: "Pract NFTs",
      date: "Thu, 20 Dec 2022",
      category: "Deed",
    },
    {
        token_id: "9XsaDc11234",
        product: "Pract NFTs",
        date: "Thu, 20 Dec 2022",
        category: "Deed",
      },
      {
        token_id: "9XsaDc11234",
        product: "Pract NFTs",
        date: "Thu, 20 Dec 2022",
        category: "Deed",
      },
      {
        token_id: "9XsaDc11234",
        product: "Pract NFTs",
        date: "Thu, 20 Dec 2022",
        category: "Deed",
      },
  ];
  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", background: "transparent" }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headerData.map((column, i) => (
                <TableCell
                  key={column + i}
                  //   align={column.align}
                  //   style={{ minWidth: column.minWidth }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row, i) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row + i}>
                  <TableCell>
                    <Typography variant="body2" color="secondary.gray">
                      {row.token_id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="secondary.gray">
                      {row.product}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="secondary.gray">
                      {row.date}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="secondary.gray">
                      {row.category}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
