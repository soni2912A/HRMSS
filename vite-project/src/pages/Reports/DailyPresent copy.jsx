// import React, { useState } from "react";

// const DailyPresent = () => {
//     const [data] = useState([
//         { sl: 1, id: "EMP101", name: "Rahul Sharma", dept: "Engineering", date: "2026-02-19", in: "09:00 AM", out: "06:00 PM", status: "Present" },
//         { sl: 2, id: "EMP105", name: "Sonia Verma", dept: "HR", date: "2026-02-19", in: "09:15 AM", out: "06:30 PM", status: "Present" },
//         { sl: 3, id: "EMP112", name: "Amit Patel", dept: "Sales", date: "2026-02-19", in: "10:30 AM", out: "07:00 PM", status: "Late" },
//         { sl: 4, id: "EMP204", name: "Priya Das", dept: "Design", date: "2026-02-19", in: "08:55 AM", out: "05:45 PM", status: "Present" },
//     ]);

//     const [searchTerm, setSearchTerm] = useState("");

//     const filteredData = data.filter(item =>
//         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.id.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

//             {/* Header */}
//             <div className="p-4 md:p-6 border-b flex flex-col xl:flex-row xl:items-center justify-between gap-4">
//                 <div>
//                     <h2 className="text-lg md:text-xl font-bold text-gray-800">
//                         Daily Present Report
//                     </h2>
//                     <p className="text-xs md:text-sm text-gray-500 mt-1">
//                         Real-time attendance tracking for today
//                     </p>
//                 </div>

//                 <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
//                     <div className="relative w-full sm:w-64">
//                         <input
//                             type="text"
//                             placeholder="Search name or ID..."
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>

//                     <div className="flex gap-2 w-full sm:w-auto">
//                         <button className="flex-1 sm:flex-none bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold">
//                             Generate Report
//                         </button>
//                         <button className="flex-1 sm:flex-none border border-gray-300 px-4 py-2 rounded-lg text-sm font-semibold">
//                             CSV
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* 🔥 MOBILE VIEW (STACKED CARDS) */}
//             <div className="md:hidden p-4 space-y-4">
//                 {filteredData.length > 0 ? (
//                     filteredData.map((row) => (
//                         <div
//                             key={row.id}
//                             className="border border-gray-100 rounded-xl p-4 shadow-sm space-y-3"
//                         >
//                             <div className="flex justify-between">
//                                 <span className="font-bold text-gray-800">{row.name}</span>
//                                 <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.status === "Present"
//                                         ? "bg-green-100 text-green-700"
//                                         : "bg-amber-100 text-amber-700"
//                                     }`}>
//                                     {row.status}
//                                 </span>
//                             </div>

//                             <div className="text-sm space-y-1">
//                                 <p><span className="text-gray-500">Employee ID:</span> {row.id}</p>
//                                 <p><span className="text-gray-500">Department:</span> {row.dept}</p>
//                                 <p><span className="text-gray-500">Date:</span> {row.date}</p>
//                                 <p><span className="text-gray-500">In:</span> {row.in}</p>
//                                 <p><span className="text-gray-500">Out:</span> {row.out}</p>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <div className="text-center py-10">
//                         <p className="text-gray-500 font-semibold">No results found</p>
//                         <button
//                             onClick={() => setSearchTerm("")}
//                             className="mt-3 text-sm text-blue-600 font-bold"
//                         >
//                             Clear Filters
//                         </button>
//                     </div>
//                 )}
//             </div>

//             {/* 💻 DESKTOP TABLE */}
//             <div className="hidden md:block">
//                 <table className="w-full border-collapse">
//                     <thead className="bg-gray-50 border-b">
//                         <tr>
//                             {["Sl", "Employee id", "Name", "Department", "Date", "In time", "Out time", "Status"].map((h) => (
//                                 <th key={h} className="p-4 text-left text-xs font-bold text-gray-500 uppercase">
//                                     {h}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y">
//                         {filteredData.map((row) => (
//                             <tr key={row.id} className="hover:bg-green-50/30">
//                                 <td className="p-4 text-sm">{row.sl}</td>
//                                 <td className="p-4 text-sm font-mono text-blue-600">{row.id}</td>
//                                 <td className="p-4 text-sm font-semibold">{row.name}</td>
//                                 <td className="p-4 text-sm">{row.dept}</td>
//                                 <td className="p-4 text-sm">{row.date}</td>
//                                 <td className="p-4 text-sm">{row.in}</td>
//                                 <td className="p-4 text-sm">{row.out}</td>
//                                 <td className="p-4">
//                                     <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.status === "Present"
//                                             ? "bg-green-100 text-green-700"
//                                             : "bg-amber-100 text-amber-700"
//                                         }`}>
//                                         {row.status}
//                                     </span>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Footer */}
//             <div className="p-4 border-t bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
//                 <p className="text-xs text-gray-500">
//                     Showing {filteredData.length} records for Feb 19, 2026
//                 </p>
//                 <div className="flex gap-2">
//                     <button className="px-4 py-1.5 border rounded-md text-xs bg-white text-gray-400" disabled>
//                         Prev
//                     </button>
//                     <button className="px-4 py-1.5 border rounded-md text-xs bg-white text-gray-700">
//                         Next
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DailyPresent;






import React, { useState } from "react";

const DailyPresent = () => {
    const [data] = useState([
        { sl: 1, id: "EMP101", name: "Rahul Sharma", dept: "Engineering", date: "2026-02-19", in: "09:00 AM", out: "06:00 PM", status: "Present" },
        { sl: 2, id: "EMP105", name: "Sonia Verma", dept: "HR", date: "2026-02-19", in: "09:15 AM", out: "06:30 PM", status: "Present" },
        { sl: 3, id: "EMP112", name: "Amit Patel", dept: "Sales", date: "2026-02-19", in: "10:30 AM", out: "07:00 PM", status: "Late" },
        { sl: 4, id: "EMP204", name: "Priya Das", dept: "Design", date: "2026-02-19", in: "08:55 AM", out: "05:45 PM", status: "Present" },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
            {/* Action Bar */}
            <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-slate-50/20">
                <div>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">Daily Presence</h2>
                    <p className="text-xs text-slate-500 font-medium">Tracking live attendance for today</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative w-full sm:w-72 group">
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none bg-emerald-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition shadow-lg shadow-emerald-100">Report</button>
                        <button className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 uppercase hover:bg-slate-50 transition">CSV</button>
                    </div>
                </div>
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden p-6 space-y-4 bg-slate-50/30">
                {filteredData.map((row) => (
                    <div key={row.id} className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xs">{row.name.charAt(0)}</div>
                                <div>
                                    <p className="font-black text-slate-800 text-sm">{row.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{row.id} • {row.dept}</p>
                                </div>
                            </div>
                            <StatusBadge status={row.status} />
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">In Time</p>
                                <p className="text-xs font-bold text-slate-700">{row.in}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Out Time</p>
                                <p className="text-xs font-bold text-slate-700">{row.out}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block">
                <table className="w-full border-collapse">
                    <thead className="bg-slate-50/50">
                        <tr>
                            {["#", "Employee", "Dept.", "Date", "Check In", "Check Out", "Status"].map((h) => (
                                <th key={h} className="p-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredData.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-5 text-xs font-black text-slate-300">{row.sl}</td>
                                <td className="p-5">
                                    <p className="text-sm font-black text-slate-800">{row.name}</p>
                                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-tighter">{row.id}</p>
                                </td>
                                <td className="p-5 text-xs font-bold text-slate-500">{row.dept}</td>
                                <td className="p-5 text-xs font-medium text-slate-400 font-mono">{row.date}</td>
                                <td className="p-5 text-xs font-black text-slate-700">{row.in}</td>
                                <td className="p-5 text-xs font-black text-slate-700">{row.out}</td>
                                <td className="p-5"><StatusBadge status={row.status} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const style = status === "Present" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600";
    return <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${style}`}>{status}</span>;
}

export default DailyPresent;