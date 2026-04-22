import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, UserCircle, Bell, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import useProfile from '../hooks/useProfile';

const Navbar = () => {
    const { user, setUser } = useProfile();
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setUser(null);
        navigate('/');
        toast.success("Logged out successfully");
    }

    return (
        <nav className="w-full bg-white/80 backdrop-blur-xl border-b border-indigo-100/50 sticky top-0 z-50 shadow-sm shrink-0">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200">
                            <LayoutDashboard className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-slate-900 hidden sm:block">
                            MERN<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Application</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <button className="hidden sm:block p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all relative group">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="hidden sm:block w-px h-8 bg-slate-200 mx-2"></div>

                        <div className="flex items-center gap-3 mr-2">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-bold text-slate-800 leading-tight">{user?.name || "Admin User"}</span>
                            </div>
                            <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 border border-white shadow-sm flex items-center justify-center text-indigo-600 font-bold overflow-hidden">
                                {user?.name ? user.name.charAt(0).toUpperCase() : <UserCircle size={20} />}
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="group flex items-center gap-2 bg-rose-50 hover:bg-rose-100/80 text-rose-600 px-4 py-2.5 rounded-xl font-bold transition-all border border-rose-100 hover:border-rose-200 active:scale-95"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
