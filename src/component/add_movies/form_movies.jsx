import React, { useState } from "react";
import {
  TextField,
  Button,
  Chip,
  Box,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { AddCircleOutlineOutlined, CloudUpload } from "@mui/icons-material";

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

const MovieForm = () => {
  // Nhập các thông tin cơ bản
  const [movieData, setMovieData] = useState({
    name: "",
    releaseDate: "",
    length: 0,
    ageLimit: 0,
  });

  const handleMovieDataChange = (field, value) => {
    setMovieData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Nhập thể loại
  const [inputCategory, setInputCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const handleKeyPressCategory = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedValue = inputCategory.trim();
      if (trimmedValue && !categories.includes(trimmedValue)) {
        setCategories([...categories, trimmedValue]);
      }
      setInputCategory("");
    }
  };

  const handleDeleteCatory = (valueToDelete) => {
    setCategories(categories.filter((value) => value !== valueToDelete));
  };

  const handleChangeCategory = (e) => {
    setInputCategory(e.target.value);
  };

  // Nhập đạo diễn
  const [directors, setDirectors] = useState([
    { firstName: "", lastName: "", age: "" },
  ]);

  const handleDirectorChange = (index, field, value) => {
    const newDirectors = [...directors];
    newDirectors[index][field] = value;
    setDirectors(newDirectors);
  };

  // Nhập diễn viên
  const [actors, setActors] = useState([
    { firstName: "", lastName: "", age: "" },
  ]);

  const handleActorChange = (index, field, value) => {
    const newActors = [...actors];
    newActors[index][field] = value;
    setActors(newActors);
  };

  // Tải ảnh lên
  const [posterPreviews, setPosterPreviews] = useState([]); // Lưu danh sách URL của hình ảnh đã chọn

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    // Đảm bảo chỉ thêm những file ảnh hợp lệ
    const newPosterPreviews = fileArray.map((file) =>
      URL.createObjectURL(file)
    );
    setPosterPreviews((prevPreviews) => [
      ...prevPreviews,
      ...newPosterPreviews,
    ]);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg w-[80%] flex flex-col gap-5">
      <h1 className="text-2xl text-black font-bold mb-6">Thêm phim mới</h1>

      <Box className="basic-info w-[100%] flex flex-col gap-3">
        <Typography className="text-black">Thông tin phim</Typography>
        <TextField
          label="Tên phim"
          value={movieData.name || ""}
          onChange={(e) => handleMovieDataChange("name", e.target.value)}
          fullWidth
        />
        <Box
          className="flex flex-row"
          sx={{
            gap: "16px", // Khoảng cách giữa các phần tử con
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Ngày khởi chiếu"
              value={movieData.releaseDate || null}
              onChange={(newValue) => {
                handleMovieDataChange("releaseDate", newValue);
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>

          <TextField
            label="Thời lượng (phút)"
            value={movieData.length || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                handleMovieDataChange("length", value);
              }
            }}
            type="number"
          />

          <TextField
            label="Giới hạn độ tuổi"
            value={movieData.ageLimit || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (!isNaN(value) && Number(value) >= 0) {
                handleMovieDataChange("ageLimit", value);
              }
            }}
            type="number"
          />
        </Box>
      </Box>

      <Box className="flex flex-col gap-2">
        <Typography className="text-black">Thể loại</Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          gap={1}
          border="1px solid #ccc"
          padding={1}
          borderRadius={2}
        >
          {categories.map((category, index) => (
            <Chip
              key={index}
              label={category}
              onDelete={() => handleDeleteCatory(category)}
              color="primary"
            />
          ))}
          <TextField
            variant="outlined"
            size="small"
            value={inputCategory}
            onChange={handleChangeCategory}
            onKeyDown={handleKeyPressCategory}
            style={{ minWidth: 150, flex: 1 }}
            InputProps={{
              style: {
                border: "none", // Loại bỏ viền
                boxShadow: "none", // Loại bỏ bóng
              },
            }}
            sx={{
              "& fieldset": {
                border: "none", // Xóa viền ngoài của TextField
              },
            }}
          ></TextField>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box className="flex flex-row">
          <h2 className="text-[20px] text-black">Đạo diễn</h2>
          <Button
            startIcon={<AddCircleOutlineOutlined />}
            onClick={() =>
              setDirectors([
                ...directors,
                { firstName: "", lastName: "", age: "" },
              ])
            }
            className="mt-2"
          >
            Thêm mới
          </Button>
        </Box>

        {directors.map((director, index) => (
          <div key={index} className="flex items-center gap-4 mt-2">
            <TextField
              label="First Name"
              value={director.firstName}
              onChange={(e) =>
                handleDirectorChange(index, "firstName", e.target.value)
              }
            />
            <TextField
              label="Last Name"
              value={director.lastName}
              onChange={(e) =>
                handleDirectorChange(index, "lastName", e.target.value)
              }
            />
            <TextField
              label="Age"
              value={director.age}
              onChange={(e) =>
                handleDirectorChange(index, "age", e.target.value)
              }
              type="number"
            />
            <IconButton
              onClick={() =>
                setDirectors(directors.filter((_, i) => i !== index))
              }
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </Box>

      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box className="flex flex-row">
          <h2 className="text-[20px] text-black">Diễn viên</h2>
          <Button
            startIcon={<AddCircleOutlineOutlined />}
            onClick={() =>
              setActors([...actors, { firstName: "", lastName: "", age: "" }])
            }
            className="mt-2"
          >
            Thêm mới
          </Button>
        </Box>

        {actors.map((actor, index) => (
          <div key={index} className="flex items-center gap-4 mt-2">
            <TextField
              label="First Name"
              value={actor.firstName}
              onChange={(e) =>
                handleActorChange(index, "firstName", e.target.value)
              }
            />
            <TextField
              label="Last Name"
              value={actor.lastName}
              onChange={(e) =>
                handleActorChange(index, "lastName", e.target.value)
              }
            />
            <TextField
              label="Age"
              value={actor.age}
              onChange={(e) => handleActorChange(index, "age", e.target.value)}
              type="number"
            />
            <IconButton
              onClick={() => setActors(actors.filter((_, i) => i !== index))}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </Box>

      <Box>
        <Box className="flex flex-wrap items-center gap-5">
          <h2 className="text-[20px] text-black">Poster</h2>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}
          >
            Tải lên
            <VisuallyHiddenInput
              type="file"
              onChange={handleImageUpload}
              multiple
            />
          </Button>
        </Box>

        <div className="flex flex-wrap gap-4 mt-4">
          {posterPreviews.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt={`Poster Preview ${index + 1}`}
                className="w-auto h-40 object-cover rounded-lg border"
              />

              <IconButton
                className="absolute top-1 right-1 bg-white rounded-full"
                size="small"
                onClick={() => {
                  setPosterPreviews(
                    posterPreviews.filter((_, i) => i !== index)
                  );
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          ))}
        </div>
      </Box>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        className="mt-6"
        onClick={() => console.log(movieData)}
      >
        Submit
      </Button>
    </div>
  );
};

export default MovieForm;
