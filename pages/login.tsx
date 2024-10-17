import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/api'
import { useRouter } from 'next/router';

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await api.post('/login', data);
      if(response.status != 201){
        throw new Error();
      }
      localStorage.setItem('token', response.data.token);
      router.push('/');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
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
