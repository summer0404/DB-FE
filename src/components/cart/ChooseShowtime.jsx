import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";

const ChooseShowtime = ({ showTime, selectedTime, handleSelectDay, handleSelectTime }) => {
  // Lấy danh sách giờ chiếu dựa trên ngày đã chọn
  const selectedDayTimes = showTime.find(item => item.day === selectedTime.day)?.times || [];

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        padding: 4,
        marginBottom: 4,
        borderRadius: "8px",
        border: "2px solid #66FCF1",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
        color: "#66FCF1",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        CHỌN SUẤT CHIẾU
      </Typography>

      {/* Phần chọn ngày */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Chọn ngày:
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {showTime.map(({ day }) => (
            <Grid item key={day}>
              <Button
                onClick={() => handleSelectDay(day)}
                sx={{
                  backgroundColor: day === selectedTime.day ? "#66FCF1" : "#fff",
                  color: "#000",
                  "&:hover": {
                    backgroundColor: day === selectedTime.day ? "#66FCF1" : "#f0f0f0",
                  },
                  padding: "10px 20px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                }}
              >
                {day}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Phần chọn giờ */}
      <Box>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Chọn giờ:
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {selectedDayTimes.map((o) => (
            <Grid item key={o.time}>
              <Button
                onClick={() =>{ 
                  handleSelectTime({ day: selectedTime.day, time: {
                    startTime: o.startTime,
                    endTime: o.endTime,
                    time: o.time
                  } })}}
                sx={{
                  backgroundColor: o.time === selectedTime?.time?.time ? "#66FCF1" : "#fff",
                  color: "#000",
                  "&:hover": {
                    backgroundColor: o.time === selectedTime?.time?.time ? "#66FCF1" : "#f0f0f0",
                  },
                  padding: "10px 20px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                }}
              >
                {o.time}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ChooseShowtime;
