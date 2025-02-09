import { Link } from 'react-router';
import hero1 from '../assets/workWise.jpg';


export default function Dashboard() {
    return (
        <>
        <div className="flex relative flex-col items-center">
            <img src={hero1} alt="workWise" />

            <section className='absolute left-0 bottom-15 transform text-white bg-[var(--bg-color)] text-left '>

                <h2>Introduction</h2>
                <p>
                    Welcome to the Company Dashboard.
                </p>
            </section>

        </div>
            <div>
                <h3>Create users</h3>
                <p>Here you can manage users for your company.</p>
                <Link to='/users'>access employees</Link>
            </div>
        </>
    );
}