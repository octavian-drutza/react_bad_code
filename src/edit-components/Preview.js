import React from 'react';

function Preview({ data, discardAnswer, inForm }) {
  return (
    <div>
      Preview:
      <div>ID: {data.id}</div>
      <div>Type : {data.type}</div>
      <div>Question: {data.question}</div>
      <div>
        Answers :
        {data.answers.map((answer, index) => {
          return (
            <div key={index}>
              <span>{answer.name} : </span>
              <span>{answer.correct ? 'correct' : 'wrong'}</span>
              {inForm && (
                <button onClick={() => discardAnswer(answer.name)}>x</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Preview;
