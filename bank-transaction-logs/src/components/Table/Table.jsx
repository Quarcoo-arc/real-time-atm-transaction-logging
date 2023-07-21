import React, { useContext, useEffect, useState } from "react";
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
import LogsContext from "../../contexts/LogsContext";

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
  { id: "transactionType", label: "Transaction\u00a0Type", minWidth: 120 },
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

function createData(
  date,
  transactionID,
  transactionType,
  accountNo,
  status,
  description
) {
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
  return {
    date,
    transactionID,
    transactionType,
    accountNo,
    status,
    description,
  };
}

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { logs } = useContext(LogsContext);
  const [data, setData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    logs.forEach((log) => console.log(log.timestamp));
    const newData = logs.map((log) =>
      createData(
        log.meta.timestamp,
        log.meta.transactionId,
        log.meta.type,
        log.meta.accountNumber,
        log.meta.status,
        log.meta.description
      )
    );
    setData(newData);
  }, [logs]);

  return (
    <Paper
      sx={{
        width: "95%",
        margin: "0 auto 3rem",
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
            {data
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
