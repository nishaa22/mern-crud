import { useEffect, useState } from "react"
import { Lock, Shield, ArrowRight } from "lucide-react"
import toast from "react-hot-toast"
import BASE_URL from "../utils/api"

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    useEffect(() => {
        const data = sessionStorage.getItem("token");
        console.log("User data:", data);
    }, []);

    const handlePasswordChange = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${BASE_URL}/auth/change-password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                    confirmPassword
                })
            });
            const data = await response.json();
            
            if (data.error) {
                toast.error(data.message || "Failed to change password");
            } else {
                toast.success(data.message || "Password changed successfully", { icon: "🔒" });
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (error) {
            console.error("Error changing password", error);
            toast.error("An unexpected error occurred");
        }
    }

    return (
        <div className="flex flex-col flex-1 items-center justify-center p-4 w-full min-h-[500px] h-full">
            <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-700 ease-out">
                {/* Header Section */}
                <div className="text-center mb-8 space-y-2">
                    <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-slate-100 mb-2">
                        <Shield className="w-8 h-8 text-indigo-500" />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                        Secure Account
                    </h1>
                    <p className="text-slate-500">
                        Update your password to keep your account safe
                    </p>
                </div>

                {/* Glass Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white p-8 relative overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 blur-2xl opacity-60 pointer-events-none"></div>

                    <form className="relative z-10 space-y-5">
                        <div className="space-y-1.5 flex flex-col items-start">
                            <label className="text-sm font-bold text-slate-700 ml-1">Current Password</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 focus:bg-white text-slate-900 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5 flex flex-col items-start pt-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">New Password</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 focus:bg-white text-slate-900 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5 flex flex-col items-start">
                            <label className="text-sm font-bold text-slate-700 ml-1">Confirm New Password</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 focus:bg-white text-slate-900 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                onClick={(e) => handlePasswordChange(e)}
                                className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 rounded-2xl font-bold text-lg shadow-[0_8px_20px_rgb(99,102,241,0.25)] hover:shadow-[0_8px_20px_rgb(99,102,241,0.4)] transition-all active:scale-[0.98]"
                            >
                                <span>Change Password</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword