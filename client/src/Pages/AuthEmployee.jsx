import React, { useState } from 'react';
import SignupEmployee from './EmployeesPages/EmpSignup';
import LoginEmployee from './EmployeesPages/EmpLogin';

const AuthEmployee = () => {
    const [showLogin, setShowLogin] = useState(false);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      {showLogin ? (
        <LoginEmployee toggleForm={toggleForm} />
      ) : (
        <SignupEmployee toggleForm={toggleForm} />
      )}
    </div>
  );
}

export default AuthEmployee;