import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '../services/mutations/createUser';
import { loginUser } from '../services/mutations/loginUser';
import Button from './Button';

const UserForm: React.FC = () => {
  const context = useContext(UserContext);

  if (!context) {
    return null;
  }

  const { state, dispatch } = context;
  const [isLogin, setIsLogin] = useState(true);

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data: { token: string }) => {
      dispatch({ type: 'LOGIN_SUCCESS' });
      console.log('Storing token:', data.token);
      localStorage.setItem('token', data.token);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Error creating user';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: { token: string }) => {
      dispatch({ type: 'LOGIN_SUCCESS' });
      console.log('Storing token:', data.token);
      localStorage.setItem('token', data.token);
      console.log('success');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Error logging in';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      loginMutation.mutate({
        email: state.email,
        password: state.password,
      });
    } else {
      createMutation.mutate({
        name: state.name,
        email: state.email,
        password: state.password,
        role: state.role,
        employeeNumber: state.employeeNumber,
        companyId: state.companyId,
      });
    }
  };

  return (
    <div className='bg-[var(--bg-color)] p-4 rounded-md shadow-md justify-center flex flex-col items-center gap-5 m-44'>
      <h2 className='text-xl'>{isLogin ? 'Login' : 'Create User'}</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 h-full'>
        {!isLogin && (
          <>
            <div className='flex justify-between gap-2'>
              <label>Name</label>
              <input
                type="text"
                value={state.name}
                onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
                className='border-b-2 border-gray-300 rounded-md '
              />
            </div>
            <div className='flex justify-between gap-2'>
              <label>Role</label>
              <select
                value={state.role}
                onChange={(e) => dispatch({ type: 'SET_ROLE', payload: e.target.value })}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            <div className='flex justify-between gap-2'>
              <label>Employee N.</label>
              <input
                type="number"
                value={state.employeeNumber}
                onChange={(e) => dispatch({ type: 'SET_EMPLOYEE_NUMBER', payload: Number(e.target.value) })}
                className='border-b-2 border-gray-300 rounded-md '
              />
            </div>
          </>
        )}
        <div className='flex justify-between gap-2'>
          <label>Email</label>
          <input
            type="email"
            value={state.email}
            onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
            className='border-b-2 border-gray-300 rounded-md '
          />
        </div>
        <div className='flex justify-between gap-2'>
          <label>Password</label>
          <input
            type="password"
            value={state.password}
            onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
            className='border-b-2 border-gray-300 rounded-md '
          />
        </div>
        <Button type="submit">{isLogin ? 'Login' : 'Create User'}</Button>
      </form>
      {state.error && <p>{state.error}</p>}
      <Button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Create User' : 'Switch to Login'}
      </Button>
    </div>
  );
};

export default UserForm;