
import React from 'react';
import { useSelector } from 'react-redux';

const MainPageComponent: React.FC = () => {
  const formDataFromUncontrolledForm = useSelector((state) => state.uncontrolledFormData);
  const formDataFromReactHookForm = useSelector((state) => state.reactHookFormData);

  return (
    <div>
      <h2>Main Page</h2>

      <div>
        <h3>Data from Uncontrolled Form</h3>
        <p>Name: {formDataFromUncontrolledForm.name}</p>
        <p>Age: {formDataFromUncontrolledForm.age}</p>
      </div>

      <div>
        <h3>Data from React Hook Form</h3>
        <p>Name: {formDataFromReactHookForm.name}</p>
        <p>Age: {formDataFromReactHookForm.age}</p>
      </div>
    </div>
  );
};

export default MainPageComponent;
