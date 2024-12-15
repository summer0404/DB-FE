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
} from "@mui/material";
import { useState, useEffect } from "react";
import { getOrders, getOrdersByUser } from "../../api/order.api";
import { useSelector } from "react-redux";

export default function OrderTable() {
  // States
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortAscending, setSortAscending] = useState(true);
  const userId = useSelector((state) => state?.user?.user?.userId);
  const userType = useSelector((state) => state?.user?.user?.userType);

  // Fetch data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (userType === "Staff") {
          const response = await getOrders();
          setOrders(response.data);
        } else if (userType === "Customer") {
          const response = await getOrdersByUser(userId);
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userType, userId]);

  // Function to sort orders
  const handleSort = () => {
    setSortAscending(!sortAscending);
  };

  const statusOrder = {
    "Đang chờ thanh toán": 1,
    "Thành công": 2,
    "Đã hủy": 3,
  };

  const sortedOrders = [...orders].sort((a, b) => {
    // So sánh trạng thái thanh toán
    const statusA = statusOrder[a.paymentStatus] || 4;
    const statusB = statusOrder[b.paymentStatus] || 4;

    if (statusA === statusB) {
      // Nếu trạng thái giống nhau, sắp xếp theo ngày tạo
      return sortAscending
        ? new Date(a.createdTime) - new Date(b.createdTime)
        : new Date(b.createdTime) - new Date(a.createdTime);
    }

    return sortAscending ? statusA - statusB : statusB - statusA;
  });

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
                sortedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell sx={{ color: "#fff", width: COLUMN_WIDTHS.createdTime }}>
                      {new Date(order.createdTime).toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ color: "#fff", width: COLUMN_WIDTHS.totalPrice }}>
                      {order.totalPrice.toLocaleString() + ",000"}đ
                    </TableCell>
                    <TableCell sx={{ color: "#fff", width: COLUMN_WIDTHS.paymentMethod }}>
                      {order.paymentMethod}
                    </TableCell>
                    <TableCell sx={{ color: "#fff", width: COLUMN_WIDTHS.realPrice }}>
                      {order.realPrice.toLocaleString() + ",000"}đ
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
