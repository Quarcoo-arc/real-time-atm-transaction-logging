import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { extractDateAndTime } from "../../utils";
import { Status, DateAndTime } from "./Table.styled";

const columns = [
  {
    id: "date",
    label: "Date",
    minWidth: 100,
    format: (value) => {
      const { date, time } = extractDateAndTime(value);
      return (
        <>
          <DateAndTime>{date}</DateAndTime>
          <DateAndTime time="true">{time}</DateAndTime>
        </>
      );
    },
  },
  { id: "transactionID", label: "Transaction\u00a0ID", minWidth: 120 },
  {
    id: "accountNo",
    label: "Account\u00a0No.",
    minWidth: 120,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 120,
  },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
  },
];

function createData(date, transactionID, accountNo, status, description) {
  status = (
    <Status
      type={
        status === "completed"
          ? "success"
          : description === "Insufficient user funds"
          ? "user-error"
          : "system-error"
      }
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Status>
  );
  return { date, transactionID, accountNo, status, description };
}

const rows = [
  createData(
    "2023-06-14T06:19:36.163+00:00",
    "100014",
    120000000000,
    "failed",
    "Insufficient user funds"
  ),
  createData(
    "2023-06-14T06:19:36.163+00:00",
    "100013",
    120000000004,
    "completed",
    "Operation successful"
  ),
  createData(
    "2023-06-14T06:19:36.163+00:00",
    "100012",
    120000000006,
    "failed",
    "Insufficient ATM funds"
  ),
  createData(
    "2023-06-14T06:19:36.163+00:00",
    "100011",
    120000000003,
    "completed",
    "Operation successful"
  ),
  createData(
    "2023-06-14T06:19:36.163+00:00",
    "100010",
    120000000007,
    "completed",
    "Operation successful"
  ),
  createData(
    "2023-06-14T06:19:36.163+00:00",
    "100009",
    120000000008,
    "completed",
    "Operation successful"
  ),
  createData(
    "2023-06-14T06:19:36.163+00:00",
    "100008",
    120000000001,
    "completed",
    "Operation successful"
  ),
  createData(
    "2023-06-14T06:19:36.163+00:00",
    "100007",
    120000000023,
    "completed",
    "Operation successful"
  ),
  createData(
    "2023-06-14T06:19:36.163+00:00",
    "100006",
    120000000435,
    "completed",
    "Operation successful"
  ),
  createData(
    "2023-06-14T06:19:36.163+00:00",
    "100005",
    120000004543,
    "failed",
    "Connection disconnected"
  ),
  createData(
    "2023-06-14T06:19:36.163+00:00",
    "100004",
    120000000345,
    "failed",
    "Internal server error"
  ),
  createData(
    "2023-06-14T06:19:36.163+00:00",
    "100003",
    120000034552,
    "completed",
    "Operation successful"
  ),
  createData(
    "2023-06-14T06:19:36.163+00:00",
    "100002",
    120000453444,
    "completed",
    "Operation successful"
  ),
  createData(
    "2023-06-14T06:19:36.163+00:00",
    "100001",
    120000345452,
    "completed",
    "Operation successful"
  ),
  createData(
    "2023-06-14T06:19:36.163+00:00",
    "100000",
    120000000034,
    "completed",
    "Operation successful"
  ),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "95%",
        margin: "0 auto",
        td: {
          color: "black",
        },
        overflow: "hidden",
        "th:first-of-type, td:first-of-type": {
          paddingLeft: "50px !important",
        },
        "@media screen and (max-width: 768px)": {
          "th:first-of-type, td:first-of-type": {
            paddingLeft: "35px !important",
          },
        },
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 600 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.transactionID}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
