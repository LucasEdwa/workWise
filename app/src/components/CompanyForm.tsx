import React, { useContext, useState } from 'react';
import { CompanyContext } from '../context/CompanyContext';
import { useMutation } from '@tanstack/react-query';
import { createCompany } from '../services/mutations/createCompany';
import { loginCompany } from '../services/mutations/loginCompany';
import { useNavigate } from 'react-router';
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

  const createMutation = useMutation({
    mutationFn: createCompany,
    onSuccess: (data) => {
      dispatch({ type: 'ADD_COMPANY', payload: data.company });
      localStorage.setItem('token', data.token);
    },
    onError: (error: any) => {
      console.error('Error creating company:', error);
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
      console.error('Error logging in:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    <div>
      <h2>{isLogin ? 'Login' : 'Create Company'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </>
        )}
        <div>
          <label>Organization Number</label>
          <input
            type="number"
            value={organizationNumber}
            onChange={(e) => setOrganizationNumber(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Create Company'}</button>
      </form>
      {state.error && <p>{state.error}</p>}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Create Company' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default CompanyForm;