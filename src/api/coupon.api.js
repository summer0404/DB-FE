import axios from "axios";

const CONST_BASE_URL = "http://localhost:3010/database/api/v1";
const COUPON_CONST = "coupons";

export async function getCoupons() {
  try {
    const res = await axios.get(`${CONST_BASE_URL}/${COUPON_CONST}`, {
      withCredentials: "include",
    });
    return res.data;
  } catch (error) {
    console.error("Error getting coupons:", error);
    throw error;
  }
}
