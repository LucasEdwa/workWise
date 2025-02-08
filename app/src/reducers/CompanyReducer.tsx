import { Company } from '../models/Company';

export interface CompanyState {
  companies: Company[];
  error?: string;

}

export type CompanyAction =
  | { type: 'ADD_COMPANY'; payload: Company }
  | { type: 'REMOVE_COMPANY'; payload: string }
  | { type: 'UPDATE_COMPANY'; payload: Company };

export const initialCompanyState: CompanyState = {
  companies: [],
};

export const companyReducer = (state: CompanyState, action: CompanyAction): CompanyState => {
  switch (action.type) {
    case 'ADD_COMPANY':
      return { ...state, companies: [...state.companies, action.payload] };
    case 'REMOVE_COMPANY':
      return { ...state, companies: state.companies.filter(company => company._id !== action.payload) };
    case 'UPDATE_COMPANY':
      return {
        ...state,
        companies: state.companies.map(company => (company._id === action.payload._id ? action.payload : company)),
      };
    default:
      return state;
  }
};