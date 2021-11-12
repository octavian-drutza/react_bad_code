import React from 'react';
import AnswerInput from './AnswerInput';
import Preview from './Preview';
import { useGlobalContext } from '../context';

function EditComponent({ data, setData, editMode, setEditMode }) {
  const { addQuestion, saveQuestion } = useGlobalContext();

  const getData = () => {
    if (editMode) {
      saveQuestion(data);
    } else {
      addQuestion(data);
    }
    cleanUp();
    setEditMode(false);
  };

  const discardAnswer = (name) => {
    let newAnswers = data.answers.filter((answer) => {
      return answer.name !== name;
    });
    setData({ ...data, answers: newAnswers });
  };

  const cleanUp = () => {
    setData({
      id: '',
      type: '',
      question: '',
      answers: [],
    });
  };

  const getSelected = (e) => {
    if (!editMode) {
      setData({
        ...data,
        type: e.target.value,
        id: new Date().getTime().toString(),
      });
    } else {
      setData({
        ...data,
        type: e.target.value,
      });
    }
  };

  const getQuestion = (e) => {
    setData({ ...data, question: e.target.value });
  };

  return (
    <div style={{ marginBottom: '40px' }}>
      <p>Add Question:</p>
      <form>
        <label htmlFor='type'>Choose a question type </label>
        <select
          id='select-type'
          name='type'
          value={data.type}
          onChange={(e) => {
            getSelected(e);
          }}
        >
          <option value=''>Choose Type</option>
          <option value='multiple'>Multiple Answers</option>
          <option value='single'>Single Answer</option>
          <option value='input'>Input</option>
        </select>
        <input
          type='text'
          placeholder='Question'
          value={data.question}
          onChange={(e) => {
            getQuestion(e);
          }}
        />
        <AnswerInput data={data} setData={setData} />
      </form>
      <Preview data={data} discardAnswer={discardAnswer} inForm={true} />
      {data.id && (
        <div>
          <button onClick={getData}>{editMode ? 'Save' : 'Create'}</button>
          <button onClick={cleanUp}>Discard</button>
        </div>
      )}
    </div>
  );
}

export default EditComponent;
