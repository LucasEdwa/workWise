import React, { FormEvent, useContext, useState } from 'react';
import { CompanyContext } from '../context/CompanyContext';
import { useMutation } from '@tanstack/react-query';
import { createCompany } from '../services/mutations/createCompany';
import { loginCompany } from '../services/mutations/loginCompany';
import { useNavigate } from 'react-router';
import { validateOrganizationNumber } from '../services/validateOrganizationNumber';
import Button from './Button';

const CompanyForm: React.FC = () => {
  const context = useContext(CompanyContext);
  const navigate = useNavigate();
  if (!context) {
    return null;
  }

  const { state, dispatch } = context;
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [organizationNumber, setOrganizationNumber] = useState<number | ''>('');
  const [password, setPassword] = useState('');
  const [orgNumberError, setOrgNumberError] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: createCompany,
    onSuccess: (data) => {
      dispatch({ type: 'ADD_COMPANY', payload: data.company });
      localStorage.setItem('token', data.token);
    },
    onError: (error: any) => {

      const errorMessage = error.response?.data?.error || 'Error creating company';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginCompany,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      console.log('Login successful:', data);
      navigate('/dashboard');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Error creating company';
      
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLogin) {
      const isValid = validateOrganizationNumber(Number(organizationNumber));
      if (!isValid) {
        setOrgNumberError('Invalid organization number');
        return;
      }
    }
    setOrgNumberError(null);
    if (isLogin) {
      loginMutation.mutate({ organizationNumber: Number(organizationNumber), password });
    } else {
      createMutation.mutate({ name, address, organizationNumber: Number(organizationNumber), password });
    }
    setName('');
    setAddress('');
    setOrganizationNumber('');
    setPassword('');
  };

  return (
    <div className="flex flex-col items-center justify-center lg:m-44 bg-[var(--bg-color)]  gap-2 rounded-lg h-1/2 text-lg">
      <h2>{isLogin ? 'Login' : 'Create Company'}</h2>
      <form onSubmit={handleSubmit} className="flex items-center flex-col lg:w-1/4 gap-2">
        {!isLogin && (
          <>
            <div className="flex flex-col items-center ">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='border-b-2 border-gray-600 small-placeholder'
                placeholder='Company Name'
              />
            </div>
            <div className="flex flex-col items-center ">  
              <label>Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className='border-b-2 border-gray-600 small-placeholder'
                placeholder='Company Address'
              />
            </div>
          </>
        )}
        <div className="flex flex-col items-center ">
          <label>Organization Number</label>
          <input
            type="number"
            value={organizationNumber}
            onChange={(e) => setOrganizationNumber(Number(e.target.value))}
            required
            className='border-b-2 border-gray-600 small-placeholder'
            placeholder='Organization Number'
          />
          {orgNumberError && <p className="text-red-500">{orgNumberError}</p>}
        </div>
        <div className="flex flex-col items-center ">  
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='border-b-2 border-gray-600 small-placeholder'
            placeholder='Password'
          />
        </div>
        <Button type="submit">{isLogin ? 'Login' : 'Create Company'}</Button>
      </form>
      {state.error && <p className="text-red-500">{state.error}</p>}
      <Button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? ' Switch to Create Company' : ' Switch to Login'}
      </Button>
    </div>
  );
};

export default CompanyForm;