import React, { useState, useEffect, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { getUsers, createUser, updateUser, deleteUser } from '../utils/user';
import {
    Users as UsersIcon,
    Plus,
    Pencil,
    Trash2,
    MapPin,
    Mail,
    Search,
    X,
    UserCircle2,
    Building2,
    Hash
} from 'lucide-react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: {
            state: '',
            city: '',
            pincode: ''
        }
    });

    const token = sessionStorage.getItem('token');

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        const data = await getUsers(token);
        if (data && !data.error) {
            setUsers(data.results || []);
        } else {
            toast.error(data?.message || 'Failed to fetch users');
        }
        setLoading(false);
    }, [token]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUsers();
        }, 0);
        return () => clearTimeout(timer);
    }, [fetchUsers]);

    const filteredUsers = useMemo(() => {
        if (searchQuery.trim() === '') {
            return users;
        }
        const lowercasedQuery = searchQuery.toLowerCase();
        return users.filter(user =>
            user.name.toLowerCase().includes(lowercasedQuery) ||
            user.email.toLowerCase().includes(lowercasedQuery) ||
            user.address?.city?.toLowerCase().includes(lowercasedQuery)
        );
    }, [searchQuery, users]);

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value
            }
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const openCreateModal = () => {
        setFormData({
            name: '',
            email: '',
            address: { state: '', city: '', pincode: '' }
        });
        setEditMode(false);
        setIsModalOpen(true);
    };

    const openEditModal = (user) => {
        setFormData({
            name: user.name,
            email: user.email,
            address: {
                state: user.address?.state || '',
                city: user.address?.city || '',
                pincode: user.address?.pincode || ''
            }
        });
        setCurrentUserId(user._id);
        setEditMode(true);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.address.state || !formData.address.city || !formData.address.pincode) {
            toast.error("All fields are required");
            return;
        }

        if (editMode) {
            const res = await updateUser(currentUserId, formData, token);
            if (res && !res.error) {
                toast.success('User updated successfully', { icon: '✨' });
                setIsModalOpen(false);
                fetchUsers();
            } else {
                toast.error(res?.message || 'Failed to update user');
            }
        } else {
            const res = await createUser(formData, token);
            if (res && !res.error) {
                toast.success('User created successfully', { icon: '🚀' });
                setIsModalOpen(false);
                fetchUsers();
            } else {
                toast.error(res?.message || 'Failed to create user');
            }
        }
    };

    const openDeleteModal = (id) => {
        setUserToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (userToDelete) {
            const res = await deleteUser(userToDelete, token);
            if (res && !res.error) {
                toast.success('User deleted successfully', { icon: '🗑️' });
                fetchUsers();
            } else {
                toast.error(res?.message || 'Failed to delete user');
            }
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
        }
    };

    return (
        <div className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                {/* Header & Stats Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-2">

                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                            Team <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Directory</span>
                        </h1>
                        <p className="text-slate-500 text-lg max-w-xl leading-relaxed">
                            A centralized hub to manage your users, configure their roles, and oversee system access.
                        </p>
                    </div>

                    <button
                        onClick={openCreateModal}
                        className="group flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-2xl font-semibold transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] active:scale-[0.98]"
                    >
                        <div className="bg-white/20 p-1.5 rounded-lg group-hover:rotate-90 transition-transform duration-300">
                            <Plus size={18} className="text-white" />
                        </div>
                        <span className="tracking-wide">Add Member</span>
                    </button>
                </div>

                {/* Search glass-card */}
                <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-3 shadow-sm border border-white flex flex-col sm:flex-row gap-3">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, email, or city..."
                            className="w-full pl-12 pr-4 py-4 bg-white/50 border-0 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center shrink-0 px-8 py-4 bg-white rounded-2xl shadow-sm border border-slate-100/50 text-sm font-semibold text-slate-600">
                        <UsersIcon size={18} className="mr-2 text-indigo-500" />
                        {filteredUsers.length} {filteredUsers.length === 1 ? 'User' : 'Users'}
                    </div>
                </div>

                {/* Table Container - Neumorphic / Glass */}
                <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden relative">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200/50">
                                    <th className="px-8 py-6 font-semibold text-slate-400 text-xs uppercase tracking-[0.2em]">Profile Info</th>
                                    <th className="px-8 py-6 font-semibold text-slate-400 text-xs uppercase tracking-[0.2em]">Contact</th>
                                    <th className="px-8 py-6 font-semibold text-slate-400 text-xs uppercase tracking-[0.2em]">Location Details</th>
                                    <th className="px-8 py-6 font-semibold text-slate-400 text-xs uppercase tracking-[0.2em] text-right">Settings</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100/50">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-24 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-4">
                                                <div className="relative">
                                                    <div className="w-12 h-12 rounded-full border-4 border-slate-100"></div>
                                                    <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin absolute top-0 left-0"></div>
                                                </div>
                                                <p className="text-slate-500 font-medium animate-pulse">Syncing directory...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-24 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-5">
                                                <div className="p-6 bg-gradient-to-b from-indigo-50 to-white rounded-[2rem] shadow-inner text-indigo-300">
                                                    <Search size={48} strokeWidth={1.5} />
                                                </div>
                                                <div>
                                                    <div className="text-slate-700 font-bold text-xl mb-1">No matches found</div>
                                                    <p className="text-slate-400 text-sm max-w-sm mx-auto">
                                                        {searchQuery ? `We couldn't find anyone matching "${searchQuery}".` : "Your directory is completely empty. Add someone to get started."}
                                                    </p>
                                                </div>
                                                {!searchQuery && (
                                                    <button
                                                        onClick={openCreateModal}
                                                        className="mt-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                                                    >
                                                        + Create First User
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user, index) => (
                                        <tr
                                            key={user._id}
                                            className="group hover:bg-slate-50/50 transition-all duration-300 ease-in-out"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative shrink-0">
                                                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center font-bold text-xl text-indigo-600 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 border-2 border-white"></div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{user.name}</div>
                                                        <div className="text-xs text-slate-400 font-medium mt-0.5 flex items-center gap-1.5 uppercase tracking-wider">
                                                            <Hash size={12} />
                                                            {user._id.slice(-6)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 group-hover:bg-white group-hover:shadow-sm transition-all text-sm">
                                                    <Mail size={16} className="text-indigo-400" />
                                                    <span className="font-medium truncate max-w-[180px]">{user.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col gap-1.5">
                                                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                                                        <MapPin size={16} className="text-rose-400" />
                                                        <span>{user.address?.city}, {user.address?.state}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                                        <Building2 size={12} className="text-slate-400 ml-[2px]" />
                                                        ZIP: {user.address?.pincode}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right w-40">
                                                <div className="flex items-center justify-end gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                    <button
                                                        onClick={() => openEditModal(user)}
                                                        className="p-2.5 bg-white text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-100 rounded-xl shadow-sm transition-all"
                                                        title="Edit User"
                                                    >
                                                        <Pencil size={16} strokeWidth={2.5} />
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(user._id)}
                                                        className="p-2.5 bg-white text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-100 rounded-xl shadow-sm transition-all"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 size={16} strokeWidth={2.5} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Glass backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setIsDeleteModalOpen(false)}
                    ></div>

                    {/* Modal body */}
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-5 duration-300 ease-out relative z-10 border border-white/40">
                        <div className="p-8 pb-6 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 mb-6">
                                <Trash2 className="h-8 w-8 text-rose-600" />
                            </div>
                            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight mb-2">
                                Delete User?
                            </h2>
                            <p className="text-sm font-medium text-slate-500">
                                Are you sure you want to delete this user? This action cannot be undone and will permanently remove their data.
                            </p>
                        </div>
                        
                        <div className="p-6 pt-0 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="w-full px-4 py-3 text-slate-700 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="w-full px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-[0_4px_14px_rgb(225,29,72,0.3)] hover:shadow-[0_6px_20px_rgb(225,29,72,0.4)] transition-all active:scale-[0.98]"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Glass backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/20 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    {/* Modal body */}
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 ease-out relative z-10 border border-white/40">
                        {/* Decorative background blob */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 blur-3xl opacity-50 pointer-events-none"></div>

                        {/* Complete UI wrapper */}
                        <div className="relative">
                            <div className="flex justify-between items-center p-8 pb-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg shadow-indigo-200">
                                        {editMode ? <Pencil size={24} /> : <UserCircle2 size={24} />}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                                            {editMode ? 'Edit Member' : 'New Member'}
                                        </h2>
                                        <p className="text-sm font-medium text-slate-500 mt-0.5">
                                            {editMode ? 'Update information for this profile.' : 'Add someone new to your system.'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-slate-400 hover:text-slate-800 hover:bg-slate-100 p-2.5 rounded-xl transition-all self-start -mt-2 -mr-2"
                                >
                                    <X size={20} strokeWidth={2.5} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 pt-0 space-y-8">
                                <div className="space-y-5 relative">
                                    <div className="absolute -left-8 top-2 bottom-2 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-lg"></div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Display Name</label>
                                        <input
                                            className="w-full bg-slate-50/50 border-2 border-slate-200 text-slate-900 rounded-2xl px-5 py-3.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 font-medium transition-all"
                                            type="text"
                                            name="name"
                                            placeholder="e.g. Alex Johnson"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2 flex justify-between items-end">
                                            Email Address
                                            {editMode && <span className="text-[10px] uppercase tracking-wider text-rose-500 bg-rose-50 px-2 py-0.5 rounded flex items-center gap-1">Locked</span>}
                                        </label>
                                        <input
                                            className={`w-full bg-slate-50/50 border-2 border-slate-200 text-slate-900 rounded-2xl px-5 py-3.5 outline-none font-medium transition-all
                                                ${editMode
                                                    ? 'opacity-60 cursor-not-allowed bg-slate-100'
                                                    : 'focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
                                                }`}
                                            type="email"
                                            name="email"
                                            placeholder="alex@domain.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            disabled={editMode}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-5 relative">
                                    <div className="absolute -left-8 top-2 bottom-2 w-1 bg-gradient-to-b from-rose-400 to-orange-400 rounded-r-lg"></div>

                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">State/Region</label>
                                            <input
                                                className="w-full bg-slate-50/50 border-2 border-slate-200 text-slate-900 rounded-2xl px-5 py-3.5 outline-none focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-medium transition-all"
                                                type="text"
                                                name="state"
                                                placeholder="New York"
                                                value={formData.address.state}
                                                onChange={handleAddressChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                                            <input
                                                className="w-full bg-slate-50/50 border-2 border-slate-200 text-slate-900 rounded-2xl px-5 py-3.5 outline-none focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-medium transition-all"
                                                type="text"
                                                name="city"
                                                placeholder="Manhattan"
                                                value={formData.address.city}
                                                onChange={handleAddressChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Postal Code</label>
                                        <input
                                            className="w-full bg-slate-50/50 border-2 border-slate-200 text-slate-900 rounded-2xl px-5 py-3.5 outline-none focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 font-medium transition-all"
                                            type="number"
                                            name="pincode"
                                            placeholder="10001"
                                            value={formData.address.pincode}
                                            onChange={handleAddressChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 mt-4 pt-6 border-t border-slate-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-3.5 text-slate-600 font-bold hover:bg-slate-100 rounded-2xl transition-all"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-2xl shadow-[0_8px_20px_rgb(99,102,241,0.3)] hover:shadow-[0_8px_20px_rgb(99,102,241,0.5)] transition-all active:scale-[0.98] flex items-center gap-2 tracking-wide"
                                    >
                                        {editMode ? 'Save Changes' : 'Publish Member'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;