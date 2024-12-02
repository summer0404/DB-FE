import React, { useState } from "react";
import { Button, Select, MenuItem, Box, Typography } from "@mui/material";
import PopularMovies from "../home/PopularMovies";
import { useNavigate } from "react-router-dom";

const QuickBooking = () => {
  const [movie, setMovie] = useState("");
  const [date, setDate] = useState("");
  const [showtime, setShowtime] = useState("");

  const navigate = useNavigate();

  const handleBooking = () => {
    navigate("/cart");
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bgcolor="#1F2833"
        p={2}
        borderRadius={2}
      >
        <Typography variant="h6" fontWeight="bold" color="#66FCF1">
          ĐẶT VÉ NHANH
        </Typography>

        <Select
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          displayEmpty
          sx={{
            bgcolor: "#0B0C10",
            color: "#C5C6C7",
            minWidth: 120,
            mx: 1,
            borderRadius: 1,
            "& .MuiSelect-icon": {
              color: "#66FCF1",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#66FCF1",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#66FCF1",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#66FCF1",
            },
          }}
        >
          <MenuItem value="" disabled>
            Chọn Phim
          </MenuItem>
          <MenuItem value="movie1">Phim 1</MenuItem>
          <MenuItem value="movie2">Phim 2</MenuItem>
        </Select>

        <Select
          value={date}
          onChange={(e) => setDate(e.target.value)}
          displayEmpty
          disabled={!movie}
          sx={{
            bgcolor: "#0B0C10",
            color: "#C5C6C7",
            minWidth: 120,
            mx: 1,
            borderRadius: 1,
            "& .MuiSelect-icon": {
              color: "#66FCF1",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#66FCF1",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#66FCF1",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#66FCF1",
            },
          }}
        >
          <MenuItem value="" disabled>
            Chọn Ngày
          </MenuItem>
          <MenuItem value="date1">01/12</MenuItem>
          <MenuItem value="date2">02/12</MenuItem>
        </Select>

        <Select
          value={showtime}
          onChange={(e) => setShowtime(e.target.value)}
          displayEmpty
          disabled={!movie || !date}
          sx={{
            bgcolor: "#0B0C10",
            color: "#C5C6C7",
            minWidth: 120,
            mx: 1,
            borderRadius: 1,
            "& .MuiSelect-icon": {
              color: "#66FCF1",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#66FCF1",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#66FCF1",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#66FCF1",
            },
          }}
        >
          <MenuItem value="" disabled>
            Chọn Suất
          </MenuItem>
          <MenuItem value="time1">10:00 AM</MenuItem>
          <MenuItem value="time2">12:00 PM</MenuItem>
        </Select>

        <Button
          variant="contained"
          onClick={handleBooking}
          sx={{
            bgcolor: "#45A29E",
            color: "#0B0C10",
            fontWeight: "bold",
            mx: 1,
            "&:hover": {
              bgcolor: "#66FCF1",
              color: "#0B0C10",
            },
          }}
          disabled={!movie || !date || !showtime}
        >
          ĐẶT NGAY
        </Button>
      </Box>
      <PopularMovies title="Phim đang chiếu" movies={movieData} />
    </>
  );
};

export default QuickBooking;

const movieData = [
  {
    img: "src/assets/movie_poster.jpg",
    title: "Venom: The Last Dance",
    genre: "Science Fiction, Action, Adventure",
  },
  {
    img: "src/assets/Spider_moviePoster.jpg",
    title: "Smile 2",
    genre: "Horror, Mystery",
  },
  {
    img: "src/assets/love_poster.jpeg",
    title: "Moana 2",
    genre: "Animation, Adventure, Family, Comedy",
  },
  {
    img: "src/assets/Spider_moviePoster.jpg",
    title: "The Wild Robot",
    genre: "Animation, Science Fiction, Family",
  },
];
