import React, { useState } from "react";
import { Button, Select, MenuItem, Box, Typography } from "@mui/material";

const QuickBooking = () => {
  const [cinema, setCinema] = useState("");
  const [movie, setMovie] = useState("");
  const [date, setDate] = useState("");
  const [showtime, setShowtime] = useState("");

  const handleBooking = () => {
    alert("Booking successful!");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="#f5f7ff"
      p={2}
      borderRadius={2}
    >
      <Typography variant="h6" fontWeight="bold">
        ĐẶT VÉ NHANH
      </Typography>

      <Select
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        displayEmpty
        sx={{
          bgcolor: "#f5f7ff",
          minWidth: 120,
          mx: 1,
          borderRadius: 1,
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
        sx={{
          bgcolor: "#f5f7ff",
          minWidth: 120,
          mx: 1,
          borderRadius: 1,
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
        sx={{
          bgcolor: "#f5f7ff",
          minWidth: 120,
          mx: 1,
          borderRadius: 1,
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
        color="primary"
        onClick={handleBooking}
        sx={{ bgcolor: "#6c4ac9", fontWeight: "bold", mx: 1 }}
      >
        ĐẶT NGAY
      </Button>
    </Box>
  );
};

export default QuickBooking;
