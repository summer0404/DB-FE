import axios from "axios";

const backendURL = "http://localhost:3010/database/api/v1";
export const getAllMovies = async () => {
  try {
    const response = await axios.get(`${backendURL}/movies`, {
      withCredentials: "include",
    });
    return response?.data?.data || [];
  } catch (error) {
    console.error("L��i khi lấy tất cả các phim:", error);
    return [];
  }
};

export const fetchCountries = async () => {
  try {
    const countryNames = [
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Antigua and Barbuda",
      "Argentina",
      "Armenia",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bhutan",
      "Bolivia",
      "Bosnia and Herzegovina",
      "Botswana",
      "Brazil",
      "Brunei",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cabo Verde",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Central African Republic",
      "Chad",
      "Chile",
      "China",
      "Colombia",
      "Comoros",
      "Congo (Congo-Brazzaville)",
      "Costa Rica",
      "Croatia",
      "Cuba",
      "Cyprus",
      "Czechia (Czech Republic)",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Ethiopia",
      "Fiji",
      "Finland",
      "France",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Greece",
      "Grenada",
      "Guatemala",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Holy See",
      "Honduras",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Korea (North)",
      "Korea (South)",
      "Kosovo",
      "Kuwait",
      "Kyrgyzstan",
      "Laos",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Mauritania",
      "Mauritius",
      "Mexico",
      "Micronesia",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Morocco",
      "Mozambique",
      "Myanmar (formerly Burma)",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "North Macedonia",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Palestine State",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Qatar",
      "Romania",
      "Russia",
      "Rwanda",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Vincent and the Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Sudan",
      "Spain",
      "Sri Lanka",
      "Sudan",
      "Suriname",
      "Sweden",
      "Switzerland",
      "Syria",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      "Timor-Leste",
      "Togo",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States of America",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Venezuela",
      "Vietnam",
      "Yemen",
      "Zambia",
      "Zimbabwe",
    ];

    return countryNames.sort(); // Sắp xếp theo thứ tự bảng chữ cái
  } catch (error) {
    console.error("Lỗi khi lấy danh sách quốc gia:", error);
    return [];
  }
};

export const createMovie = async (movieData) => {
  try {
    console.log(movieData);
    // Tạo một đối tượng FormData
    const formData = new FormData();

    // Duyệt qua các trường dữ liệu trong movieData và thêm vào FormData
    for (const key in movieData) {
      if (key === "files" && Array.isArray(movieData[key])) {
        // Nếu là mảng các file, thêm từng file vào FormData
        movieData[key].forEach((file, index) => {
          formData.append("files", file); // Tên `files` được dùng để backend nhận dạng
        });
      } else if (Array.isArray(movieData[key])) {
        // Nếu là mảng không phải file (ví dụ: diễn viên, đạo diễn), chuyển thành JSON string
        formData.append(key, JSON.stringify(movieData[key]));
      } else {
        // Thêm các giá trị khác
        formData.append(key, movieData[key]);
      }
    }

    // Debug FormData
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File name - ${value.name}, type - ${value.type}`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    // Gửi dữ liệu tới API bằng Axios
    const response = await axios.post(`${backendURL}/movies`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Đặt Content-Type để báo đây là FormData
      },
      withCredentials: "include",
    });

    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Lỗi khi tạo phim:", error);
    throw error; // Ném lỗi ra ngoài nếu cần
  }
};

export const deleteMovie = async (id) => {
  try {
    console.log(id);
    const response = await axios.delete(`${backendURL}/movies/${id}`, {
      withCredentials: "include",
    });
    console.log(response.data); // Nếu muốn log phản hồi từ server
    return response.data; // Nếu cần trả về kết quả
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error; // Hoặc xử lý lỗi tùy ý
  }
};

export const updateFilm = async (id, movieData) => {
  try {
    const formData = new FormData();

    // Append movie data fields to formData
    formData.append("name", movieData.name);
    formData.append("publishDay", movieData.publishDay);
    formData.append("length", movieData.length);
    formData.append("ageLimitation", movieData.ageLimitation);
    formData.append("country", movieData.country);
    formData.append("description", movieData.description);

    // Append genres as JSON string
    formData.append("genres", JSON.stringify(movieData.genres));

    // Append directors as JSON string
    formData.append("directors", JSON.stringify(movieData.directors));

    // Append actors as JSON string
    formData.append("actors", JSON.stringify(movieData.actors));

    // Append startTime and endTime as JSON string
    formData.append("startTime", JSON.stringify(movieData.startTime));
    formData.append("endTime", JSON.stringify(movieData.endTime));

    // Append each file in the posters array
    movieData.files.forEach((file, index) => {
      formData.append(`files`, file);
    });

    const response = await axios.post(
      `${backendURL}/movies/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: "include",
      }
    );

    console.log("Cập nhật phim thành công:", response.data);

    return response.data; // Trả về kết quả nếu cần
  } catch (error) {
    console.error("Lỗi khi cập nhật phim:", error);
    throw error; // Ném lỗi để xử lý phía gọi hàm
  }
};
