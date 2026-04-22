import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="w-full flex flex-col h-screen overflow-hidden bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-purple-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <Navbar />
            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar />
                <main className="flex-1 overflow-y-auto no-scrollbar relative min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
