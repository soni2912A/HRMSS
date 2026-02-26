// import React, { useState } from "react";

// const LatenessClosing = () => {
//     const [latenessData] = useState([
//         { id: 1, name: "Rahul Sharma", date: "2026-02-19", delay: "45 mins", policy: "Grace 15m", status: "Fine Applied" },
//         { id: 2, name: "Sonia Verma", date: "2026-02-18", delay: "10 mins", policy: "Grace 15m", status: "Under Grace" },
//         { id: 3, name: "Amit Patel", date: "2026-02-17", delay: "120 mins", policy: "Half Day", status: "Closed" },
//     ]);

//     const getStatusStyle = (status) => {
//         switch (status) {
//             case "Fine Applied": return "bg-red-100 text-red-700 border-red-200";
//             case "Under Grace": return "bg-blue-100 text-blue-700 border-blue-200";
//             case "Closed": return "bg-emerald-100 text-emerald-700 border-emerald-200";
//             default: return "bg-slate-100 text-slate-700";
//         }
//     };

//     return (
//         <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

//             {/* Header */}
//             <div className="p-5 md:p-8 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-gradient-to-br from-white to-slate-50">
//                 <div>
//                     <h2 className="text-xl md:text-2xl font-black text-slate-800">Lateness Closing</h2>
//                     <p className="text-sm text-slate-500">Review and reconcile late arrival records</p>
//                 </div>
//             </div>

//             {/* ================= MOBILE VIEW ================= */}
//             <div className="block md:hidden p-4 space-y-4">
//                 {latenessData.map((item) => (
//                     <div key={item.id} className="border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">

//                         <div>
//                             <p className="text-sm font-bold text-slate-800">{item.name}</p>
//                             <p className="text-xs text-slate-400">ID: EMP-00{item.id}</p>
//                         </div>

//                         <div className="flex justify-between text-sm">
//                             <span className="text-slate-500">Date:</span>
//                             <span className="font-medium">{item.date}</span>
//                         </div>

//                         <div className="flex justify-between text-sm">
//                             <span className="text-slate-500">Delay:</span>
//                             <span className="font-bold text-red-600">{item.delay}</span>
//                         </div>

//                         <div className="flex justify-between text-sm">
//                             <span className="text-slate-500">Policy:</span>
//                             <span className="text-xs bg-slate-100 px-2 py-1 rounded">
//                                 {item.policy}
//                             </span>
//                         </div>

//                         <div className="flex justify-between items-center">
//                             <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getStatusStyle(item.status)}`}>
//                                 {item.status}
//                             </span>

//                             <button className="text-xs font-bold text-indigo-600 underline">
//                                 Reconcile
//                             </button>
//                         </div>

//                     </div>
//                 ))}
//             </div>

//             {/* ================= DESKTOP TABLE ================= */}
//             <div className="hidden md:block">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="text-xs font-bold text-slate-400 uppercase text-left bg-slate-50">
//                             <th className="p-5">Employee</th>
//                             <th className="p-5">Late Date</th>
//                             <th className="p-5">Delay Time</th>
//                             <th className="p-5">Policy</th>
//                             <th className="p-5">Status</th>
//                             <th className="p-5 text-right">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-100">
//                         {latenessData.map((item) => (
//                             <tr key={item.id} className="hover:bg-slate-50 transition">
//                                 <td className="p-5">
//                                     <div>
//                                         <p className="text-sm font-bold">{item.name}</p>
//                                         <p className="text-xs text-slate-400">EMP-00{item.id}</p>
//                                     </div>
//                                 </td>
//                                 <td className="p-5 text-sm">{item.date}</td>
//                                 <td className="p-5 text-sm font-bold text-red-600">{item.delay}</td>
//                                 <td className="p-5">
//                                     <span className="text-xs bg-slate-100 px-2 py-1 rounded">
//                                         {item.policy}
//                                     </span>
//                                 </td>
//                                 <td className="p-5">
//                                     <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getStatusStyle(item.status)}`}>
//                                         {item.status}
//                                     </span>
//                                 </td>
//                                 <td className="p-5 text-right">
//                                     <button className="text-xs font-bold text-indigo-600 underline">
//                                         Reconcile
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     );
// };

// export default LatenessClosing;


import React, { useState } from "react";

const LatenessClosing = () => {
    const [latenessData] = useState([
        { id: 1, name: "Rahul Sharma", date: "2026-02-19", delay: "45 mins", policy: "Grace 15m", status: "Fine Applied" },
        { id: 2, name: "Sonia Verma", date: "2026-02-18", delay: "10 mins", policy: "Grace 15m", status: "Under Grace" },
        { id: 3, name: "Amit Patel", date: "2026-02-17", delay: "120 mins", policy: "Half Day", status: "Closed" },
    ]);

    const getStatusStyle = (status) => {
        switch (status) {
            case "Fine Applied": return "bg-rose-50 text-rose-600 border-rose-100";
            case "Under Grace": return "bg-indigo-50 text-indigo-600 border-indigo-100";
            case "Closed": return "bg-emerald-50 text-emerald-600 border-emerald-100";
            default: return "bg-slate-50 text-slate-600";
        }
    };

    return (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">

                {/* Header */}
                <div className="p-8 border-b border-slate-50 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-slate-50/30">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center">
                            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Lateness Closing</h2>
                            <p className="text-slate-500 text-sm font-medium">Reconcile delay records and apply penalty policies.</p>
                        </div>
                    </div>
                    <button className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
                        Process All Fines
                    </button>
                </div>

                {/* Table Section */}
                <div className="p-4 md:p-8">
                    <div className="border border-slate-100 rounded-[32px] overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 border-b border-slate-50">
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="p-5">Employee</th>
                                    <th className="p-5 text-center">Delay Details</th>
                                    <th className="p-5">Policy Applied</th>
                                    <th className="p-5">Status</th>
                                    <th className="p-5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {latenessData.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-5">
                                            <div className="font-bold text-slate-700">{item.name}</div>
                                            <div className="text-[10px] font-black text-slate-300 font-mono">EMP-00{item.id}</div>
                                        </td>
                                        <td className="p-5 text-center">
                                            <div className="text-xs font-black text-slate-400 uppercase mb-1">{item.date}</div>
                                            <div className="text-sm font-black text-rose-600 bg-rose-50 inline-block px-3 py-1 rounded-lg">+{item.delay}</div>
                                        </td>
                                        <td className="p-5">
                                            <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl uppercase tracking-tighter">
                                                {item.policy}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-widest ${getStatusStyle(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-5 text-right">
                                            <button className="bg-white border-2 border-slate-100 hover:border-indigo-600 text-indigo-600 font-black text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all active:scale-95">
                                                Reconcile
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Info Bar */}
                <div className="bg-indigo-600 p-4 text-center">
                    <p className="text-[10px] font-black text-indigo-100 uppercase tracking-[0.3em]">
                        Auto-Closing cycles run every 24 hours
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LatenessClosing;
