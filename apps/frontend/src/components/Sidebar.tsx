'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

    const activeClass = 'bg-primary text-white';
    const defaultClass = 'hover:bg-base-300';
    return (
        <aside className="w-64 h-screen bg-base-200 p-4 shadow-md">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Energy Tracker</h1>
            </div>
            <nav>
                <ul>
                    <li className="mb-4">
                        <Link
                            href="/"
                            className={`flex items-center p-2 rounded-lg ${pathname === '/' ? activeClass : defaultClass
                                }`}
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 10h4V3H3v7zm0 11h4v-7H3v7zm7 0h4v-11h-4v11zm7 0h4v-4h-4v4zm0-11h4V3h-4v7z"
                                ></path>
                            </svg>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/measurements"
                            className={`flex items-center p-2 rounded-lg ${pathname.startsWith('/measurements') ? activeClass : defaultClass
                                }`}
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 17v-2a4 4 0 00-4-4H3m13 4v2a4 4 0 004 4h2m-6-4a4 4 0 010-8 4 4 0 010 8zm0 0v-2a4 4 0 00-4-4H5"
                                ></path>
                            </svg>
                            Measurements
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
