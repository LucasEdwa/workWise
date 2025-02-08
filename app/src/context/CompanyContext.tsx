import React, { createContext, useReducer, ReactNode } from 'react';
import { companyReducer, initialCompanyState, CompanyState, CompanyAction } from '../reducers/CompanyReducer';

interface CompanyContextProps {
  state: CompanyState;
  dispatch: React.Dispatch<CompanyAction>;

}

export const CompanyContext = createContext<CompanyContextProps | undefined>(undefined);

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(companyReducer, initialCompanyState);

  return (
    <CompanyContext.Provider value={{ state, dispatch }}>
      {children}
    </CompanyContext.Provider>
  );
};