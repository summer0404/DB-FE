import React from "react";
import { Box, Typography, Grid } from "@mui/material";

export default function TicketCode() {
  return (
    <Grid item xs={12} md={6}>
      <Box
        sx={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "10px" }}>
          Mã vé: CI123456789
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src="src/assets/QR.png"
            alt="Ticket Code"
            style={{ width: "250px", height: "250px" }}
          />
        </Box>
      </Box>
    </Grid>
  );
}
