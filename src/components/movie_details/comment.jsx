import * as React from "react";
import { useState } from "react";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Rating,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function Comment({ comments, addComment }) {
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  const handleSubmit = () => {
    if (newComment.trim() && newRating) {
      addComment({
        rateTime: Date.now(),
        comment: newComment,
        stars: newRating,
      });
      setNewComment("");
      setNewRating(0);
    }
  };

  return (
    <Box className="w-full flex flex-col items-center">
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Anton', sans-serif",
          fontSize: { xs: "16px", md: "24px" },
          fontWeight: 400,
          color: "#ffffff",
        }}
      >
        BÌNH LUẬN
      </Typography>
      <List
        sx={{
          width: "100%",
          maxWidth: 500,
          height: 300,
          overflowY: "auto",
          backgroundColor: "#1F2833",
          borderRadius: "5px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          padding: 2,
          mb: 2, // Margin bottom for spacing
        }}
      >
        {comments.map((comment, index) => (
          <ListItem key={index} sx={{ padding: "0", cursor: "default" }}>
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
                  "& .MuiRating-iconFilled": {
                    color: "yellow",
                  },
                  "& .MuiRating-iconEmpty": {
                    color: "white",
                  },
                }}
              />
              <ListItemText sx={{ color: "#ffffff" }}>
                {comment.content}
              </ListItemText>
            </Box>
          </ListItem>
        ))}
      </List>
      {/* Comment Input Section */}
      // Check nếu user tồn tại thì mới hiện
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#1F2833",
          borderRadius: "5px",
          padding: 2,
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <TextField
          label="Nhập bình luận"
          variant="outlined"
          multiline
          rows={2}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "5px",
          }}
        />

        <Rating
          name="new-rating"
          value={newRating}
          precision={0.5}
          onChange={(e, newValue) => setNewRating(newValue)}
          sx={{
            "& .MuiRating-iconFilled": {
              color: "yellow",
            },
            "& .MuiRating-icon": {
              color: "yellow", // Sets outline color
              strokeWidth: 1,
            },
            "& .MuiRating-iconEmpty": {
              color: "transparent", // Makes empty stars transparent with white outline
              stroke: "white",
              strokeWidth: 1,
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!newComment.trim() || !newRating}
          sx={{
            backgroundColor: "#66FCF1",
            color: "#0B0C10",
            fontWeight: "bold",
            padding: "8px 24px",
            transition: "all 0.3s ease",
            border: "1px solid #45A29E",
            "&:hover": {
              backgroundColor: "#45A29E",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 8px rgba(102, 252, 241, 0.2)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
            "&:disabled": {
              backgroundColor: "#C5C6C7",
              color: "#1F2833",
            }
          }}
        >
          Gửi bình luận
        </Button>
      </Box>
    </Box>
  );
}
