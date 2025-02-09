export interface UserState {
  name: string;
  email: string;
  password: string;
  role: string;
  employeeNumber: number;
  companyId: string;
  isLoggedIn: boolean;
  error: string | null;
}

export type UserAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_ROLE'; payload: string }
  | { type: 'SET_EMPLOYEE_NUMBER'; payload: number }
  | { type: 'SET_COMPANY_ID'; payload: string }
  | { type: 'LOGIN_SUCCESS' }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

export const initialState: UserState = {
  name: '',
  email: '',
  password: '',
  role: '',
  employeeNumber: 0,
  companyId: '',
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
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'SET_EMPLOYEE_NUMBER':
      return { ...state, employeeNumber: action.payload };
    case 'SET_COMPANY_ID':
      return { ...state, companyId: action.payload };
    case 'LOGIN_SUCCESS':
      return { ...state, isLoggedIn: true, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, error: action.payload };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, name: '', email: '', password: '', role: '', employeeNumber: 0, companyId: '' };
    default:
      return state;
  }
};