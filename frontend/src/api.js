//4 create API Requests in React
import axios from 'axios';

const API_URL = "http://localhost:5000"; // Backend URL

export const getCourses = async () => {
    try {
        const response = await axios.get(`${API_URL}/Cours`);
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        return [];
    }
};

export const getFormations = async () => {
    try {
        const response = await axios.get(`${API_URL}/Formation`);
        return response.data;
    } catch (error) {
        console.error("Error fetching formations:", error);
        return [];
    }
};
