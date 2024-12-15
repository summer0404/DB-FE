import axios from "axios";

const backendUrl = "http://localhost:3010/database/api/v1";

export const getAllMovie = async () => {
  try {
    const movieInfoResponse = await axios.get(`${backendUrl}/movies`, {
      withCredentials: "include",
    });
    const moviesData = movieInfoResponse?.data?.data || [];

    const result = moviesData.map((movie) => {
      return {
        id: movie?.id,
        title: movie?.name,
        genre: movie?.genres?.map((o) => o.genre)?.join(", "),
        img: movie?.files[0]?.path,
      };
    });

    return result;
  } catch (error) {
    return {};
  }
};
