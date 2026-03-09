import React, { useState } from "react";
import { X, Calendar, User, Building2, Tag, Clock, FileText } from "lucide-react";

const LeaveReport = () => {
    const initialLeaves = [
        { id: 1, name: "Rahul Sharma", dept: "Engineering", type: "Sick Leave",   start: "2026-02-20", end: "2026-02-22", status: "Approved" },
        { id: 2, name: "Sonia Verma",  dept: "HR",          type: "Casual Leave", start: "2026-02-25", end: "2026-02-26", status: "Pending"  },
        { id: 3, name: "Amit Patel",   dept: "Sales",       type: "Vacation",     start: "2026-03-01", end: "2026-03-10", status: "Rejected" },
        { id: 4, name: "Priya Das",    dept: "Design",      type: "Sick Leave",   start: "2026-02-19", end: "2026-02-19", status: "Approved" },
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [selected, setSelected]     = useState(null); // ← tracks which row's Details was clicked

    const filteredLeaves = initialLeaves.filter(leave =>
        leave.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusStyles = (status) => {
        switch (status) {
            case "Approved": return "bg-emerald-50 text-emerald-600 border-emerald-100";
            case "Pending":  return "bg-amber-50  text-amber-600  border-amber-100";
            case "Rejected": return "bg-rose-50   text-rose-600   border-rose-100";
            default:         return "bg-slate-50  text-slate-600  border-slate-100";
        }
    };

    const dayCount = (start, end) =>
        Math.floor((new Date(end) - new Date(start)) / 86400000) + 1;

    const fmtDate = (d) =>
        new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

    return (
        <div className="animate-in fade-in duration-500">
            <div className="bg-white shadow-sm rounded-[40px] border border-slate-100 overflow-hidden">

                {/* ── Header ── */}
                <div className="p-5 sm:p-8 border-b border-slate-50 bg-slate-50/20
                    flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                            Leave Lifecycle
                        </h2>
                        <p className="text-slate-500 text-sm font-medium mt-0.5">
                            Review and manage employee time-off requests.
                        </p>
                    </div>
                    <input
                        type="text"
                        placeholder="Search leave type or name..."
                        className="w-full md:w-80 bg-white border border-slate-200 rounded-2xl
                            py-2.5 px-5 text-sm focus:ring-4 focus:ring-indigo-500/10
                            outline-none transition-all"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                    <div className="border border-slate-100 rounded-[32px] overflow-hidden">

                        {/* ── Desktop table ── */}
                        <div className="hidden md:block">
                            <table className="w-full text-left table-fixed">
                                <colgroup>
                                    <col style={{ width: "22%" }} />
                                    <col style={{ width: "14%" }} />
                                    <col style={{ width: "16%" }} />
                                    <col style={{ width: "26%" }} />
                                    <col style={{ width: "13%" }} />
                                    <col style={{ width: "9%"  }} />
                                </colgroup>
                                <thead className="bg-slate-50/50 border-b border-slate-50">
                                    <tr>
                                        {["Employee", "Department", "Leave Type", "Duration", "Status", ""].map(h => (
                                            <th key={h} className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredLeaves.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="p-12 text-center text-slate-400 text-sm">
                                                No records match your search.
                                            </td>
                                        </tr>
                                    ) : filteredLeaves.map(leave => (
                                        <tr key={leave.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="p-5">
                                                <div className="font-bold text-slate-700 truncate">{leave.name}</div>
                                                <div className="text-[10px] font-black text-slate-300 font-mono">LVE-{leave.id}00</div>
                                            </td>
                                            <td className="p-5 text-sm font-medium text-slate-500 truncate">{leave.dept}</td>
                                            <td className="p-5 text-sm font-bold text-slate-700 truncate">{leave.type}</td>
                                            <td className="p-5">
                                                <div className="text-[11px] font-black text-indigo-500 font-mono">
                                                    {leave.start}
                                                    <span className="text-slate-300 mx-1">→</span>
                                                    {leave.end}
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <span className={`px-3 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-widest ${getStatusStyles(leave.status)}`}>
                                                    {leave.status}
                                                </span>
                                            </td>
                                            <td className="p-5 text-right">
                                                {/* ← onClick wired up */}
                                                <button
                                                    onClick={() => setSelected(leave)}
                                                    className="text-indigo-600 font-black text-[10px] uppercase
                                                        tracking-widest hover:underline px-2 py-1
                                                        rounded-lg hover:bg-indigo-50 transition-colors"
                                                >
                                                    Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* ── Mobile cards ── */}
                        <div className="md:hidden divide-y divide-slate-50">
                            {filteredLeaves.length === 0 ? (
                                <p className="p-8 text-center text-slate-400 text-sm">No records match your search.</p>
                            ) : filteredLeaves.map(leave => (
                                <div key={leave.id} className="p-4 space-y-3">
                                    <div className="flex justify-between items-start gap-3">
                                        <div className="min-w-0">
                                            <p className="font-black text-slate-800 truncate">{leave.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{leave.dept}</p>
                                        </div>
                                        <span className={`flex-shrink-0 px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-widest ${getStatusStyles(leave.status)}`}>
                                            {leave.status}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-slate-50 rounded-xl px-3 py-2">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wide mb-0.5">Type</p>
                                            <p className="text-xs font-bold text-slate-700 truncate">{leave.type}</p>
                                        </div>
                                        <div className="bg-indigo-50 rounded-xl px-3 py-2">
                                            <p className="text-[9px] font-black text-indigo-400 uppercase tracking-wide mb-0.5">Days</p>
                                            <p className="text-xs font-black text-indigo-700">
                                                {dayCount(leave.start, leave.end)} day{dayCount(leave.start, leave.end) > 1 ? "s" : ""}
                                            </p>
                                        </div>
                                        <div className="col-span-2 bg-slate-50 rounded-xl px-3 py-2">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wide mb-0.5">Duration</p>
                                            <p className="text-[11px] font-black text-indigo-600 font-mono">
                                                {leave.start} → {leave.end}
                                            </p>
                                        </div>
                                    </div>
                                    {/* ← Details button on mobile */}
                                    <button
                                        onClick={() => setSelected(leave)}
                                        className="w-full py-2.5 bg-indigo-50 text-indigo-600 rounded-xl
                                            font-black text-xs uppercase tracking-widest
                                            hover:bg-indigo-100 transition-colors"
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Showing {filteredLeaves.length} applications
                        </p>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-100 text-slate-600
                                font-black text-[10px] uppercase tracking-widest rounded-2xl
                                hover:bg-slate-200 transition-all">
                                Download PDF
                            </button>
                            <button className="flex-1 sm:flex-none px-5 py-2.5 bg-indigo-600 text-white
                                font-black text-[10px] uppercase tracking-widest rounded-2xl
                                hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
                                Export Excel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════
                DETAILS MODAL
            ══════════════════════════════════ */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm
                        flex items-center justify-center p-4"
                    onClick={() => setSelected(null)}   // click backdrop to close
                >
                    <div
                        className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden"
                        onClick={e => e.stopPropagation()} // prevent modal close on inner click
                    >
                        {/* Modal header */}
                        <div className="flex items-center justify-between px-6 py-5
                            border-b border-slate-100 bg-slate-50/60">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FileText size={16} className="text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-800 text-base leading-tight">Leave Details</h3>
                                    <p className="text-[10px] font-bold text-slate-400 font-mono">LVE-{selected.id}00</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelected(null)}
                                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                            >
                                <X size={18} className="text-slate-400" />
                            </button>
                        </div>

                        {/* Modal body */}
                        <div className="p-6 space-y-2.5">

                            {/* Status badge */}
                            <div className="flex justify-center mb-3">
                                <span className={`px-5 py-2 rounded-full text-xs font-black border uppercase tracking-widest ${getStatusStyles(selected.status)}`}>
                                    {selected.status}
                                </span>
                            </div>

                            {/* Info rows */}
                            {[
                                { icon: <User size={14} />,      label: "Employee",   value: selected.name },
                                { icon: <Building2 size={14} />, label: "Department", value: selected.dept },
                                { icon: <Tag size={14} />,       label: "Leave Type", value: selected.type },
                                { icon: <Calendar size={14} />,  label: "From",       value: fmtDate(selected.start) },
                                { icon: <Calendar size={14} />,  label: "To",         value: fmtDate(selected.end)   },
                                {
                                    icon: <Clock size={14} />,
                                    label: "Duration",
                                    value: `${dayCount(selected.start, selected.end)} day${dayCount(selected.start, selected.end) > 1 ? "s" : ""}`,
                                },
                            ].map(row => (
                                <div key={row.label}
                                    className="flex items-center justify-between bg-slate-50
                                        border border-slate-100 rounded-2xl px-4 py-3 gap-3">
                                    <div className="flex items-center gap-2 text-slate-400 flex-shrink-0">
                                        {row.icon}
                                        <span className="text-[10px] font-black uppercase tracking-widest">
                                            {row.label}
                                        </span>
                                    </div>
                                    <span className="font-bold text-slate-700 text-sm text-right truncate">
                                        {row.value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Modal footer */}
                        <div className="px-6 pb-6">
                            <button
                                onClick={() => setSelected(null)}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white
                                    rounded-2xl font-black text-sm transition-all
                                    shadow-lg shadow-indigo-100 active:scale-[0.98]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaveReport;