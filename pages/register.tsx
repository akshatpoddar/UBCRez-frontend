import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await api.post('/signup', data);
      if(response.status == 400){
        throw new Error(response.data.message)
      }
      router.push('/login');
    } catch (error: any) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <Navbar/>
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