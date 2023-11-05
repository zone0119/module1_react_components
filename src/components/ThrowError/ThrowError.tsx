import React, { useState } from 'react';

const ThrowError = () => {
  const [err, setErr] = useState(false);

  const handleClick = () => {
    setErr(true);
  };

  if (err) {
    console.log('clicker + err' + err);
    throw new Error('clicker by button throw error');
  }

  return (
    <button onClick={handleClick}>
      Throw error!
    </button>
  );
};

export default ThrowError;
