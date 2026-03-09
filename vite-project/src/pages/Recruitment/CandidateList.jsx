import React, { useState } from 'react';
import { Edit, Trash2, Plus, X, Search } from 'lucide-react';

const CandidateTable = () => {
    const [candidates, setCandidates] = useState([
        { id: 1, name: "John Doe", candidateId: "8094935283", phone: "1234567890" },
        { id: 2, name: "Anastasia Whitney", candidateId: "2121895214", phone: "2811551672" },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: "", candidateId: "", phone: "" });

    const handleSave = (e) => {
        e.preventDefault();
        if (formData.id) {
            setCandidates(candidates.map(c => c.id === formData.id ? formData : c));
        } else {
            setCandidates([...candidates, { ...formData, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    const filtered = candidates.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-3 sm:p-5 md:p-8 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">

                {/* ── Page header ── */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-tight">
                            Candidate Directory
                        </h2>
                        <p className="text-slate-500 font-medium text-sm mt-0.5">
                            Manage and track your applicant pool
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setFormData({ id: null, name: "", candidateId: "", phone: "" });
                            setIsModalOpen(true);
                        }}
                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white
                            px-5 py-2.5 rounded-xl font-bold flex items-center justify-center
                            gap-2 shadow-lg shadow-emerald-100 transition-all active:scale-95 text-sm"
                    >
                        <Plus size={18} /> Add Candidate
                    </button>
                </div>

                {/* ── Main card ── */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">

                    {/* Search bar */}
                    <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50">
                        <div className="relative w-full sm:w-80 md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 flex-shrink-0" size={16} />
                            <input
                                type="text"
                                placeholder="Filter by name..."
                                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl
                                    text-sm focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500
                                    outline-none transition-all shadow-sm"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* ── Desktop table — md+ ── */}
                    <div className="hidden md:block">
                        <table className="w-full text-left table-fixed">
                            <colgroup>
                                <col style={{ width: "6%" }} />
                                <col style={{ width: "32%" }} />
                                <col style={{ width: "26%" }} />
                                <col style={{ width: "22%" }} />
                                <col style={{ width: "14%" }} />
                            </colgroup>
                            <thead className="bg-slate-50/80">
                                <tr>
                                    <th className="p-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Sl</th>
                                    <th className="p-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Candidate</th>
                                    <th className="p-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">System ID</th>
                                    <th className="p-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Phone</th>
                                    <th className="p-5 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-5 text-slate-400 font-medium">{index + 1}</td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center
                                                    justify-center text-emerald-700 font-bold flex-shrink-0">
                                                    {item.name.charAt(0)}
                                                </div>
                                                <span className="font-bold text-slate-700 truncate">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-5 font-mono text-sm text-slate-500 truncate">{item.candidateId}</td>
                                        <td className="p-5 text-slate-600 font-medium truncate">{item.phone}</td>
                                        <td className="p-5">
                                            <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => { setFormData(item); setIsModalOpen(true); }}
                                                    className="p-2 bg-white border border-slate-200 rounded-xl text-emerald-600
                                                        hover:bg-emerald-50 transition-colors shadow-sm"
                                                >
                                                    <Edit size={15} />
                                                </button>
                                                <button
                                                    onClick={() => setCandidates(candidates.filter(c => c.id !== item.id))}
                                                    className="p-2 bg-white border border-slate-200 rounded-xl text-rose-500
                                                        hover:bg-rose-50 transition-colors shadow-sm"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-10 text-center text-slate-400 text-sm font-medium">
                                            No candidates match your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ── Mobile cards — below md ── */}
                    <div className="md:hidden divide-y divide-slate-100">
                        {filtered.map((item, index) => (
                            <div key={item.id} className="p-3 sm:p-4">

                                {/* Top row: avatar + name + index badge */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center
                                        justify-center text-white font-black text-base flex-shrink-0">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4
                                            className="font-black text-slate-800 text-sm leading-tight truncate"
                                            title={item.name}
                                        >
                                            {item.name}
                                        </h4>
                                        <p className="text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                                            {item.candidateId}
                                        </p>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-300 flex-shrink-0">
                                        #{index + 1}
                                    </span>
                                </div>

                                {/* Info row */}
                                <div className="flex items-center justify-between bg-slate-50 px-3 py-2
                                    rounded-xl border border-slate-100 mb-3">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                                        Phone
                                    </span>
                                    <span className="text-xs font-bold text-slate-700 truncate ml-2">
                                        {item.phone}
                                    </span>
                                </div>

                                {/* Action buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => { setFormData(item); setIsModalOpen(true); }}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2
                                            bg-white border border-slate-200 rounded-xl font-bold
                                            text-slate-700 text-xs shadow-sm hover:bg-slate-50 transition"
                                    >
                                        <Edit size={13} /> Edit
                                    </button>
                                    <button
                                        onClick={() => setCandidates(candidates.filter(c => c.id !== item.id))}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2
                                            bg-rose-50 rounded-xl font-bold text-rose-600
                                            text-xs hover:bg-rose-100 transition"
                                    >
                                        <Trash2 size={13} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}

                        {filtered.length === 0 && (
                            <p className="p-8 text-center text-slate-400 text-sm font-medium">
                                No candidates match your search.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Modal — bottom sheet on mobile ── */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-end sm:items-center
                    justify-center z-50 p-0 sm:p-4">
                    <div className="bg-white w-full sm:max-w-md rounded-t-[2rem] sm:rounded-[2.5rem]
                        shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

                        {/* Modal header */}
                        <div className="px-5 sm:px-8 py-4 sm:py-6 border-b border-slate-100 flex justify-between
                            items-center bg-slate-50/50 flex-shrink-0">
                            <h3 className="text-lg sm:text-xl font-black text-slate-800">
                                {formData.id ? "Update Profile" : "New Candidate"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-slate-200 rounded-full transition-colors flex-shrink-0"
                            >
                                <X size={18} className="text-slate-400" />
                            </button>
                        </div>

                        {/* Modal form */}
                        <form onSubmit={handleSave} className="p-5 sm:p-8 space-y-4 overflow-y-auto flex-1">

                            {/* Full name */}
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl
                                        focus:ring-4 focus:ring-emerald-50 outline-none font-medium text-sm"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            {/* System ID + Phone — stack on 320px, side-by-side on sm+ */}
                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1">
                                        System ID
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl
                                            focus:ring-4 focus:ring-emerald-50 outline-none font-mono text-sm"
                                        value={formData.candidateId}
                                        onChange={(e) => setFormData({ ...formData, candidateId: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl
                                            focus:ring-4 focus:ring-emerald-50 outline-none font-medium text-sm"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-slate-900 text-white py-3.5 rounded-2xl font-black
                                    text-base hover:bg-slate-800 transition-all shadow-xl shadow-slate-200
                                    active:scale-[0.98] mt-2"
                            >
                                Save Candidate
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CandidateTable;