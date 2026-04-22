import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { login, signup } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, UserPlus, LogIn, Sparkles } from 'lucide-react';

const Homepage = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = useCallback(async () => {
        try {
            if (!signupData.name || !signupData.email || !signupData.password) {
                toast.error("All fields are required");
            } else {
                const data = await signup(signupData);
                if (data?.error) {
                    toast.error(data.message);
                    return;
                }
                toast.success(data.message, { icon: '✨' });
                setSignupData({
                    name: '',
                    email: '',
                    password: ''
                });
                setIsLogin(true);
            }
        } catch (err) {
            console.error('Error during registration:', err);
        }
    }, [signupData]);

    const handleLogin = useCallback(async () => {
        const { email, password } = signupData;
        try {
            if (!email || !password) {
                toast.error("Email and password are required");
                return;
            } else {
                const data = await login({ email, password });
                if (data?.error) {
                    toast.error(data.message);
                    return;
                }
                if (data?.results && data?.results?.token) {
                    toast.success("Welcome back!", { icon: '👋' });
                    sessionStorage.setItem('token', data.results.token);
                    navigate('/dashboard');
                }
            }
        }
        catch (err) {
            console.error('Error during login:', err);
        }
    }, [signupData, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            handleLogin()
        } else {
            handleRegister();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-purple-50 p-4 selection:bg-indigo-100 selection:text-indigo-900 font-sans">
            <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-700 ease-out">
                {/* Logo or Brand */}
                <div className="text-center mb-8 space-y-2">
                    <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-slate-100 mb-2">
                        <Sparkles className="w-8 h-8 text-indigo-500" />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-slate-500">
                        {isLogin ? 'Enter your details to access your account' : 'Join us and start managing your workspace'}
                    </p>
                </div>

                {/* Glass Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white p-8 relative overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 blur-2xl opacity-60 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-gradient-to-tr from-pink-100 to-indigo-100 blur-2xl opacity-60 pointer-events-none"></div>

                    <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                        {!isLogin && (
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        placeholder="John Doe"
                                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 focus:bg-white text-slate-900 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                        onChange={handleChange} 
                                        value={signupData.name} 
                                    />
                                </div>
                            </div>
                        )}
                        
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="you@company.com"
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 focus:bg-white text-slate-900 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                    onChange={handleChange} 
                                    value={signupData.email} 
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5 text-left">
                            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                            <div className="relative flex flex-col items-end">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none h-full">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 focus:bg-white text-slate-900 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                    onChange={handleChange} 
                                    value={signupData.password} 
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button 
                                type="submit" 
                                className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 rounded-2xl font-bold text-lg shadow-[0_8px_20px_rgb(99,102,241,0.25)] hover:shadow-[0_8px_20px_rgb(99,102,241,0.4)] transition-all active:scale-[0.98]"
                            >
                                {isLogin ? (
                                    <>
                                        <span>Sign In</span>
                                        <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center relative z-10">
                        <p className="text-sm text-slate-500 font-medium">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button 
                                type="button"
                                className="ml-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors inline-flex items-center gap-1 group" 
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                {isLogin ? "Sign up" : "Log in"}
                                <ArrowRight className="w-3.5 h-3.5 inline group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;