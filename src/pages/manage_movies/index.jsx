import { createTheme, ThemeProvider } from '@mui/material/styles';
import TableMovies from '../../component/add_movies/table_movies';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
  },
});

export default function ManageMovies() {
    return (
      <ThemeProvider theme={theme}>
        <TableMovies></TableMovies>
      </ThemeProvider>
    );
  }