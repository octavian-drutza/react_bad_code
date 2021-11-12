import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import data from './data';
import quizes from './quizes';

const AppContext = React.createContext();

const initialState = {
  quizes: quizes,
  currentQuiz: {},
  questions: [],
  current: 0,
  currentQuestion: {},
  wrongAnswers: [],
  answered: [],
  finished: false,
  score: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadQuiz = (id) => {
    dispatch({ type: 'LOAD_CURRENT_QUIZ', payload: id });
  };

  const loadQuizQuestions = () => {
    dispatch({ type: 'LOAD_QUIZ_QUESTIONS' });
  };

  const loadCurrentQuestion = () => {
    dispatch({ type: 'LOAD_CURRENT_QUESTION' });
  };

  const addQuiz = (quiz) => {
    dispatch({ type: 'ADD_QUIZ', payload: quiz });
  };

  const deleteQuiz = (id) => {
    dispatch({ type: 'DELETE_QUIZ', payload: id });
  };

  const addQuestion = (question) => {
    dispatch({ type: 'ADD_QUESTIONS', payload: question });
  };

  const saveQuestion = (question) => {
    dispatch({ type: 'SAVE_QUESTION', payload: question });
  };

  const deleteQuestion = (quizId, id) => {
    dispatch({ type: 'DELETE_QUESTION', payload: { quizId, id } });
  };

  const getAnswerInput = (answer) => {
    dispatch({ type: 'GET_ANSWER_INPUT', payload: answer });
  };

  const getAnswer = (input, answer) => {
    dispatch({ type: 'GET_ANSWER_CHECK', payload: { input, answer } });
  };

  const finishQuiz = () => {
    const { current, questions } = state;
    if (current >= questions.length - 1) {
      dispatch({ type: 'FINISH_QUIZ' });
    }
  };

  const startQuiz = () => {
    dispatch({ type: 'START_QUIZ' });
  };

  const resetAll = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  const submitResult = (e) => {
    const { finished, answered, currentQuestion } = state;
    e.preventDefault();
    finishQuiz();

    if (!finished) {
      if (answered.length) {
        let resultPossitive;

        if (currentQuestion.type === 'multiple') {
          let res = answered.every((answer) => {
            return answer.correct === true;
          });
          if (res && answered.length > 1) {
            resultPossitive = true;
          }
        } else if (currentQuestion.type === 'single') {
          resultPossitive = answered.every((answer) => {
            return answer.correct === true;
          });
        } else {
          resultPossitive =
            answered[0].name === currentQuestion.answers[0].name.toLowerCase();
        }

        if (resultPossitive) {
          dispatch({ type: 'INCREASE_SCORE' });
        } else {
          dispatch({ type: 'WRONG_ANSWER' });
        }
      } else {
        dispatch({ type: 'SKIP_ANSWER' });
        dispatch({ type: 'WRONG_ANSWER' });
      }
      dispatch({ type: 'CLEAR_ANSWER' });
      dispatch({ type: 'NEXT_QUESTION' });
      dispatch({ type: 'LOAD_CURRENT_QUESTION' });
    } else {
      console.log('hello from the other side');
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        loadQuiz,
        loadQuizQuestions,
        loadCurrentQuestion,
        submitResult,
        getAnswer,
        getAnswerInput,
        addQuestion,
        deleteQuestion,
        saveQuestion,
        startQuiz,
        resetAll,
        addQuiz,
        deleteQuiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
