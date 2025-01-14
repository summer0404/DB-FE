import { useParams } from "react-router-dom";
import MovieDetailComponent from "../../components/movie_details";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: "'Josefin Sans', sans-serif",
          fontSize: "12px", // Mặc định là 10px
          "@media (min-width:600px)": {
            fontSize: "16px", 
          },
        },
      },
    },
  },
});

export default function MovieDetails() {
  return (
    <div className="movie-detail-page flex justify-center relative pt-6 bg-gradient-to-r from-[#0B0C10] to-[#1F2833] text-white">
      <ThemeProvider theme={theme}>
        <MovieDetailComponent />
      </ThemeProvider>
    </div>
  );
}
