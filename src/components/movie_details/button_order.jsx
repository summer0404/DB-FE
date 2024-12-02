import * as React from "react";
import { Link } from "react-router-dom";
import { Box, Fab, Typography } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";

export default function ButtonOrder() {
  return (
    <Link to="/cart">
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          "&:hover": {
            backgroundColor: "primary.dark",
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
    </Link>
  );
}
