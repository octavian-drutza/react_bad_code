import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';

const AnswerInput = ({ data, setData }) => {
  const [input, setInput] = useState({ name: '', correct: false });

  const submitAnswer = (e) => {
    e.preventDefault();
    console.log(input);
    setData({ ...data, answers: [...data.answers, input] });
    setInput({ name: '', correct: false });
  };

  const getValue = (e) => {
    setInput({ ...input, name: e.target.value });
  };

  const getChecked = (e) => {
    if (e.target.checked) {
      setInput({ ...input, correct: true });
    } else {
      setInput({ ...input, correct: false });
    }
  };

  return (
    <>
      <input
        type='text'
        placeholder='Answer'
        value={input.name}
        onChange={(e) => {
          getValue(e);
        }}
      />
      <span>
        Check if answer correct
        <input
          type='checkbox'
          checked={input.correct}
          onChange={(e) => {
            getChecked(e);
          }}
        />
      </span>

      <button
        type='submit'
        onClick={(e) => {
          submitAnswer(e);
        }}
      >
        Save Answer
      </button>
    </>
  );
};

export default AnswerInput;
