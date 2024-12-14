import * as React from "react";
import { Link } from "react-router-dom";
import { Box, Fab, Typography } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";

export default function ButtonOrder({handleOrder}) {
  return (
      <Box
      onClick={handleOrder}
        sx={{
          backgroundColor: "#66FCF1",
          color: "#1F2833", // Dark text for contrast
          transition: "all 0.3s ease",
          border: "1px solid #45A29E",
          "&:hover": {
            backgroundColor: "#1F2833",
            color: "#66FCF1",
            borderColor: "#66FCF1",
          },
          "&:active": {
            backgroundColor: "#0B0C10",
            borderColor: "#45A29E",
          },
          "&:disabled": {
            backgroundColor: "#C5C6C7",
            color: "#1F2833",
          },
          width: "auto",
          padding: "10px 8px",
          height: "auto",
        }}
        className="flex flex-row justify-center items-center"
      >
        <ShoppingCartOutlined />
        <Typography
          sx={{
            padding: "0px",
            fontFamily: "'Josefin Sans', sans-serif",
            fontSize: "12px", // Mặc định là 10px
            "@media (min-width:600px)": {
              fontSize: "16px",
            },
            fontWeight: "bold",
            display: "flex", // Sử dụng flexbox
            alignItems: "center", // Căn giữa theo trục dọc
            justifyContent: "center", // Căn giữa theo trục ngang
            textAlign: "center", // Đảm bảo nội dung nằm giữa trong văn bản
            height: "100%", // Đảm bảo chiếm toàn bộ chiều cao container (nếu cần)
          }}
        >
          ĐẶT VÉ NGAY
        </Typography>
      </Box>
  );
}
