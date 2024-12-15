import background from "../../assets/imgs/login_background.jpg";
import BK from "../../assets/imgs/bk.png";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { useGoogleLogin } from "@react-oauth/google";
import { getInfo, login } from "../../api/auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user.slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);
      try {
        const userData = await login(tokenResponse.access_token);
        if (userData?.data?.success == true) {
          const info = await getInfo();
          if (info?.data?.success == true) {
            dispatch(setUser(info.data.data));
            navigate("/home");
          }
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
    // flow: "auth-code",
  });
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
            <span className="text-600 font-medium">404 NotFound Cinemar</span>
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
