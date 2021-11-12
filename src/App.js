import React from 'react';
import Quiz from './pages/Quiz';
import EditList from './pages/EditList';
import Home from './pages/Home';
import QuizList from './pages/QuizList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useGlobalContext } from './context';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/edit-quiz'>
          <EditList />
        </Route>
        <Route path='/take-quiz/:id'>
          <Quiz />
        </Route>
        <Route path='/view-quizes'>
          <QuizList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
