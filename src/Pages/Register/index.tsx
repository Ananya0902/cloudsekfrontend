import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

interface RegisterFormData {
  username: string;
  email: string;
  phone: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log('User registered successfully:', data);
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register('username')}
            className="register-input"
          />
          {errors.username && <span className="error-text">{errors.username.message}</span>}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="register-input"
          />
          {errors.email && <span className="error-text">{errors.email.message}</span>}

          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            {...register('phone')}
            className="register-input"
          />
          {errors.phone && <span className="error-text">{errors.phone.message}</span>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className="register-input"
          />
          {errors.password && <span className="error-text">{errors.password.message}</span>}

          <button type="submit" className="register-button">Register</button>
        </form>
        <div className="register-footer">
          <p>Already have an account? <Link to="/login" className="link-text">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
