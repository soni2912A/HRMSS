// import React, { useState } from "react";
// import LatenessClosing from "./LatenessClosing";
// import AttendanceLog from "./AttendanceLog";
// import DailyPresent from "./DailyPresent";
// import MonthlyReport from "./MontlyReport";
// import LeaveReport from "./LeaveReport";

// const AttendanceReport = () => {
//     const [activeTab, setActiveTab] = useState("Attendance report");

//     const tabs = [
//         "Attendance report",
//         "Lateness closing",
//         "Attendance log",
//         "Daily present",
//         "Monthly",
//         "Leave report"
//     ];

//     const attendanceData = [
//         { name: "Rahul Sharma", present: 22, absent: 2, late: 1 },
//         { name: "Amit Joshi", present: 20, absent: 3, late: 2 },
//         { name: "Sneha Patil", present: 23, absent: 1, late: 0 },
//     ];

//     const renderPage = () => {
//         switch (activeTab) {
//             case "Attendance report":
//                 return (
//                     <div className="space-y-6">

//                         {/* Summary Cards */}
//                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
//                                 <p className="text-slate-400 text-xs font-bold uppercase">Total Employees</p>
//                                 <h3 className="text-3xl font-black text-slate-800 mt-1">03</h3>
//                             </div>

//                             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
//                                 <p className="text-emerald-500 text-xs font-bold uppercase">Total Present</p>
//                                 <h3 className="text-3xl font-black text-emerald-600 mt-1">65</h3>
//                             </div>

//                             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
//                                 <p className="text-rose-500 text-xs font-bold uppercase">Total Absent</p>
//                                 <h3 className="text-3xl font-black text-rose-600 mt-1">06</h3>
//                             </div>
//                         </div>

//                         {/* MOBILE VIEW (Stacked Cards) */}
//                         <div className="md:hidden space-y-4">
//                             {attendanceData.map((emp, index) => (
//                                 <div
//                                     key={index}
//                                     className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
//                                 >
//                                     <p className="font-bold text-slate-800 mb-3">{emp.name}</p>

//                                     <div className="space-y-2 text-sm">
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-500">Present</span>
//                                             <span className="font-bold text-emerald-600">{emp.present}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-500">Absent</span>
//                                             <span className="font-bold text-rose-500">{emp.absent}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-500">Late</span>
//                                             <span className="font-bold text-amber-500">{emp.late}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* DESKTOP TABLE */}
//                         <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//                             <div className="p-5 border-b border-slate-50 bg-slate-50/50">
//                                 <h3 className="font-bold text-slate-700">Staff Attendance Breakdown</h3>
//                             </div>

//                             <table className="w-full text-left border-collapse">
//                                 <thead>
//                                     <tr>
//                                         <th className="p-4 text-xs font-black text-slate-400 uppercase">Employee</th>
//                                         <th className="p-4 text-xs font-black text-slate-400 uppercase text-center">Present</th>
//                                         <th className="p-4 text-xs font-black text-slate-400 uppercase text-center">Absent</th>
//                                         <th className="p-4 text-xs font-black text-slate-400 uppercase text-center">Late</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-slate-50">
//                                     {attendanceData.map((emp, index) => (
//                                         <tr key={index} className="hover:bg-slate-50">
//                                             <td className="p-4 font-bold text-slate-700">{emp.name}</td>
//                                             <td className="p-4 text-center font-bold text-emerald-600">{emp.present}</td>
//                                             <td className="p-4 text-center font-bold text-rose-500">{emp.absent}</td>
//                                             <td className="p-4 text-center font-bold text-amber-500">{emp.late}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 );

//             case "Lateness closing": return <LatenessClosing />;
//             case "Attendance log": return <AttendanceLog />;
//             case "Daily present": return <DailyPresent />;
//             case "Monthly": return <MonthlyReport />;
//             case "Leave report": return <LeaveReport />;
//             default: return null;
//         }
//     };

//     return (
//         <div className="p-4 md:p-10 bg-[#f8fafc] min-h-screen">

//             {/* Header */}
//             <div className="mb-8">
//                 <h1 className="text-2xl md:text-3xl font-black text-slate-800">
//                     Reports Dashboard
//                 </h1>
//                 <p className="text-slate-500 text-sm mt-1">
//                     Overview and management of all attendance metrics
//                 </p>
//             </div>

//             {/* Tabs */}
//             <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-2">
//                 {tabs.map((tab) => (
//                     <button
//                         key={tab}
//                         onClick={() => setActiveTab(tab)}
//                         className={`px-4 py-2 text-xs md:text-sm font-bold rounded-lg transition
//                             ${activeTab === tab
//                                 ? "bg-emerald-600 text-white"
//                                 : "bg-white text-slate-600 border border-slate-200"
//                             }`}
//                     >
//                         {tab}
//                     </button>
//                 ))}
//             </div>

//             {/* Content */}
//             <div className="max-w-7xl mx-auto">
//                 {renderPage()}
//             </div>
//         </div>
//     );
// };

// export default AttendanceReport;




import React, { useState } from "react";
import LatenessClosing from "./LatenessClosing";
import AttendanceLog from "./AttendanceLog";
import DailyPresent from "./DailyPresent";
import MonthlyReport from "./MontlyReport";
import LeaveReport from "./LeaveReport";

const AttendanceReport = () => {
    const [activeTab, setActiveTab] = useState("Attendance report");

    const tabs = ["Attendance report", "Lateness closing", "Attendance log", "Daily present", "Monthly", "Leave report"];

    const attendanceData = [
        { name: "Rahul Sharma", present: 22, absent: 2, late: 1 },
        { name: "Amit Joshi", present: 20, absent: 3, late: 2 },
        { name: "Sneha Patil", present: 23, absent: 1, late: 0 },
    ];

    const renderPage = () => {
        switch (activeTab) {
            case "Attendance report":
                return (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        {/* Summary Cards with better styling */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <SummaryCard title="Total Employees" value="03" sub="Active Staff" color="border-indigo-500" textColor="text-indigo-600" />
                            <SummaryCard title="Total Present" value="65" sub="This Month" color="border-emerald-500" textColor="text-emerald-600" />
                            <SummaryCard title="Total Absent" value="06" sub="Pending Review" color="border-rose-500" textColor="text-rose-600" />
                        </div>

                        {/* DESKTOP & MOBILE WRAPPER */}
                        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                                <h3 className="font-black text-slate-800 tracking-tight uppercase text-sm">Staff Breakdown</h3>
                                <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Export All</button>
                            </div>

                            {/* MOBILE VIEW */}
                            <div className="md:hidden divide-y divide-slate-50">
                                {attendanceData.map((emp, index) => (
                                    <div key={index} className="p-6 hover:bg-slate-50 transition-colors">
                                        <p className="font-black text-slate-800 text-lg mb-4">{emp.name}</p>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="bg-emerald-50 p-3 rounded-2xl text-center">
                                                <p className="text-[10px] font-bold text-emerald-600 uppercase">Pres.</p>
                                                <p className="font-black text-emerald-700">{emp.present}</p>
                                            </div>
                                            <div className="bg-rose-50 p-3 rounded-2xl text-center">
                                                <p className="text-[10px] font-bold text-rose-600 uppercase">Abs.</p>
                                                <p className="font-black text-rose-700">{emp.absent}</p>
                                            </div>
                                            <div className="bg-amber-50 p-3 rounded-2xl text-center">
                                                <p className="text-[10px] font-bold text-amber-600 uppercase">Late</p>
                                                <p className="font-black text-amber-700">{emp.late}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* DESKTOP TABLE */}
                            <div className="hidden md:block">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50/50">
                                        <tr>
                                            <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee</th>
                                            <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Present</th>
                                            <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Absent</th>
                                            <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Late</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {attendanceData.map((emp, index) => (
                                            <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="p-5 font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{emp.name}</td>
                                                <td className="p-5 text-center"><span className="bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full font-black text-xs">{emp.present}</span></td>
                                                <td className="p-5 text-center"><span className="bg-rose-50 text-rose-600 px-4 py-1 rounded-full font-black text-xs">{emp.absent}</span></td>
                                                <td className="p-5 text-center"><span className="bg-amber-50 text-amber-600 px-4 py-1 rounded-full font-black text-xs">{emp.late}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            case "Lateness closing": return <LatenessClosing />;
            case "Attendance log": return <AttendanceLog />;
            case "Daily present": return <DailyPresent />;
            case "Monthly": return <MonthlyReport />;
            case "Leave report": return <LeaveReport />;
            default: return null;
        }
    };

    return (
        <div className="p-4 md:p-10 bg-[#f8fafc] min-h-screen font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Reports Dashboard</h1>
                    <p className="text-slate-500 text-sm mt-2 font-medium">Manage and track your organization's attendance pulse.</p>
                </div>

                {/* Modern Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`whitespace-nowrap px-6 py-3 text-xs font-black uppercase tracking-widest rounded-2xl transition-all duration-300
                                ${activeTab === tab ? "bg-slate-900 text-white shadow-lg shadow-slate-200 scale-105" : "bg-white text-slate-400 border border-slate-100 hover:border-slate-300"}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div>{renderPage()}</div>
            </div>
        </div>
    );
};

const SummaryCard = ({ title, value, sub, color, textColor }) => (
    <div className={`bg-white p-6 rounded-[32px] shadow-sm border-l-8 ${color} border-t border-r border-b border-slate-100 hover:shadow-md transition-shadow`}>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{title}</p>
        <h3 className={`text-4xl font-black ${textColor} mt-2`}>{value}</h3>
        <p className="text-slate-400 text-[10px] mt-1 font-bold">{sub}</p>
    </div>
);

export default AttendanceReport;