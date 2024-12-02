import background from "../../assets/imgs/login_background.jpg";
import BK from "../../assets/imgs/bk.png";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

export default function Login() {
  const handleLogin = () => {
    console.log("Login");
  };
  return (
    <div
      className="flex items-center justify-center bg-cover"
      style={{ backgroundImage: `url(${background})`, height: "100vh" }}
    >
      <div className="card rounded-lg flex flex-col items-center">
        <img src={BK} className="max-w-[50px] md:max-w-[80px] py-3"></img>

        <div
          className="w-full card py-8 px-5 sm:px-8 bg-white shadow-lg"
          style={{ borderRadius: "30px" }}
        >
          <div className="text-center mb-5">
            <div className="text-900 text-3xl font-medium mb-3">
              HỆ THỐNG RẠP CHIẾU PHIM - 404 NotFound
            </div>
            <span className="text-600 font-medium">
              404 NotFound Cinemar
            </span>
          </div>

          <div>
            <Button
              variant="contained" // Tương tự `severity="danger"` ở PrimeReact
              color="error" // Màu đỏ
              fullWidth // Tương tự `className="w-full"`
              startIcon={<GoogleIcon />} // Biểu tượng Google
              onClick={handleLogin} // Hàm xử lý khi nhấn nút
              sx={{
                padding: "12px", // Tương tự `p-3`
                fontSize: "1.25rem", // Tương tự `text-xl`
              }}
            >
              Đăng nhập bằng Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
