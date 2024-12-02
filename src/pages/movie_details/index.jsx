import MovieDetailComponent from "../../component/movie_details";
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
    <div className="movie-detail-page flex justify-center relative pt-6 bg-purple-800 text-white">
      <ThemeProvider theme={theme}>
        <MovieDetailComponent />
      </ThemeProvider>
    </div>
  );
}
