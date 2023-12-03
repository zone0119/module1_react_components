
import React from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import * as Yup from 'yup';

interface FormValues {
  name: string;
  age: number;
  email: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').matches(/^[A-Z]/, 'Should start with an uppercase letter'),
  age: Yup.number().positive('Age should be a positive number').integer('Age should be an integer'),
  email: Yup.string().required('Email is required').email('Invalid email format'),
});

const ReactHookFormComponent: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: require('react-hook-form').yup(validationSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input {...register('name')} />
      {errors.name && <p>{errors.name.message}</p>}

      <label htmlFor="age">Age</label>
      <input type="number" {...register('age')} />
      {errors.age && <p>{errors.age.message}</p>}

      <label htmlFor="email">Email</label>
      <input type="email" {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}


      <button type="submit">Submit</button>
    </form>
  );
};

export default ReactHookFormComponent;
