import React from "react";
import { Box, Typography } from "@mui/material";

export default function ProgressBar({ progress }) {
  // Determine the color of each step based on the progress
  const getColor = (step) => {
    if (step < progress) return "#45A29E";  // Completed step (cyan)
    if (step === progress) return "#66FCF1"; // Current step (yellow)
    return "#fff"; // Inactive step (white)
  };

  const getBarColor = (step) => (step < progress ? "#66FCF1" : "#fff"); // Bar color logic

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 0",
        color: "#fff",
      }}
    >
      {/* Step 1 */}
      <Box sx={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            color: getColor(1),
            fontSize: "18px",
          }}
        >
          1
        </Typography>
        <Typography
          sx={{
            marginLeft: "8px",
            fontWeight: "bold",
            color: getColor(1),
          }}
        >
          THÔNG TIN KHÁCH HÀNG
        </Typography>
        <Box
          sx={{
            width: "40px",
            height: "2px",
            backgroundColor: getBarColor(1),
            marginLeft: "10px",
          }}
        ></Box>
      </Box>

      {/* Step 2 */}
      <Box sx={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            color: getColor(2),
            fontSize: "18px",
          }}
        >
          2
        </Typography>
        <Typography
          sx={{
            marginLeft: "8px",
            fontWeight: "bold",
            color: getColor(2),
          }}
        >
          THANH TOÁN
        </Typography>
        <Box
          sx={{
            width: "40px",
            height: "2px",
            backgroundColor: getBarColor(2),
            marginLeft: "10px",
          }}
        ></Box>
      </Box>

      {/* Step 3 */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            color: getColor(3),
            fontSize: "18px",
          }}
        >
          3
        </Typography>
        <Typography
          sx={{
            marginLeft: "8px",
            fontWeight: "bold",
            color: getColor(3),
          }}
        >
          THÔNG TIN VÉ PHIM
        </Typography>
      </Box>
    </Box>
  );
}
