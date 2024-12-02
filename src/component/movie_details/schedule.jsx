import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ListItem, Typography } from "@mui/material";

export default function ShowSchedule() {
  const [value, setValue] = React.useState(0);

  const schedule = [
    {
      day: "19/11",
      dayOfWeek: "Thứ tư",
      times: [
        "20:20",
        "21:20",
        "20:20",
        "21:20",
        "20:20",
        "21:20",
        "20:20",
        "21:20",
        "20:20",
        "21:20",
        "20:20",
        "21:20",
        "20:20",
        "21:20",
        "20:20",
        "21:20",
      ],
    },
    { day: "20/11", dayOfWeek: "Thứ năm", times: ["22:20", "23:20"] },
    { day: "21/11", dayOfWeek: "Thứ sáu", times: ["18:00", "19:00", "20:00"] },
    { day: "23/11", dayOfWeek: "Chủ nhật", times: ["19:30", "21:30", "23:30"] },
  ];
  return (
    <Box className="w-full flex flex-col items-center">
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Anton', sans-serif",
          fontSize: { xs: "16px", md: "24px" }, // Thay đổi kích thước dựa trên màn hình
          fontWeight: 400, // Định dạng lại thành số (fontWeight không dùng px)
        }}
      >
        LỊCH CHIẾU
      </Typography>
      {/* Bottom Navigation */}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        className="w-full bg-transparent"
        sx={{
          marginTop: "20px",
          backgroundColor: "transparent", // Xóa nền trắng
          display: "flex",
          justifyContent: "center", // Tập trung nút ở giữa
          gap: "10px", // Khoảng cách giữa các nút
        }}
      >
        {schedule.map((item, index) => (
          <BottomNavigationAction
            key={index}
            label={item.day}
            sx={{
              flex: "0 1 auto", // Không giãn, giữ kích thước tự nhiên
              width: "10%", // Kích thước mỗi nút
              maxWidth: "60px", // Đảm bảo không vượt quá kích thước
              color: "#F8FAFC", // Chữ màu đen
              border: "2px solid yellow", // Viền nhẹ
              borderRadius: "6px", // Bo góc
              backgroundColor: "transparent", // Nền vàng
              "&.Mui-selected": {
                backgroundColor: "yellow", // Nền khi chọn
                color: "purple", // Chữ khi chọn
              },
              "& .MuiBottomNavigationAction-label": {
                fontFamily: "'Anton', sans-serif",
                fontSize: { xs: "16px", md: "20px" }, // Thay đổi kích thước dựa trên màn hình
                fontWeight: 400, // Định dạng lại thành số (fontWeight không dùng px)
              },
            }}
          />
        ))}
      </BottomNavigation>

      {/* Danh sách khung giờ của ngày được chọn */}
      <List className="w-full flex flex-wrap justify-start gap-4 !mt-[10px]">
        {schedule[value]?.times.map((time, index) => (
          <ListItem
            key={index}
            sx={{
              border: "1px solid",
              borderRadius: "8px",
              padding: "0px",
              height: "30px",
              width: "50px",
              flex: "0 0 auto",
              "&.Mui-selected": {
                backgroundColor: "orange", // Nền khi chọn
                color: "white", // Chữ khi chọn
              },
            }}
          >
            <ListItemText
              primary={time}
              className="w-full flex flex-col justify-center items-center"
              primaryTypographyProps={{
                style: {
                  fontSize: "14px", // Kích thước chữ
                  textAlign: "center", // Căn giữa
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
