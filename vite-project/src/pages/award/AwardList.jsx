// import { useState } from "react";
// import { Plus, Pencil, Trash2, Trophy, Calendar, User, Gift, X } from "lucide-react";

// const ITEMS_PER_PAGE = 5;

// const AwardList = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [page, setPage] = useState(1);

//   const [form, setForm] = useState({
//     awardName: "",
//     description: "",
//     gift: "",
//     date: "",
//     employee: "",
//     awardBy: "",
//   });

//   const [data, setData] = useState([
//     {
//       id: 1,
//       awardName: "Employee of the month",
//       description: "Excellence in performance",
//       gift: "Smart Watch",
//       date: "2025-09-18",
//       employee: "Honorato Terry",
//       awardBy: "usamaDev",
//     },
//   ]);

//   const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
//   const paginatedData = data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

//   const openAdd = () => {
//     setEditId(null);
//     setForm({ awardName: "", description: "", gift: "", date: "", employee: "", awardBy: "" });
//     setShowForm(true);
//   };

//   const openEdit = (item) => {
//     setEditId(item.id);
//     setForm(item);
//     setShowForm(true);
//   };

//   const handleSave = () => {
//     if (!form.awardName || !form.employee) return alert("Please fill required fields");
//     if (editId) {
//       setData(data.map((d) => (d.id === editId ? form : d)));
//     } else {
//       setData([{ ...form, id: Date.now() }, ...data]);
//     }
//     setShowForm(false);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Delete this award?")) {
//       setData(data.filter((d) => d.id !== id));
//       if (paginatedData.length === 1 && page > 1) setPage(page - 1);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 pt-24">
//       <div className="max-w-7xl mx-auto">

//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
//               <Trophy className="text-emerald-600" /> Award Recognition
//             </h1>
//             <p className="text-slate-500 text-sm font-medium">Celebrate and manage employee achievements</p>
//           </div>
//           <button
//             onClick={openAdd}
//             className="bg-[#0a4d44] hover:bg-slate-800 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/10 font-bold active:scale-95"
//           >
//             <Plus size={20} /> Add New Award
//           </button>
//         </div>

//         <div className="hidden md:block bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="bg-slate-50/50 border-b border-slate-100">
//                 {["Award Details", "Gift & Date", "Recipients", "Actions"].map((h) => (
//                   <th key={h} className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {paginatedData.map((item) => (
//                 <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
//                   <td className="px-6 py-5">
//                     <p className="font-bold text-slate-800">{item.awardName}</p>
//                     <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
//                       <Gift size={14} className="text-emerald-500" /> {item.gift}
//                     </div>
//                     <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
//                       <Calendar size={12} /> {item.date}
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="flex items-center gap-2">
//                       <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
//                         {item.employee.charAt(0)}
//                       </div>
//                       <div>
//                         <p className="text-sm font-bold text-slate-700">{item.employee}</p>
//                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">By {item.awardBy}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <button onClick={() => openEdit(item)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-xl transition-colors"><Pencil size={18} /></button>
//                       <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-xl transition-colors"><Trash2 size={18} /></button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="md:hidden space-y-4">
//           {paginatedData.map((item) => (
//             <div key={item.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
//               <div className="absolute top-0 right-0 p-3 flex gap-1">
//                 <button onClick={() => openEdit(item)} className="p-2 text-blue-600 bg-blue-50 rounded-lg"><Pencil size={14} /></button>
//                 <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 bg-red-50 rounded-lg"><Trash2 size={14} /></button>
//               </div>
//               <div className="mb-4">
//                 <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Award</span>
//                 <h3 className="text-lg font-bold text-slate-800 mt-2">{item.awardName}</h3>
//                 <p className="text-sm text-slate-500">{item.description}</p>
//               </div>
//               <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
//                 <div>
//                   <p className="text-[10px] font-bold text-slate-400 uppercase">Employee</p>
//                   <p className="text-sm font-bold text-slate-700">{item.employee}</p>
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-bold text-slate-400 uppercase">Gift</p>
//                   <p className="text-sm font-bold text-slate-700">{item.gift}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {totalPages > 1 && (
//           <div className="flex justify-center items-center gap-2 mt-8">
//             <button
//               disabled={page === 1}
//               onClick={() => setPage(page - 1)}
//               className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-[#0a4d44] disabled:opacity-30 transition-colors"
//             >
//               Prev
//             </button>
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setPage(i + 1)}
//                 className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${page === i + 1 ? "bg-[#0a4d44] text-white shadow-lg shadow-emerald-900/20" : "bg-white text-slate-400 border border-slate-100"
//                   }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               disabled={page === totalPages}
//               onClick={() => setPage(page + 1)}
//               className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-[#0a4d44] disabled:opacity-30 transition-colors"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>

//       {showForm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowForm(false)} />
//           <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
//             <div className="bg-[#0a4d44] p-6 text-white flex justify-between items-center">
//               <div>
//                 <h3 className="text-xl font-bold">{editId ? "Edit Award" : "Grant New Award"}</h3>
//                 <p className="text-emerald-200 text-xs">Fill in the details for the recognition</p>
//               </div>
//               <button onClick={() => setShowForm(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"><X size={20} /></button>
//             </div>

//             <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
//               <Input label="Award Name" value={form.awardName} onChange={(v) => setForm({ ...form, awardName: v })} placeholder="e.g. Star Performer" />
//               <Input label="Gift Item" value={form.gift} onChange={(v) => setForm({ ...form, gift: v })} placeholder="e.g. Cash Prize" />
//               <Input label="Date" type="date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
//               <Input label="Employee Name" value={form.employee} onChange={(v) => setForm({ ...form, employee: v })} placeholder="Full Name" />
//               <div className="md:col-span-2">
//                 <Input label="Awarded By" value={form.awardBy} onChange={(v) => setForm({ ...form, awardBy: v })} placeholder="Manager Name" />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Award Description</label>
//                 <textarea
//                   className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-4 ring-emerald-50 outline-none min-h-[100px]"
//                   value={form.description}
//                   onChange={(e) => setForm({ ...form, description: e.target.value })}
//                   placeholder="Tell us more about this achievement..."
//                 />
//               </div>
//             </div>

//             <div className="p-6 border-t border-slate-50 flex gap-3">
//               <button onClick={() => setShowForm(false)} className="flex-1 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-colors">Cancel</button>
//               <button onClick={handleSave} className="flex-1 py-4 rounded-2xl font-bold bg-[#0a4d44] text-white shadow-lg shadow-emerald-900/10 hover:bg-slate-800 transition-all">Save Recognition</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const Input = ({ label, value, onChange, type = "text", placeholder }) => (
//   <div className="flex flex-col gap-1">
//     <label className="text-[10px] font-black uppercase text-slate-400 ml-1">{label} *</label>
//     <input
//       type={type}
//       value={value}
//       placeholder={placeholder}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-4 ring-emerald-50 outline-none transition-all placeholder:text-slate-300"
//     />
//   </div>
// );

// export default AwardList;




import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Trophy, X, Loader2, Search } from "lucide-react";
import { awardAPI, employeeAPI } from "../../services/api";

const ITEMS_PER_PAGE = 8;

const AwardList = () => {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const emptyForm = { awardName: "", description: "", awardType: "Gold", date: new Date().toISOString().slice(0, 10), employeeName: "", employee: "", giftItem: "", cashPrize: 0, awardBy: "" };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [awardRes, empRes] = await Promise.all([awardAPI.getAll(), employeeAPI.getAll()]);
      setData(awardRes.data);
      setEmployees(empRes.data.filter(e => e.status === "Active"));
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleEmpSelect = (e) => {
    const emp = employees.find(emp => emp._id === e.target.value);
    setForm({ ...form, employee: emp?._id || "", employeeName: emp?.name || "" });
  };

  const handleSave = async () => {
    if (!form.awardName || !form.employeeName) return alert("Award name and employee are required");
    try {
      if (editId) {
        const res = await awardAPI.update(editId, form);
        setData(data.map(d => d._id === editId ? res.data : d));
      } else {
        const res = await awardAPI.create(form);
        setData([res.data, ...data]);
      }
      setForm(emptyForm); setShowForm(false); setEditId(null);
    } catch (err) { alert(err.message); }
  };

  const handleEdit = (item) => {
    setForm({
      awardName: item.awardName, description: item.description || "",
      awardType: item.awardType || "Gold",
      date: item.date?.slice(0, 10) || new Date().toISOString().slice(0, 10),
      employeeName: item.employeeName, employee: item.employee?._id || item.employee || "",
      giftItem: item.giftItem || "", cashPrize: item.cashPrize || 0, awardBy: item.awardBy || "",
    });
    setEditId(item._id); setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this award?")) return;
    try {
      await awardAPI.delete(id);
      setData(data.filter(d => d._id !== id));
    } catch (err) { alert(err.message); }
  };

  const filtered = data.filter(d =>
    d.awardName?.toLowerCase().includes(search.toLowerCase()) ||
    d.employeeName?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const typeColor = (t) => ({
    Gold: "bg-amber-100 text-amber-700", Silver: "bg-slate-100 text-slate-600",
    Bronze: "bg-orange-100 text-orange-700",
  }[t] || "bg-emerald-100 text-emerald-700");

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 pt-24">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
              <Trophy className="text-emerald-600" /> Award Recognition
            </h1>
            <p className="text-slate-500 text-sm">Award will appear in employee's Achievements page</p>
          </div>
          <button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}
            className="bg-[#0a4d44] hover:bg-slate-800 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg transition">
            <Plus size={20} /> Give Award
          </button>
        </div>

        <div className="relative max-w-sm mb-6">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search award or employee..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 ring-emerald-200 shadow-sm" />
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-600" size={36} /></div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                  <th className="py-4 px-5 text-left">Employee</th>
                  <th className="py-4 px-4 text-left">Award</th>
                  <th className="py-4 px-4 text-left">Type</th>
                  <th className="py-4 px-4 text-left">Cash Prize</th>
                  <th className="py-4 px-4 text-left">Date</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan="6" className="py-16 text-center text-slate-400 text-sm">No awards found</td></tr>
                ) : paginated.map(item => (
                  <tr key={item._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-black text-sm">
                          {(item.employeeName || "?").charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{item.employeeName}</p>
                          {item.employee?.employeeId && <p className="text-[10px] text-slate-400">{item.employee.employeeId}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-slate-800">{item.awardName}</p>
                      {item.description && <p className="text-xs text-slate-400 truncate max-w-[140px]">{item.description}</p>}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${typeColor(item.awardType)}`}>
                        {item.awardType || "Special"}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-emerald-700">
                      {item.cashPrize > 0 ? `₹${item.cashPrize.toLocaleString()}` : "—"}
                    </td>
                    <td className="py-4 px-4 text-slate-500 text-xs">
                      {new Date(item.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center justify-end gap-2">
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

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
                <p className="text-xs text-slate-400">Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}</p>
                <div className="flex gap-2">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold disabled:opacity-40">← Prev</button>
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold disabled:opacity-40">Next →</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-black text-lg text-slate-800 flex items-center gap-2">
                <Trophy size={20} className="text-amber-500" /> {editId ? "Edit Award" : "Give Award"}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              {/* Employee selector */}
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Select Employee *</label>
                <select value={form.employee} onChange={handleEmpSelect}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ring-amber-200">
                  <option value="">-- Select Employee --</option>
                  {employees.map(e => (
                    <option key={e._id} value={e._id}>{e.name} ({e.employeeId})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Award Name *</label>
                  <input value={form.awardName} onChange={e => setForm({ ...form, awardName: e.target.value })}
                    placeholder="e.g. Employee of the Month"
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 ring-amber-200" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Award Type</label>
                  <select value={form.awardType} onChange={e => setForm({ ...form, awardType: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 ring-amber-200">
                    <option>Gold</option><option>Silver</option><option>Bronze</option><option>Special</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Why are they receiving this award?" rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ring-amber-200 resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Cash Prize (₹)</label>
                  <input type="number" value={form.cashPrize} onChange={e => setForm({ ...form, cashPrize: Number(e.target.value) })}
                    placeholder="0"
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 ring-amber-200" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Date</label>
                  <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 ring-amber-200" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button onClick={handleSave} className="flex-1 bg-[#0a4d44] text-white py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition">
                  {editId ? "Update" : "Give Award 🏆"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AwardList;
