import { QuestionCard } from "@/components/cards";

export default function QuestionPage() {
  const questionMockData = [
    {
      id: 1,
      questionNumber: 1,
      question: "¿Cuál es tu comida favorita?",
      questionType: "development",
      guidelineAnswer: "Pizza",
      studentAnswer: "Pizza",
      score: 10,
      alternatives: null,
      studentJustification: null,
      guidelineJustification: null,
    },
    {
      id: 2,
      questionNumber: 2,
      question: "¿Cuál es MI comida favorita?",
      questionType: "multipleChoice",
      guidelineAnswer: "B) Hamburguesa",
      studentAnswer: "A) Pizza",
      score: 0,
      alternatives: {"A": "Pizza", "B": "Hamburguesa", "C": "Tacos", "D": "Sushi"},
      studentJustification: null,
      guidelineJustification: null,
    },
    {
      id: 3,
      questionNumber: 3,
      question: "¿Son los tacos mi comida favorita?",
      questionType: "trueOrFalse",
      guidelineAnswer: "False",
      studentAnswer: "False",
      score: 10,
      alternatives: null,
      studentJustification: "No, pq le gusta la pizza",
      guidelineJustification: "No, pq le gusta la hamburguesa",
    }
  ]
  return (
    <div className="flex flex-col gap-4 p-4">
      {questionMockData.map((question) => (
        <QuestionCard key={question.id} {...question} />
      ))}
    </div>

  )
}