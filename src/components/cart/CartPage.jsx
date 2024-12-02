import React, { useState } from "react";
import SeatingMap from "./SeatingMap";
import FoodBuy from "./FoodBuy";
import ChooseShowtime from "./ChooseShowtime";
import QuickBooking from "./QuickBooking";
import { Box } from "@mui/material";

export default function CartPage() {
  const [showtime, setShowtime] = useState(null);

  const handleShowtimeSelect = (selectedShowtime) => {
    setShowtime(selectedShowtime);
    console.log("Selected Showtime:", selectedShowtime);
  };
  return (
    <>
      <Box
        sx={{
          background: "linear-gradient(to right, #0B0C10, #1F2833)",
          minHeight: "100vh",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <QuickBooking />
        <ChooseShowtime onShowtimeSelect={handleShowtimeSelect} />
        <SeatingMap />
        <FoodBuy />
      </Box>
      
    </>
  );
}
