import axios from "axios";

const CONST_BASE_URL = "http://localhost:3010/database/api/v1";
const ORDERS_CONST = "orders";

export async function getOrders() {
  try {
    const res = await axios.get(`${CONST_BASE_URL}/${ORDERS_CONST}`, {
      withCredentials: "include",
    });
    return res.data;
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
}

export async function getOrdersByUser(id) {
  try {
    const res = await axios.get(
      `${CONST_BASE_URL}/${ORDERS_CONST}/user/${id}`,
      {
        withCredentials: "include",
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
}

export async function createOrder(orderData) {
  console.log("Order Data:", orderData);
  try {
    const res = await axios.post(
      `${CONST_BASE_URL}/${ORDERS_CONST}`,
      orderData,
      { withCredentials: "include" }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

export async function updateOrder(orderId, orderData) {
  try {
    const res = await axios.put(
      `${CONST_BASE_URL}/${ORDERS_CONST}/${orderId}`,
      orderData,
      { withCredentials: "include" }
    );
    return res.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}
