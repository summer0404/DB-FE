import axios from 'axios';

const CONST_BASE_URL = 'http://localhost:3010/database/api/v1';
const FASTFOOD_CONST = 'fastfoods';

export async function createFastFood(fastfoodData) {
    try {
        const res = await axios.post(`${CONST_BASE_URL}/${FASTFOOD_CONST}`, fastfoodData, {
        });
        return res.data;
    } catch (error) {
        console.error('Error creating fastfood:', error);
        throw error;
    }
}

export async function getFastFood() {
    try {
        const res = await axios.get(`${CONST_BASE_URL}/${FASTFOOD_CONST}`, {
        });
        return res.data;
    } catch (error) {
        console.error('Error getting fastfoods:', error);
        throw error;
    }
}

export async function deleteFastFood(fastfoodId) {
    try {
        const res = await axios.delete(`${CONST_BASE_URL}/${FASTFOOD_CONST}/${fastfoodId}`, {
        });
        return res.data;
    } catch (error) {
        console.error('Error deleting fastfood:', error);
        throw error;
    }
}

export async function updateFastFood(fastfoodId, fastfoodData) {
    try {
        console.log('fastfoodId:', fastfoodId);
        console.log('fastfoodData:', fastfoodData);
        const res = await axios.post(`${CONST_BASE_URL}/${FASTFOOD_CONST}/${fastfoodId}`, fastfoodData, {
        });
        return res;
    } catch (error) {
        console.error('Error updating fastfood:', error);
        throw error;
    }
}

export async function getFastFoodById(fastfoodId) {
    try {
        const res = await axios.get(`${CONST_BASE_URL}/${FASTFOOD_CONST}/${fastfoodId}`, {
        });
        return res.data;
    } catch (error) {
        console.error('Error getting fastfood by id:', error);
        throw error;
    }
}