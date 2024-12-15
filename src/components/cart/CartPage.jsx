import React, { useEffect, useState, useCallback } from "react";
import SeatingMap from "./SeatingMap";
import FoodBuy from "./FoodBuy";
import ChooseShowtime from "./ChooseShowtime";
import { createOrder } from "../../api/order.api";
import MovieDetailComponent from "../movie_details";
import { Box } from "@mui/material";
import { getCoupons } from "../../api/coupon.api";
import ChooseCoupon from "./ChooseCoupon";
import {
  getCombo,
  getCommentOfMovie,
  getMovieInfo,
  getSeatOfMovie,
  getShowTimeOfMovie,
  sendComment,
} from "../../service/cart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CartPage({ movieId }) {
  const navigate = useNavigate();
  const USER_ID = useSelector((state) => state?.user?.user?.userId);
  const [movieInfo, setMovieInfo] = useState({
    id: "",
    name: "",
    category: "",
    length: 0,
    nation: "",
    limitAge: 0,
    director: [],
    actor: [],
    premiereSchedule: "",
    content: "",
    rating: 4.8,
    urlFile: "",
    numberOfRating: 0,
    showSchedule: [],
  });

  const [fastFoods, setFastFoods] = useState([]);
  const [comments, setComments] = useState([]);
  const [showtime, setShowtime] = useState([]);
  const [selectedTime, setSelectedTime] = useState({});
  const [busySeats, setBusySeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedCouponId, setSelectedCouponId] = useState(null);

  const handleCouponSelect = (coupon) => {
    setSelectedCouponId(coupon.id);
  };

  const handleSelectFood = useCallback((foodId, price, change) => {
    setSelectedFoods((prevSelectedFoods) => {
      const existingFood = prevSelectedFoods.find((food) => food.id === foodId);

      if (existingFood) {
        return prevSelectedFoods
          .map((food) =>
            food.id === foodId
              ? { ...food, quantity: Math.max(0, food.quantity + change) }
              : food
          )
          .filter((food) => food.quantity > 0);
      } else {
        return change > 0
          ? [
              ...prevSelectedFoods,
              {
                id: foodId,
                orderId: "a",
                size: "Big",
                quantity: change,
                price,
              },
            ]
          : prevSelectedFoods;
      }
    });
  }, []);

  const handleOrder = () => {
    if (selectedSeats.length === 0) {
      window.alert("Vui lòng chọn chỗ ngồi!");
      return; // Dừng nếu không có ghế được chọn
    }
    let totalPrice = 0;

    const totalColumns = 20; // Số cột mỗi hàng
    // Xử lý thông tin ghế
    const tickets = selectedSeats.map((seat) => {
      const row = seat[0]; // Ký tự hàng (A, B, ...)
      const column = parseInt(seat.slice(1), 10);

      // Chuyển row từ ký tự (A -> 0, B -> 1, ...) bằng mã ASCII
      const rowIndex = row.charCodeAt(0) - "A".charCodeAt(0);

      // Cột 1-based chuyển thành 0-based
      const columnIndex = column - 1;

      // Tính `seatPosition`
      const seatPosition = rowIndex * totalColumns + columnIndex;
      totalPrice = totalPrice + 45;

      return {
        movieId, // Đảm bảo `movieId` đã được định nghĩa
        startTime: selectedTime.time.startTime, // Đảm bảo `selectedTime` đã được định nghĩa
        endTime: selectedTime.time.endTime,
        seatPosition,
        price: 45,
        orderId: "a", // Tùy chỉnh `orderId` nếu cần
      };
    });

    // Tạo `result`
    const result = {
      tickets,
    };

    // Thêm thông tin `books` nếu `selectedFoods` không rỗng
    if (selectedFoods.length !== 0) {
      result.books = selectedFoods.map((food) => {
        totalPrice += food.price;
        return {
          fastfoodId: food.id,
          quantity: food.quantity,
          orderId: "a",
          size: "Big",
        };
      });
    }

    result.totalPrice = totalPrice;

    if (selectedCouponId) {
      result.couponId = selectedCouponId;
    }
    result.userId = USER_ID;
    return result;
  };

  const getInfo = async () => {
    const info = await getMovieInfo(movieId);
    setMovieInfo(info || {});
  };

  const getShowTime = async () => {
    const showTimeData = (await getShowTimeOfMovie(movieId)) || [];
    getSeat(showTimeData[0]?.times[0].startTime);
    setShowtime(showTimeData || []);
    setSelectedTime({
      day: showTimeData[0]?.day,
      time: showTimeData[0]?.times[0],
    });
  };

  const getFastFoods = async () => {
    const fastFoods = await getCombo();
    setFastFoods(fastFoods || []);
  };

  const getComment = async () => {
    const commentList = await getCommentOfMovie(movieId);
    const totalRate = commentList.reduce((totalRate, comment) => {
      totalRate = totalRate + comment.rating;
      return totalRate;
    }, 0);
    const avgRate = commentList.length ? totalRate / commentList.length : 0;
    setComments(commentList || []);
    setMovieInfo((prevMovieInfo) => ({
      ...prevMovieInfo,
      rating: avgRate,
      numberOfRating: commentList.length,
    }));
  };

  const getSeat = async (startTime) => {
    const seatData = await getSeatOfMovie(movieId, startTime);
    setBusySeats(seatData);
  };

  const handleChangeDay = async (day) => {
    const time = showtime.find((o) => o.day == day).times[0];
    setSelectedTime({
      day,
      time,
    });
    getSeat(time.startTime);
    setSelectedSeats([]);
  };

  const handleChangeTime = async (time) => {
    setSelectedTime(time);
    getSeat(time.time.startTime);
    setSelectedSeats([]);
  };

  const addComment = async (newComment) => {
    // Update the state with the new comment
    setComments([...comments, newComment]);

    // Send the comment with necessary data
    await sendComment({
      ...newComment, // Spread newComment properties
      userId: USER_ID, // Add userId
      movieId, // Add movieId
    });
  };

  useEffect(() => {
    getInfo();
    getComment();
    getShowTime();
    getFastFoods();
  }, []);

  const handleSubmitOrder = async () => {
    try {
      const orderData = handleOrder(); // Get order data
      console.log("Order Data:", orderData);
      if (!orderData) return; // Exit if validation failed

      const response = await createOrder(orderData);
      if (response.success) {
        navigate("/checkout", {
          state: { orderData: response.data },
        });
      } else {
        window.alert("Đặt vé thất bại: " + response.message);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      window.alert("Có lỗi xảy ra khi đặt vé");
    }
  };

  return (
    <>
      <Box
        sx={{
          background: "linear-gradient(to right, #0B0C10, #1F2833)",
          minHeight: "100vh",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MovieDetailComponent
          movieInfo={movieInfo || {}}
          comments={comments || []}
          handleOrder={handleSubmitOrder}
          addComment={addComment}
        />
        <ChooseShowtime
          showTime={showtime || []}
          selectedTime={selectedTime || {}}
          handleSelectDay={handleChangeDay}
          handleSelectTime={handleChangeTime}
        />
        <SeatingMap
          occupiedSeats={busySeats || []}
          selectedSeats={selectedSeats || []}
          setSelectedSeats={setSelectedSeats}
        />
        <FoodBuy
          groups={fastFoods || []}
          selectedFoods={selectedFoods || []}
          handleSelectFood={handleSelectFood}
        />
        <ChooseCoupon onSelect={handleCouponSelect} />
      </Box>
    </>
  );
}
