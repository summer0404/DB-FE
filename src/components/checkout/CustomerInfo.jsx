import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function CustomerInfo({next}) {
  return (
    <Grid item xs={12} md={6}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        TRANG THANH TOÁN
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", marginBottom: "10px", color: "#66FCF1" }}
      >
        1. THÔNG TIN KHÁCH HÀNG
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Họ và tên *"
        sx={{
          marginBottom: "15px",
          backgroundColor: "#fff",
          borderRadius: "5px",
        }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Số điện thoại *"
        sx={{
          marginBottom: "15px",
          backgroundColor: "#fff",
          borderRadius: "5px",
        }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Email *"
        sx={{
          marginBottom: "15px",
          backgroundColor: "#fff",
          borderRadius: "5px",
        }}
      />
      <FormControlLabel
        control={<Checkbox sx={{ color: "#66FCF1" }} />}
        label="Đảm bảo mua vé đúng số tuổi quy định."
        sx={{ color: "#fff" }}
      />
      <FormControlLabel
        control={<Checkbox sx={{ color: "#66FCF1" }} />}
        label="Đồng ý với điều khoản của Awesome Cinema."
        sx={{ color: "#fff" }}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#66FCF1",
          color: "#000",
          fontWeight: "bold",
          marginTop: "20px",
          "&:hover": { backgroundColor: "#5EE0E0" },
        }}
        onClick={next}
      >
        TIẾP TỤC
      </Button>
    </Grid>
  );
}
