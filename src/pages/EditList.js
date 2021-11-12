import React from 'react';
import { Link } from 'react-router-dom';
import EditForm from '../edit-components/EditForm';
import Preview from '../edit-components/Preview';
import { useState } from 'react/cjs/react.development';
import { useGlobalContext } from '../context';

function ChangeList() {
  const { quizes, deleteQuestion } = useGlobalContext();
  const [data, setData] = useState({
    id: '',
    type: '',
    question: '',
    answers: [],
  });
  const [editMode, setEditMode] = useState(false);
  const [quizId, setQuizId] = useState('');
  const [questionsLocal, setQuestionsLocal] = useState([]);

  const getQuestionList = (quizId, data) => {
    setQuizId(quizId);
    setQuestionsLocal(data);
  };

  const deleteQuestionLocal = (quizId, id) => {
    deleteQuestion(quizId, id);
    let newLocalQuestions = questionsLocal.filter((question) => {
      return question.id !== id;
    });
    setQuestionsLocal(newLocalQuestions);
  };

  // changes in deleteQuestionLocal are not persisted to the state for some reason, for deleteQuestion only there are no problems

  const editQuestion = (data) => {
    setData(data);
    setEditMode(true);
  };

  return (
    <div>
      <Link to='/'>Home</Link>
      <EditForm
        data={data}
        setData={setData}
        editMode={editMode}
        setEditMode={setEditMode}
      />
      <p>Quizez List:</p>
      {quizes.map((quiz) => {
        const { quizId, title, data } = quiz;
        return (
          <div key={quizId} onClick={() => getQuestionList(quizId, data)}>
            <div>{quizId}</div>
            <div>{title}</div>
          </div>
        );
      })}
      <p>Questions List:</p>
      {questionsLocal.map((data, index) => {
        return (
          <div key={index}>
            <Preview data={data} />

            <button
              onClick={() => {
                editQuestion(data);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteQuestionLocal(quizId, data.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ChangeList;
