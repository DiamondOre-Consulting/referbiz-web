import React, { useState } from 'react';
import AssoSignup from '../Components/AuthsAsso/SignupAsso';
import AssoLogin from '../Components/AuthsAsso/LoginAsso';

const AssoAuthPage = () => {
    const [showLogin, setShowLogin] = useState(false);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      {showLogin ? (
        <AssoLogin toggleForm={toggleForm} />
      ) : (
        <AssoSignup toggleForm={toggleForm} />
      )}
    </div>
  );
}

export default AssoAuthPage;