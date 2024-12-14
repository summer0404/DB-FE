import axios from 'axios';

const CONST_BASE_URL = 'http://localhost:3010/database/api/v1';
const SHOWTIME_CONST = 'showtime';

export async function getShowtimeByMovieId(movieId) {
    try {
        const res = await axios.get(`${CONST_BASE_URL}/${SHOWTIME_CONST}/${movieId}`, {
        });
        return res.data;
    } catch (error) {
        console.error('Error getting showtime:', error);
        throw error;
    }
}