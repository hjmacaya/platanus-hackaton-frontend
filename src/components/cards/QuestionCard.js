import React from 'react';

const QuestionCard = ({
  questionNumber,
  questionType,
  question,
  guidelineAnswer,
  studentAnswer,
  score,
  alternatives,
  studentJustification,
  guidelineJustification
}) => {
  // Function to determine badge color based on question type
  const getBadgeColor = (type) => {
    switch (type) {
      case 'multipleChoice':
        return 'bg-blue-500';
      case 'trueOrFalse':
        return 'bg-green-500';
      case 'short answer':
        return 'bg-yellow-500';
      case 'development':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const typeTranslation = {
    multipleChoice: "Selección múltiple",
    trueOrFalse: "Verdadero o Falso",
    shortAnswer: "Respuesta corta",
    development: "Desarrollo",
  }

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-md p-6 space-y-6 w-[600px] mx-auto">
      {/* Div 1 */}
      <div className="flex pb-6 border-b border-gray-200">
        {/* Left Div (1/3) */}
        <div className="w-1/3 pr-4 flex flex-col space-y-2 border-r border-gray-200 mr-3">
          {/* Question Number */}
          <div>
            <span className="text-gray-600">N° de pregunta:</span>{' '}
            <span className="font-semibold">{questionNumber}</span>
          </div>
          {/* Score */}
          <div>
            <span className="text-gray-600">Puntaje:</span>{' '}
            <span className="font-semibold">{score}</span>
          </div>
          {/* Question Type Badge */}
          <div>
            <span
              className={`inline-block px-2 py-1 text-sm font-semibold text-white rounded-full ${getBadgeColor(
                questionType
              )}`}
            >
              {typeTranslation[questionType]}
            </span>
          </div>
        </div>
        {/* Right Div (2/3) */}
        <div className="w-2/3 flex flex-col justify-center">
          <h3 className="text-lg font-semibold mb-2">Pregunta: {question}</h3>
          
          {/* Check for alternatives */}
          {alternatives && Object.entries(alternatives).map(([ key, value ]) => (
            <div key={key}>
              <span className="font-semibold">{key}:</span> {value}
            </div>
          ) )}
        </div>
      </div>

      {/* Div 2: Expected Answer */}
      <div className="pb-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-2">Respuesta esperada</h3>
        <p className="text-gray-800">{guidelineAnswer}</p>

        {/* Check if it is true or false */}
        {guidelineJustification && (
          <p className="text-gray-800">{guidelineJustification}</p>
        )}
      </div>

      {/* Div 3: Student's Answer */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Respuesta del estudiante</h3>
        <p className="text-gray-800">{studentAnswer}</p>

        {/* Check if it is true or false */}
        {studentJustification && (
          <p className="text-gray-800">{studentJustification}</p>
        )}
      </div>
    </div>
  );
};

export { QuestionCard };
