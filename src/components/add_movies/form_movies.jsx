//form_movies.jsx

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Chip,
  Box,
  Typography,
  Autocomplete,
} from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  DateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { AddCircleOutlineOutlined, CloudUpload } from "@mui/icons-material";
import dayjs from "dayjs";
import {
  createMovie,
  deleteMovie,
  fetchCountries,
  updateFilm,
} from "../../service/manage_movies";
import { formatDate } from "../../hepler";

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

const MovieForm = (props) => {
  // Nhập các thông tin cơ bản
  const [movieData, setMovieData] = useState({
    name: props.form?.data?.name || "",
    publishDay: formatDate(props.form?.data?.publishDay) || "",
    length: props.form?.data?.length || 0,
    ageLimitation: props.form?.data?.ageLimitation || 0,
    country: props.form?.data?.country || "",
    description: props.form?.data?.description || "",
  });

  const [startTime, setStartTime] = useState(props.form?.data?.startTime || []);
  const [endTime, setEndTime] = useState(props.form?.data?.endTime || []);

  const handleMovieDataChange = (field, value) => {
    setMovieData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Nhập thể loại
  const [inputGenres, setInputGenres] = useState("");

  const [genres, setgenres] = useState(props.form?.data?.genres || []);

  const handleKeyPressCategory = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newGenre = {
        genre: inputGenres.trim(),
      };
      if (newGenre.genre && !genres.find((g) => g.genre === newGenre.genre)) {
        setgenres([...genres, newGenre]);
      }
      setInputGenres("");
    }
  };

  const handleDeleteCatory = (valueToDelete) => {
    setgenres(genres.filter((g) => g.genre !== valueToDelete));
  };

  const handleChangeCategory = (e) => {
    setInputGenres(e.target.value);
  };

  // Nhập đạo diễn
  const [directors, setDirectors] = useState(props.form?.data?.directors || []);

  const handleDirectorChange = (index, field, value) => {
    const newDirectors = [...directors];
    newDirectors[index][field] = value;
    setDirectors(newDirectors);
  };

  // Nhập diễn viên
  const [actors, setActors] = useState(props.form?.data?.actors || []);

  const handleActorChange = (index, field, value) => {
    const newActors = [...actors];
    newActors[index][field] = value;
    setActors(newActors);
  };

  const handleAddTime = () => {
    setStartTime([...startTime, dayjs()]);
    setEndTime([...endTime, dayjs()]);
  };

  const handleDeleteTime = (index) => {
    setStartTime(startTime.filter((_, i) => i !== index));
    setEndTime(endTime.filter((_, i) => i !== index));
  };

  // Tải ảnh lên
  const [posterPreviews, setPosterPreviews] = useState(
    props.form?.data?.files?.map((file) => {
      return file.path;
    }) || []
  ); // Lưu danh sách URL của hình ảnh đã chọn
  const [posters, setPosters] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files).filter((file) =>
      ["image/jpeg", "image/png", "image/gif"].includes(file.type)
    ); // Lọc chỉ lấy file ảnh

    setPosters((prevPosters) => [...prevPosters, ...fileArray]);

    const newPosterPreviews = fileArray.map((file) =>
      URL.createObjectURL(file)
    );
    setPosterPreviews((prevPreviews) => [
      ...prevPreviews,
      ...newPosterPreviews,
    ]);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (value.length <= 500) {
      setMovieData((prevData) => ({
        ...prevData,
        description: value,
      }));
    }
  };

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countryData = await fetchCountries();
        setCountries(countryData);
      } catch (error) {
        console.error("Lỗi khi tải danh sách quốc gia:", error);
      }
    };

    loadCountries(); // Gọi hàm bất đồng bộ
  }, []);

  const handleShowTimeChange = (index, value) => {
    const newShowTimes = [...startTime];
    newShowTimes[index] = value;
    setStartTime(newShowTimes);
  };

  const handleEndTimeChange = (index, value) => {
    const newEndTimes = [...endTime];
    newEndTimes[index] = value;
    setEndTime(newEndTimes);
  };

  const handleCreate = async () => {
    try {
      const newData = {
        name: movieData.name,
        publishDay: movieData.publishDay,
        length: movieData.length,
        ageLimitation: movieData.ageLimitation,
        country: movieData.country,
        description: movieData.description,
        genres: genres,
        files: posters,
        actors: actors,
        directors: directors,
        startTime: startTime,
        endTime: endTime, // Thêm thời gian kết thúc
      };
      props.setOpen(false);
      const response = await createMovie(newData);
      props.setReloadPage((prev) => !prev);
      console.log("Tạo phim thành công:", response);
    } catch (error) {
      console.error("Lỗi khi tạo phim:", error);
    }
  };

  const [existingFiles, setExistingFiles] = useState(
    props.form?.data?.files || []
  );

  const handleUpdate = async () => {
    try {
      const updatedData = {
        name: movieData.name,
        publishDay: movieData.publishDay,
        length: movieData.length,
        ageLimitation: movieData.ageLimitation,
        country: movieData.country,
        description: movieData.description,
        genres: genres,
        files: posters,
        actors: actors,
        directors: directors,
        startTime: startTime,
        endTime: endTime,
      };
      props.setOpen(false);
      const response = await updateFilm(props.form?.data?.id, updatedData);
      console.log("Cập nhật phim thành công:", response);
    } catch (error) {
      console.error("Lỗi khi cập nhật phim:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg w-[80%] flex flex-col gap-5">
      <h1 className="text-2xl text-black font-bold mb-6">Thêm phim mới</h1>
      <Box className="basic-info w-[100%] flex flex-col gap-3">
        <TextField
          label="Tên phim"
          value={movieData.name || ""}
          onChange={(e) => handleMovieDataChange("name", e.target.value)}
          fullWidth
          InputProps={{
            readOnly: props.form.state === "info", // Đặt chỉ đọc khi state là "info"
          }}
        />

        <Box
          className="flex flex-row"
          sx={{
            gap: "16px", // Khoảng cách giữa các phần tử con
          }}
        >
          <TextField
            label="Thời lượng (phút)"
            value={movieData.length || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                handleMovieDataChange("length", value);
              }
            }}
            sx={{ flex: 1 }}
            type="number"
            InputProps={{
              readOnly: props.form.state === "info", // Đặt chỉ đọc khi state là "info"
            }}
          />

          <TextField
            label="Giới hạn độ tuổi"
            value={movieData.ageLimitation || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (!isNaN(value) && Number(value) >= 0) {
                handleMovieDataChange("ageLimitation", value);
              }
            }}
            sx={{ flex: 1 }}
            type="number"
            InputProps={{
              readOnly: props.form.state === "info", // Đặt chỉ đọc khi state là "info"
            }}
          />
        </Box>

        <Box
          className="flex flex-row w-[100%]"
          sx={{
            gap: "16px", // Khoảng cách giữa các phần tử con
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ flex: 1 }}>
            <DatePicker
              label="Ngày khởi chiếu"
              value={
                movieData.publishDay
                  ? dayjs(movieData.publishDay, "DD/MM/YYYY") // Chuyển chuỗi dd/mm/yyyy thành dayjs
                  : null
              }
              onChange={(newValue) => {
                const formattedValue = newValue
                  ? dayjs(newValue).format("DD/MM/YYYY") // Lưu thành chuỗi dd/mm/yyyy
                  : null;
                handleMovieDataChange("publishDay", formattedValue);
              }}
              readOnly={props.form.state === "info"} // Vô hiệu hóa nếu ở trạng thái info
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>

          <Autocomplete
            options={countries}
            value={movieData.country || ""}
            onChange={(e, newValue) => {
              handleMovieDataChange("country", newValue); // Cập nhật giá trị được chọn
            }}
            sx={{
              flex: 1,
            }}
            readOnly={props.form.state === "info"}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tên quốc gia"
                placeholder="Nhập tên quốc gia"
                fullWidth
              />
            )}
          />
        </Box>
      </Box>

      <Box className="flex flex-col gap-3">
        <Typography variant="h6" color="text.primary">
          Mô tả phim
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          minRows={4}
          maxRows={8}
          placeholder="Nhập mô tả cho phim (tối đa 500 ký tự)"
          value={movieData.description}
          onChange={handleCategoryChange}
          inputProps={{
            maxLength: 500,
          }}
          InputProps={{
            readOnly: props.form.state === "info", // Đặt chỉ đọc khi state là "info"
          }}
        />
        <Typography variant="body2" color="text.secondary">
          {movieData.description.length}/500 ký tự
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6" className="text-black">
          Thời gian chiếu và kết thúc
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {startTime.map((showTime, index) => (
            <Box key={index} className="flex items-center gap-4 mt-2">
              <DateTimePicker
                label="Thời gian chiếu"
                value={showTime}
                onChange={(newValue) => handleShowTimeChange(index, newValue)}
                fullWidth
              />
              <DateTimePicker
                label="Thời gian kết thúc"
                value={endTime[index]}
                onChange={(newValue) => handleEndTimeChange(index, newValue)}
                fullWidth
              />
              <IconButton onClick={() => handleDeleteTime(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </LocalizationProvider>
        <Button
          startIcon={<AddCircleOutlineOutlined />}
          onClick={handleAddTime}
          className="mt-2"
        >
          Thêm thời gian chiếu
        </Button>
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
          {genres.map((g, index) => (
            <Chip
              key={g.genre}
              label={g.genre}
              onDelete={
                props.form.state !== "info"
                  ? () => handleDeleteCatory(g.genre)
                  : undefined
              }
              color="primary"
            />
          ))}
          <TextField
            variant="outlined"
            size="small"
            value={inputGenres}
            onChange={handleChangeCategory}
            onKeyDown={handleKeyPressCategory}
            style={{ minWidth: 150, flex: 1 }}
            InputProps={{
              style: {
                border: "none", // Loại bỏ viền
                boxShadow: "none", // Loại bỏ bóng
              },
              readOnly: props.form.state === "info",
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
          {props?.form?.state != "info" && (
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
          )}
        </Box>

        {directors.map((director, index) => (
          <div key={index} className="flex items-center gap-4 mt-2">
            <TextField
              label="First Name"
              value={director.firstName}
              onChange={(e) =>
                handleDirectorChange(index, "firstName", e.target.value)
              }
              InputProps={{
                readOnly: props.form.state === "info", // Đặt chỉ đọc khi state là "info"
              }}
            />
            <TextField
              label="Last Name"
              value={director.lastName}
              onChange={(e) =>
                handleDirectorChange(index, "lastName", e.target.value)
              }
              InputProps={{
                readOnly: props.form.state === "info", // Đặt chỉ đọc khi state là "info"
              }}
            />
            <TextField
              label="Age"
              value={director.age}
              onChange={(e) =>
                handleDirectorChange(index, "age", e.target.value)
              }
              InputProps={{
                readOnly: props.form.state === "info", // Đặt chỉ đọc khi state là "info"
              }}
              type="number"
            />
            {props?.form?.state != "info" && (
              <IconButton
                onClick={() =>
                  setDirectors(directors.filter((_, i) => i !== index))
                }
              >
                <DeleteIcon />
              </IconButton>
            )}
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
          {props?.form?.state != "info" && (
            <Button
              startIcon={<AddCircleOutlineOutlined />}
              onClick={() =>
                setActors([...actors, { firstName: "", lastName: "", age: "" }])
              }
              className="mt-2"
            >
              Thêm mới
            </Button>
          )}
        </Box>

        {actors.map((actor, index) => (
          <div key={index} className="flex items-center gap-4 mt-2">
            <TextField
              label="First Name"
              value={actor.firstName}
              onChange={(e) =>
                handleActorChange(index, "firstName", e.target.value)
              }
              InputProps={{
                readOnly: props.form.state === "info", // Đặt chỉ đọc khi state là "info"
              }}
            />
            <TextField
              label="Last Name"
              value={actor.lastName}
              onChange={(e) =>
                handleActorChange(index, "lastName", e.target.value)
              }
              InputProps={{
                readOnly: props.form.state === "info", // Đặt chỉ đọc khi state là "info"
              }}
            />
            <TextField
              label="Age"
              value={actor.age}
              onChange={(e) => handleActorChange(index, "age", e.target.value)}
              type="number"
              InputProps={{
                readOnly: props.form.state === "info", // Đặt chỉ đọc khi state là "info"
              }}
            />
            {props?.form?.state != "info" && (
              <IconButton
                onClick={() => setActors(actors.filter((_, i) => i !== index))}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        ))}
      </Box>

      <Box>
        <Box className="flex flex-wrap items-center gap-5">
          <h2 className="text-[20px] text-black">Poster</h2>
          {props?.form?.state != "info" && (
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
          )}
        </Box>

        <div className="flex flex-wrap gap-4 mt-4">
          {posterPreviews.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt={`Poster Preview ${index + 1}`}
                className="w-auto h-40 object-cover rounded-lg border"
              />

              {props?.form?.state != "info" && (
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
              )}
            </div>
          ))}
        </div>
      </Box>

      {props?.form?.state === "create" && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="mt-6"
          onClick={handleCreate}
        >
          Tạo mới
        </Button>
      )}

      {props?.form?.state === "edit" && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="mt-6"
          onClick={handleUpdate}
        >
          Cập nhật
        </Button>
      )}
    </div>
  );
};

export default MovieForm;
