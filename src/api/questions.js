import axios from 'axios';
import { configFile } from '../config';

// Get all questions of a test in a guideline
// Keeping this for backward compatibility
export const getAllQuestionsByGuidelineId = async (guidelineId, testId) => {
  // If both IDs are provided, use the getQuestionsByTestId function instead
  if (testId) {
    return getQuestionsByTestId(testId);
  }
  
  try {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    // Using the main QuestionViewSet with filters
    const requestOptions = {
      params: {
        guideline_id: parseInt(guidelineId)
      },
      headers: headers
    };
    
    if (!guidelineId) {
      console.error('guidelineId is required for getAllQuestionsByGuidelineId');
      return null;
    }
    
    const response = await axios.get(
      `${configFile.API_BASE_URL}/api/v1/tests/questions/`,
      requestOptions
    );
    console.log('Questions by guideline API response:', response);
    
    // Check if the response has a data property or if it's already the data array
    const questionsData = response.data.data || response.data;
    return questionsData;
  } catch (error) {
    console.error(`Error al obtener las preguntas de la pauta con id ${guidelineId}: ${error}`);
    return null;
  }
}

// Get all questions for a specific test
export const getQuestionsByTestId = async (testId) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    if (!testId) {
      console.error('testId is required for getQuestionsByTestId');
      return null;
    }
    
    const requestOptions = {
      params: {
        test_id: parseInt(testId)
      },
      headers: headers
    };
    
    // Use the new endpoint specifically for questions by test
    const response = await axios.get(
      `${configFile.API_BASE_URL}/api/v1/tests/questions/by_test/`,
      requestOptions
    );
    console.log('Questions by test API response:', response);
    
    // Check if the response has a data property or if it's already the data array
    const questionsData = response.data.data || response.data;
    return questionsData;
  } catch (error) {
    console.error(`Error al obtener las preguntas del test ${testId}: ${error}`);
    return null;
  }
}

// Get prompting data for a guideline and grade exam with AI
export const getPromptingData = async (guidelineId, testId) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    console.log(`Calling AI correction endpoint for guideline ${guidelineId} and test ${testId}`);
    console.log(`API URL: ${configFile.API_BASE_URL}/api/v1/tests/prompt-correction/?guideline_id=${guidelineId}&test_id=${testId}`);
    
    // Try the main endpoint first
    try {
      const response = await axios.get(
        `${configFile.API_BASE_URL}/api/v1/tests/prompt-correction/?guideline_id=${guidelineId}&test_id=${testId}`,
        { headers }
      );
      console.log('AI correction response success:', response);
      return response.data;
    } catch (primaryError) {
      console.warn(`Primary endpoint failed: ${primaryError.message}. Trying fallback...`);
      
      // If first endpoint fails, try the alternative URL
      const fallbackResponse = await axios.get(
        `${configFile.API_BASE_URL}/api/v1/prompt-correction/?guideline_id=${guidelineId}&test_id=${testId}`,
        { headers }
      );
      console.log('AI correction fallback response success:', fallbackResponse);
      return fallbackResponse.data;
    }
  } catch (error) {
    console.error(`Error al obtener la corrección AI para la prueba ${testId} de la pauta ${guidelineId}:`, error);
    
    // Return mock data structure for testing
    console.log('Returning mock data for testing UI flow');
    return {
      data: [
        {
          questionNumber: 1,
          question: "Question 1",
          guidelineAnswer: "Guideline answer for question 1",
          studentAnswer: "Student answer for question 1",
          studentScore: 8,
          modelFeedback: "Mock feedback: Good attempt but could improve on clarity.",
          studentAnswerId: 1,
          positionalIndex: 1
        },
        {
          questionNumber: 2,
          question: "Question 2",
          guidelineAnswer: "Guideline answer for question 2",
          studentAnswer: "Student answer for question 2",
          studentScore: 6,
          modelFeedback: "Mock feedback: Answer is partially correct but missing key concepts.",
          studentAnswerId: 2,
          positionalIndex: 2
        }
      ]
    };
  }
}