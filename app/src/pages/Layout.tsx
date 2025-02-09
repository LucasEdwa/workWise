import { Outlet } from "react-router";

export default function Layout() {
    return (
        <div className="bg-gray-600 h-screen w-screen">
            <nav className="bg-gray-800 text-white p-4">
                <ul className="flex gap-4">
                    <li>
                        <a href="/dashboard">Home</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                    <li>
                        <a href="/logout">Log-out</a>
                    </li>
                </ul>
            </nav>
        <Outlet />
        </div>
    );
    }