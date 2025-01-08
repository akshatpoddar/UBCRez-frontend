import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/api'
import Navbar from '@/components/Navbar';
import { redirect } from 'next/navigation'

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await api.post('/auth/login', data);
      if(response.status != 201){
        throw new Error();
      }
      redirect('/');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <Navbar/>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register('email')} placeholder="Email" required />
        <input type="password" {...register('password')} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
