export interface UserState {
    name: string;
    email: string;
    password: string;
    isLoggedIn: boolean;
    error: string | null;
  }
  
  export type UserAction =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_EMAIL'; payload: string }
    | { type: 'SET_PASSWORD'; payload: string }
    | { type: 'LOGIN_SUCCESS' }
    | { type: 'LOGIN_FAILURE'; payload: string }
    | { type: 'LOGOUT' };
  
  export const initialState: UserState = {
    name: '',
    email: '',
    password: '',
    isLoggedIn: false,
    error: null,
  };
  
  export const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
      case 'SET_NAME':
        return { ...state, name: action.payload };
      case 'SET_EMAIL':
        return { ...state, email: action.payload };
      case 'SET_PASSWORD':
        return { ...state, password: action.payload };
      case 'LOGIN_SUCCESS':
        return { ...state, isLoggedIn: true, error: null };
      case 'LOGIN_FAILURE':
        return { ...state, error: action.payload };
      case 'LOGOUT':
        return { ...state, isLoggedIn: false, name: '', email: '', password: '' };
      default:
        return state;
    }
  };