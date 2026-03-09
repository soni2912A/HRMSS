import { useState } from "react";
import { Plus, X, Edit, Trash2, Search, FileText, Download, ShoppingCart } from "lucide-react";

const INITIAL_DATA = [
    { id: 1, po: "PO-0015", vendor: "REGIONAL", loc: "Test",  total: 900 },
    { id: 2, po: "PO-0014", vendor: "JOKKO",    loc: "nsps",  total: 100000 },
];

const EMPTY_FORM = { po: "", vendor: "", loc: "", total: "" };

export default function PurchaseOrder() {
    const [data, setData]           = useState(INITIAL_DATA);
    const [search, setSearch]       = useState("");
    const [isOpen, setIsOpen]       = useState(false);
    const [formData, setFormData]   = useState(EMPTY_FORM);
    const [editId, setEditId]       = useState(null);

    /* ── helpers ── */
    const openAdd = () => {
        setFormData(EMPTY_FORM);
        setEditId(null);
        setIsOpen(true);
    };

    const openEdit = (row) => {
        setFormData({ po: row.po, vendor: row.vendor, loc: row.loc, total: row.total });
        setEditId(row.id);
        setIsOpen(true);
    };

    const closeModal = () => { setIsOpen(false); setEditId(null); };

    const handleSave = (e) => {
        e.preventDefault();
        if (editId) {
            setData(data.map(r => r.id === editId ? { ...r, ...formData, total: Number(formData.total) } : r));
        } else {
            setData([...data, { ...formData, total: Number(formData.total), id: Date.now() }]);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this purchase order?")) setData(data.filter(r => r.id !== id));
    };

    const filtered = data.filter(r =>
        r.po.toLowerCase().includes(search.toLowerCase()) ||
        r.vendor.toLowerCase().includes(search.toLowerCase())
    );

    const fmt = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

    return (
        <div className="p-3 sm:p-5 md:p-8 bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">

                {/* ── Header ── */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2.5 mb-0.5">
                            <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <ShoppingCart size={16} className="text-indigo-600" />
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                                Purchase Orders
                            </h2>
                        </div>
                        <p className="text-slate-400 text-xs sm:text-sm font-medium ml-10">
                            Manage and track all purchase orders
                        </p>
                    </div>
                    <button
                        onClick={openAdd}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600
                            hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm
                            shadow-lg shadow-indigo-100 transition-all active:scale-95 whitespace-nowrap"
                    >
                        <Plus size={17} /> Add Purchase Order
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
                            placeholder="Search PO or vendor..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl
                                text-sm focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400 outline-none"
                        />
                    </div>
                </div>

                {/* ── Desktop table ── */}
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                    <div className="hidden md:block">
                        <table className="w-full text-left table-fixed">
                            <colgroup>
                                <col style={{ width: "18%" }} />
                                <col style={{ width: "28%" }} />
                                <col style={{ width: "24%" }} />
                                <col style={{ width: "18%" }} />
                                <col style={{ width: "12%" }} />
                            </colgroup>
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    {["PO No", "Vendor", "Location", "Total", "Actions"].map((h, i) => (
                                        <th key={h} className={`p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest
                                            ${i === 4 ? "text-center" : ""}`}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filtered.map(row => (
                                    <tr key={row.id} className="hover:bg-indigo-50/20 transition-colors group">
                                        <td className="p-5">
                                            <span className="font-black text-indigo-600 text-sm">{row.po}</span>
                                        </td>
                                        <td className="p-5 font-bold text-slate-700 truncate" title={row.vendor}>
                                            {row.vendor}
                                        </td>
                                        <td className="p-5 text-slate-500 font-medium truncate">{row.loc}</td>
                                        <td className="p-5">
                                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100
                                                px-3 py-1 rounded-lg text-sm font-black">
                                                {fmt(row.total)}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex justify-center gap-2
                                                opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openEdit(row)}
                                                    className="p-2 bg-slate-50 border border-slate-200 rounded-lg
                                                        text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors">
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
                                            No purchase orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ── Mobile cards ── */}
                    <div className="md:hidden divide-y divide-slate-100">
                        {filtered.map(row => (
                            <div key={row.id} className="p-4 space-y-3">

                                {/* Row 1: PO badge + vendor + location */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="bg-indigo-50 text-indigo-600 border border-indigo-100
                                        px-2.5 py-0.5 rounded-lg text-xs font-black flex-shrink-0">
                                        {row.po}
                                    </span>
                                    <span className="font-black text-slate-800 text-sm truncate" title={row.vendor}>
                                        {row.vendor}
                                    </span>
                                </div>

                                {/* Row 2: Location + Amount in 2-col grid — no overlap */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 min-w-0">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wide mb-0.5">
                                            Location
                                        </p>
                                        <p className="text-xs font-bold text-slate-700 truncate">{row.loc}</p>
                                    </div>
                                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 min-w-0">
                                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-wide mb-0.5">
                                            Total
                                        </p>
                                        <p className="text-xs font-black text-emerald-700 truncate">{fmt(row.total)}</p>
                                    </div>
                                </div>

                                {/* Row 3: Actions */}
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
                                No purchase orders found.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════
                MODAL
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
                                <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center">
                                    <ShoppingCart size={16} className="text-indigo-600" />
                                </div>
                                <h3 className="text-base sm:text-lg font-black text-slate-800">
                                    {editId ? "Edit Purchase Order" : "New Purchase Order"}
                                </h3>
                            </div>
                            <button onClick={closeModal}
                                className="p-2 hover:bg-slate-200 rounded-full transition-colors flex-shrink-0">
                                <X size={18} className="text-slate-400" />
                            </button>
                        </div>

                        {/* Modal form */}
                        <form onSubmit={handleSave}
                            className="p-6 space-y-4 overflow-y-auto flex-1">

                            {/* PO Number */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">
                                    PO Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. PO-0016"
                                    required
                                    value={formData.po}
                                    onChange={e => setFormData({ ...formData, po: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl
                                        outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400
                                        font-mono text-sm transition"
                                />
                            </div>

                            {/* Vendor */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">
                                    Vendor
                                </label>
                                <input
                                    type="text"
                                    placeholder="Vendor name"
                                    required
                                    value={formData.vendor}
                                    onChange={e => setFormData({ ...formData, vendor: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl
                                        outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400
                                        font-medium text-sm transition"
                                />
                            </div>

                            {/* Location — full width */}
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
                                        outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400
                                        font-medium text-sm transition"
                                />
                            </div>

                            {/* Total Amount — full width */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">
                                    Total Amount
                                </label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    required
                                    value={formData.total}
                                    onChange={e => setFormData({ ...formData, total: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl
                                        outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400
                                        font-bold text-sm transition"
                                />
                            </div>

                            {/* Submit */}
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
                                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white
                                        rounded-2xl font-black text-sm shadow-lg shadow-indigo-100
                                        transition active:scale-[0.98]"
                                >
                                    {editId ? "Save Changes" : "Create Order"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}