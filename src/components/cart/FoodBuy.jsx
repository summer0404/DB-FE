import React from "react";
import { Box, Typography } from "@mui/material";
import FoodGroup from "./FoodGroup";


const FoodBuy = ({groups, selectedFoods, handleSelectFood}) => {
  return (
    <Box
      sx={{ backgroundColor: "transparent", minHeight: "100vh", padding: 4, minWidth: "50vh"
        // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
        // border: '2px solid #66FCF1',
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "#fff", textAlign: "center", mb: 4 }}
      >
        CHỌN THỨC ĂN KÈM
      </Typography>
      {groups.map((group, index) => (
        <FoodGroup key={index} title={group.title} items={group.items} selectedFoods={selectedFoods} handleSelectFood={handleSelectFood}/>
      ))}
    </Box>
  );
};

export default FoodBuy;
