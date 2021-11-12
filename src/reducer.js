const reducer = (state, action) => {
  if (action.type === 'LOAD_CURRENT_QUIZ') {
    let newQuiz = state.quizes.find((quiz) => {
      return quiz.quizId === action.payload;
    });
    return { ...state, currentQuiz: newQuiz };
  }

  if (action.type === 'LOAD_QUIZ_QUESTIONS') {
    return { ...state, questions: state.currentQuiz.data };
  }

  if (action.type === 'ADD_QUIZ') {
    return { ...state, quizes: action.payload };
  }

  if (action.type === 'DELETE_QUIZ') {
    let newQuizes = state.quizes.filter((quiz) => {
      return quiz.quizId !== action.payload;
    });
    return { ...state, quizes: [...newQuizes] };
  }

  if (action.type === 'ADD_QUESTIONS') {
    return { ...state, questions: [...state.questions, action.payload] };
  }

  if (action.type === 'SAVE_QUESTION') {
    let newQuestions = state.questions.filter((question) => {
      return question.id !== action.payload.id;
    });
    return { ...state, questions: [...newQuestions, action.payload] };
  }

  if (action.type === 'DELETE_QUESTION') {
    let newQuiz = state.quizes.find((quiz) => {
      return quiz.quizId === action.payload.quizId;
    });
    let newQuestions = newQuiz.data.filter((question) => {
      return question.id !== action.payload.id;
    });
    let newQuizes = state.quizes.filter((quiz) => {
      return quiz.quizId !== action.payload.quizId;
    });
    return {
      ...state,
      quizes: [...newQuizes, { ...newQuiz, data: newQuestions }],
    };
  }

  if (action.type === 'LOAD_CURRENT_QUESTION') {
    return { ...state, currentQuestion: state.questions[state.current] };
  }

  if (action.type === 'CLEAR_ANSWER') {
    return { ...state, answered: [] };
  }

  if (action.type === 'GET_ANSWER_INPUT') {
    if (action.payload) {
      let newAnswer = action.payload.toLowerCase();
      return { ...state, answered: [{ name: newAnswer }] };
    }
  }

  if (action.type === 'GET_ANSWER_CHECK') {
    if (action.payload.input.checked) {
      let newAnswer = action.payload.answer;
      return { ...state, answered: [...state.answered, newAnswer] };
    } else {
      let newAnswers = state.answered.filter((ans) => {
        return ans !== action.payload.answer;
      });
      return { ...state, answered: [...newAnswers] };
    }
  }

  if (action.type === 'NEXT_QUESTION') {
    return { ...state, current: state.current + 1 };
  }

  if (action.type === 'FINISH_QUIZ') {
    return { ...state, finished: true };
  }

  if (action.type === 'START_QUIZ') {
    return { ...state, finished: false };
  }

  if (action.type === 'RESET_STATE') {
    return {
      ...state,
      currentQuiz: {},
      questions: [],
      current: 0,
      currentQuestion: {},
      wrongAnswers: [],
      answered: [],
      finished: false,
      score: 0,
    };
  }

  if (action.type === 'INCREASE_SCORE') {
    return { ...state, score: state.score + 1 };
  }

  if (action.type === 'WRONG_ANSWER') {
    return {
      ...state,
      wrongAnswers: [
        ...state.wrongAnswers,
        { question: state.currentQuestion, wrongs: [...state.answered] },
      ],
    };
  }

  if (action.type === 'SKIP_ANSWER') {
    let newAnswer = 'nothing';
    return { ...state, answered: [{ name: newAnswer }] };
  }

  throw new Error('not found action type');
};

export default reducer;
