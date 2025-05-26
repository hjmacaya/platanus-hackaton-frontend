import axios from 'axios';
import { configFile } from '../config';

// Get all tests of a guideline
export const getAllTestsByGuidelineId = async (guidelineId) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    const requestOptions = {
      params: {
        guideline_id: parseInt(guidelineId)
      },
      headers: headers
    };
    
    // Using the new by_guideline endpoint for better filtering
    const response = await axios.get(`${configFile.API_BASE_URL}/api/v1/tests/tests/by_guideline/`, requestOptions);
    console.log('Tests API response:', response);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener los tests de la pauta con id ${guidelineId}: ${error}`);
    return null;
  }
}

// Get a specific test by ID
export const getTestById = async (testId) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    const response = await axios.get(
      `${configFile.API_BASE_URL}/api/v1/tests/tests/${testId}/`,
      { headers }
    );
    console.log(`Test ${testId} API response:`, response);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el test con id ${testId}: ${error}`);
    return null;
  }
}
