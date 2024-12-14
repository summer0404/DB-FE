import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Rating,
  BottomNavigationAction,
  Paper,
  BottomNavigation,
} from "@mui/material";

import StyleIcon from "@mui/icons-material/Style";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import PersonOffRoundedIcon from "@mui/icons-material/PersonOffRounded";
import ShowSchedule from "./schedule";
import Comment from "./comment";
import ButtonOrder from "./button_order";
import { formatDatetoDDMMYYYY } from "../../service/cart";

export default function MovieDetailComponent({ movieInfo, comments, handleOrder }) {
  return (
    <Box
      className="flex flex-col justify-center p-[6px] w-[95%] md:w-7/12 items-center"
      sx={{
        padding: "0px 8px",
        marginBottom: "100px", // Added margin at the bottom
      }}
    >
      {/* Thông tin phim  */}
      <Box className="w-full">
        <Card
          className="w-full flex flex-row justify-center"
          sx={{
            display: "flex",
            boxShadow: "none",
            backgroundColor: "transparent",
            color: "#F8FAFC",
          }}
        >
          <Box className="w-[50%] aspect-[3/4] overflow-hidden">
            <CardMedia
              component="img" // Quan trọng để hiển thị ảnh
              image={movieInfo?.urlFile}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>

          <CardContent
            sx={{ padding: "0px 10px" }}
            className="w-[60%] flex flex-col"
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: { xs: "16px", md: "24px" }, // Thay đổi kích thước dựa trên màn hình
                  fontWeight: 400, // Định dạng lại thành số (fontWeight không dùng px)
                }}
              >
                {movieInfo?.name?.toUpperCase()}
              </Typography>

              <Box
                className="flex flex-col justify-start"
                sx={{ marginTop: "10px" }}
              >
                <Box className="flex flex-row">
                  <Typography
                    variant="caption"
                    className="flex justify-center items-center border-b-[1px] border-black"
                    sx={{
                      fontFamily: "'Anton', sans-serif",
                      borderColor: "#F8FAFC",
                      fontSize: { xs: "12px", md: "14px" },
                      fontWeight: 400,
                    }}
                  >
                    {movieInfo?.rating}
                  </Typography>
                  <Rating
                    name="half-rating-read"
                    defaultValue={movieInfo?.rating ?? 5}
                    precision={0.5}
                    readOnly
                    sx={{ marginLeft: "8px" }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: "'Anton', sans-serif",
                    marginTop: "10px",
                    fontSize: { xs: "12px", md: "14px" },
                    fontWeight: 400,
                    borderColor: "#F8FAFC",
                  }}
                >
                  {movieInfo?.numberOfRating} lượt đánh giá
                </Typography>
              </Box>
              <nav aria-label="main mailbox folders">
                <List sx={{ padding: "0px", marginTop: "10px" }}>
                  <ListItem disablePadding sx={{ marginTop: "10px" }}>
                    <StyleIcon sx={{ color: "#66FCF1" }}></StyleIcon>
                    <ListItemText
                      sx={{
                        marginTop: "10px",
                        borderColor: "#F8FAFC",
                        marginLeft: "8px",
                      }}
                    >
                      {movieInfo?.category}
                    </ListItemText>
                  </ListItem>
                  <ListItem disablePadding sx={{ marginTop: "10px" }}>
                    <AccessTimeRoundedIcon
                      sx={{ color: "#66FCF1" }}
                    ></AccessTimeRoundedIcon>
                    <ListItemText sx={{ marginLeft: "8px" }}>
                      {movieInfo?.length}'
                    </ListItemText>
                  </ListItem>
                  <ListItem disablePadding sx={{ marginTop: "10px" }}>
                    <PublicRoundedIcon
                      sx={{ color: "#66FCF1" }}
                    ></PublicRoundedIcon>
                    <ListItemText sx={{ marginLeft: "8px" }}>
                      {movieInfo?.nation}
                    </ListItemText>
                  </ListItem>
                  <ListItem disablePadding sx={{ marginTop: "10px" }}>
                    <PersonOffRoundedIcon sx={{ color: "#66FCF1" }} />
                    <ListItemText
                      sx={{
                        fontFamily: "'Anton', sans-serif",
                        marginLeft: "8px",
                        fontSize: { xs: "16px", md: "24px" },
                      }}
                    >
                      T{movieInfo?.limitAge}: Phim dành cho khán giả từ đủ{" "}
                      {movieInfo?.limitAge} tuổi trở lên ({movieInfo?.limitAge}
                      +)
                    </ListItemText>
                  </ListItem>
                </List>
              </nav>
            </Box>

            <Box className="hidden sm:block">
              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: { xs: "16px", md: "24px" }, // Thay đổi kích thước dựa trên màn hình
                    fontWeight: 400, // Định dạng lại thành số (fontWeight không dùng px)
                    marginTop: "20px",
                  }}
                >
                  MÔ TẢ PHIM
                </Typography>
                <nav aria-label="main mailbox folders">
                  <List>
                    <ListItem disablePadding>
                      <ListItemText>
                        Đạo diễn: {movieInfo?.director ? Object.values(movieInfo?.director).join(", ") : ""}
                      </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText>
                        Diễn viên: {movieInfo?.actor ? Object.values(movieInfo?.actor).join(", ") : ""}
                      </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText>
                        Khởi chiếu:{" "}
                        {formatDatetoDDMMYYYY(movieInfo?.premiereSchedule)}
                      </ListItemText>
                    </ListItem>
                  </List>
                </nav>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: { xs: "16px", md: "24px" }, // Thay đổi kích thước dựa trên màn hình
                    fontWeight: 400, // Định dạng lại thành số (fontWeight không dùng px)
                    marginTop: "20px",
                  }}
                >
                  NỘI DUNG PHIM
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: "10px",
                    marginTop: "10px",
                    "@media (min-width:600px)": {
                      fontSize: "16px", // Máy tính bảng và máy tính
                    },
                  }}
                >
                  {movieInfo?.content}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box className="md:hidden sm:block">
        <Box sx={{ width: "100%", maxWidth: 360 }}>
          <Typography
            sx={{
              fontFamily: "'Anton', sans-serif",
              fontSize: { xs: "16px", md: "24px" }, // Thay đổi kích thước dựa trên màn hình
              fontWeight: 400, // Định dạng lại thành số (fontWeight không dùng px)
              marginTop: "20px",
            }}
          >
            MÔ TẢ PHIM
          </Typography>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemText>
                  Đạo diễn: {movieInfo?.director ? Object.values(movieInfo?.director).join(", ") : ""}
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemText>
                  Diễn viên: {movieInfo?.actor ? Object.values(movieInfo?.actor).join(", ") : ""}
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemText>
                  Khởi chiếu: {formatDatetoDDMMYYYY(movieInfo?.premiereSchedule)}
                </ListItemText>
              </ListItem>
            </List>
          </nav>
        </Box>

        <Box sx={{ width: "100%", maxWidth: 360 }}>
          <Typography
            sx={{
              fontFamily: "'Anton', sans-serif",
              fontSize: { xs: "16px", md: "24px" }, // Thay đổi kích thước dựa trên màn hình
              fontWeight: 400, // Định dạng lại thành số (fontWeight không dùng px)
              marginTop: "20px",
            }}
          >
            NỘI DUNG PHIM
          </Typography>
          <Typography
            sx={{
              marginTop: "20px",
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: "12px",
              "@media (min-width:600px)": {
                fontSize: "16px", // Máy tính bảng và máy tính
              },
            }}
          >
            {movieInfo?.content}
          </Typography>
        </Box>
      </Box>
      {/* ================== */}

      <Box
        className="flex flex-col justify-center"
        sx={{
          width: { xs: "100%", md: "60%" },
          marginTop: "60px",
        }}
      >
        <Comment comments={comments}></Comment>
      </Box>

      <Box sx={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <ButtonOrder handleOrder={handleOrder}></ButtonOrder>
      </Box>
    </Box>
  );
}
