import UserForm from "../components/UserForm";
import { UserProvider } from "../context/UserContext";

export default function UserPage() {
    return (
        <div className='flex justify-center items-center  w-full'>
            <UserProvider>
                <UserForm />
            </UserProvider>
        </div>
    );
}