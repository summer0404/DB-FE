import { Typography, Box, Grid } from "@mui/material";
import { getMovieById } from "../../api/movies.api";
import { useState, useEffect } from "react";

// Add helper function to convert seatIndex to readable format
const convertSeatIndexToName = (seatIndex) => {
  const totalColumns = 20;
  const row = String.fromCharCode(Math.floor(seatIndex / totalColumns) + 65); // 65 is ASCII for 'A'
  const column = (seatIndex % totalColumns) + 1;
  return `${row}${column}`;
};

export default function TicketInfo({ ticketData }) {
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      if (ticketData?.orderTickets && ticketData.orderTickets.length > 0) {
        try {
          const movieId = ticketData.orderTickets[0].movieId;
          const response = await getMovieById(movieId);
          setMovieInfo(response.data);
        } catch (error) {
          console.error("Error fetching movie info:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMovieInfo();
  }, [ticketData]);

  return (
    <Grid item xs={12} md={6}>
      <Box
        sx={{
          backgroundColor: "#2d4159",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5" sx={{ color: "#66FCF1", marginBottom: 2 }}>
          {loading ? "Loading..." : movieInfo?.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "5px", fontWeight: "bold", color: "#66FCF1" }}
        >
          Phim dành cho khán giả trên {movieInfo?.ageLimitation} tuổi
        </Typography>
        <Typography sx={{ color: "#C5C6C7", marginBottom: 1 }}>
          Thời gian:{" "}
          <b>
            {ticketData?.orderTickets && ticketData.orderTickets[0]?.startTime
              ? new Date(ticketData.orderTickets[0].startTime).toLocaleString(
                  "vi-VN",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )
              : "---"}
          </b>
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "5px" }}>
          Phòng chiếu: <b>{ticketData.roomInfo.room.name}</b>
        </Typography>
        <Typography sx={{ color: "#C5C6C7", marginBottom: 1 }}>
          Số ghế:{" "}
          <b>
            {ticketData?.orderTickets
              ?.map((ticket) => convertSeatIndexToName(ticket.seatPosition))
              .join(", ")}
          </b>
        </Typography>
        <Typography sx={{ color: "#C5C6C7", marginBottom: 1 }}>
          Bắp nước:{" "}
          <b>
            {ticketData?.fastfoods?.length > 0
              ? ticketData.fastfoods
                  .map((food) => `${food.name} (${food.quantity})`)
                  .join(", ")
              : "---"}
          </b>
        </Typography>
        ---------------------------------------------
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#66FCF1", fontWeight: "bold" }}
          >
            TỔNG SỐ TIỀN
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {ticketData.order.realPrice.toString() + ",000"} VNĐ
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
