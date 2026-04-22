import React from 'react';
import useProfile from '../hooks/useProfile';
import { LayoutDashboard, UserCircle } from 'lucide-react';

const Dashboard = () => {
    const { user } = useProfile();

    return (
        <div className="p-4 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Banner */}
                <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 blur-3xl opacity-60 pointer-events-none"></div>

                    <div className="relative z-10 space-y-4 shrink-0 text-center md:text-left">

                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                            Welcome back, <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                                {user?.name || "User"}
                            </span>
                        </h1>

                    </div>

                    <div className="relative z-10 shrink-0 mt-4 md:mt-0">
                        <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_20px_40px_rgb(99,102,241,0.3)] flex items-center justify-center transform hover:rotate-2 hover:scale-105 transition-all duration-500">
                            <UserCircle className="w-16 h-16 sm:w-24 sm:h-24 text-white opacity-80" strokeWidth={1} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;