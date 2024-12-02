import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AddFood from "./pages/add_food";
import AddMovies from "./pages/add_movies";
import Cart from "./pages/cart";
import Login from "./pages/login";
import MovieDetails from "./pages/movie_details";
import TicketBooking from "./pages/ticket_booking";
import NavBar from "./components/navbar/NavBar";
import Register from './pages/register';
import ManageMovies from './pages/manage_movies';

function App() {
  return (
    <div className="mx-auto" style={{ padding: '20px', backgroundColor: 'black' }}>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
          <Route path="/add_food" element={<AddFood />} />
          <Route path="/add_movies" element={<AddMovies />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/movie_details" element={<MovieDetails />} />
          <Route path="ticket_booking" element={<TicketBooking />} />
          <Route path="/manage_movies" element={<ManageMovies />} />
      </Routes>
    </div>
  );
}

export default App;
