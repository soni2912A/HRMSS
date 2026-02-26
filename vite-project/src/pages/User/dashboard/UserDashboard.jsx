

// import { useState, useEffect } from "react";
// import { Clock, Calendar, Briefcase, CheckCircle, AlertCircle } from "lucide-react";

// const UserDashboard = () => {
//   const [punchIn, setPunchIn] = useState(localStorage.getItem("punchIn") || "");
//   const [punchOut, setPunchOut] = useState(localStorage.getItem("punchOut") || "");
//   const [leaves, setLeaves] = useState(JSON.parse(localStorage.getItem("leaves")) || []);
//   const [projects, setProjects] = useState(JSON.parse(localStorage.getItem("projects")) || []);

//   const [leaveForm, setLeaveForm] = useState({ from: "", to: "", type: "Casual Leave", reason: "" });
//   const [projectForm, setProjectForm] = useState({ name: "", status: "In Progress", update: "" });

//   const handlePunchIn = () => {
//     const time = new Date().toLocaleTimeString();
//     setPunchIn(time);
//     setPunchOut("");
//     localStorage.setItem("punchIn", time);
//     localStorage.removeItem("punchOut");
//   };

//   const handlePunchOut = () => {
//     const time = new Date().toLocaleTimeString();
//     setPunchOut(time);
//     localStorage.setItem("punchOut", time);
//   };

//   const applyLeave = () => {
//     if (!leaveForm.from || !leaveForm.to) return alert("Please select dates");
//     const updated = [...leaves, { ...leaveForm, status: "Pending", id: Date.now() }];
//     setLeaves(updated);
//     localStorage.setItem("leaves", JSON.stringify(updated));
//     setLeaveForm({ from: "", to: "", type: "Casual Leave", reason: "" });
//   };

//   const updateProject = () => {
//     if (!projectForm.name) return alert("Please enter project name");
//     const updated = [...projects, { ...projectForm, id: Date.now() }];
//     setProjects(updated);
//     localStorage.setItem("projects", JSON.stringify(updated));
//     setProjectForm({ name: "", status: "In Progress", update: "" });
//   };

//   return (
//     <div className="min-h-screen w-full bg-[#f8fafa] p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden">
//       <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

//         <div className="flex flex-col gap-1">
//           <h1 className="text-2xl sm:text-3xl font-black text-[#0f2e2e] tracking-tight">User Dashboard</h1>
//           <p className="text-gray-500 text-xs sm:text-sm font-medium">Welcome back! Here's your workspace overview.</p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           <SummaryCard
//             title="Attendance Status"
//             value={punchIn ? "Present" : "Not Marked"}
//             subText={punchIn ? `Punch In: ${punchIn}` : "Waiting for entry"}
//             icon={<CheckCircle className={punchIn ? "text-emerald-500" : "text-gray-300"} size={20} />}
//           />
//           <SummaryCard
//             title="Leave Requests"
//             value={leaves.length}
//             subText="Pending for approval"
//             icon={<Calendar className="text-blue-500" size={20} />}
//           />
//           <SummaryCard
//             title="Project Tasks"
//             value={projects.length}
//             subText="Active contributions"
//             icon={<Briefcase className="text-purple-500" size={20} />}
//           />
//         </div>

//         <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start">

//           <div className="w-full lg:col-span-4 flex flex-col gap-6">
//             <Section title="Daily Punch" icon={<Clock size={18} />}>
//               <div className="space-y-4 mt-4">
//                 <div className="grid grid-cols-2 gap-3">
//                   <button
//                     onClick={handlePunchIn}
//                     className="bg-[#0f2e2e] text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-md"
//                   >
//                     In
//                   </button>
//                   <button
//                     onClick={handlePunchOut}
//                     disabled={!punchIn}
//                     className={`py-3 rounded-2xl font-bold text-xs uppercase tracking-widest border-2 transition-all active:scale-95 ${punchIn ? 'border-[#0f2e2e] text-[#0f2e2e]' : 'border-gray-200 text-gray-300 cursor-not-allowed'}`}
//                   >
//                     Out
//                   </button>
//                 </div>

//                 <div className="bg-gray-50 rounded-2xl p-4 border border-dashed border-gray-200 space-y-3">
//                   <div className="flex justify-between items-center">
//                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Punch In Time</span>
//                     <span className="text-xs font-bold text-[#0f2e2e]">{punchIn || '--:--'}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Punch Out Time</span>
//                     <span className="text-xs font-bold text-[#0f2e2e]">{punchOut || '--:--'}</span>
//                   </div>
//                 </div>
//               </div>
//             </Section>

//             <div className="w-full bg-[#0f2e2e] rounded-[32px] p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[200px] shadow-xl">
//               <div className="relative z-10">
//                 <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[3px] mb-2">Workspace</p>
//                 <h2 className="text-2xl font-bold leading-tight">Focus on your <br /> goals today.</h2>
//               </div>
//               <p className="text-[10px] text-gray-400 relative z-10">All updates are synced in real-time.</p>
//               <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-emerald-500 rounded-full blur-[60px] opacity-20"></div>
//             </div>
//           </div>

//           <div className="w-full lg:col-span-8 flex flex-col gap-6">

//             <Section title="Request Leave" icon={<Calendar size={18} />}>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
//                 <InputGroup label="From Date" type="date" value={leaveForm.from} onChange={(e) => setLeaveForm({ ...leaveForm, from: e.target.value })} />
//                 <InputGroup label="To Date" type="date" value={leaveForm.to} onChange={(e) => setLeaveForm({ ...leaveForm, to: e.target.value })} />
//                 <div className="flex flex-col gap-1.5">
//                   <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Leave Type</label>
//                   <select
//                     value={leaveForm.type}
//                     onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
//                     className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all cursor-pointer"
//                   >
//                     <option>Casual Leave</option>
//                     <option>Sick Leave</option>
//                   </select>
//                 </div>
//               </div>
//               <textarea
//                 placeholder="Briefly explain the reason for leave..."
//                 value={leaveForm.reason}
//                 onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
//                 className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm mt-4 h-24 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all resize-none"
//               />
//               <button
//                 onClick={applyLeave}
//                 className="mt-4 bg-[#0f2e2e] text-white px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-black transition-all w-full sm:w-auto self-start"
//               >
//                 Submit Request
//               </button>
//             </Section>

//             <Section title="Update Work Progress" icon={<Briefcase size={18} />}>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
//                 <InputGroup label="Project Name" placeholder="e.g. Website Redesign" value={projectForm.name} onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })} />
//                 <div className="flex flex-col gap-1.5">
//                   <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Current Status</label>
//                   <select
//                     value={projectForm.status}
//                     onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
//                     className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all cursor-pointer"
//                   >
//                     <option>In Progress</option>
//                     <option>Completed</option>
//                   </select>
//                 </div>
//               </div>
//               <textarea
//                 placeholder="What exactly have you achieved today?"
//                 value={projectForm.update}
//                 onChange={(e) => setProjectForm({ ...projectForm, update: e.target.value })}
//                 className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm mt-4 h-24 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all resize-none"
//               />
//               <button
//                 onClick={updateProject}
//                 className="mt-4 bg-[#0f2e2e] text-white px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-black transition-all w-full sm:w-auto self-start"
//               >
//                 Sync Progress
//               </button>
//             </Section>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };


// const Section = ({ title, icon, children }) => (
//   <div className="bg-white p-6 sm:p-8 rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white/50 w-full overflow-hidden">
//     <div className="flex items-center gap-3 mb-4">
//       <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">{icon}</div>
//       <h2 className="text-lg font-bold text-[#0f2e2e]">{title}</h2>
//     </div>
//     {children}
//   </div>
// );

// const SummaryCard = ({ title, value, subText, icon }) => (
//   <div className="bg-white rounded-[32px] border border-white/60 p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition-all duration-300">
//     <div className="space-y-1">
//       <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">{title}</p>
//       <h2 className="text-xl font-black text-[#0f2e2e]">{value}</h2>
//       <p className="text-[10px] font-medium text-gray-500">{subText}</p>
//     </div>
//     <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-emerald-50 transition-colors">
//       {icon}
//     </div>
//   </div>
// );

// const InputGroup = ({ label, ...props }) => (
//   <div className="flex flex-col gap-1.5 w-full">
//     <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-wider">{label}</label>
//     <input
//       {...props}
//       className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all placeholder:text-gray-300"
//     />
//   </div>
// );

// export default UserDashboard;



import { useState, useEffect } from "react";
import { Clock, Calendar, Briefcase, CheckCircle, LogIn, LogOut, Loader2 } from "lucide-react";
import { attendanceAPI, leaveAPI, projectAPI } from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();
  const [todayRecord, setTodayRecord] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [projects, setProjects] = useState([]);
  const [punchLoading, setPunchLoading] = useState(false);
  const [leaveForm, setLeaveForm] = useState({ type: "Casual Leave", startDate: "", endDate: "", reason: "" });
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const showMsg = (text, type = "success") => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "" }), 3000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [attRes, leaveRes, projRes] = await Promise.all([
        attendanceAPI.getToday(),
        leaveAPI.getAll(),
        projectAPI.getAll(),
      ]);
      setTodayRecord(attRes.data);
      setLeaves(leaveRes.data);
      setProjects(projRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePunchIn = async () => {
    setPunchLoading(true);
    try {
      const res = await attendanceAPI.punchIn();
      setTodayRecord(res.data);
      showMsg("Punched In Successfully! ✅");
    } catch (err) {
      showMsg(err.message, "error");
    } finally {
      setPunchLoading(false);
    }
  };

  const handlePunchOut = async () => {
    setPunchLoading(true);
    try {
      const res = await attendanceAPI.punchOut();
      setTodayRecord(res.data);
      showMsg("Punched Out Successfully! ✅");
    } catch (err) {
      showMsg(err.message, "error");
    } finally {
      setPunchLoading(false);
    }
  };

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await leaveAPI.create(leaveForm);
      setLeaves([res.data, ...leaves]);
      setLeaveForm({ type: "Casual Leave", startDate: "", endDate: "", reason: "" });
      setShowLeaveForm(false);
      showMsg("Leave Applied Successfully! ✅");
    } catch (err) {
      showMsg(err.message, "error");
    }
  };

  const pendingLeaves = leaves.filter(l => l.status === "Pending").length;

  return (
    <div className="min-h-screen w-full bg-[#f8fafa] p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0f2e2e]">Welcome, {user?.name || "User"} 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Here's your workspace overview</p>
        </div>

        {/* Message - only show success, not scary employee-link errors */}
        {msg.text && msg.type !== "error" && (
          <div className="px-4 py-3 rounded-xl text-sm font-semibold bg-emerald-100 text-emerald-700">
            {msg.text}
          </div>
        )}
        {msg.text && msg.type === "error" && !msg.text.includes("employee") && !msg.text.includes("profile") && (
          <div className="px-4 py-3 rounded-xl text-sm font-semibold bg-red-100 text-red-700">
            {msg.text}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Today's Status</p>
            <p className={`text-xl font-black mt-1 ${todayRecord ? "text-emerald-600" : "text-gray-400"}`}>
              {todayRecord ? (todayRecord.checkOut ? "Completed" : "Present") : "Not Marked"}
            </p>
            {todayRecord && <p className="text-xs text-gray-400 mt-1">In: {todayRecord.checkIn} {todayRecord.checkOut && `| Out: ${todayRecord.checkOut}`}</p>}
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pending Leaves</p>
            <p className="text-xl font-black mt-1 text-orange-500">{pendingLeaves}</p>
            <p className="text-xs text-gray-400 mt-1">Awaiting approval</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">My Projects</p>
            <p className="text-xl font-black mt-1 text-purple-600">{projects.length}</p>
            <p className="text-xs text-gray-400 mt-1">Active assignments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Punch In/Out Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-black text-[#0f2e2e] flex items-center gap-2 mb-4">
              <Clock size={18} className="text-emerald-600" /> Daily Attendance
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={handlePunchIn}
                disabled={punchLoading || !!todayRecord}
                className="flex flex-col items-center gap-2 py-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-700 font-bold hover:bg-emerald-100 transition disabled:opacity-40 disabled:cursor-not-allowed">
                {punchLoading ? <Loader2 size={22} className="animate-spin" /> : <LogIn size={22} />}
                <span className="text-sm">Punch In</span>
                {todayRecord?.checkIn && <span className="text-[10px] text-emerald-500">{todayRecord.checkIn}</span>}
              </button>
              <button onClick={handlePunchOut}
                disabled={punchLoading || !todayRecord || !!todayRecord?.checkOut}
                className="flex flex-col items-center gap-2 py-5 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-600 font-bold hover:bg-rose-100 transition disabled:opacity-40 disabled:cursor-not-allowed">
                {punchLoading ? <Loader2 size={22} className="animate-spin" /> : <LogOut size={22} />}
                <span className="text-sm">Punch Out</span>
                {todayRecord?.checkOut && <span className="text-[10px] text-rose-400">{todayRecord.checkOut}</span>}
              </button>
            </div>
            {!todayRecord && (
              <p className="text-center text-xs text-gray-400 mt-3">You haven't marked attendance today</p>
            )}
          </div>

          {/* Apply Leave */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-black text-[#0f2e2e] flex items-center gap-2">
                <Calendar size={18} className="text-blue-500" /> Apply Leave
              </h2>
              <button onClick={() => setShowLeaveForm(!showLeaveForm)}
                className="text-xs font-bold text-emerald-600 hover:underline">
                {showLeaveForm ? "Cancel" : "+ New Request"}
              </button>
            </div>

            {showLeaveForm ? (
              <form onSubmit={handleLeaveSubmit} className="space-y-3">
                <select value={leaveForm.type} onChange={e => setLeaveForm({ ...leaveForm, type: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ring-emerald-300">
                  <option>Casual Leave</option>
                  <option>Annual Leave</option>
                  <option>Medical Leave</option>
                  <option>Unpaid Leave</option>
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" required value={leaveForm.startDate}
                    onChange={e => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ring-emerald-300" />
                  <input type="date" required value={leaveForm.endDate}
                    onChange={e => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ring-emerald-300" />
                </div>
                <input value={leaveForm.reason} onChange={e => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  placeholder="Reason for leave" required
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ring-emerald-300" />
                <button type="submit" className="w-full bg-[#0f2e2e] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition">
                  Submit Application
                </button>
              </form>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {leaves.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">No leave applications yet</p>
                ) : leaves.slice(0, 4).map((l, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-xs font-bold text-gray-700">{l.type}</p>
                      <p className="text-[10px] text-gray-400">{l.startDate?.slice(0, 10)} → {l.endDate?.slice(0, 10)}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${l.status === "Approved" ? "bg-emerald-100 text-emerald-700" :
                        l.status === "Rejected" ? "bg-red-100 text-red-600" :
                          "bg-orange-100 text-orange-600"}`}>
                      {l.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-black text-[#0f2e2e] flex items-center gap-2 mb-4">
              <Briefcase size={18} className="text-purple-500" /> My Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.slice(0, 6).map((p, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <p className="font-bold text-sm text-[#0f2e2e]">{p.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{p.clientName || "Internal"}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${p.status === "Completed" ? "bg-emerald-100 text-emerald-700" :
                        p.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                          "bg-orange-100 text-orange-600"}`}>{p.status}</span>
                    <span className="text-xs text-gray-400">{p.progress}%</span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${p.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;