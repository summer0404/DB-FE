import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useState } from "react";
import DiscountIcon from "@mui/icons-material/Discount";

export default function Payment({back, next}) {
    const [paymentMethod, setPaymentMethod] = useState("");
  return (
    // <Box
    //   sx={{
    //     width: "100%",
    //     maxWidth: "500px",
    //     margin: "0 auto",
    //     backgroundColor: "#0B0C10",
    //     padding: "20px",
    //     borderRadius: "10px",
    //     color: "#FFF",
    //   }}
    // >
    <Grid item xs={12} md={6}>
      {/* Payment Methods */}
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "18px",
          marginBottom: "10px",
        }}
      >
        Phương thức thanh toán
      </Typography>

      {/* Payment Option 1 */}
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "#1F2833",
          color: "#FFF",
          border: "1px solid #45A29E",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#66FCF1",
            color: "#0B0C10",
          },
        }}
        onClick={() => setPaymentMethod("momo")}
      >
        <img
          src="src/assets/momo_logo.png"
          alt="Momo"
          style={{ width: "40px", height: "40px", marginRight: "10px" }}
        />
        <Typography>Thanh toán qua Momo</Typography>
      </Card>

      {/* Payment Option 2 */}
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "#1F2833",
          color: "#FFF",
          border: "1px solid #45A29E",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#66FCF1",
            color: "#0B0C10",
          },
        }}
        onClick={() => setPaymentMethod("domestic")}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
          alt="Domestic Card"
          style={{ width: "40px", height: "40px", marginRight: "10px" }}
        />
        <Typography>Thanh toán qua Thẻ nội địa</Typography>
      </Card>

      {/* Payment Option 3 */}
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "#1F2833",
          color: "#FFF",
          border: "1px solid #45A29E",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#66FCF1",
            color: "#0B0C10",
          },
        }}
        onClick={() => setPaymentMethod("international")}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
          alt="International Card"
          style={{ width: "40px", height: "40px", marginRight: "10px" }}
        />
        <Typography>Thanh toán qua Thẻ quốc tế</Typography>
      </Card>

      {/* Discount Code Section */}
      <Button
        sx={{
          marginTop: "20px",
          padding: "10px",
          width: "100%",
          backgroundColor: "#66f0fc",
          borderRadius: "5px",
          textTransform: "none",
          display: "flex",
          flexDirection: "row", // Change to row to place icon on left
          alignItems: "center", // Center items vertically
          justifyContent: "flex-start", // Align items to start
          "&:hover": {
            backgroundColor: "#3b8b7e",
          },
        }}
      >
        <DiscountIcon sx={{ marginRight: "10px", color: "#ff3030"}} />{" "}
        {/* Add icon with margin */}
        <Box sx={{ display: "flex", flexDirection: "column",
             alignItems: "flex-start" 
         }}>
          {" "}
          {/* Wrapper for text */}
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#0B0C10",
            }}
          >
            Mã giám giá áp dụng: 
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#0B0C10",
              marginTop: "5px",
            }}
          >
            ABCXYZ
          </Typography>
        </Box>
      </Button>

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#66FCF1",
            color: "#0B0C10",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#5EE0E0",
            },
          }}
            onClick={back}
        >
          QUAY LẠI
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: paymentMethod ? "#66FCF1" : "#ccc",
            color: "#0B0C10",
            fontWeight: "bold",
            "&:hover": {
      backgroundColor: paymentMethod ? "#45A29E" : "#ccc",
    },
    "&:disabled": {
      cursor: "not-allowed",
    }
          }}
          disabled={!paymentMethod}
            onClick={next}
        >
          THANH TOÁN
        </Button>
      </Box>
      {/* </Box> */}
    </Grid>
  );
}
