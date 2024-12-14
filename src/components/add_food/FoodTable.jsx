import React, { useState, useEffect } from "react";
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
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
  createFastFood,
  getFastFood,
  deleteFastFood,
  updateFastFood,
} from "../../api/fastfood.api";

const FoodTable = ({ initialData }) => {
  const [foodData, setFoodData] = useState(initialData);
  const [newFood, setNewFood] = useState({
    name: "",
    foodGroup: "",
    price: "",
    file: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);

  const [editIndex, setEditIndex] = useState(-1); // Tracks the row being edited
  const [editFood, setEditFood] = useState({
    name: "",
    foodGroup: "",
    price: "",
    file: "",
  }); // Tracks the data of the row being edited
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        setLoading(true);
        const response = await getFastFood();
        if (response.data) {
          const formattedData = response.data.map((item) => ({
            id: item.id,
            name: item.name,
            foodGroup: item.foodGroup,
            price: item.price,
            image: item.file?.path || "",
          }));
          setFoodData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch food data: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFoodData();
  }, [refreshTrigger]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFood({ ...newFood, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileSelected(true);
      const reader = new FileReader();
      reader.onload = () => {
        setNewFood({ ...newFood, file: reader.result }); // Changed to 'file'
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFood = async () => {
    try {
      if (!selectedFile) {
        throw new Error('Please select an image file');
      }

      const formData = new FormData();
      formData.append("name", newFood.name);
      formData.append("foodGroup", newFood.foodGroup);
      formData.append("price", newFood.price);
      formData.append("file", selectedFile); // Keeping 'file' to match backend

      const response = await createFastFood(formData);
      if (response.data) {
        setFoodData([...foodData, response.data]);
        setRefreshTrigger(prev => prev + 1); // Trigger refresh
        setNewFood({ name: '', foodGroup: '', price: '', file: '' });
        setSelectedFile(null);
        setFileSelected(false);
      }
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mục này không?")) {
      try {
        const response = await deleteFastFood(id);

        if (response.success) {
          setRefreshTrigger((prev) => prev + 1);
          // Remove deleted item from state
          setFoodData(foodData.filter((food) => food.id !== id));
        }
      } catch (error) {
        console.error("Failed to delete food item:", error);
      }
    }
  };

  const handleEditFood = (index) => {
    setEditIndex(index);
    setEditFood(foodData[index]); // Load the row's data for editing
  };

  const handleSaveEdit = async () => {
    try {
      const updatedFoodData = [...foodData];
      const editedFood = { ...editFood }; // Copy the edited food data

      // Prepare JSON payload
      const payload = {
        name: editedFood.name,
        foodGroup: editedFood.foodGroup,
        price: editedFood.price,
        file: selectedFile || editedFood.image, // Use the selected file if available, otherwise keep the existing image
      };

      // Call the update API with JSON payload
      console.log("payload", payload);
      const response = await updateFastFood(editedFood.id, payload);

      if (response.data) {
        updatedFoodData[editIndex] = {
          ...response.data,
        };
        setFoodData(updatedFoodData);
        setEditIndex(-1); // Exit editing mode
        setEditFood(null);
        setSelectedFile(null); // Clear the selected file
      }
    } catch (error) {
      console.error("Error updating food:", error);
    }
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
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                name="name"
                label="Tên thức ăn"
                value={newFood.name}
                onChange={handleInputChange}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Select
                fullWidth
                name="foodGroup"
                value={newFood.foodGroup}
                onChange={handleInputChange}
                displayEmpty
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                }}
              >
                <MenuItem value="" disabled>
                  Chọn nhóm thức ăn
                </MenuItem>
                <MenuItem value="Popcorn">Popcorn</MenuItem>
                <MenuItem value="Snack">Snack</MenuItem>
                <MenuItem value="Softdrink">Softdrink</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                name="price"
                label="Giá"
                value={newFood.price}
                onChange={handleInputChange}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <Button
                component="label"
                variant="contained"
                tabIndex={-1}
                startIcon={fileSelected ? <CheckCircleIcon /> : <FileUploadOutlinedIcon />}
                sx={{
                  height: "100%",
                  backgroundColor: fileSelected ? "#45A29E" : "#66FCF1",
                  color: "#1F2833",
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
                }}
              >
                {fileSelected ? 'Đã tải lên' : 'Tải lên'}
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </Button>
            </Grid>

            <Grid item xs={12} sm={2}>
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
                <TableCell
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    width: "15%",
                    fontSize: "1.1rem",
                  }}
                >
                  Hình ảnh
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    width: "25%",
                    fontSize: "1.1rem",
                  }}
                >
                  Tên thức ăn
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    width: "25%",
                    fontSize: "1.1rem",
                  }}
                >
                  Nhóm thức ăn
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    width: "15%",
                    fontSize: "1.1rem",
                  }}
                >
                  Giá
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    width: "20%",
                    fontSize: "1.1rem",
                  }}
                >
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foodData.map((food, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: "1.1rem" }}>
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
                          sx={{ backgroundColor: "#fff", fontSize: "1.1rem" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          fullWidth
                          name="foodGroup"
                          value={editFood.foodGroup}
                          onChange={handleEditChange}
                          sx={{
                            backgroundColor: "#fff",
                            fontSize: "1.1rem",
                          }}
                        >
                          <MenuItem value="Popcorn">Popcorn</MenuItem>
                          <MenuItem value="Snack">Snack</MenuItem>
                          <MenuItem value="Softdrink">Softdrink</MenuItem>
                        </Select>
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
                          type="file"
                          fullWidth
                          onChange={handleEditFileChange}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell sx={{ color: "#fff", fontSize: "1.1rem" }}>
                        {food.name}
                      </TableCell>
                      <TableCell sx={{ color: "#fff", fontSize: "1.1rem" }}>
                        {food.foodGroup}
                      </TableCell>
                      <TableCell sx={{ color: "#fff", fontSize: "1.1rem" }}>
                        {food.price}
                      </TableCell>
                    </>
                  )}
                  <TableCell sx={{ fontSize: "1.1rem" }}>
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
                        onClick={() => handleDelete(food.id)}
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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
