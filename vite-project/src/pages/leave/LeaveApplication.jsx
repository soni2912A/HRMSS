// import { Pencil, Trash2, Plus, Search, Calendar, ChevronLeft, ChevronRight, X, Clock } from "lucide-react";
// import { useState } from "react";

// const LeaveApplication = () => {
//   const [data, setData] = useState([
//     { id: 1, employee: "Amy Peck", type: "Annual Leave", applyDate: "2026-02-15", startDate: "2026-02-16", endDate: "2026-02-18", days: 3, reason: "Personal", status: "Approved" },
//     { id: 2, employee: "Maisha Gonzales", type: "Medical Leave", applyDate: "2026-02-14", startDate: "2026-02-14", endDate: "2026-02-14", days: 1, reason: "Sick", status: "Pending" },
//   ]);

//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const emptyForm = { employee: "", type: "", applyDate: "", startDate: "", endDate: "", days: "", reason: "", status: "Pending" };
//   const [form, setForm] = useState(emptyForm);

//   const filtered = data.filter((item) => item.employee.toLowerCase().includes(search.toLowerCase()));
//   const totalPages = Math.ceil(filtered.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

//   const handleSubmit = () => {
//     if (editId) {
//       setData(data.map((item) => item.id === editId ? { ...form, id: editId } : item));
//     } else {
//       setData([{ ...form, id: Date.now() }, ...data]);
//     }
//     setForm(emptyForm); setEditId(null); setShowForm(false);
//   };

//   const handleEdit = (item) => {
//     setForm(item); setEditId(item.id); setShowForm(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Delete this leave application?")) {
//       setData(data.filter((item) => item.id !== id));
//     }
//   };

//   return (
//     <div className="bg-[#f8fafc] min-h-screen p-4 md:p-8 pt-24 font-sans">
//       <div className="max-w-6xl mx-auto">

//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//           <div>
//             <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
//               <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600"><Clock size={24} /></div>
//               Leave Requests
//             </h1>
//             <p className="text-slate-500 text-sm font-medium mt-1">Manage and track employee absences</p>
//           </div>
//           <button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }} className="w-full md:w-auto bg-[#0a4d44] hover:bg-slate-800 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg font-bold">
//             <Plus size={18} /> Apply Leave
//           </button>
//         </div>

//         <div className="relative w-full max-w-sm ml-auto mb-6">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//           <input placeholder="Search employee..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="w-full bg-white border border-slate-100 pl-12 pr-4 py-3 rounded-2xl text-sm shadow-sm outline-none focus:ring-4 ring-indigo-50 transition-all" />
//         </div>

//         <div className="hidden md:block bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-black uppercase text-slate-400">
//                 <th className="px-6 py-5">Employee</th>
//                 <th className="px-6 py-5">Leave Type</th>
//                 <th className="px-6 py-5">Duration</th>
//                 <th className="px-6 py-5 text-center">Days</th>
//                 <th className="px-6 py-5">Status</th>
//                 <th className="px-6 py-5 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {paginatedData.map((item) => (
//                 <tr key={item.id} className="group hover:bg-slate-50/50 transition-all">
//                   <td className="px-6 py-5 font-bold text-slate-700">{item.employee}</td>
//                   <td className="px-6 py-5 text-sm text-slate-500">{item.type}</td>
//                   <td className="px-6 py-5">
//                     <div className="text-[11px] font-bold text-slate-600 flex items-center gap-2 uppercase tracking-tight">
//                       {item.startDate} <span className="text-slate-300">→</span> {item.endDate}
//                     </div>
//                   </td>
//                   <td className="px-6 py-5 text-center">
//                     <span className="bg-slate-100 px-3 py-1 rounded-lg text-xs font-black text-slate-600">{item.days}</span>
//                   </td>
//                   <td className="px-6 py-5">
//                     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${item.status === "Approved" ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-600"
//                       }`}>
//                       {item.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-5 text-right">
//                     <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <button onClick={() => handleEdit(item)} className="p-2 bg-white border border-slate-100 text-indigo-600 rounded-xl hover:border-indigo-200 shadow-sm"><Pencil size={16} /></button>
//                       <button onClick={() => handleDelete(item.id)} className="p-2 bg-white border border-slate-100 text-red-500 rounded-xl hover:border-red-200 shadow-sm"><Trash2 size={16} /></button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="md:hidden space-y-4">
//           {paginatedData.map((item) => (
//             <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
//               <div className="flex justify-between items-start mb-4">
//                 <h3 className="font-bold text-slate-800">{item.employee}</h3>
//                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.status === "Approved" ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-600"
//                   }`}>{item.status}</span>
//               </div>
//               <div className="text-xs font-medium text-slate-500 mb-4 space-y-1">
//                 <p>Type: <span className="text-slate-800">{item.type}</span></p>
//                 <p>Dates: <span className="text-slate-800">{item.startDate} to {item.endDate}</span></p>
//                 <p>Reason: <span className="text-slate-800 italic">"{item.reason}"</span></p>
//               </div>
//               <div className="flex gap-2">
//                 <button onClick={() => handleEdit(item)} className="flex-1 bg-slate-50 text-indigo-600 font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2">Edit</button>
//                 <button onClick={() => handleDelete(item.id)} className="flex-1 bg-red-50 text-red-500 font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2">Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-center gap-2 mt-8">
//           <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl disabled:opacity-30"><ChevronLeft size={20} /></button>
//           {[...Array(totalPages)].map((_, i) => (
//             <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${currentPage === i + 1 ? "bg-indigo-600 text-white shadow-lg" : "bg-white text-slate-400 hover:text-indigo-600"}`}>{i + 1}</button>
//           ))}
//           <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl disabled:opacity-30"><ChevronRight size={20} /></button>
//         </div>

//         {showForm && (
//           <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex justify-center items-center p-4">
//             <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
//               <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
//                 <h2 className="font-black text-slate-800 tracking-tight">{editId ? "Edit Application" : "New Leave Application"}</h2>
//                 <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-red-500"><X size={24} /></button>
//               </div>
//               <div className="p-8 space-y-4 max-h-[70vh] overflow-y-auto">
//                 {Object.keys(emptyForm).map((key) => (
//                   <div key={key} className="space-y-1">
//                     <label className="text-[10px] font-black uppercase text-slate-400 ml-1">{key}</label>
//                     <input placeholder={`Enter ${key}...`} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl text-sm outline-none focus:ring-4 ring-indigo-50 transition-all" />
//                   </div>
//                 ))}
//               </div>
//               <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex gap-3">
//                 <button onClick={() => setShowForm(false)} className="flex-1 py-4 font-bold text-slate-400">Cancel</button>
//                 <button onClick={handleSubmit} className="flex-[2] bg-[#0a4d44] text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-900/10">Submit Application</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LeaveApplication;




import { Pencil, Trash2, Plus, Search, X, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { leaveAPI } from "../../services/api";

const LeaveApplication = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyForm = { employeeName: "", type: "Annual Leave", startDate: "", endDate: "", days: "", reason: "", status: "Pending" };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { fetchLeaves(); }, []);

  const fetchLeaves = async () => {
    try {
      const res = await leaveAPI.getAll();
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = data.filter(item =>
    (item.employeeName || item.employee?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async () => {
    try {
      if (editId) {
        const res = await leaveAPI.update(editId, form);
        setData(data.map(item => item._id === editId ? res.data : item));
      } else {
        const res = await leaveAPI.create(form);
        setData([res.data, ...data]);
      }
      setForm(emptyForm); setEditId(null); setShowForm(false);
    } catch (err) { alert(err.message); }
  };

  const handleEdit = (item) => {
    setForm({
      employeeName: item.employeeName || item.employee?.name || "",
      type: item.type, startDate: item.startDate?.slice(0,10),
      endDate: item.endDate?.slice(0,10), days: item.days,
      reason: item.reason, status: item.status,
    });
    setEditId(item._id); setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this leave application?")) return;
    try {
      await leaveAPI.delete(id);
      setData(data.filter(item => item._id !== id));
    } catch (err) { alert(err.message); }
  };

  // Quick approve/reject
  const handleStatus = async (id, status) => {
    try {
      const res = await leaveAPI.update(id, { status });
      setData(data.map(item => item._id === id ? res.data : item));
    } catch (err) { alert(err.message); }
  };

  const statusCount = (s) => data.filter(d => d.status === s).length;

  return (
    <div className="bg-[#f8fafc] min-h-screen p-4 md:p-8 pt-24 font-sans">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600"><Clock size={24} /></div>
              Leave Requests
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Manage and approve employee leaves</p>
          </div>
          <button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}
            className="w-full md:w-auto bg-[#0a4d44] hover:bg-slate-800 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg font-bold">
            <Plus size={18} /> Add Leave
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Pending", count: statusCount("Pending"), color: "bg-orange-50 text-orange-600 border-orange-100" },
            { label: "Approved", count: statusCount("Approved"), color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
            { label: "Rejected", count: statusCount("Rejected"), color: "bg-red-50 text-red-600 border-red-100" },
          ].map(s => (
            <div key={s.label} className={`${s.color} border rounded-2xl p-4 text-center`}>
              <p className="text-2xl font-black">{s.count}</p>
              <p className="text-xs font-bold uppercase tracking-widest mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="relative w-full max-w-sm mb-6">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by employee name..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-100 bg-white text-sm focus:outline-none focus:ring-2 ring-indigo-100 shadow-sm" />
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-500" size={36} /></div>
        ) : (
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                  <th className="py-4 px-6 text-left">Employee</th>
                  <th className="py-4 px-4 text-left">Type</th>
                  <th className="py-4 px-4 text-left">Duration</th>
                  <th className="py-4 px-4 text-left">Reason</th>
                  <th className="py-4 px-4 text-left">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="6" className="py-16 text-center text-slate-400 text-sm">No leave applications found</td></tr>
                ) : filtered.map(item => (
                  <tr key={item._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                    <td className="py-4 px-6 font-bold text-slate-800">
                      {item.employeeName || item.employee?.name || "—"}
                    </td>
                    <td className="py-4 px-4 text-slate-600 text-xs">{item.type}</td>
                    <td className="py-4 px-4 text-slate-500 text-xs">
                      {item.startDate?.slice(0,10)} → {item.endDate?.slice(0,10)}
                      {item.days && <span className="ml-1 text-slate-400">({item.days}d)</span>}
                    </td>
                    <td className="py-4 px-4 text-slate-500 text-xs max-w-[150px] truncate">{item.reason}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase ${
                        item.status === "Approved" ? "bg-emerald-100 text-emerald-700" :
                        item.status === "Rejected" ? "bg-red-100 text-red-600" :
                        "bg-orange-100 text-orange-600"}`}>{item.status}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        {item.status === "Pending" && (
                          <>
                            <button onClick={() => handleStatus(item._id, "Approved")}
                              title="Approve"
                              className="p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition">
                              <CheckCircle size={15} />
                            </button>
                            <button onClick={() => handleStatus(item._id, "Rejected")}
                              title="Reject"
                              className="p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition">
                              <XCircle size={15} />
                            </button>
                          </>
                        )}
                        <button onClick={() => handleEdit(item)} className="p-1.5 hover:bg-slate-100 rounded-lg transition">
                          <Pencil size={14} className="text-slate-500" />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="p-1.5 hover:bg-red-50 rounded-lg transition">
                          <Trash2 size={14} className="text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold text-lg">{editId ? "Edit Leave" : "Add Leave"}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <input value={form.employeeName} onChange={e => setForm({...form, employeeName: e.target.value})}
                placeholder="Employee Name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ring-indigo-200" />
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ring-indigo-200">
                <option>Annual Leave</option><option>Medical Leave</option><option>Casual Leave</option><option>Unpaid Leave</option>
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})}
                  className="border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 ring-indigo-200" />
                <input type="date" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})}
                  className="border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 ring-indigo-200" />
              </div>
              <input value={form.reason} onChange={e => setForm({...form, reason: e.target.value})}
                placeholder="Reason" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ring-indigo-200" />
              {editId && (
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ring-indigo-200">
                  <option>Pending</option><option>Approved</option><option>Rejected</option>
                </select>
              )}
              <div className="flex gap-3">
                <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button onClick={handleSubmit} className="flex-1 bg-[#0a4d44] text-white py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition">
                  {editId ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveApplication;
