import axios from 'axios';
import { configFile } from '../config';

// Get all tests of a guideline
export const getAllTestsByGuidelineId = async (guidelineId) => {
  try {
    const response = await axios.get(`${API_URL}/tests/${guidelineId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener los tests de la pauta con id ${guidelineId}: ${error}`);
    return null;
  }
}
