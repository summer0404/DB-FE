import axios from 'axios';

const CONST_BASE_URL = 'http://localhost:3010/database/api/v1';
const MOVIES_CONST = 'movies';


export async function getAllMovies() {
    try {
        const res = await axios.get(`${CONST_BASE_URL}/${MOVIES_CONST}`, {
        });
        return res.data;
    } catch (error) {
        console.error('Error getting movies:', error);
        throw error;
    }
}