import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import {
  ModeEditOutlineSharp as ModeEditOutlineSharpIcon,
  DeleteOutlineSharp as DeleteOutlineSharpIcon,
  InfoSharp as InfoSharpIcon,
  Sort as SortIcon,
} from "@mui/icons-material";
import MovieForm from "./form_movies";
import { deleteMovie, getAllMovies } from "../../service/manage_movies";
import { formatDate } from "../../hepler";

function Row({ row, handleOpenFormMovie, setReloadPage }) {
  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovie(id);
      console.log("Xóa thành công");
      setReloadPage((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    publishDay: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    ageLimitation: PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        genre: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  handleOpenFormMovie: PropTypes.func.isRequired,
  setReloadPage: PropTypes.func.isRequired,
};

export default function TableMovies() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ data: {}, state: "" });
  const [reloadPage, setReloadPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const [open, setOpen] = useState(false);

  const getMovies = async () => {
    const movies = await getAllMovies();
    setRows(movies);
  };

  useEffect(() => {
    getMovies();
  }, [reloadPage]);

  const handleOpenFormMovie = (state, id = null) => {
    const data = id != null ? rows.find((row) => row.id === id) : {};
    setForm({ data, state });
    setOpen(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    setSortAscending(!sortAscending);
  };

  const filteredRows = rows
    .filter((row) => row.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) =>
      sortAscending
        ? new Date(a.publishDay) - new Date(b.publishDay)
        : new Date(b.publishDay) - new Date(a.publishDay)
    );

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

        <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Tìm kiếm phim..."
            value={searchTerm}
            onChange={handleSearch}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 1,
              flex: 1,
            }}
          />
          <Button
            variant="contained"
            onClick={handleSort}
            sx={{ backgroundColor: "#66FCF1", color: "#1F2833" }}
            startIcon={<SortIcon />}
          >
            {sortAscending ? "Ngày tăng dần" : "Ngày giảm dần"}
          </Button>
          <Button
            variant="contained"
            onClick={() => handleOpenFormMovie("create")}
            sx={{ backgroundColor: "#66FCF1", color: "#1F2833" }}
          >
            Thêm phim mới
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ backgroundColor: "#1F2937" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                  Tên phim
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                  Ngày khởi chiếu
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                  Thời lượng (phút)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                  Tuổi giới hạn
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                  Thể loại
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <Row
                  key={row.id}
                  row={row}
                  handleOpenFormMovie={handleOpenFormMovie}
                  setReloadPage={setReloadPage}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <MovieForm
            form={form}
            setOpen={setOpen}
            setReloadPage={setReloadPage}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              backgroundColor: "#ff153f",
              color: "#ffffff",
              "&:hover": { backgroundColor: "#cc1132" },
            }}
          >
            Huỷ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
