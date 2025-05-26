"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getQuestionsByTestId, getTestById, getPromptingData, getStudentAnswersByStudentAndTestId } from "@/api";
import { UltimateCard } from "@/components/cards";
import axios from "axios";
import { configFile } from "@/config";

export default function QuestionPage() {
  const { test_id: testId, guideline_id: guidelineId } = useParams();
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTestData = async () => {
    setIsLoading(true);
    try {
      // Fetch test details
      const testData = await getTestById(testId);
      console.log('Test data:', testData);
      setTest(testData);
      
      // Get the student ID from the test data
      const studentId = testData.student?.id || testData.student;
      
      if (!studentId) {
        console.error('No student ID found in test data');
        setIsLoading(false);
        return;
      }
      
      // Fetch questions for test only
      const questionsData = await getQuestionsByTestId(testId);
      console.log('Questions data for test:', questionsData);
      
      // Fetch student answers using the new endpoint
      const studentAnswers = await getStudentAnswersByStudentAndTestId(studentId, testId);
      console.log('Student answers data:', studentAnswers);
      
      // Create a map of question ID to student answer for easier lookup
      const studentAnswersMap = {};
      if (studentAnswers && studentAnswers.length > 0) {
        studentAnswers.forEach(answer => {
          studentAnswersMap[answer.question] = answer;
        });
      }
      
      // Transform the data to match the expected format for the UltimateCard component
      const formattedQuestions = (questionsData || []).map(question => {
        // Get the student answer for this question, if it exists
        const studentAnswer = studentAnswersMap[question.id] || {};
        
        // Ensure model_feedback is properly formatted as a string
        let modelFeedback = studentAnswer.model_feedback || question.model_feedback;
        if (modelFeedback === null || modelFeedback === undefined || modelFeedback === false) {
          modelFeedback = "";
        }
        
        return {
          id: question.id,
          question: question.title || question.content,
          questionType: question.question_type || 'Desarrollo',
          guidelineAnswer: question.guideline_answer,
          studentAnswer: studentAnswer.content || question.answer || question.content,
          studentScore: studentAnswer.student_score || question.student_score || 0,
          modelFeedback: String(modelFeedback),  // Ensure it's a string
          studentAnswerId: studentAnswer.id || question.answer_id || question.id,
          positionalIndex: question.positional_index
        };
      });
      
      console.log('Formatted questions:', formattedQuestions);
      setQuestions(formattedQuestions);
      
      // Only update answers that have model feedback
      formattedQuestions.forEach((question) => {
        if (question.modelFeedback) {
          updateStudentAnswer(question);
        }
      });
    } catch (e) {
      console.error('Error fetching questions:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStudentAnswer = async (question) => {
    if (!question.studentAnswerId) return;
    try {
      // Get token from localStorage
      const token = localStorage.getItem('accessToken');
      
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const student_answer_id = question.studentAnswerId;
      const body = {
        model_feedback: question.modelFeedback
      }
      
      const response = await axios.put(
        `${configFile.API_BASE_URL}/api/v1/tests/answers/${student_answer_id}/`,
        body, 
        { headers }
      );
      
      console.log(`Update Student Answer ${student_answer_id} Response:`, response);
    } catch (e) {
      console.error(`Error updating student answer: ${e}`);
    }
  };

  // Function to trigger AI correction
  const correctExamWithAI = async () => {
    setIsLoading(true);
    try {
      // Call the AI correction endpoint
      const data = await getPromptingData(guidelineId, testId);
      console.log('AI correction data:', data);
      
      if (data && data.data) {
        // Format the data for display
        const formattedQuestions = data.data.map(question => {
          // Handle model feedback exactly as in the original platanus-hackathon
          let modelFeedback = question.modelFeedback;
          // The original implementation specifically checks for false value
          if (modelFeedback === false) {
            modelFeedback = "";
          }
          
          console.log('Model feedback for question:', question.questionNumber, modelFeedback);
          
          return {
            id: question.questionNumber,
            question: question.question,
            questionType: question.question_type || 'Desarrollo',
            guidelineAnswer: question.guidelineAnswer,
            studentAnswer: question.studentAnswer,
            studentScore: question.studentScore || 0,
            modelFeedback: String(modelFeedback),  // Ensure it's a string
            studentAnswerId: question.studentAnswerId,
            positionalIndex: question.positionalIndex
          };
        });
        
        setQuestions(formattedQuestions);
        
        // Successfully processed the exam, no need for alert
      } else {
        console.error('No se pudo obtener la corrección del examen.');
      }
    } catch (error) {
      console.error('Error correcting exam:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestData();
  }, [guidelineId, testId]);

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div
            className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"
            role="status"
            aria-label="Loading..."
          />
        </div>
      ) : (
        <>
          {test && (
            <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
              <h1 className="text-2xl font-bold mb-2">{test.title}</h1>
              {test.description && (
                <p className="text-gray-700 mb-2">{test.description}</p>
              )}
              <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
                {test.subject && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Asignatura: {test.subject}
                  </span>
                )}
                {test.date && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Fecha: {new Date(test.date).toLocaleDateString()}
                  </span>
                )}
              </div>
              
              {/* AI Correction Button */}
              <button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
                onClick={correctExamWithAI}
              >
                Corregir con Inteligencia Artificial
              </button>
            </div>
          )}
          
          {questions.length > 0 ? (
            questions.map((q, i) => (
              <UltimateCard
                key={i}
                questionNumber={i + 1}
                questionType={q.questionType || "Desarrollo"}
                question={q.question}
                guidelineAnswer={q.guidelineAnswer}
                studentAnswer={q.studentAnswer}
                studentScore={q.studentScore}
                modelFeedback={q.modelFeedback}
              />
            ))
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No hay preguntas disponibles para este test.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
