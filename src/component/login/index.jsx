import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Alert,
} from '@mui/material';

export default function LoginComponent() {
  // Biến lưu dữ liệu nhập
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Biến check lỗi để trống
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  // Hàm để lấy dữ liệu khi người dùng nhập 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset lỗi khi người dùng nhập
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  // Hàm để gửi api đang nhập
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Kiểm tra tên đăng nhập
    if (!formData.username.trim()) {
      newErrors.username = 'Tên đăng nhập không được để trống.';
    }

    // Kiểm tra mật khẩu
    if (!formData.password.trim()) {
      newErrors.password = 'Mật khẩu không được để trống.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Form Submitted:', formData);
    // Xử lý logic đăng nhập ở đây
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Đăng nhập
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tên đăng nhập"
          name="username"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
          error={Boolean(errors.username)}
          helperText={errors.username}
        />
        <TextField
          label="Mật khẩu"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <Box mt={2} mb={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Đăng nhập
          </Button>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Link href="#" variant="body2">
            Quên mật khẩu?
          </Link>
          <Link href="/register" variant="body2">
            Tạo tài khoản
          </Link>
        </Box>
      </form>
    </Container>
  );
}
