import axios from "axios";
import { comment } from "postcss";

const backendUrl = "http://localhost:3010/database/api/v1";

export const getMovieInfo = async (movieId) => {
  try {
    const movieInfoResponse = await axios.get(
      `${backendUrl}/movies/${movieId}`
    );
    const movieData = movieInfoResponse?.data?.data || {};

    return {
      id: movieId,
      name: movieData.name || "",
      length: movieData.length || 0,
      category: movieData.genres.map((o) => o.genre).join(", ") || "",
      nation: movieData.country,
      limitAge: movieData.ageLimitation,
      director: movieData.directors.map((o) => `${o.firstName} ${o.lastName}`),
      actor: movieData.actors.map((o) => `${o.firstName} ${o.lastName}`),
      premiereSchedule: movieData.publishDay || "",
      urlFile: movieData?.files[0]?.path,
      content: movieData.description || "",
    };
  } catch (error) {
    return {};
  }
};

export const getCommentOfMovie = async (movieId) => {
  try {
    const commentsResponse = await axios.get(`${backendUrl}/rates/${movieId}`);

    const commentsData = commentsResponse?.data?.data || [];

    return commentsData.map((commentData, index) => ({
      id: index,
      rating: commentData.stars,
      content: commentData.comment,
    }));
  } catch (error) {}
};

export const getShowTimeOfMovie = async (movieId) => {
  try {
    const showTimeResponse = await axios.get(
      `${backendUrl}/showtime/${movieId}`
    );
    const showTimeData = showTimeResponse?.data?.data || [];

    // Hàm định dạng ngày từ ISO sang định dạng DD/MM/YYYY
    const formatDate = (isoDate) => {
      const date = new Date(isoDate);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    // Hàm định dạng giờ từ ISO sang định dạng HH:mm
    const formatTime = (isoDate) => {
      const date = new Date(isoDate);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    // Nhóm dữ liệu theo ngày
    const groupedData = showTimeData?.reduce((acc, item) => {
      const day = formatDate(item.startTime);

      // Tìm đối tượng ngày đã tồn tại trong mảng
      let dayEntry = acc.find((entry) => entry.day === day);

      if (!dayEntry) {
        // Nếu chưa có, thêm mới
        dayEntry = { day, times: [] };
        acc.push(dayEntry);
      }

      // Thêm thông tin giờ vào mảng times
      dayEntry.times.push({
        startTime: item.startTime,
        endTime: item.endTime,
        time: formatTime(item.startTime),
      });

      return acc;
    }, []);

    // Sắp xếp dữ liệu theo ngày tăng dần
    groupedData.sort((a, b) => {
      const dateA = new Date(a.day.split("/").reverse().join("-"));
      const dateB = new Date(b.day.split("/").reverse().join("-"));
      return dateA - dateB;
    });

    // Sắp xếp giờ trong từng ngày tăng dần
    groupedData.forEach((dayEntry) => {
      dayEntry.times.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    });

    return groupedData;
  } catch (error) {
    console.log(error);
  }
};

export const formatDatetoDDMMYYYY = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0"); // Lấy ngày và thêm số 0 nếu cần
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng (cộng 1 vì getMonth trả về 0-11)
  const year = date.getFullYear(); // Lấy năm
  return `${day}/${month}/${year}`;
}

export const getSeatOfMovie = async (movieId, startTime) => {
  try {
    const ticketReponse = await axios.post(`${backendUrl}/tickets/showtime`, {
      movieId,
      startTime,
    });
    const ticketData = ticketReponse?.data?.data || [];
    const busySeat = ticketData.map((ticket) => {
      const seatPosition = ticket.seatPosition;
      const row = String.fromCharCode(65 + Math.floor(seatPosition / 20)); // Tính hàng (A, B, C...)
      const col = (seatPosition % 20) + 1; // Tính cột
      const colFormatted = col < 10 ? `0${col}` : col; // Thêm số 0 vào cột nếu nhỏ hơn 10
      return `${row}${colFormatted}`;
    });

    return busySeat;
  } catch (error) {}
};

export const getCombo = async () => {
  try {
    const fastFoodResponse = await axios.get(`${backendUrl}/fastfoods`);
    const fastFoodData = fastFoodResponse?.data?.data;
    const groupedData = fastFoodData.reduce((acc, item) => {
      const groupTitle = item.foodGroup.toUpperCase(); // Convert foodGroup to uppercase
      if (!acc[groupTitle]) {
        acc[groupTitle] = [];
      }

      // Push the formatted item into the correct group
      acc[groupTitle].push({
        id: item.id,
        title: item.name,
        description: `${item.name} description`, // Replace with actual description if available
        price: item.price,
        image: item.file.path, // Use the file name as the image
      });

      return acc;
    }, {});

    // Convert grouped data to desired format
    return Object.entries(groupedData).map(([title, items]) => ({
      title,
      items,
    }));
  } catch (error) {}
};
