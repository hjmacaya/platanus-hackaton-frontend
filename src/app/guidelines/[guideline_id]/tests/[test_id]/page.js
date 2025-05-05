"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getAllQuestionsByGuidelineId } from "@/api";
import { UltimateCard } from "@/components/cards";
import axios from "axios";
import { configFile } from "@/config";

export default function QuestionPage() {
  const { test_id: testId, guideline_id: guidelineId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllQuestions = async () => {
    setIsLoading(true);
    try {
      const data = await getAllQuestionsByGuidelineId(guidelineId, testId);
      setQuestions(data || []);
      data.forEach((question) => {
        updateStudentAnswer(question);
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStudentAnswer = async (question) => {
    if (!question.studentAnswerId) return;
    try {
      const headers = axios.defaults.headers.common;
      headers['Content-Type'] = 'application/json';
      headers['Access-Control-Allow-Origin'] = '*';
      const student_answer_id = question.studentAnswerId;
      const body = {
        model_feedback: question.modelFeedback
      }
      const response = await axios.put(`${configFile.API_BASE_URL}/students_answers/${student_answer_id}`, body, { headers });
      console.log(`Update Student Answer ${student_answer_id} Response:`, response);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAllQuestions();
  }, [guidelineId, testId]);

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          {/* CONTRASTING TOP BORDER + animate-spin */}
          <div
            className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"
            role="status"
            aria-label="Loading..."
          />
        </div>
      ) : (
        questions.map((q, i) => (
          <UltimateCard
            key={i}
            questionNumber={i + 1}
            questionType="Desarrollo"
            question={q.question}
            guidelineAnswer={q.guidelineAnswer}
            studentAnswer={q.studentAnswer}
            studentScore={q.studentScore}
            modelFeedback={q.modelFeedback}
          />
        ))
      )}
    </div>
  );
}
