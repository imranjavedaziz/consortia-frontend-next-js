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
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export default function TransactiionHistoryTable({
  tableHeader,
  tableRowData = [],
}) {
  const headerData = [
    "Token ID",
    "Action",
    "From",
    "To",
    "Timestamp",
    "Document Type",
  ];

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", background: "transparent" }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableHeader?.map((column, i) => (
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
            {tableRowData?.map((row, i) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row + i}>
                  <TableCell>
                    <Typography variant="body2" color="secondary.gray">
                      {row.text1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="secondary.gray">
                      {row.text2}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="secondary.gray">
                      {row.text3}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="secondary.gray">
                      {row.text5 ? row.text4 : dayjs(row.text4).format("LLLL")}
                    </Typography>
                  </TableCell>
                  {row.text5 && (
                    <TableCell>
                      <Typography variant="body2" color="secondary.gray">
                        {dayjs(row.text5).format("LLLL")}
                      </Typography>
                    </TableCell>
                  )}
                  {row.text6 && (
                    <TableCell>
                      <Typography variant="body2" color="secondary.gray">
                        {row.text6}
                      </Typography>
                    </TableCell>
                  )}
                  {row.text7 && (
                    <TableCell>
                      <Typography variant="body2" color="secondary.gray">
                        {row.text7}
                      </Typography>
                    </TableCell>
                  )}
                  {row.text8 && (
                    <TableCell>
                      <Typography variant="body2" color="secondary.gray">
                        {row.text8}
                      </Typography>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
