import React from "react";
import Slider from "react-slick";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function PopularMovies({ title, movies }) {
  console.log("movies", movies);
  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200, // Large screen
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 900, // Medium screen
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600, // Small screen
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 400, // Extra small screen
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box sx={{ backgroundColor: "#121212", padding: "20px" }}>
      {/* Section Title */}
      <Typography
        variant="h4"
        sx={{
          color: "#66FCF1",
          fontWeight: "bold",
          textAlign: "left",
          marginBottom: "20px",
        }}
      >
        {title}
      </Typography>

      {/* Slider Component */}
      <Slider {...settings}>
        {movies.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: "10px",
              borderRadius: "10px",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "#222",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              '&:hover': {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.6)",
              },
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              style={{
                width: "100%",
                height: "500px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
                background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3))",
                color: "white",
                padding: "10px",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.title}
              </Typography>

            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
