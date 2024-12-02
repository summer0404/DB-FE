import React from "react";
import Slider from "react-slick";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

// Import images
import SpiderMoviePoster from "../../assets/Spider_moviePoster.jpg";
import WickedPoster from "../../assets/movie_poster.jpg";
import LovePoster from "../../assets/love_poster.jpeg";

const movies = [
  {
    title: "Wicked",
    image: WickedPoster,
  },
  {
    title: "Đôi bạn học yêu",
    image: LovePoster,
  },
  {
    title: "Người nhện: No Way Home",
    image: SpiderMoviePoster,
  },
];

const LandingPage = () => {
  // Slider configuration
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handlePlayButtonClick = (title) => {
    alert(`Playing: ${title}`);
  };

  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-r from-[#0B0C10] to-[#1F2833] text-white flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-xl px-6">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold uppercase">
            <br />
            <span className="text-cyan-blue">The AWESOME CINEMA</span>
          </h1>
          <p className="leading-relaxed text-lg">
            Khám phá thế giới phim đặc sắc trong hệ thống phòng chiếu công nghệ
            cao
            <br /> Đặt vé ngay hôm nay để tận hưởng trải nghiệm rạp chiếu đỉnh
            cao!
          </p>
          <button
      className="flex items-center gap-2 px-6 py-3 text-lg font-semibold border rounded-md transition border-cyan-blue text-cyan-blue bg-transparent hover:bg-cyan-blue hover:text-black"
  onClick={() => navigate("/quick_booking")}
          >
            {" "}
            <TheatersOutlinedIcon />
            Đặt vé ngay
          </button>
        </div>

        {/* Right Content with Slider */}
        <div className="relative flex justify-center items-center">
          {/* Smaller slider container */}
          <div className="w-2/3 max-w-sm">
            <Slider {...sliderSettings}>
              {movies.map((movie, index) => (
                <div key={index} className="relative">
                  {/* Set 2:3 aspect ratio */}
                  <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Play Button */}
                  <button
                    onClick={() => handlePlayButtonClick(movie.title)}
                    className="absolute text-white bg-black/50 hover:bg-black/70 text-[50px] rounded-full w-16 h-16 flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 focus:outline-none focus:ring-4 focus:ring-white"
                  >
                    <PlayCircleOutlineIcon fontSize="inherit" />
                  </button>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
