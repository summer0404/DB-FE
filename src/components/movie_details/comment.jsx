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
      addComment({ rateTime: Date.now(), comment: newComment, stars: newRating });
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
        {comments.map((comment,index) => (
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
              <ListItemText sx={{ color: "#ffffff" }}>{comment.content}</ListItemText>
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
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!newComment.trim() || !newRating}
        >
          Gửi bình luận
        </Button>
      </Box>
    </Box>
  );
}
