import { useState, useMemo, useEffect } from "react";
import { Plus, Pencil, Trash2, Trophy, Search, Calendar, User, X, BarChart3, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { employeeAPI, performanceAPI } from "../../services/api";

const ITEMS_PER_PAGE = 5;

const EmployeePerformance = () => {
    const [data, setData]             = useState([]);
    const [employees, setEmployees]   = useState([]);
    const [loading, setLoading]       = useState(true);
    const [showForm, setShowForm]     = useState(false);
    const [editId, setEditId]         = useState(null);
    const [search, setSearch]         = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const emptyForm = { employeeId: "", employeeName: "", score: "", date: "" };
    const [form, setForm] = useState(emptyForm);

    /* ── Fetch employees + performance records on mount ── */
    useEffect(() => { fetchAll(); }, []);

    const fetchAll = async () => {
        try {
            const [empRes, perfRes] = await Promise.all([
                employeeAPI.getAll(),
                performanceAPI.getAll(),
            ]);
            setEmployees(empRes.data.filter(e => e.status === "Active"));
            setData(perfRes.data);
        } catch (err) {
            console.error("Failed to load data:", err);
        } finally {
            setLoading(false);
        }
    };

    /* ── When admin picks an employee from dropdown ── */
    const handleEmpSelect = (e) => {
        const emp = employees.find(emp => emp._id === e.target.value);
        setForm({
            ...form,
            employeeId:   emp?._id    || "",
            employeeName: emp?.name   || "",
        });
    };

    /* ── Save / Update ── */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.employeeId) return alert("Please select an employee");
        if (!form.score)      return alert("Please enter a score");

        try {
            const payload = {
                employee:     form.employeeId,
                employeeName: form.employeeName,
                score:        Number(form.score),
                date:         form.date,
            };

            if (editId) {
                const res = await performanceAPI.update(editId, payload);
                setData(prev => prev.map(d => d._id === editId ? res.data : d));
            } else {
                const res = await performanceAPI.create(payload);
                setData(prev => [res.data, ...prev]);
            }

            setForm(emptyForm);
            setEditId(null);
            setShowForm(false);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleEdit = (item) => {
        setForm({
            employeeId:   item.employee?._id || item.employee || "",
            employeeName: item.employeeName  || item.employee?.name || "",
            score:        item.score,
            date:         item.date?.slice(0, 10) || "",
        });
        setEditId(item._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this performance record?")) return;
        try {
            await performanceAPI.delete(id);
            setData(prev => prev.filter(d => d._id !== id));
        } catch (err) { alert(err.message); }
    };

    const closeForm = () => { setShowForm(false); setEditId(null); setForm(emptyForm); };

    /* ── Filter + paginate ── */
    const filteredData = useMemo(() =>
        data.filter(item =>
            (item.employeeName || item.employee?.name || "")
                .toLowerCase().includes(search.toLowerCase())
        ),
        [data, search]
    );

    const totalPages   = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const start        = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(start, start + ITEMS_PER_PAGE);

    /* ── Score colour ── */
    const scoreColor = (s) =>
        s >= 400 ? "text-emerald-600" :
        s >= 200 ? "text-blue-600"    :
        s >= 100 ? "text-amber-600"   : "text-rose-500";

    const barColor = (s) =>
        s >= 400 ? "bg-emerald-400" :
        s >= 200 ? "bg-blue-400"    :
        s >= 100 ? "bg-amber-400"   : "bg-rose-400";

    const fmtDate = (d) =>
        d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

    return (
        <div className="bg-[#f8fafc] min-h-screen p-3 sm:p-5 md:p-8 pt-20 md:pt-24">
            <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">

                {/* ── Header ── */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2.5">
                            <div className="p-1.5 sm:p-2 bg-amber-100 rounded-xl flex-shrink-0">
                                <Trophy className="text-amber-600" size={20} />
                            </div>
                            Performance Analytics
                        </h1>
                        <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5 ml-9">
                            Track and evaluate employee contributions
                        </p>
                    </div>
                    <button
                        onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}
                        className="w-full sm:w-auto bg-[#0a4d44] hover:bg-slate-800 text-white
                            px-5 py-2.5 rounded-2xl flex items-center justify-center gap-2
                            transition-all shadow-lg font-bold active:scale-95 text-sm"
                    >
                        <Plus size={17} /> Add Performance
                    </button>
                </div>

                {/* ── Search ── */}
                <div className="relative w-full sm:max-w-sm sm:ml-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                    <input
                        placeholder="Search employee..."
                        value={search}
                        onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                        className="w-full bg-white border border-slate-200 pl-10 pr-4 py-2.5
                            rounded-2xl text-sm font-medium shadow-sm outline-none
                            focus:ring-4 ring-emerald-50 transition-all"
                    />
                </div>

                {/* ── Loading ── */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-emerald-600" size={36} />
                    </div>
                ) : (
                    <>
                        {/* ── Desktop table ── */}
                        <div className="hidden md:block bg-white rounded-[2.5rem] shadow-sm
                            border border-slate-100 overflow-hidden">
                            <table className="w-full text-left table-fixed">
                                <colgroup>
                                    <col style={{ width: "6%" }} />
                                    <col style={{ width: "28%" }} />
                                    <col style={{ width: "30%" }} />
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "16%" }} />
                                </colgroup>
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        {["Sl", "Employee", "Score Analytics", "Date", "Actions"].map((h, i) => (
                                            <th key={h} className={`px-5 py-4 text-[11px] font-black uppercase
                                                text-slate-400 ${i === 4 ? "text-center" : ""}`}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {paginatedData.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="py-16 text-center text-slate-400 text-sm">
                                                No performance records found
                                            </td>
                                        </tr>
                                    ) : paginatedData.map((item, i) => (
                                        <tr key={item._id} className="group hover:bg-slate-50/50 transition-all">
                                            <td className="px-5 py-4 text-sm font-bold text-slate-300">
                                                {String(start + i + 1).padStart(2, "0")}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center
                                                        justify-center text-amber-700 font-black text-sm flex-shrink-0">
                                                        {(item.employeeName || item.employee?.name || "?").charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-bold text-slate-700 truncate">
                                                            {item.employeeName || item.employee?.name || "—"}
                                                        </p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                                            {item.employee?.employeeId || "Personnel"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-sm font-black ${scoreColor(item.score)}`}>
                                                        {item.score}
                                                    </span>
                                                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${barColor(item.score)}`}
                                                            style={{ width: `${Math.min((item.score / 600) * 100, 100)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-sm font-medium text-slate-500 italic">
                                                {fmtDate(item.date)}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex justify-center gap-2
                                                    opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleEdit(item)}
                                                        className="p-2 bg-white border border-slate-100 text-blue-600
                                                            rounded-xl hover:border-blue-200 transition-all">
                                                        <Pencil size={14} />
                                                    </button>
                                                    <button onClick={() => handleDelete(item._id)}
                                                        className="p-2 bg-white border border-slate-100 text-red-500
                                                            rounded-xl hover:border-red-200 transition-all">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* ── Mobile cards ── */}
                        <div className="md:hidden space-y-3">
                            {paginatedData.length === 0 ? (
                                <p className="py-12 text-center text-slate-400 text-sm">
                                    No performance records found
                                </p>
                            ) : paginatedData.map((item) => (
                                <div key={item._id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">

                                    {/* Top: avatar + name + actions */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center
                                            justify-center text-amber-700 font-black text-base flex-shrink-0">
                                            {(item.employeeName || item.employee?.name || "?").charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-slate-800 text-sm truncate">
                                                {item.employeeName || item.employee?.name || "—"}
                                            </p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                                {item.employee?.employeeId || "Personnel"}
                                            </p>
                                        </div>
                                        <div className="flex gap-1.5 flex-shrink-0">
                                            <button onClick={() => handleEdit(item)}
                                                className="p-2 bg-slate-50 border border-slate-200 rounded-xl
                                                    hover:border-blue-200 hover:text-blue-600 transition">
                                                <Pencil size={13} className="text-slate-500" />
                                            </button>
                                            <button onClick={() => handleDelete(item._id)}
                                                className="p-2 bg-slate-50 border border-slate-200 rounded-xl
                                                    hover:border-rose-200 hover:text-rose-500 transition">
                                                <Trash2 size={13} className="text-red-400" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Score bar */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`text-sm font-black flex-shrink-0 ${scoreColor(item.score)}`}>
                                            {item.score} pts
                                        </span>
                                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${barColor(item.score)}`}
                                                style={{ width: `${Math.min((item.score / 600) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <p className="text-xs text-slate-400 font-medium italic">
                                        📅 {fmtDate(item.date)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* ── Pagination ── */}
                        {totalPages > 0 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-1">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest order-2 sm:order-1">
                                    Page {currentPage} of {totalPages} · {filteredData.length} records
                                </p>
                                <div className="flex items-center gap-1.5 order-1 sm:order-2">

                                    {/* ← Prev */}
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(p => p - 1)}
                                        className="flex items-center gap-1 px-3 h-9 rounded-xl border border-slate-200
                                            bg-white text-xs font-bold text-slate-500 hover:bg-slate-50
                                            disabled:opacity-30 disabled:cursor-not-allowed transition"
                                    >
                                        <ChevronLeft size={13} /> Prev
                                    </button>

                                    {/* Sliding window of 5 pages */}
                                    {(() => {
                                        const win = 5;
                                        let s = Math.max(1, currentPage - Math.floor(win / 2));
                                        let e = s + win - 1;
                                        if (e > totalPages) { e = totalPages; s = Math.max(1, e - win + 1); }
                                        return Array.from({ length: e - s + 1 }, (_, i) => s + i).map(p => (
                                            <button
                                                key={p}
                                                onClick={() => setCurrentPage(p)}
                                                className={`w-9 h-9 rounded-xl text-xs font-bold transition ${
                                                    currentPage === p
                                                        ? "bg-[#0a4d44] text-white shadow-sm"
                                                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                                                }`}
                                            >
                                                {p}
                                            </button>
                                        ));
                                    })()}

                                    {/* Next → */}
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(p => p + 1)}
                                        className="flex items-center gap-1 px-3 h-9 rounded-xl border border-slate-200
                                            bg-white text-xs font-bold text-slate-500 hover:bg-slate-50
                                            disabled:opacity-30 disabled:cursor-not-allowed transition"
                                    >
                                        Next <ChevronRight size={13} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* ══════════════════════════════════
                MODAL — always centered
            ══════════════════════════════════ */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center
                    justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg
                        max-h-[90vh] flex flex-col overflow-hidden">

                        {/* Modal header */}
                        <div className="flex justify-between items-center px-5 sm:px-6 py-4
                            border-b border-slate-100 flex-shrink-0">
                            <h3 className="font-bold text-base sm:text-lg text-slate-800 flex items-center gap-2">
                                <BarChart3 size={18} className="text-amber-500 flex-shrink-0" />
                                {editId ? "Update Record" : "New Performance Entry"}
                            </h3>
                            <button
                                onClick={closeForm}
                                className="p-1.5 hover:bg-slate-100 rounded-lg transition flex-shrink-0"
                            >
                                <X size={18} className="text-slate-400" />
                            </button>
                        </div>

                        {/* Modal form */}
                        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">

                            {/* Employee dropdown — dynamic */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 block">
                                    Employee *
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 flex-shrink-0" size={15} />
                                    <select
                                        required
                                        value={form.employeeId}
                                        onChange={handleEmpSelect}
                                        className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-3
                                            rounded-xl text-sm font-medium focus:ring-4 ring-emerald-50
                                            outline-none transition-all appearance-none"
                                    >
                                        <option value="">-- Select Employee --</option>
                                        {employees.map(e => (
                                            <option key={e._id} value={e._id}>
                                                {e.name}{e.employeeId ? ` (${e.employeeId})` : ""}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {employees.length === 0 && (
                                    <p className="text-[10px] text-rose-400 ml-1">
                                        No active employees found. Please add employees first.
                                    </p>
                                )}
                            </div>

                            {/* Score */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 block">
                                    Performance Score *
                                </label>
                                <div className="relative">
                                    <BarChart3 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                                    <input
                                        required
                                        type="number"
                                        placeholder="0 – 1000"
                                        min="0"
                                        max="1000"
                                        value={form.score}
                                        onChange={e => setForm({ ...form, score: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-3
                                            rounded-xl text-sm font-medium focus:ring-4 ring-emerald-50
                                            outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Date */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 block">
                                    Record Date *
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                                    <input
                                        required
                                        type="date"
                                        value={form.date}
                                        onChange={e => setForm({ ...form, date: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-3
                                            rounded-xl text-sm font-medium focus:ring-4 ring-emerald-50
                                            outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-1">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="flex-1 border border-slate-200 py-2.5 rounded-xl text-sm
                                        font-bold text-slate-600 hover:bg-slate-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#0a4d44] text-white py-2.5 rounded-xl text-sm
                                        font-bold hover:bg-slate-800 transition shadow-md active:scale-95"
                                >
                                    {editId ? "Update Record" : "Submit Performance"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeePerformance;