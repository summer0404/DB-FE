import React, { useState } from "react";
import { Grid, Button, Typography, Box } from "@mui/material";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L"];
const columns = Array.from({ length: 20 }, (_, i) => i + 1); // Columns 1 to 20
const occupiedSeats = ["E09", "E08", "E07", "E06", "F09", "F08", "F07", "F06"];

const SeatSelectionPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeatSelection = (seat) => {
    if (occupiedSeats.includes(seat)) return; // Don't allow selection of occupied seats
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat) // Deselect seat
        : [...prev, seat] // Select seat
    );
  };

  const getSeatStatus = (seat) => {
    if (occupiedSeats.includes(seat)) return "occupied";
    if (selectedSeats.includes(seat)) return "selected";
    return "available";
  };

  return (
    <Box sx={{ backgroundColor: "#141B2D", minHeight: "100vh", padding: 4 }}>
      <Typography variant="h6" align="center" sx={{ color: "#fff", marginBottom: 2 }}>
        Màn hình
      </Typography>
      <Box
        sx={{
          width: "80%",
          height: "10px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          margin: "0 auto 20px",
        }}
      ></Box>

      <Grid container direction="column" spacing={1} alignItems="center">
        {rows.map((row) => (
          <Grid item key={row} sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ color: "#fff", marginRight: 1 }}>{row}</Typography>
            {columns.map((col) => {
              const seat = `${row}${String(col).padStart(2, "0")}`;
              const status = getSeatStatus(seat);
              return (
                <Button
                  key={seat}
                  onClick={() => toggleSeatSelection(seat)}
                  sx={{
                    width: 40,
                    height: 40,
                    margin: "0 4px",
                    backgroundColor:
                      status === "occupied"
                        ? "#555"
                        : status === "selected"
                        ? "#6C63FF"
                        : "#fff",
                    color: status === "available" ? "#000" : "#fff",
                    "&:hover": {
                      backgroundColor:
                        status === "occupied" ? "#555" : status === "selected" ? "#524CCE" : "#ddd",
                    },
                  }}
                  disabled={status === "occupied"}
                >
                  {seat}
                </Button>
              );
            })}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SeatSelectionPage;
