import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getOrders } from "../../api/order.api";



export default function OrderTable() {
  // Add states
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add useEffect to fetch data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to right, #0B0C10, #1F2833)",
          padding: 4,
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: "1200px",
            backgroundColor: "transparent",
            padding: 4,
            borderRadius: "8px",
            border: "2px solid #66FCF1",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            color: "#fff",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#66FCF1",
              marginBottom: 2,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Danh sách các đơn hàng
          </Typography>

          {/* Order Table */}
          <TableContainer component={Paper} sx={{ backgroundColor: "#1F2937" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      width: COLUMN_WIDTHS.createdTime,
                      fontSize: "1.1rem",
                    }}
                  >
                    Thời gian tạo
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      width: COLUMN_WIDTHS.totalPrice,
                      fontSize: "1.1rem",
                    }}
                  >
                    Tổng giá
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      width: COLUMN_WIDTHS.paymentMethod,
                      fontSize: "1.1rem",
                    }}
                  >
                    Phương thức thanh toán
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      width: COLUMN_WIDTHS.realPrice,
                      fontSize: "1.1rem",
                    }}
                  >
                    Giá cuối cùng
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      width: COLUMN_WIDTHS.paymentStatus,
                      fontSize: "1.1rem",
                    }}
                  >
                    Trạng thái thanh toán
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">Loading...</TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell sx={{ 
                        color: '#fff',
                        width: COLUMN_WIDTHS.createdTime 
                      }}>
                        {new Date(order.createdTime).toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ 
                        color: '#fff',
                        width: COLUMN_WIDTHS.totalPrice 
                      }}>
                        {order.totalPrice.toLocaleString()}đ
                      </TableCell>
                      <TableCell sx={{ 
                        color: '#fff',
                        width: COLUMN_WIDTHS.paymentMethod 
                      }}>
                        {order.paymentMethod}
                      </TableCell>
                      <TableCell sx={{ 
                        color: '#fff',
                        width: COLUMN_WIDTHS.realPrice 
                      }}>
                        {order.realPrice.toLocaleString()}đ
                      </TableCell>
                      <TableCell sx={{ 
                        color: '#fff',
                        width: COLUMN_WIDTHS.paymentStatus 
                      }}>
                        {order.paymentStatus}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

// Width constants based on header text length
const COLUMN_WIDTHS = {
    createdTime: "25%", // "Thời gian tạo" - longest
    totalPrice: "20%", // "Tổng giá" - medium
    paymentMethod: "25%", // "Phương thức thanh toán" - longest
    realPrice: "15%", // "Giá thực" - short
    paymentStatus: "15%" // "Trạng thái" - short
  };