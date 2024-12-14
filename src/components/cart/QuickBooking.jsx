import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
  InputLabel,
} from "@mui/material";
import PopularMovies from "../home/PopularMovies";
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../../api/movies.api";
import { getShowtimeByMovieId } from "../../api/showtime.api";

const QuickBooking = () => {
  const [movie, setMovie] = useState("");
  const [showtime, setShowtime] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showtimes, setShowtimes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const navigate = useNavigate();

  const handleBooking = () => {
    navigate("/cart");
  };

  const fetchShowtimes = async (movieId) => {
    try {
      setIsLoading(true);
      const response = await getShowtimeByMovieId(movieId);
      
      // Debug log
      console.log('API Response:', response.data);
      
      const showtimesByDate = response.data.reduce((acc, showtime) => {
        const date = new Date(showtime.startTime).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(showtime);
        return acc;
      }, {});
      
      // Debug logs
      console.log('Grouped Showtimes:', showtimesByDate);
      console.log('Available Dates:', Object.keys(showtimesByDate));
      
      setShowtimes(showtimesByDate);
      setAvailableDates(Object.keys(showtimesByDate));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieSelect = (event) => {
    const movieId = event.target.value;
    setMovie(movieId);
    if (movieId) {
      fetchShowtimes(movieId);
    } else {
      setShowtimes([]); // Clear showtimes if no movie selected
    }
  };



  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await getAllMovies();
        if (response.success && response.data) {
          setMovies(response.data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

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
          value={movie || ""}
          onChange={handleMovieSelect}
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
          {movies.map((movie) => (
            <MenuItem key={movie.id} value={movie.id}>
              {movie.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={selectedDate || ""}
          onChange={(e) => setSelectedDate(e.target.value)}
          displayEmpty
          disabled={!movie || isLoading}
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
          {availableDates.map((date) => (
            <MenuItem key={`date-${date}`} value={date}>
              {date}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={showtime || ""}
          onChange={(e) =>{ 
            setShowtime(e.target.value)          }}
          displayEmpty
          disabled={!selectedDate || isLoading}
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
            Chọn Giờ
          </MenuItem>
          {selectedDate &&
            showtimes[selectedDate]?.map((time) => {
              console.log('Rendering showtime:', time); // Debug log
              return (
                <MenuItem 
                  value={time}
                >
                  {new Date(time.startTime).toLocaleTimeString()}
                </MenuItem>
              );
            })}
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
          disabled={!movie || !selectedDate }
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
