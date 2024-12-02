import * as React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModeEditOutlineSharpIcon from "@mui/icons-material/ModeEditOutlineSharp";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";

function createData(
  name,
  releaseDate,
  length,
  ageLimit,
  categories,
  actors,
  directors
) {
  return {
    name,
    releaseDate,
    length,
    ageLimit,
    categories,
    actors,
    directors,
  };
}

function Row(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>{row.releaseDate}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{row.length}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{row.ageLimit}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{row.categories.join(", ")}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <IconButton size="small">
            <ModeEditOutlineSharpIcon />
          </IconButton>
          <IconButton size="small">
            <DeleteOutlineSharpIcon />
          </IconButton>
          <IconButton size="small">
            <InfoSharpIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    ageLimit: PropTypes.number.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    actors: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
      })
    ).isRequired,
    directors: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData(
    "LINH MIÊU: QUỶ NHẬP TRÀNG (T18)",
    "02/12/2024",
    180,
    16,
    ["Kinh dị", "Hành động"],
    [
      {
        firstName: "Hello",
        lastName: "Marvel",
        age: 60,
      },
      {
        firstName: "Hello",
        lastName: "Downey",
        age: 55,
      },
    ],
    [
      {
        firstName: "Hello",
        lastName: "Russo",
        age: 50,
      },
      {
        firstName: "Hello",
        lastName: "Whedon",
        age: 48,
      },
    ]
  ),
];

export default function TableMovies() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Tên phim</TableCell>

            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Ngày khởi chiếu</TableCell>
            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
              Thời lượng&nbsp;(phút)
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
              Tuổi giới hạn&nbsp;(tuổi)
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}> Thể loại</TableCell>
            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
