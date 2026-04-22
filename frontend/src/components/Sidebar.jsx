import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, Shield, User, ChevronDown, ChevronRight } from 'lucide-react';

const Sidebar = () => {
    const [settingsOpen, setSettingsOpen] = useState(true);

    const navItems = [
        { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Overview' },
        { path: '/users', icon: <Users size={20} />, label: 'User Management' },
    ];

    const settingItems = [
        { path: '/profile', icon: <User size={18} />, label: 'My Profile' },
        { path: '/change-password', icon: <Shield size={18} />, label: 'Change Password' },
    ];

    return (
        <aside className="w-64 shrink-0 bg-white/80 backdrop-blur-xl border-r border-slate-200 h-full overflow-y-auto no-scrollbar py-6 shadow-[4px_0_24px_rgb(0,0,0,0.02)]">
            <div className="px-4 space-y-8">
                
                {/* Main Menu */}
                <div className="space-y-1">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-3 mb-3">Main Navigation</div>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => 
                                `flex items-center gap-3 px-3 py-3 rounded-xl font-semibold transition-all group ${
                                    isActive 
                                        ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50' 
                                        : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50 border border-transparent'
                                }`
                            }
                        >
                            <span className={({ isActive }) => `${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500'} transition-colors`}>
                                {item.icon}
                            </span>
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                {/* Settings Accordion */}
                <div className="space-y-1">
                    <button 
                        onClick={() => setSettingsOpen(!settingsOpen)}
                        className="w-full flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-3 mb-1 hover:text-indigo-500 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <Settings size={14} className="opacity-70" /> Settings
                        </div>
                        {settingsOpen ? <ChevronDown size={14} className="mr-2" /> : <ChevronRight size={14} className="mr-2" />}
                    </button>
                    
                    <div className={`space-y-1 overflow-hidden transition-all duration-300 ${settingsOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                        {settingItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-all group ${
                                        isActive 
                                            ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50' 
                                            : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50 border border-transparent'
                                    }`
                                }
                            >
                                <span className={({ isActive }) => `${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500'} transition-colors`}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
