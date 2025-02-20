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
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getOrders } from "../../api/order.api";
import SortIcon from "@mui/icons-material/Sort";

export default function OrderTable() {
  // States
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortAscending, setSortAscending] = useState(true);

  // Fetch data
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      const sortedOrders = sortOrders(response.data, sortAscending);
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to sort orders by custom payment status order and created time
  const sortOrders = (orders, ascending) => {
    const statusOrder = {
      "Đang chờ thanh toán": 1,
      "Thành công": 2,
      "Đã hủy": 3,
    };

    return orders.sort((a, b) => {
      const statusA = statusOrder[a.paymentStatus] || 4;
      const statusB = statusOrder[b.paymentStatus] || 4;

      if (statusA === statusB) {
        return ascending
          ? new Date(a.createdTime) - new Date(b.createdTime)
          : new Date(b.createdTime) - new Date(a.createdTime);
      }

      return ascending ? statusA - statusB : statusB - statusA;
    });
  };

  // Handle sort button click
  const handleSort = () => {
    const newSortOrder = !sortAscending;
    setSortAscending(newSortOrder);
    setOrders(sortOrders([...orders], newSortOrder));
  };

  return (
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

        {/* Sort Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<SortIcon />}
            onClick={handleSort}
            sx={{
              backgroundColor: "#66FCF1",
              color: "#1F2833",
              "&:hover": { backgroundColor: "#45A29E" },
            }}
          >
            {sortAscending ? "Sắp xếp tăng dần" : "Sắp xếp giảm dần"}
          </Button>
        </Box>

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
                  <TableCell colSpan={5} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell sx={{ color: "#fff", width: COLUMN_WIDTHS.createdTime }}>
                      {new Date(order.createdTime).toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ color: "#fff", width: COLUMN_WIDTHS.totalPrice }}>
                      {order.totalPrice.toLocaleString()}đ
                    </TableCell>
                    <TableCell sx={{ color: "#fff", width: COLUMN_WIDTHS.paymentMethod }}>
                      {order.paymentMethod}
                    </TableCell>
                    <TableCell sx={{ color: "#fff", width: COLUMN_WIDTHS.realPrice }}>
                      {order.realPrice.toLocaleString()}đ
                    </TableCell>
                    <TableCell sx={{ color: "#fff", width: COLUMN_WIDTHS.paymentStatus }}>
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
  );
}

// Width constants based on header text length
const COLUMN_WIDTHS = {
  createdTime: "25%",
  totalPrice: "20%",
  paymentMethod: "25%",
  realPrice: "15%",
  paymentStatus: "15%",
};
