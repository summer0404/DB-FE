import React from "react";
import { Box, Typography } from "@mui/material";
import FoodGroup from "./FoodGroup";

const groups = [
  {
    title: "COMBO",
    items: [
      {
        title: "COMBO PARTY",
        description: "2 Bắp Ngọt 60oz + 4 Coke 22oz",
        price: "209,000 VND",
        image: "party-combo.jpg",
      },
      {
        title: "COMBO SOLO",
        description: "1 Bắp Ngọt 60oz + 1 Coke 32oz",
        price: "94,000 VND",
        image: "solo-combo.jpg",
      },
      {
        title: "COMBO COUPLE",
        description: "1 Bắp Ngọt 60oz + 2 Coke 32oz",
        price: "115,000 VND",
        image: "couple-combo.jpg",
      },
    ],
  },
  {
    title: "POPCORN",
    items: [
      {
        title: "Salt Popcorn",
        description: "Classic salted popcorn 60oz",
        price: "50,000 VND",
        image: "salt-popcorn.jpg",
      },
      {
        title: "Caramel Popcorn",
        description: "Sweet caramel-coated popcorn 60oz",
        price: "65,000 VND",
        image: "caramel-popcorn.jpg",
      },
    ],
  },
  {
    title: "DRINK",
    items: [
      {
        title: "Coke",
        description: "Classic Coke 22oz",
        price: "30,000 VND",
        image: "coke.jpg",
      },
      {
        title: "Sprite",
        description: "Refreshing Sprite 22oz",
        price: "30,000 VND",
        image: "sprite.jpg",
      },
    ],
  },
  {
    title: "SNACK",
    items: [
      {
        title: "Nachos",
        description: "Crispy nachos with cheese dip",
        price: "70,000 VND",
        image: "nachos.jpg",
      },
      {
        title: "Hotdog",
        description: "Juicy hotdog with ketchup and mustard",
        price: "85,000 VND",
        image: "hotdog.jpg",
      },
    ],
  },
];

const FoodBuy = () => {
  return (
    <Box
      sx={{ backgroundColor: "transparent", minHeight: "100vh", padding: 4,
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
        <FoodGroup key={index} title={group.title} items={group.items} />
      ))}
    </Box>
  );
};

export default FoodBuy;
