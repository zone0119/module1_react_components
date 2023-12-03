// components/UncontrolledFormComponent.tsx

import React, { useRef } from 'react';

const UncontrolledFormComponent: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value ? parseInt(ageRef.current?.value) : 0,
      email: emailRef.current?.value || '',
    };

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input ref={nameRef} />

      <label htmlFor="age">Age</label>
      <input type="number" ref={ageRef} />

      <label htmlFor="email">Email</label>
      <input type="email" ref={emailRef} />


      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledFormComponent;
