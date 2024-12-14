import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";

const FoodDetail = ({ id, image, title, description, price, handleSelectFood }) => {
  const [number, setNumber] = useState(0);
  return (
    <Card
      sx={{
        backgroundColor: "#1C2336",
        color: "#fff",
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="gray" gutterBottom>
          {description}
        </Typography>
        <Typography variant="h6" color="#66FCF1">
          {`${price * 1000} VND`}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{ color: "#fff", borderColor: "#66FCF1" }}
            onClick={() => {
              setNumber(prev => Math.max(0, prev - 1));
              handleSelectFood(id, price, -1)}}
          >
            -
          </Button>
          <Typography variant="body1">{number}</Typography>
          <Button
            variant="outlined"
            sx={{ color: "#fff", borderColor: "#66FCF1" }}
            onClick={() => {
              setNumber(prev => Math.max(0, prev + 1));
              handleSelectFood(id, price, 1)}}
          >
            +
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FoodDetail;
