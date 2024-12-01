import React, { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import dayjs from "dayjs";

const ChooseShowtime = ({ onShowtimeSelect }) => {
  const today = dayjs();
  const tomorrow = today.add(1, "day");

  const [selectedDate, setSelectedDate] = useState(today.format("YYYY-MM-DD"));
  const [selectedTime, setSelectedTime] = useState(null);

  const availableTimes = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"];

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset the selected time when the date changes
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    if (onShowtimeSelect) {
      onShowtimeSelect({ date: selectedDate, time });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'transparent',
        padding: 4,
        marginBottom: 4,
        borderRadius: "8px",
        border: '2px solid #66FCF1',
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        CHỌN SUẤT CHIẾU
      </Typography>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Chọn ngày:
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {[today, tomorrow].map((date) => {
            const formattedDate = date.format("YYYY-MM-DD");
            const displayDate = date.format("DD/MM/YYYY");
            return (
              <Grid item key={formattedDate}>
                <Button
                  onClick={() => handleDateSelection(formattedDate)}
                  sx={{
                    backgroundColor: formattedDate === selectedDate ? "#6C63FF" : "#fff",
                    color: formattedDate === selectedDate ? "#fff" : "#000",
                    "&:hover": {
                      backgroundColor: formattedDate === selectedDate ? "#5A54D4" : "#f0f0f0",
                    },
                    padding: "10px 20px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                  }}
                >
                  {displayDate}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Box>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Chọn giờ:
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {availableTimes.map((time) => (
            <Grid item key={time}>
              <Button
                onClick={() => handleTimeSelection(time)}
                sx={{
                  backgroundColor: time === selectedTime ? "#6C63FF" : "#fff",
                  color: time === selectedTime ? "#fff" : "#000",
                  "&:hover": {
                    backgroundColor: time === selectedTime ? "#5A54D4" : "#f0f0f0",
                  },
                  padding: "10px 20px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                }}
              >
                {time}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ChooseShowtime;
