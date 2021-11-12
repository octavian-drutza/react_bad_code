import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link style={{ margin: '15px' }} to='/'>
        Home
      </Link>
      <Link style={{ margin: '15px' }} to='/edit-quiz'>
        Edit Quizes
      </Link>
      <Link style={{ margin: '15px' }} to='/view-quizes'>
        View Quizes
      </Link>
    </nav>
  );
};

export default Navbar;
