import axios from 'axios';
import { configFile } from '../config';

// Get all tests of a guideline
export const getAllQuestionsByGuidelineId = async (guidelineId) => {
  try {
    const requestOptions = {
      params: {
        guideline_id: parseInt(guidelineId)
      }
    }
    const response = await axios.get(`${configFile.API_BASE_URL}/questions/`, requestOptions);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener los tests de la pauta con id ${guidelineId}: ${error}`);
    return null;
  }
}

// Get prompitingData
export const getPromptingData = async (guidelineId) => {
  try {
    const response = await axios.get(`${configFile.API_BASE_URL}/get_prompting_data/${guidelineId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener los datos de prompting de la pauta con id ${guidelineId}: ${error}`);
    return null;
  }
}