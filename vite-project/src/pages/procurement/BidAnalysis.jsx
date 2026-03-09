import { useState } from "react";
import { Plus, X, Edit, Trash2, Search, FileText, Download, BarChart2 } from "lucide-react";

const INITIAL_DATA = [
    { id: 1, bid: "BID-00015", sba: "66",  loc: "mnn",   date: "2025-09-26" },
    { id: 2, bid: "BID-00014", sba: "Att", loc: "Lkjjj", date: "2025-09-17" },
];

const EMPTY_FORM = { bid: "", sba: "", loc: "", date: "" };

export default function BidAnalysis() {
    const [data, setData]         = useState(INITIAL_DATA);
    const [search, setSearch]     = useState("");
    const [isOpen, setIsOpen]     = useState(false);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [editId, setEditId]     = useState(null);

    const openAdd = () => {
        setFormData(EMPTY_FORM);
        setEditId(null);
        setIsOpen(true);
    };

    const openEdit = (row) => {
        setFormData({ bid: row.bid, sba: row.sba, loc: row.loc, date: row.date });
        setEditId(row.id);
        setIsOpen(true);
    };

    const closeModal = () => { setIsOpen(false); setEditId(null); };

    const handleSave = (e) => {
        e.preventDefault();
        if (editId) {
            setData(data.map(r => r.id === editId ? { ...r, ...formData } : r));
        } else {
            setData([...data, { ...formData, id: Date.now() }]);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this bid analysis?")) setData(data.filter(r => r.id !== id));
    };

    const filtered = data.filter(r =>
        r.bid.toLowerCase().includes(search.toLowerCase()) ||
        r.sba.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-3 sm:p-5 md:p-8 bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">

                {/* ── Header ── */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2.5 mb-0.5">
                            <div className="w-8 h-8 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <BarChart2 size={16} className="text-violet-600" />
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                                Bid Analysis
                            </h2>
                        </div>
                        <p className="text-slate-400 text-xs sm:text-sm font-medium ml-10">
                            Manage and review all bid analysis records
                        </p>
                    </div>
                    <button
                        onClick={openAdd}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-violet-600
                            hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm
                            shadow-lg shadow-violet-100 transition-all active:scale-95 whitespace-nowrap"
                    >
                        <Plus size={17} /> Add Bid Analysis
                    </button>
                </div>

                {/* ── Toolbar ── */}
                <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4
                    flex flex-col sm:flex-row justify-between gap-3">
                    <div className="flex gap-2 flex-shrink-0">
                        <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 text-white
                            rounded-xl text-[10px] font-black uppercase tracking-tight">
                            <FileText size={13} /> CSV
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 text-white
                            rounded-xl text-[10px] font-black uppercase tracking-tight">
                            <Download size={13} /> Excel
                        </button>
                    </div>
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                        <input
                            type="text"
                            placeholder="Search bid or SBA no..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl
                                text-sm focus:ring-2 focus:ring-violet-400/30 focus:border-violet-400 outline-none"
                        />
                    </div>
                </div>

                {/* ── Table + Cards wrapper ── */}
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">

                    {/* Desktop table */}
                    <div className="hidden md:block">
                        <table className="w-full text-left table-fixed">
                            <colgroup>
                                <col style={{ width: "22%" }} />
                                <col style={{ width: "20%" }} />
                                <col style={{ width: "24%" }} />
                                <col style={{ width: "20%" }} />
                                <col style={{ width: "14%" }} />
                            </colgroup>
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    {["Bid No", "SBA No", "Location", "Date", "Actions"].map((h, i) => (
                                        <th key={h} className={`p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest
                                            ${i === 4 ? "text-center" : ""}`}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filtered.map(row => (
                                    <tr key={row.id} className="hover:bg-violet-50/20 transition-colors group">
                                        <td className="p-5">
                                            <span className="font-black text-violet-600 text-sm">{row.bid}</span>
                                        </td>
                                        <td className="p-5 font-bold text-slate-700 truncate">{row.sba}</td>
                                        <td className="p-5 text-slate-500 font-medium truncate">{row.loc}</td>
                                        <td className="p-5 text-slate-500 font-medium">{row.date}</td>
                                        <td className="p-5">
                                            <div className="flex justify-center gap-2
                                                opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openEdit(row)}
                                                    className="p-2 bg-slate-50 border border-slate-200 rounded-lg
                                                        text-slate-400 hover:text-violet-600 hover:border-violet-200 transition-colors">
                                                    <Edit size={14} />
                                                </button>
                                                <button onClick={() => handleDelete(row.id)}
                                                    className="p-2 bg-slate-50 border border-slate-200 rounded-lg
                                                        text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-colors">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-12 text-center text-slate-400 text-sm font-medium">
                                            No bid analysis records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="md:hidden divide-y divide-slate-100">
                        {filtered.map(row => (
                            <div key={row.id} className="p-4 space-y-3">

                                {/* Bid badge + SBA */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="bg-violet-50 text-violet-600 border border-violet-100
                                        px-2.5 py-0.5 rounded-lg text-xs font-black flex-shrink-0">
                                        {row.bid}
                                    </span>
                                    <span className="font-bold text-slate-700 text-sm">SBA: {row.sba}</span>
                                </div>

                                {/* Location + Date grid */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 min-w-0">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wide mb-0.5">
                                            Location
                                        </p>
                                        <p className="text-xs font-bold text-slate-700 truncate">{row.loc}</p>
                                    </div>
                                    <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 min-w-0">
                                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-wide mb-0.5">
                                            Date
                                        </p>
                                        <p className="text-xs font-black text-blue-700 truncate">{row.date}</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button onClick={() => openEdit(row)}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5
                                            bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700">
                                        <Edit size={13} /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(row.id)}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5
                                            bg-rose-50 rounded-xl text-xs font-bold text-rose-600">
                                        <Trash2 size={13} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                        {filtered.length === 0 && (
                            <p className="p-10 text-center text-slate-400 text-sm font-medium">
                                No bid analysis records found.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════
                MODAL — always centered
            ══════════════════════════════════ */}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm
                    flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-[2rem]
                        shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">

                        {/* Modal header */}
                        <div className="flex items-center justify-between px-6 py-5
                            border-b border-slate-100 bg-slate-50/60 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center">
                                    <BarChart2 size={16} className="text-violet-600" />
                                </div>
                                <h3 className="text-base sm:text-lg font-black text-slate-800">
                                    {editId ? "Edit Bid Analysis" : "New Bid Analysis"}
                                </h3>
                            </div>
                            <button onClick={closeModal}
                                className="p-2 hover:bg-slate-200 rounded-full transition-colors flex-shrink-0">
                                <X size={18} className="text-slate-400" />
                            </button>
                        </div>

                        {/* Modal form */}
                        <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">

                            {/* Bid No */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">
                                    Bid No
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. BID-00016"
                                    required
                                    value={formData.bid}
                                    onChange={e => setFormData({ ...formData, bid: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl
                                        outline-none focus:ring-2 focus:ring-violet-400/30 focus:border-violet-400
                                        font-mono text-sm transition"
                                />
                            </div>

                            {/* SBA No */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">
                                    SBA No
                                </label>
                                <input
                                    type="text"
                                    placeholder="SBA number"
                                    required
                                    value={formData.sba}
                                    onChange={e => setFormData({ ...formData, sba: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl
                                        outline-none focus:ring-2 focus:ring-violet-400/30 focus:border-violet-400
                                        font-medium text-sm transition"
                                />
                            </div>

                            {/* Location */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    placeholder="Location"
                                    required
                                    value={formData.loc}
                                    onChange={e => setFormData({ ...formData, loc: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl
                                        outline-none focus:ring-2 focus:ring-violet-400/30 focus:border-violet-400
                                        font-medium text-sm transition"
                                />
                            </div>

                            {/* Date */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl
                                        outline-none focus:ring-2 focus:ring-violet-400/30 focus:border-violet-400
                                        font-medium text-sm transition"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600
                                        rounded-2xl font-black text-sm transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 text-white
                                        rounded-2xl font-black text-sm shadow-lg shadow-violet-100
                                        transition active:scale-[0.98]"
                                >
                                    {editId ? "Save Changes" : "Create Record"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}