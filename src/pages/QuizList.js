import React from 'react';
import { Link } from 'react-router-dom';
import QuizPreview from '../quiz-components/QuizPreview';
import data from '../data';
import { useEffect, useState } from 'react/cjs/react.development';
import { useGlobalContext } from '../context';

const QuizList = () => {
  const { quizes } = useGlobalContext();

  return (
    <div>
      <Link to='/'>Home</Link>
      {quizes.map((quiz, index) => {
        return <QuizPreview key={index} {...quiz} />;
      })}
    </div>
  );
};

export default QuizList;
