import axios from "axios";

const CONST_BASE_URL = "http://localhost:3010/database/api/v1";

export async function login(token) {
  try {
    const res = await axios.post(
      `${CONST_BASE_URL}/auth/log-in`,
      {},
      {
        headers: {
          gid: token,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error log-in:", error);
    return error;
  }
}

export async function getInfo() {
  try {
    const res = await axios(`${CONST_BASE_URL}/auth/me`, {
      withCredentials: "include",
    });
    return res;
  } catch (error) {
    console.error("Error get information:", error);
    return error;
  }
}
