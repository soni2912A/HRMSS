import React, { useState } from 'react';
import { Edit, Trash2, Plus, X, Calendar, Star } from 'lucide-react';

const ShortlistTable = () => {
    const [data, setData] = useState([
        { id: 1, name: "Md Naim", candidateId: "8094935283", position: "Software Engineer", sDate: "2026-02-10" },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: "", position: "", candidateId: "" });

    const handleEdit = (item) => {
        setFormData(item);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Remove candidate from shortlist?")) {
            setData(data.filter(item => item.id !== id));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (formData.id) {
            setData(data.map(d => d.id === formData.id ? formData : d));
        } else {
            setData([
                ...data,
                { ...formData, id: Date.now(), sDate: new Date().toISOString().split('T')[0] }
            ]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="p-3 sm:p-6 md:p-10 bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto">

                {/* ── Header ── */}
                <div className="flex flex-col gap-3 xs:flex-row xs:items-end xs:justify-between mb-6 sm:mb-8">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <Star className="text-amber-500 fill-amber-500 flex-shrink-0" size={16} />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">
                                Hiring Pipeline
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Shortlist</h2>
                    </div>
                    <button
                        onClick={() => {
                            setFormData({ id: null, name: "", position: "", candidateId: "" });
                            setIsModalOpen(true);
                        }}
                        className="self-start xs:self-auto bg-emerald-600 hover:bg-emerald-700 text-white
                            px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-black flex items-center gap-2
                            shadow-lg shadow-emerald-100 transition-all active:scale-95 text-sm sm:text-base whitespace-nowrap"
                    >
                        <Plus size={18} /> Add to List
                    </button>
                </div>

                {/* ── Table / Cards ── */}
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">

                    {/* Desktop table — md+ */}
                    <div className="hidden md:block">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Position</th>
                                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Added</th>
                                    <th className="p-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {data.map((row) => (
                                    <tr key={row.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="p-6 font-bold text-slate-800 text-base">{row.name}</td>
                                        <td className="p-6">
                                            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-xs font-bold">
                                                {row.position}
                                            </span>
                                        </td>
                                        <td className="p-6 text-slate-400 text-sm italic">{row.sDate}</td>
                                        <td className="p-6">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => handleEdit(row)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all border border-transparent hover:border-emerald-100">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(row.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all border border-transparent hover:border-rose-100">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards — below md */}
                    <div className="md:hidden p-3 sm:p-4 space-y-3">
                        {data.map((row) => (
                            <div key={row.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden">
                                {/* Left accent bar */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 rounded-l-2xl" />

                                <div className="pl-3">
                                    {/* Name + position */}
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <div className="min-w-0">
                                            <h4 className="font-black text-slate-800 text-base leading-tight truncate">{row.name}</h4>
                                            <span className="inline-block mt-1 bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wide truncate max-w-full">
                                                {row.position}
                                            </span>
                                        </div>
                                        {/* Action icon buttons — compact on tiny screens */}
                                        <div className="flex gap-1.5 flex-shrink-0">
                                            <button
                                                onClick={() => handleEdit(row)}
                                                className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all"
                                                aria-label="Edit"
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(row.id)}
                                                className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 transition-all"
                                                aria-label="Remove"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                                        <Calendar size={12} className="flex-shrink-0" />
                                        <span>Added on {row.sDate}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {data.length === 0 && (
                            <p className="text-center text-slate-400 text-sm py-8 font-medium">No candidates shortlisted yet.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Modal ── */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
                    {/* Sheet on mobile, centered card on sm+ */}
                    <div className="bg-white w-full sm:max-w-md rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl
                        p-5 sm:p-8 max-h-[90vh] overflow-y-auto">

                        <div className="flex justify-between items-center mb-5 sm:mb-6">
                            <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
                                {formData.id ? "Edit Entry" : "New Shortlist Entry"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-wider">
                                    Candidate Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-2xl outline-none focus:border-emerald-500 font-medium text-sm sm:text-base"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-wider">
                                    Role Title
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-2xl outline-none focus:border-emerald-500 font-medium text-sm sm:text-base"
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex gap-3 pt-3 sm:pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-slate-100 py-3 sm:py-4 rounded-2xl font-black text-slate-500 hover:bg-slate-200 transition-colors text-sm sm:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-slate-900 text-white py-3 sm:py-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-lg text-sm sm:text-base"
                                >
                                    Save Record
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShortlistTable;