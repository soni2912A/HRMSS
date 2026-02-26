// import React, { useState } from "react";

// const EmployeeReport = () => {
//     const [employees] = useState([
//         { id: "000001", name: "Honorato Curry", email: "test@mail.com", mobile: "+1 873 591 1817", joined: "1986-12-07", status: "Active" },
//         { id: "000002", name: "Maisha Gonzales", email: "hr@mail.com", mobile: "+1 302 141 4066", joined: "2024-04-28", status: "Active" },
//         { id: "000003", name: "Arjun Mehta", email: "arjun@mail.com", mobile: "+91 98765 43210", joined: "2025-01-15", status: "Probation" },
//         { id: "000004", name: "Sarah Jenkins", email: "sarah@mail.com", mobile: "+44 20 7946 0958", joined: "2023-11-20", status: "Notice" },
//     ]);

//     const [searchTerm, setSearchTerm] = useState("");

//     const filteredEmployees = employees.filter(emp =>
//         emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         emp.id.includes(searchTerm)
//     );

//     const getInitials = (name) =>
//         name.split(" ").map(n => n[0]).join("").toUpperCase();

//     return (
//         <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
//             <div className="max-w-7xl mx-auto">

//                 {/* Header */}
//                 <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
//                     <div>
//                         <h1 className="text-xl md:text-2xl font-bold text-slate-800">
//                             Employee Directory
//                         </h1>
//                         <p className="text-slate-500 text-sm">
//                             Manage and view all registered employees
//                         </p>
//                     </div>

//                     <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
//                         <input
//                             type="text"
//                             placeholder="Search employees..."
//                             className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 w-full sm:w-64"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                         <button className="bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-semibold">
//                             Filter
//                         </button>
//                     </div>
//                 </div>

//                 {/* 🔥 MOBILE VIEW (STACKED CARDS) */}
//                 <div className="md:hidden space-y-4">
//                     {filteredEmployees.length > 0 ? (
//                         filteredEmployees.map((emp, index) => (
//                             <div
//                                 key={emp.id}
//                                 className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3"
//                             >
//                                 <div className="flex items-center gap-3">
//                                     <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
//                                         {getInitials(emp.name)}
//                                     </div>
//                                     <div>
//                                         <p className="font-bold text-slate-800">{emp.name}</p>
//                                         <p className="text-xs text-slate-400 font-mono">
//                                             #{emp.id}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="text-sm space-y-1">
//                                     <p><span className="text-slate-500">Email:</span> {emp.email}</p>
//                                     <p><span className="text-slate-500">Mobile:</span> {emp.mobile}</p>
//                                     <p><span className="text-slate-500">Joined:</span> {new Date(emp.joined).toLocaleDateString("en-GB")}</p>
//                                 </div>

//                                 <div className="flex justify-between items-center">
//                                     <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${emp.status === "Active"
//                                             ? "bg-green-100 text-green-600"
//                                             : emp.status === "Probation"
//                                                 ? "bg-blue-100 text-blue-600"
//                                                 : "bg-orange-100 text-orange-600"
//                                         }`}>
//                                         {emp.status}
//                                     </span>

//                                     <button className="text-emerald-600 text-sm font-semibold">
//                                         Details →
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="text-center py-10 text-slate-400">
//                             No employees found.
//                         </div>
//                     )}
//                 </div>

//                 {/* 💻 DESKTOP TABLE */}
//                 <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//                     <table className="w-full text-left border-collapse">
//                         <thead>
//                             <tr className="bg-slate-50 text-xs uppercase text-slate-500 font-bold">
//                                 <th className="p-4">Sl</th>
//                                 <th className="p-4">Employee</th>
//                                 <th className="p-4">Contact Info</th>
//                                 <th className="p-4 text-center">Joining Date</th>
//                                 <th className="p-4 text-center">Status</th>
//                                 <th className="p-4 text-right">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-slate-100">
//                             {filteredEmployees.map((emp, index) => (
//                                 <tr key={emp.id} className="hover:bg-slate-50">
//                                     <td className="p-4 text-sm">{index + 1}</td>
//                                     <td className="p-4">
//                                         <div className="flex items-center gap-3">
//                                             <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
//                                                 {getInitials(emp.name)}
//                                             </div>
//                                             <div>
//                                                 <div className="font-bold text-slate-800">{emp.name}</div>
//                                                 <div className="text-xs text-slate-400 font-mono">#{emp.id}</div>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className="p-4 text-sm">
//                                         <div>{emp.email}</div>
//                                         <div className="text-xs text-slate-400">{emp.mobile}</div>
//                                     </td>
//                                     <td className="p-4 text-center text-sm">
//                                         {new Date(emp.joined).toLocaleDateString("en-GB")}
//                                     </td>
//                                     <td className="p-4 text-center">
//                                         <span className={`px-3 py-1 rounded-full text-xs font-bold ${emp.status === "Active"
//                                                 ? "bg-green-100 text-green-600"
//                                                 : emp.status === "Probation"
//                                                     ? "bg-blue-100 text-blue-600"
//                                                     : "bg-orange-100 text-orange-600"
//                                             }`}>
//                                             {emp.status}
//                                         </span>
//                                     </td>
//                                     <td className="p-4 text-right">
//                                         <button className="text-emerald-600 font-semibold text-sm">
//                                             View
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                     {/* Footer */}
//                     <div className="p-4 bg-slate-50 border-t flex justify-between items-center">
//                         <span className="text-sm text-slate-500">
//                             Showing {filteredEmployees.length} employees
//                         </span>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default EmployeeReport;





import React, { useState } from "react";

const EmployeeReport = () => {
    const [employees] = useState([
        { id: "000001", name: "Honorato Curry", email: "test@mail.com", mobile: "+1 873 591 1817", joined: "1986-12-07", status: "Active" },
        { id: "000002", name: "Maisha Gonzales", email: "hr@mail.com", mobile: "+1 302 141 4066", joined: "2024-04-28", status: "Active" },
        { id: "000003", name: "Arjun Mehta", email: "arjun@mail.com", mobile: "+91 98765 43210", joined: "2025-01-15", status: "Probation" },
        { id: "000004", name: "Sarah Jenkins", email: "sarah@mail.com", mobile: "+44 20 7946 0958", joined: "2023-11-20", status: "Notice" },
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.id.includes(searchTerm)
    );

    const getInitials = (name) =>
        name.split(" ").map(n => n[0]).join("").toUpperCase();

    const getStatusStyles = (status) => {
        switch (status) {
            case "Active": return "bg-emerald-50 text-emerald-600 border-emerald-100";
            case "Probation": return "bg-indigo-50 text-indigo-600 border-indigo-100";
            case "Notice": return "bg-rose-50 text-rose-600 border-rose-100";
            default: return "bg-slate-50 text-slate-600 border-slate-100";
        }
    };

    return (
        <div className="animate-in fade-in duration-500">
            <div className="bg-white shadow-sm rounded-[32px] border border-slate-100 overflow-hidden">

                {/* --- HEADER SECTION --- */}
                <div className="p-8 border-b border-slate-50 bg-slate-50/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Employee Directory</h2>
                        <p className="text-slate-500 text-sm font-medium mt-1">Manage and monitor your global workforce.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by name or ID..."
                                className="w-full sm:w-72 bg-white border border-slate-200 rounded-2xl py-3 px-5 text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="bg-slate-900 text-white font-black rounded-2xl px-6 py-3 text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
                            Search
                        </button>
                    </div>
                </div>

                <div className="p-2 md:p-8">
                    {/* --- TABLE CONTAINER --- */}
                    <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm">

                        {/* 💻 DESKTOP TABLE */}
                        <div className="hidden md:block">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 border-b border-slate-50">
                                    <tr>
                                        {["Employee", "Contact Details", "Joining Date", "Status", "Action"].map((h) => (
                                            <th key={h} className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredEmployees.map((emp) => (
                                        <tr key={emp.id} className="hover:bg-indigo-50/30 transition-colors group">
                                            <td className="p-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-indigo-100">
                                                        {getInitials(emp.name)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{emp.name}</div>
                                                        <div className="text-[10px] font-black text-slate-400 font-mono uppercase tracking-tighter">ID: {emp.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="text-sm font-bold text-slate-600">{emp.email}</div>
                                                <div className="text-[11px] font-medium text-slate-400 mt-0.5">{emp.mobile}</div>
                                            </td>
                                            <td className="p-5">
                                                <span className="text-sm font-bold text-slate-500 font-mono">
                                                    {new Date(emp.joined).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-widest ${getStatusStyles(emp.status)}`}>
                                                    {emp.status}
                                                </span>
                                            </td>
                                            <td className="p-5 text-right">
                                                <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-4 py-2 rounded-xl transition-all">
                                                    View File
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 📱 MOBILE CARDS */}
                        <div className="md:hidden divide-y divide-slate-50">
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((emp) => (
                                    <div key={emp.id} className="p-6 bg-white space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs">
                                                    {getInitials(emp.name)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800">{emp.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-mono font-bold uppercase">#{emp.id}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-widest ${getStatusStyles(emp.status)}`}>
                                                {emp.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl">
                                            <div>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Joined</p>
                                                <p className="text-xs font-bold text-slate-700">{new Date(emp.joined).toLocaleDateString("en-GB")}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Contact</p>
                                                <p className="text-xs font-bold text-slate-700 truncate">{emp.email}</p>
                                            </div>
                                        </div>

                                        <button className="w-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] py-4 rounded-2xl">
                                            View Employee Profile
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="p-10 text-center text-slate-400 font-bold text-sm">No employees found.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- FOOTER --- */}
                <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex justify-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Total Staff Strength: {filteredEmployees.length}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeReport;