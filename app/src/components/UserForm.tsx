import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

const UserForm: React.FC = () => {
  const context = useContext(UserContext);

  if (!context) {
    return null;
  }

  const { state, dispatch } = context;
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic here
      // Example:
      if (state.email === 'test@example.com' && state.password === 'password') {
        dispatch({ type: 'LOGIN_SUCCESS' });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
      }
    } else {
      // Handle user creation logic here
      // Example:
      console.log('User created:', state.name, state.email, state.password);
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Create User'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label>Name</label>
            <input
              type="text"
              value={state.name}
              onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
            />
          </div>
        )}
        <div>
          <label>Email</label>
          <input
            type="email"
            value={state.email}
            onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={state.password}
            onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Create User'}</button>
      </form>
      {state.error && <p>{state.error}</p>}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Create User' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default UserForm;