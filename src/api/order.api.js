import axios from 'axios';

const CONST_BASE_URL = 'http://localhost:3010/database/api/v1';
const ORDERS_CONST = 'orders';

export async function getOrders() {
    try {
        const res = await axios.get(`${CONST_BASE_URL}/${ORDERS_CONST}`, {
        });
        return res.data;
    } catch (error) {
        console.error('Error getting orders:', error);
        throw error;
    }
}