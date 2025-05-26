import axios from 'axios';
import { configFile } from '../config';

// Get all student answers for a specific test
export const getAllStudentsAnswerByTestId = async (testId) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    const requestOptions = {
      params: {
        test_id: testId
      },
      headers: headers
    };
    
    const response = await axios.get(`${configFile.API_BASE_URL}/api/v1/tests/answers/?test_id=${testId}`, requestOptions);
    console.log('Student answers API response:', response);
    
    // Handle different response formats - ensure we return a consistent structure
    return response.data;
  } catch (error) {
    console.error(`Error al obtener las respuestas de estudiantes para el test con id ${testId}: ${error}`);
    return null;
  }
}

// Get all student answers for a specific student and test
export const getStudentAnswersByStudentAndTestId = async (studentId, testId) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    const requestOptions = {
      params: {
        student_id: studentId,
        test_id: testId
      },
      headers: headers
    };
    
    const response = await axios.get(
      `${configFile.API_BASE_URL}/api/student-answers/by_student_and_test/`, 
      requestOptions
    );
    console.log('Student answers by student and test API response:', response);
    
    // Handle different response formats - ensure we return a consistent structure
    return response.data;
  } catch (error) {
    console.error(`Error al obtener las respuestas del estudiante ${studentId} para el test ${testId}: ${error}`);
    return null;
  }
}
