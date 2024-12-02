import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

export default function RegisterComponent() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    birthDay: "",
    password: "",
    confirmPassword: "",
  });

  // Biến check lỗi để trống
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    birthDay: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset lỗi khi người dùng nhập
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ và tên không được để trống.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Họ và tên không được để trống.";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Số điện thoại không được để trống.";
    }

    if (!formData.birthDay.trim()) {
      newErrors.birthDay = "Ngày sinh không được để trống.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Mật khẩu không được để trống.";
    }

    if (formData.confirmPassword != formData.password || !formData.birthDay.trim()) {
      newErrors.confirmPassword = "Xác nhận mật khẩu đúng.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log("Đăng ký thành công:", formData);
    // Gửi formData tới API để xử lý đăng ký
  };

  return (
    <Container
      maxWidth="sm"
      className="w-[70%] relative z-10 bg-white rounded-lg shadow-lg p-8"
    >
      <Typography variant="h4" align="center" gutterBottom>
        Đăng ký
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <TextField
            label="Họ và tên"
            name="fullName"
            fullWidth
            variant="outlined"
            value={formData.fullName}
            onChange={handleChange}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName}
          />
        </Box>
        <Box mb={3}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
        </Box>
        <Box mb={3}>
          <TextField
            label="Số điện thoại"
            name="phone"
            type="tel"
            fullWidth
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
            error={Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber}
          />
        </Box>
        <Box mb={3}>
          <TextField
            label="Ngày sinh"
            name="dob"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={formData.dob}
            onChange={handleChange}
            error={Boolean(errors.birthDay)}
            helperText={errors.birthDay}
          />
        </Box>
        <Box mb={3}>
          <TextField
            label="Mật khẩu"
            name="password"
            type="password"
            fullWidth
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
        </Box>
        <Box mb={3}>
          <TextField
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            type="password"
            fullWidth
            variant="outlined"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Đăng ký
        </Button>
      </form>
    </Container>
  );
}
