import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import { useRouter } from 'next/router';

type RegisterFormInputs = {
  username: string;
  name: string;
  email: string;
  password: string;
};

const RegisterPage: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await api.post('/signup', data);
      router.push('/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} placeholder="Full Name" required />
        <input type="email" {...register('email')} placeholder="Email" required />
        <input type="password" {...register('password')} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;