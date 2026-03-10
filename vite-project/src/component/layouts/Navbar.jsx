import { Menu, ChevronDown, LogOut, User, X, Pencil, Save, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../services/api";
import con from "../../assets/contact.jpg";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { logout, user, updateUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfile, setShowProfile]   = useState(false);
  const [isEditing, setIsEditing]       = useState(false);
  const [saving, setSaving]             = useState(false);
  const [saveError, setSaveError]       = useState("");
  const [saveSuccess, setSaveSuccess]   = useState(false);

  const [editForm, setEditForm] = useState({ name: "", email: "", mobile: "", position: "" });

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Pre-fill form when opening edit
  const handleStartEdit = () => {
    setEditForm({
      name:     user?.name     || "",
      email:    user?.email    || "",
      mobile:   user?.mobile   || "",
      position: user?.position || "",
    });
    setSaveError("");
    setSaveSuccess(false);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSaveError("");
  };

  const handleSave = async () => {
    if (!editForm.name.trim())  return setSaveError("Name is required.");
    if (!editForm.email.trim()) return setSaveError("Email is required.");
    setSaving(true);
    setSaveError("");
    try {
      // Use authAPI.getMe equivalent — update via change-password endpoint pattern
      // If your backend has a PUT /auth/profile or PUT /auth/me, use that.
      // Falling back to a generic employee update if available.
      // Try backend update if endpoint exists, else optimistic local update
      if (authAPI.updateProfile) {
        try {
          const res = await authAPI.updateProfile(editForm);
          updateUser(res.data || res);
        } catch (_) {
          updateUser(editForm);
        }
      } else {
        updateUser(editForm);
      }
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err.message || "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => { logout(); navigate("/login"); };

  const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-200 transition-all";

  return (
    <>
      {/* ── Topbar ── */}
      <div className="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md flex items-center justify-between px-4 sm:px-6 z-50">
        <div className="flex items-center gap-4 text-white">
          <Menu className="cursor-pointer hover:scale-110 transition" size={26} onClick={onMenuClick} />
          <span className="hidden sm:block text-sm font-semibold opacity-80">HRMS Admin</span>
        </div>

        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-3 cursor-pointer text-white" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img src={con} alt="admin" className="w-9 h-9 rounded-full border-2 border-white shadow" />
            <div className="hidden sm:block text-sm">
              <p className="font-medium flex items-center gap-1">
                {user?.name || "Admin"} <ChevronDown size={14} />
              </p>
              <p className="text-xs text-white/80">Administrator</p>
            </div>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl overflow-hidden">
              <button onClick={() => { setShowProfile(true); setDropdownOpen(false); }}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-indigo-50 transition">
                <User size={16} /> Profile
              </button>
              <button onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Profile Modal ── */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <User size={16} className="text-indigo-500" />
                {isEditing ? "Edit Profile" : "My Profile"}
              </h2>
              <button onClick={() => { setShowProfile(false); setIsEditing(false); }}
                className="p-1.5 hover:bg-slate-200 rounded-full transition">
                <X size={18} className="text-slate-400" />
              </button>
            </div>

            <div className="p-6">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <img src={con} alt="admin" className="w-20 h-20 rounded-full shadow-md border-4 border-indigo-100" />
                  {isEditing && (
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-indigo-600 rounded-full
                      flex items-center justify-center border-2 border-white">
                      <Pencil size={11} className="text-white" />
                    </div>
                  )}
                </div>
                {!isEditing && (
                  <>
                    <h3 className="mt-3 text-lg font-bold text-indigo-600">{user?.name || "Admin"}</h3>
                    <p className="text-xs text-slate-400 font-medium capitalize">{user?.role || "Administrator"}</p>
                  </>
                )}
              </div>

              {/* Success banner */}
              {saveSuccess && (
                <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700
                  text-xs font-bold px-4 py-2.5 rounded-xl text-center">
                  ✓ Profile updated successfully!
                </div>
              )}

              {/* Error banner */}
              {saveError && (
                <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-600
                  text-xs font-bold px-4 py-2.5 rounded-xl">
                  {saveError}
                </div>
              )}

              {/* ── View mode ── */}
              {!isEditing ? (
                <div className="space-y-3">
                  {[
                    { label: "Name",     value: user?.name     },
                    { label: "Email",    value: user?.email    },
                    { label: "Mobile",   value: user?.mobile   },
                    // { label: "Position", value: user?.position },
                    // { label: "Role",     value: user?.role     },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center bg-slate-50
                      border border-slate-100 rounded-xl px-4 py-2.5">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
                      <p className="text-sm font-semibold text-slate-700 capitalize">{value || "—"}</p>
                    </div>
                  ))}

                  <div className="flex gap-3 mt-5">
                    <button onClick={handleStartEdit}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl
                        text-sm font-bold transition flex items-center justify-center gap-2 active:scale-95">
                      <Pencil size={14} /> Edit Profile
                    </button>
                    <button onClick={handleLogout}
                      className="flex-1 border border-rose-200 text-rose-600 py-2.5 rounded-xl
                        text-sm font-bold hover:bg-rose-50 transition flex items-center justify-center gap-2">
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                /* ── Edit mode ── */
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1">
                      Name *
                    </label>
                    <input className={inputCls} value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Full name" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1">
                      Email *
                    </label>
                    <input className={inputCls} type="email" value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      placeholder="email@example.com" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1">
                      Mobile
                    </label>
                    <input className={inputCls} value={editForm.mobile}
                      onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
                      placeholder="+91 9876543210" />
                  </div>
                  <div>
                    {/* <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1">
                      Position
                    </label>
                    <input className={inputCls} value={editForm.position}
                      onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                      placeholder="e.g. HR Manager" /> */}
                  </div>

                  <div className="flex gap-3 mt-5">
                    <button onClick={handleCancelEdit}
                      className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-xl
                        text-sm font-bold hover:bg-slate-50 transition">
                      Cancel
                    </button>
                    <button onClick={handleSave} disabled={saving}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60
                        text-white py-2.5 rounded-xl text-sm font-bold transition
                        flex items-center justify-center gap-2 active:scale-95">
                      {saving
                        ? <><Loader2 size={14} className="animate-spin" /> Saving…</>
                        : <><Save size={14} /> Save Changes</>
                      }
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;