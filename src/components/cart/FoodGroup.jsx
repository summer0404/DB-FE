import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import FoodDetail from "./FoodDetail";

const FoodGroup = ({ title, items, selectedFoods, handleSelectFood }) => {
  return (
    <Box sx={{ marginBottom: 6 }}>
      <Typography
        variant="h5"
        align="center"
        sx={{ color: "#FFD700", marginBottom: 4 }}
      >
        {title}
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FoodDetail
              id={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              price={item.price}
              selectedFoods={selectedFoods}
              handleSelectFood={handleSelectFood}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FoodGroup;
