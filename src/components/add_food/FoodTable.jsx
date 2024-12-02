import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const FoodTable = ({ initialData }) => {
  const [foodData, setFoodData] = useState(initialData);
  const [newFood, setNewFood] = useState({
    name: "",
    group: "",
    price: "",
    description: "",
    image: "",
  });

  const [editIndex, setEditIndex] = useState(null); // Tracks the row being edited
  const [editFood, setEditFood] = useState(null); // Tracks the data of the row being edited

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFood({ ...newFood, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewFood({ ...newFood, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFood = () => {
    if (
      newFood.name &&
      newFood.group &&
      newFood.price &&
      newFood.description &&
      newFood.image
    ) {
      setFoodData([...foodData, newFood]);
      setNewFood({
        name: "",
        group: "",
        price: "",
        description: "",
        image: "",
      }); // Reset form
    }
  };

  const handleDeleteFood = (index) => {
    setFoodData(foodData.filter((_, i) => i !== index));
  };

  const handleEditFood = (index) => {
    setEditIndex(index);
    setEditFood(foodData[index]); // Load the row's data for editing
  };

  const handleSaveEdit = () => {
    const updatedFoodData = [...foodData];
    updatedFoodData[editIndex] = editFood;
    setFoodData(updatedFoodData);
    setEditIndex(null); // Exit editing mode
    setEditFood(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFood({ ...editFood, [name]: value });
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFood({ ...editFood, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #0B0C10, #1F2833)",
        padding: 4,
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: "1200px",
          backgroundColor: "transparent",
          padding: 4,
          borderRadius: "8px",
          border: "2px solid #66FCF1",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          color: "#fff",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#66FCF1",
            marginBottom: 2,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Danh sách thức ăn
        </Typography>

        {/* Add New Food Form */}
        <Box sx={{ marginBottom: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                name="name"
                label="Food Name"
                value={newFood.name}
                onChange={handleInputChange}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                name="group"
                label="Group"
                value={newFood.group}
                onChange={handleInputChange}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                name="price"
                label="Price"
                value={newFood.price}
                onChange={handleInputChange}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                value={newFood.description}
                onChange={handleInputChange}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  height: "100%",
                  backgroundColor: "#1F2833",
                  color: "#66FCF1",
                  borderColor: "#66FCF1",
                  transition: "all 0.3s ease",
                  border: "1px solid #45A29E",
                  "&:hover": {
                    backgroundColor: "#66FCF1",
                    color: "#1F2833",
                  },
                  "&:active": {
                    backgroundColor: "#0B0C10",
                    borderColor: "#45A29E",
                  },
                  "&:disabled": {
                    backgroundColor: "#C5C6C7",
                    color: "#1F2833",
                  },
                }}
              >
                <FileUploadOutlinedIcon />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button
                variant="contained"
                onClick={handleAddFood}
                sx={{
                  height: "100%",
                  backgroundColor: "#66FCF1",
                  color: "#1F2833", // Dark text for contrast
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  border: "1px solid #45A29E",
                  "&:hover": {
                    backgroundColor: "#1F2833",
                    color: "#66FCF1",
                    borderColor: "#66FCF1",
                  },
                  "&:active": {
                    backgroundColor: "#0B0C10",
                    borderColor: "#45A29E",
                  },
                  "&:disabled": {
                    backgroundColor: "#C5C6C7",
                    color: "#1F2833",
                  },
                }}
              >
                Thêm mới
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Food Table */}
        <TableContainer component={Paper} sx={{ backgroundColor: "#1F2937" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Image
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Group
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Price
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Description
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foodData.map((food, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      src={food.image}
                      alt={food.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "8px",
                      }}
                    />
                  </TableCell>
                  {editIndex === index ? (
                    <>
                      <TableCell>
                        <TextField
                          fullWidth
                          name="name"
                          value={editFood.name}
                          onChange={handleEditChange}
                          sx={{ backgroundColor: "#fff" }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          name="group"
                          value={editFood.group}
                          onChange={handleEditChange}
                          sx={{ backgroundColor: "#fff" }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          name="price"
                          value={editFood.price}
                          onChange={handleEditChange}
                          sx={{ backgroundColor: "#fff" }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          name="description"
                          value={editFood.description}
                          onChange={handleEditChange}
                          sx={{ backgroundColor: "#fff" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          component="label"
                          sx={{
                            height: "100%",
                            backgroundColor: "#1F2833",
                            color: "#66FCF1",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: "#66FCF1",
                              color: "#1F2833",
                            },
                            "&:active": {
                              backgroundColor: "#0B0C10",
                            },
                            "&:disabled": {
                              backgroundColor: "#C5C6C7",
                              color: "#1F2833",
                            },
                          }}
                        >
                          <FileUploadOutlinedIcon />
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleEditFileChange}
                          />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell sx={{ color: "#fff" }}>{food.name}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>{food.group}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>{food.price}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {food.description}
                      </TableCell>
                    </>
                  )}
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "flex-start",
                        minWidth: "160px",
                      }}
                    >
                      {editIndex === index ? (
                        <IconButton
                          onClick={handleSaveEdit}
                          sx={{
                            marginRight: 1,
                            color: "#00FF7F",
                          }}
                        >
                          <CheckOutlinedIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => handleEditFood(index)}
                          sx={{ marginRight: 1, color: "#66FCF1" }}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton
                        onClick={() => handleDeleteFood(index)}
                        sx={{
                          color: "#FF0000",
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default FoodTable;
