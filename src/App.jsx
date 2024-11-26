import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/home";
import AddFood from "./pages/add_food";
import AddMovies from './pages/add_movies';
import Cart from './pages/cart';
import Login from './pages/login';
import MovieDetails from './pages/movie_details';
import Register from './pages/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add_food" element={<AddFood />} />
        <Route path="/add_movies" element={<AddMovies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/movie_details" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;