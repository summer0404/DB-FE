import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AddFood from "./pages/add_food";
import Cart from "./pages/cart";
import Login from "./pages/login";
import MovieDetails from "./pages/movie_details";
import TicketBooking from "./pages/ticket_booking";
import NavBar from "./components/navbar/NavBar";
import Register from './pages/register';
import ManageMovies from './pages/manage_movies';
import QuickBooking from "./components/cart/QuickBooking";
import Checkout from "./pages/checkout";
import OrderTable from "./components/order_manage/OrderTable";

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
          {/* <Route path="/add_movies" element={<AddMovies />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/movie_details" element={<MovieDetails />} />
          <Route path="ticket_booking" element={<TicketBooking />} />
          <Route path="/manage_movies" element={<ManageMovies />} />
          <Route path="/quick_booking" element={<QuickBooking />} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/manage_order" element={<OrderTable />} />
      </Routes>
    </div>
  );
}

export default App;
