import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Download, FileText, User, CreditCard } from "lucide-react";

export function ManageEmployeeSalary() {
    const navigate = useNavigate();
    const allData = [
        { id: 1, name: "Honorato Terry", month: "2024-04", total: 5500 },
        { id: 2, name: "Maisha Lucy",    month: "2024-04", total: 4200 },
        { id: 3, name: "Rahul Sharma",   month: "2024-05", total: 6100 },
        { id: 4, name: "Amit Kumar",     month: "2024-05", total: 3900 },
        { id: 5, name: "Sneha Patel",    month: "2024-06", total: 7200 },
        { id: 6, name: "Kiran Singh",    month: "2024-06", total: 4800 },
    ];

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 3;

    const filtered = useMemo(
        () => allData.filter(r => r.name.toLowerCase().includes(search.toLowerCase())),
        [search]
    );
    useEffect(() => {
        if (page > Math.ceil(filtered.length / perPage)) setPage(1);
    }, [filtered]);

    const totalPages = Math.ceil(filtered.length / perPage);
    const startIndex = (page - 1) * perPage;
    const pageData   = filtered.slice(startIndex, startIndex + perPage);

    return (
        <section className="bg-[#f1f5f4] min-h-screen p-3 sm:p-5 md:p-8 text-slate-700">
            <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">

                {/* ── Tab nav — scrollable on tiny screens ── */}
                <div className="overflow-x-auto pb-1">
                    <div className="flex gap-1.5 bg-white/60 p-1.5 rounded-2xl border border-slate-200 w-max min-w-full sm:w-fit">
                        <button
                            onClick={() => navigate("/Payroll/salary-advance")}
                            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold
                                hover:bg-white transition-all whitespace-nowrap"
                        >
                            Salary Advance
                        </button>
                        <button
                            onClick={() => navigate("/Payroll/salary-generate")}
                            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold
                                hover:bg-white transition-all whitespace-nowrap"
                        >
                            Salary Generate
                        </button>
                        <button
                            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold
                                bg-[#0a4d44] text-white shadow-lg shadow-emerald-900/20 whitespace-nowrap"
                        >
                            Manage Employee Salary
                        </button>
                    </div>
                </div>

                {/* ── Page header ── */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                            Employee Payroll
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                            Manage and download monthly salary slips
                        </p>
                    </div>
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            placeholder="Search employee..."
                            value={search}
                            onChange={e => { setSearch(e.target.value); setPage(1); }}
                            className="w-full bg-white border border-slate-200 pl-10 pr-4 py-2.5
                                rounded-[1.25rem] shadow-sm outline-none focus:border-emerald-500
                                focus:ring-4 ring-emerald-50 transition-all text-sm"
                        />
                    </div>
                </div>

                {/* ── Employee cards ── */}
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {pageData.length > 0 ? pageData.map((r) => (
                        <div
                            key={r.id}
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm
                                hover:shadow-md transition-shadow group overflow-hidden"
                        >
                            {/* Card body */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5">

                                {/* Avatar */}
                                <div className="hidden sm:flex h-16 w-16 bg-slate-50 rounded-2xl items-center
                                    justify-center text-[#0a4d44] group-hover:bg-emerald-50
                                    transition-colors flex-shrink-0">
                                    <User size={26} />
                                </div>

                                {/* Name + meta */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3">
                                        {/* Avatar visible only on mobile, inline */}
                                        <div className="sm:hidden w-10 h-10 bg-slate-50 rounded-xl flex items-center
                                            justify-center text-[#0a4d44] flex-shrink-0">
                                            <User size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-sm sm:text-base font-bold text-slate-800 truncate">
                                                {r.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-3 mt-0.5">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase
                                                    tracking-widest flex items-center gap-1">
                                                    <FileText size={10} /> {r.month}
                                                </span>
                                                <span className="text-[10px] font-bold text-emerald-600 uppercase
                                                    tracking-widest flex items-center gap-1">
                                                    <CreditCard size={10} /> Paid
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Net salary — visible on all screens */}
                                <div className="flex items-center justify-between sm:block sm:text-right
                                    px-0 sm:px-5 sm:border-x sm:border-slate-100 flex-shrink-0">
                                    <p className="text-[9px] sm:text-[10px] font-black text-slate-400
                                        uppercase tracking-tighter">
                                        Total Net Salary
                                    </p>
                                    <p className="text-lg sm:text-xl font-black text-slate-800">
                                        ₹ {r.total.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Action buttons — full-width row on mobile, inline on sm+ */}
                            <div className="flex border-t border-slate-100 sm:border-0
                                sm:pr-5 sm:pb-4 sm:pt-0 sm:justify-end">
                                <button
                                    onClick={() => alert(`Payslip: ${r.name}`)}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5
                                        py-3 sm:py-2 sm:px-4 border-r sm:border border-slate-200
                                        sm:rounded-2xl text-xs sm:text-sm font-bold text-slate-600
                                        hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                                >
                                    View Slip
                                </button>
                                <button
                                    onClick={() => alert(`Downloading: ${r.name}`)}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5
                                        py-3 sm:py-2 sm:px-4 sm:ml-2
                                        bg-[#0a4d44] hover:bg-slate-800 text-white
                                        text-xs sm:text-sm font-bold transition-all
                                        sm:rounded-2xl sm:shadow-lg active:scale-95"
                                >
                                    <Download size={14} /> Download
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="bg-white rounded-[2rem] p-16 text-center
                            border-2 border-dashed border-slate-100">
                            <p className="text-slate-400 font-medium text-sm">
                                No records found for "{search}"
                            </p>
                        </div>
                    )}
                </div>

                {/* ── Pagination ── */}
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center items-center gap-3">
                        <button
                            onClick={() => setPage(p => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="text-xs sm:text-sm font-bold text-slate-500
                                hover:text-emerald-600 disabled:opacity-30 transition-colors"
                        >
                            Previous
                        </button>
                        <div className="flex gap-1.5">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i + 1)}
                                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl font-black text-xs
                                        transition-all ${page === i + 1
                                            ? "bg-[#0a4d44] text-white shadow-md"
                                            : "bg-white text-slate-400 hover:bg-slate-50"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                            className="text-xs sm:text-sm font-bold text-slate-500
                                hover:text-emerald-600 disabled:opacity-30 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}