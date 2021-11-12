import React, { useEffect } from 'react';
import { useGlobalContext } from '../context';
import { Link } from 'react-router-dom';

function Question({ id, type, question, answers, backToQuizes }) {
  const { submitResult, getAnswer, getAnswerInput, currentQuestion } =
    useGlobalContext();

  useEffect(() => {
    const inputField = document.getElementById('input-field');
    if (inputField) {
      inputField.value = '';
    }
  }, [currentQuestion]);

  useEffect(() => {
    const checkedList = document.querySelectorAll('#check-input');
    checkedList.forEach((input) => {
      input.checked = false;
    });
  }, [currentQuestion]);

  return (
    <div>
      <div>{question}</div>
      <div>This is a {type} answer question</div>
      <br />
      <div>
        <form onSubmit={(e) => submitResult(e)}>
          {answers.map((answer, index) => {
            return type !== 'input' ? (
              <div key={index}>
                <input
                  type='checkbox'
                  id='check-input'
                  name={answer.name}
                  value={answer.name}
                  onChange={(e) => getAnswer(e.target, answer)}
                />
                <label htmlFor={answer.name}>{answer.name}</label>
              </div>
            ) : (
              <div key={index}>
                <input
                  type='text'
                  defaultValue=''
                  id='input-field'
                  placeholder='write answer'
                  onChange={(e) => getAnswerInput(e.target.value)}
                />
              </div>
            );
          })}
          <button type='submit'>Submit</button>
          <Link to='/view-quizes' onClick={backToQuizes}>
            Back to quizes
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Question;
