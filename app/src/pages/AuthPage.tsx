import CompanyForm from "../components/CompanyForm";
import { CompanyContext, CompanyProvider } from "../context/CompanyContext";

const AuthPage: React.FC = () => {
 
  return (
    <div className=" h-screen lg:w-full ">
        <h1>Auth Page</h1>
        <CompanyProvider>
          <CompanyForm />
        </CompanyProvider>
    </div>
  );
};

export default AuthPage;