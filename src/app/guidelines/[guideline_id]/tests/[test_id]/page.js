"use client"
import { QuestionCard, UltimateCard } from "@/components/cards";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import { getAllQuestionsByGuidelineId, getAllStudentsAnswerByTestId, getPromptingData } from '../../../../../api';

export default function QuestionPage() {

  const params = useParams();
  const testId = params['test_id'];
  const guidelineId = params['guideline_id'];

  const [questions, setQuestions] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [promptingData, setPromptingData] = useState([]);


  const fetchAllQuestions = async (guidelineId) => {
    try {
      const response = await getAllQuestionsByGuidelineId(guidelineId);

      setQuestions(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      return null;
    }
  }

  const fetchAllStudentAnswers = async (testId) => {
    try {
      const response = await getAllStudentsAnswerByTestId(testId);
      console.log('responseData:', response.data);
      setStudentAnswers(response.data);
      return studentAnswers;
    } catch (error) {
      console.error("Error fetching student answers:", error);
      return null;
    }
  }

  const fetchPromptingData = async (guidelineId) => {
    try {
      const response = await getPromptingData(guidelineId);
      setPromptingData(response.data);
      console.log('promptingData:', response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching prompting data:", error);
    }
  }

  const getStudentAnswerByQuestionId = (questionId) => {
    console.log('questionId:', questionId);

    return studentAnswers.find((studentAnswer) => studentAnswer.question_id === questionId);
  }

  useEffect(() => {
    fetchAllQuestions(guidelineId);
    fetchAllStudentAnswers(testId);
    fetchPromptingData(guidelineId);
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 p-4">
        {promptingData && promptingData?.map((question) => (
          <UltimateCard
            key={question.id}
            questionNumber={question.positional_index}
            questionType={question.type}
            question={question.title}
            guidelineAnswer={question.guideline_answer}
            studentAnswer={getStudentAnswerByQuestionId(question.id)?.content}
            studentScore={getStudentAnswerByQuestionId(question.id)?.student_score}
            modelFeedback={getStudentAnswerByQuestionId(question.id)?.model_feedback}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4 p-4">
        {questions?.map((question) => (
          <QuestionCard
            key={question.id}
            questionNumber={question.positional_index}
            questionType={question.type}
            question={question.title}
            guidelineAnswer={question.guideline_answer}
            studentAnswer={getStudentAnswerByQuestionId(question.id)?.content}
            studentScore={getStudentAnswerByQuestionId(question.id)?.student_score}
            modelFeedback={getStudentAnswerByQuestionId(question.id)?.model_feedback}
          />
        ))}
      </div>
    </div>
    // )
  )
}
