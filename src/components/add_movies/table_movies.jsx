import React, { useEffect, useState } from "react";
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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MovieForm from "./form_movies"; // Import your MovieForm component
import { deleteMovie, getAllMovies } from "../../service/manage_movies";
import { formatDate } from "../../hepler";

function Row(props) {
  const { row, handleOpenFormMovie } = props;

  const handleDeleteMovie = async (id) => {
    try {
      const response = await deleteMovie(id);
      console.log("Xóa thành công");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row" sx={{ color: "#fff" }}>
          {row.name}
        </TableCell>
        <TableCell sx={{ textAlign: "center", color: "#fff" }}>
          {formatDate(row.publishDay)}
        </TableCell>
        <TableCell sx={{ textAlign: "center", color: "#fff" }}>
          {row.length}
        </TableCell>
        <TableCell sx={{ textAlign: "center", color: "#fff" }}>
          {row.ageLimitation}
        </TableCell>
        <TableCell sx={{ textAlign: "center", color: "#fff" }}>
          {row.genres.map((item) => item.genre).join(", ")}
        </TableCell>
        <TableCell sx={{ textAlign: "center", color: "#fff" }}>
          <IconButton
            onClick={() => handleOpenFormMovie("edit", row.id)}
            size="small"
            sx={{ color: "#fff" }}
          >
            <ModeEditOutlineSharpIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{ color: "#fff" }}
            onClick={() => handleDeleteMovie(row.id)}
          >
            <DeleteOutlineSharpIcon />
          </IconButton>
          <IconButton
            onClick={() => handleOpenFormMovie("info", row.id)}
            size="small"
            sx={{ color: "#fff" }}
          >
            <InfoSharpIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    publishDay: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    ageLimitation: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        genre: PropTypes.string.isRequired,
      })
    ).isRequired,
    actors: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
      })
    ).isRequired,
    directors: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function TableMovies() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    data: {},
    state: "",
  });

  const getMovies = async () => {
    const movies = await getAllMovies();
    setRows(movies);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpenFormMovie = (state, id = null) => {
    const data = id != null ? rows.find((row) => row.id === id) : {};
    console.log(data);
    setForm({ data, state });

    setOpen(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #0B0C10, #1F2833)",
        padding: 4,
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: "1200px",
          backgroundColor: "transparent",
          padding: 4,
          borderRadius: "8px",
          border: "2px solid #66FCF1",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          color: "#fff",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#66FCF1",
            marginBottom: 2,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Danh sách các phim
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenFormMovie("add")}
          sx={{
            backgroundColor: "#66FCF1",
            color: "#1F2833",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            border: "1px solid #45A29E",
            "&:hover": {
              backgroundColor: "#1F2833",
              color: "#66FCF1",
              borderColor: "#66FCF1",
            },
            "&:active": {
              backgroundColor: "#0B0C10",
              borderColor: "#45A29E",
            },
            "&:disabled": {
              backgroundColor: "#C5C6C7",
              color: "#1F2833",
            },
          }}
        >
          Thêm phim mới
        </Button>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogContent>
            <MovieForm form={form} setOpen={setOpen} />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpen(false)}
              sx={{
                backgroundColor: "#ff153f",
                color: "#ffffff",
                transition: "all 0.3s ease",
                border: "1px solid #ff153f",
                "&:hover": {
                  backgroundColor: "#cc1132",
                  color: "#ffffff",
                  borderColor: "#ff153f",
                  transform: "scale(0.98)",
                },
                "&:active": {
                  backgroundColor: "#990d26",
                  borderColor: "#ff153f",
                },
                "&:disabled": {
                  backgroundColor: "#ffccd5",
                  color: "#666666",
                  border: "none",
                },
              }}
            >
              {" "}
              Huỷ
            </Button>
          </DialogActions>
        </Dialog>

        <TableContainer component={Paper} sx={{ backgroundColor: "#1F2937" }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Tên phim
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Ngày khởi chiếu
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Thời lượng&nbsp;(phút)
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Tuổi giới hạn&nbsp;(tuổi)
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  {" "}
                  Thể loại
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row
                  key={row.id}
                  row={row}
                  handleOpenFormMovie={handleOpenFormMovie}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
