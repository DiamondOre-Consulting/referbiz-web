import React, { useState } from 'react';
import Signup from '../Components/AuthsCan/Signup';
import Login from '../Components/AuthsCan/Login';

const AuthAdmin = () => {
    const [showLogin, setShowLogin] = useState(false);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      {showLogin ? (
        <Login toggleForm={toggleForm} />
      ) : (
        <Signup toggleForm={toggleForm} />
      )}
    </div>
  );
}

export default AuthAdmin;