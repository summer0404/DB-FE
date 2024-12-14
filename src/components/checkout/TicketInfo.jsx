import { Typography, Box, Grid } from "@mui/material"


export default function TicketInfo({ticketData}) {
    return (
        <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "#2d4159",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                {ticketData.movieName}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "5px", fontWeight: "bold", color: "#66FCF1" }}>
                Phim dành cho khán giả trên {ticketData.ageLimitation} tuổi
              </Typography>

              <Typography variant="body2" sx={{ marginBottom: "5px" }}>
                Thời gian: {ticketData.startTime}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "5px" }}>
                Phòng chiếu: <b>{ticketData.room}</b>
              </Typography>
              
              <Typography variant="body2" sx={{ marginBottom: "5px" }}>
                Số ghế: <b>{ticketData.seatName}</b>
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "15px" }}>
                Bắp nước: <b>---</b>
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
                <Typography variant="h6" sx={{ color: "#66FCF1", fontWeight: "bold" }}>
                  TỔNG SỐ TIỀN
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {ticketData.price} VNĐ
                </Typography>
              </Box>
            </Box>
          </Grid>
    )
}