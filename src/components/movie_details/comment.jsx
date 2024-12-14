import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, ListItem, ListItemAvatar, Rating, Typography } from "@mui/material";

export default function Comment({comments}) {
  return (
    <Box className="w-full flex flex-col items-center">
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Anton', sans-serif",
          fontSize: { xs: "16px", md: "24px" }, // Thay đổi kích thước dựa trên màn hình
          fontWeight: 400, // Định dạng lại thành số (fontWeight không dùng px)
          color: "#ffffff",
        }}
      >
        BÌNH LUẬN
      </Typography>
            <List
        sx={{
          width: "100%",
          maxWidth: 500,
          height: 300, // Set a fixed height
          overflowY: "auto", // Enable vertical scrolling
          backgroundColor: "#1F2833", // Optional: Set background color to match theme
          borderRadius: "5px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          padding: 5 // Add padding to all sides
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
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: 'yellow', // Filled star color
                  },
                  '& .MuiRating-iconEmpty': {
                    color: 'white', // Empty star color
                  },
                  '& .MuiRating-iconHover': {
                    color: '#ffffff', // Hover color for stars
                  },
                }}
              />
              <ListItemText sx={{ color: '#ffffff' }}>{comment.content}</ListItemText>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
