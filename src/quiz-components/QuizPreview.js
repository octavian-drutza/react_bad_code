import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import { useGlobalContext } from '../context';

const QuizPreview = ({ quizId, title }) => {
  return (
    <>
      <Link style={{ margin: '15px' }} to={`/take-quiz/${quizId}`}>
        <div>quiz id: {quizId}</div>
        <div>quiz title: {title}</div>
      </Link>
    </>
  );
};

export default QuizPreview;
