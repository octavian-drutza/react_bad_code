import React, { useEffect } from 'react';
import Question from '../quiz-components/Question';
import { Link, useParams } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { useState } from 'react/cjs/react.development';

function Quiz() {
  const {
    finished,
    score,
    questions,
    quizes,
    currentQuestion,
    wrongAnswers,
    currentQuiz,
    loadQuiz,
    loadQuizQuestions,
    loadCurrentQuestion,
    startQuiz,
    resetAll,
  } = useGlobalContext();

  const { id } = useParams();

  const [start, setStart] = useState(false);

  const setUpQuiz = () => {
    loadQuiz(id);
    loadQuizQuestions();
    loadCurrentQuestion();
    setStart(true);
  };

  const backToQuizes = () => {
    startQuiz();
    resetAll();
    setStart(false);
  };

  if (finished) {
    return (
      <div>
        <p>
          quiz done, your total score is {score} out of {questions.length}
        </p>
        {wrongAnswers.map((wrongAnswer, index) => {
          const { question, wrongs } = wrongAnswer;

          return (
            <div key={index}>
              In question "{question.question}", you answered:
              {wrongs.map((wrong, index) => {
                return <li key={index}>{wrong.name}</li>;
              })}
              Correct answers were:
              {question.answers.map((answer, index) => {
                return answer.correct && <li key={index}>{answer.name}</li>;
              })}
            </div>
          );
        })}
        <Link to='/view-quizes' onClick={backToQuizes}>
          Back to quizes
        </Link>
      </div>
    );
  }

  if (!start) {
    return (
      <div>
        <button onClick={setUpQuiz}>Start!</button>
      </div>
    );
  }

  return (
    <div>
      <Question {...currentQuestion} backToQuizes={backToQuizes} />
    </div>
  );
}

export default Quiz;
