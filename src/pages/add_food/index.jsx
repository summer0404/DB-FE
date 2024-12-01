import React from "react";
import FoodTable from "../../components/add_food/FoodTable";

const initialData = [
  { name: "Burger", group: "Fast Food", price: "$5.99", description: "A tasty beef burger" },
  { name: "Pizza", group: "Fast Food", price: "$9.99", description: "Cheesy pepperoni pizza" },
  { name: "Salad", group: "Healthy", price: "$6.99", description: "Fresh garden salad" },
];

export default function AddFood (){
  return (
    <div>
      <FoodTable initialData={initialData} />
    </div>
  );
};

