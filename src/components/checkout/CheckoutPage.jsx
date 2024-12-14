import React from "react";
import { useState } from "react";
import { Box, Paper, Grid } from "@mui/material";
import CustomerInfo from "./CustomerInfo";
import ProgressBar from "./ProgressBar";
import TicketInfo from "./TicketInfo";
import Payment from "./Payment";
import TicketCode from "./TicketCode";
import { useLocation } from 'react-router-dom';


const CheckoutPage = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;
  const [progress, setProgress] = useState(1);
  const handleBack = () => {
    setProgress(progress - 1);
  };
  const handleNext = () => {
    setProgress(progress + 1);
  };
  return (
    <>
      <Box
        sx={{
          background: "linear-gradient(to right, #0B0C10, #1F2833)",
          height: "100vh",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* Pass progress to ProgressBar */}
        <ProgressBar progress={progress} />

        <Paper
          elevation={3}
          sx={{
            display: "flex",
            maxWidth: "900px",
            width: "100%",
            padding: "20px",
            backgroundColor: "#1a2238",
            color: "#fff",
            marginTop: "20px",
          }}
        >
          <Grid container spacing={2}>
            {progress === 1 && (
              <>
                <CustomerInfo next={handleNext} />
                <TicketInfo ticketData={orderData} />
              </>
            )}
            {progress === 2 && (
              <>
                <Payment back={handleBack} next={handleNext} orderData={orderData}/>
                <TicketInfo ticketData={orderData} />
              </>
            )}

            {progress === 3 && (
              <>
                <TicketCode />
                <TicketInfo ticketData={orderData} />
              </>
            )}
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default CheckoutPage;

// const ticketSampleData = {
//   movieName: "The Matrix",
//   ageLimitation: "18",
//   startTime: "20:00",
//   room: "1",
//   seatName: "A1, A2",
//   price: "100000",
// };
