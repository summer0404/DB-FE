import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, ListItem, ListItemAvatar, Rating, Typography } from "@mui/material";

export default function Comment() {
  const comments = [
    {
      id: "fbb116c9-5465-4343-9b8d-3f5bb30c225e",
      avatar: "avatar.jpg",
      name: "quangtruc",
      rating: 5,
      time: "13:32 23/11/2024",
      content: "Phim này hay vãi",
    },
    {
      id: "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
      avatar: "user1.jpg",
      name: "minhanh",
      rating: 4,
      time: "15:20 23/11/2024",
      content: "Phim khá ổn, đáng xem!",
    },
    {
      id: "b2c3d4e5-f6a1-7890-bcde-2345678901fa",
      avatar: "user2.jpg",
      name: "hoanglong",
      rating: 3,
      time: "10:45 22/11/2024",
      content: "Cốt truyện hơi chậm, nhưng hình ảnh đẹp.",
    },
    {
      id: "c3d4e5f6-a1b2-7890-cdef-3456789012fb",
      avatar: "user3.jpg",
      name: "thanhthu",
      rating: 5,
      time: "08:30 21/11/2024",
      content: "Xuất sắc! Một kiệt tác điện ảnh.",
    },
    {
      id: "d4e5f6a1-b2c3-7890-def0-4567890123fc",
      avatar: "user4.jpg",
      name: "ngochuy",
      rating: 2,
      time: "20:15 20/11/2024",
      content: "Phim không như mong đợi, hơi thất vọng.",
    },
    {
      id: "e5f6a1b2-c3d4-7890-ef01-5678901234fd",
      avatar: "user5.jpg",
      name: "trungkien",
      rating: 4,
      time: "22:00 19/11/2024",
      content: "Hài hước, giải trí tốt.",
    },
    {
      id: "f6a1b2c3-d4e5-7890-f012-6789012345fe",
      avatar: "user6.jpg",
      name: "phuonglan",
      rating: 5,
      time: "14:45 19/11/2024",
      content: "Rất hay, mình đã xem 2 lần.",
    },
    {
      id: "a1b2c3d4-e5f6-7890-0123-7890123456ff",
      avatar: "user7.jpg",
      name: "nguyenminh",
      rating: 3,
      time: "18:20 18/11/2024",
      content: "Phim được, nhưng không để lại ấn tượng sâu sắc.",
    },
    {
      id: "b2c3d4e5-f6a1-7890-1234-8901234567fg",
      avatar: "user8.jpg",
      name: "hoangduong",
      rating: 4,
      time: "09:15 18/11/2024",
      content: "Nhạc phim rất hay, đáng nghe lại.",
    },
    {
      id: "c3d4e5f6-a1b2-7890-2345-9012345678fh",
      avatar: "user9.jpg",
      name: "vietanh",
      rating: 5,
      time: "12:00 17/11/2024",
      content: "Mọi thứ đều hoàn hảo, cực kỳ hài lòng!",
    },
    {
      id: "d4e5f6a1-b2c3-7890-3456-0123456789fi",
      avatar: "user10.jpg",
      name: "hanhnguyen",
      rating: 4,
      time: "16:45 17/11/2024",
      content: "Phim hay nhưng đoạn kết hơi nhanh.",
    },
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
        BÌNH LUẬN
      </Typography>
      <List
        sx={{
          width: "100%",
          maxWidth: 500,
          // borderRadius: "5px",
          // boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          // backgroundColor: "#f9f9f9",
        }}
      >
        {comments.map((comment) => (
          <ListItem
            key={comment.id}
            sx={{
              padding: "0",
              cursor: "default",
            }}
          >
            <ListItemAvatar>
              <Avatar alt="Profile Picture" />
            </ListItemAvatar>
            <Box>
              <Rating
                name="half-rating-read"
                defaultValue={comment.rating}
                precision={0.5}
                readOnly
              />
              <ListItemText>{comment.content}</ListItemText>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
