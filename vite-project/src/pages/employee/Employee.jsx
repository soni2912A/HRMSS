
// import React, { useState, useMemo } from "react";
// import {
//   Pencil,
//   Trash2,
//   Plus,
//   Filter,
//   ArrowUpDown,
//   Search,
//   Users,
//   RotateCcw,
//   Mail,
//   Phone,
//   UserCheck
// } from "lucide-react";

// const EmployeeList = () => {
//   const [search, setSearch] = useState("");
//   const [showFilter, setShowFilter] = useState(false);
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [entries, setEntries] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

//   const employees = [
//     { id: "000031", name: "Babara Patel", email: "babra@gmail.com", mobile: "25670268239", status: "Active" },
//     { id: "000030", name: "Test Candidate", email: "test@test.com", mobile: "12365489985", status: "Active" },
//     { id: "000029", name: "Monalisa Subudhi", email: "monalisa@gmail.com", mobile: "7787890451", status: "Inactive" },
//     { id: "000028", name: "Mohmed Afif", email: "afif@gmail.com", mobile: "26523333", status: "Active" },
//     { id: "000027", name: "Rahul Sharma", email: "rahul@gmail.com", mobile: "9876543210", status: "Active" },
//     { id: "000026", name: "Priya Verma", email: "priya@gmail.com", mobile: "9123456789", status: "Inactive" },
//     { id: "000025", name: "Amit Kulkarni", email: "amit@gmail.com", mobile: "9988776655", status: "Active" },
//     { id: "000024", name: "Sneha Patil", email: "sneha@gmail.com", mobile: "8899776655", status: "Inactive" },
//   ];

//   const filteredData = useMemo(() => {
//     let data = [...employees];
//     if (search) data = data.filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()));
//     if (statusFilter !== "All") data = data.filter((emp) => emp.status === statusFilter);
//     if (sortConfig.key) {
//       data.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
//         if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
//         return 0;
//       });
//     }
//     return data;
//   }, [search, statusFilter, sortConfig]);

//   const totalPages = Math.ceil(filteredData.length / entries);
//   const startIndex = (currentPage - 1) * entries;
//   const paginatedData = filteredData.slice(startIndex, startIndex + entries);

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
//     setSortConfig({ key, direction });
//   };

//   return (
//     <div className="bg-[#f8fafc] min-h-screen p-4 md:p-8 pt-24">
//       <div className="max-w-6xl mx-auto">

//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//           <div>
//             <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
//               <div className="p-2 bg-emerald-100 rounded-xl">
//                 <Users className="text-emerald-700" size={24} />
//               </div>
//               Employee Database
//             </h1>
//             <p className="text-slate-500 text-sm font-medium mt-1">Manage your workforce and their status</p>
//           </div>
//           <div className="flex gap-2 w-full md:w-auto">
//             <button
//               onClick={() => setShowFilter(!showFilter)}
//               className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all border ${showFilter ? "bg-slate-800 text-white border-slate-800 shadow-lg" : "bg-white text-slate-600 border-slate-100 hover:bg-slate-50 shadow-sm"
//                 }`}
//             >
//               <Filter size={18} /> Filter
//             </button>
//             <button className="flex-1 md:flex-none bg-[#0a4d44] hover:bg-slate-800 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/10 font-bold active:scale-95">
//               <Plus size={18} /> Add Employee
//             </button>
//           </div>
//         </div>

//         {showFilter && (
//           <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm mb-6 flex flex-col sm:flex-row items-end gap-4 animate-in slide-in-from-top-4 duration-300">
//             <div className="w-full sm:w-64">
//               <label className="text-[10px] font-black uppercase text-slate-400 ml-1 mb-1 block">Status Filter</label>
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 ring-emerald-50"
//               >
//                 <option value="All">All Status</option>
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//             </div>
//             <button
//               onClick={() => { setStatusFilter("All"); setSearch(""); }}
//               className="bg-red-50 text-red-600 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-red-100 transition-colors"
//             >
//               <RotateCcw size={16} /> Reset
//             </button>
//           </div>
//         )}

//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 px-2">
//           <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
//             Show
//             <select
//               value={entries}
//               onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}
//               className="bg-white border border-slate-100 px-2 py-1 rounded-lg text-slate-700 outline-none shadow-sm"
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={15}>15</option>
//             </select>
//             entries
//           </div>

//           <div className="relative w-full sm:w-80 group">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
//             <input
//               type="text"
//               placeholder="Search by name..."
//               className="w-full bg-white border border-slate-100 px-11 py-3 rounded-2xl text-sm font-medium shadow-sm outline-none focus:ring-4 ring-emerald-50 transition-all"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="hidden md:block bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
//           <table className="min-w-full text-left">
//             <thead>
//               <tr className="bg-slate-50/50 border-b border-slate-100">
//                 <th className="px-6 py-4 text-[11px] font-black uppercase text-slate-400">Sl</th>
//                 <th onClick={() => handleSort("id")} className="px-6 py-4 text-[11px] font-black uppercase text-slate-400 cursor-pointer hover:text-emerald-600 transition-colors">
//                   Employee ID <ArrowUpDown size={12} className="inline ml-1" />
//                 </th>
//                 <th onClick={() => handleSort("name")} className="px-6 py-4 text-[11px] font-black uppercase text-slate-400 cursor-pointer hover:text-emerald-600 transition-colors">
//                   Name <ArrowUpDown size={12} className="inline ml-1" />
//                 </th>
//                 <th className="px-6 py-4 text-[11px] font-black uppercase text-slate-400">Contacts</th>
//                 <th onClick={() => handleSort("status")} className="px-6 py-4 text-[11px] font-black uppercase text-slate-400 text-center cursor-pointer hover:text-emerald-600 transition-colors">
//                   Status <ArrowUpDown size={12} className="inline ml-1" />
//                 </th>
//                 <th className="px-6 py-4 text-[11px] font-black uppercase text-slate-400 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {paginatedData.map((emp, index) => (
//                 <tr key={emp.id} className="hover:bg-slate-50/50 transition-all group">
//                   <td className="px-6 py-5 text-sm font-bold text-slate-300">
//                     {String(startIndex + index + 1).padStart(2, '0')}
//                   </td>
//                   <td className="px-6 py-5 text-sm font-black text-slate-500">#{emp.id}</td>
//                   <td className="px-6 py-5">
//                     <div className="flex items-center gap-3">
//                       <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-xs group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
//                         {emp.name.charAt(0)}
//                       </div>
//                       <span className="text-sm font-bold text-slate-700">{emp.name}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="space-y-1">
//                       <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
//                         <Mail size={12} className="text-slate-300" /> {emp.email}
//                       </div>
//                       <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
//                         <Phone size={12} className="text-slate-300" /> {emp.mobile}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-5 text-center">
//                     <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 ${emp.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
//                       }`}>
//                       <div className={`w-1 h-1 rounded-full ${emp.status === "Active" ? "bg-emerald-500" : "bg-red-500"}`} />
//                       {emp.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <button className="p-2.5 bg-white border border-slate-100 text-blue-600 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all"><Pencil size={16} /></button>
//                       <button className="p-2.5 bg-white border border-slate-100 text-red-600 rounded-xl hover:border-red-200 hover:shadow-sm transition-all"><Trash2 size={16} /></button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="md:hidden space-y-4">
//           {paginatedData.map((emp) => (
//             <div key={emp.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black">
//                     {emp.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-slate-800">{emp.name}</h3>
//                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">ID: #{emp.id}</p>
//                   </div>
//                 </div>
//                 <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${emp.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
//                   }`}>
//                   {emp.status}
//                 </span>
//               </div>
//               <div className="space-y-2 mb-6 border-y border-slate-50 py-4">
//                 <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
//                   <Mail size={14} className="text-slate-300" /> {emp.email}
//                 </div>
//                 <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
//                   <Phone size={14} className="text-slate-300" /> {emp.mobile}
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 <button className="flex-1 bg-slate-50 text-slate-600 font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"><Pencil size={14} /> Edit</button>
//                 <button className="flex-1 bg-red-50 text-red-600 font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"><Trash2 size={14} /> Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {totalPages > 1 && (
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 px-2">
//             <p className="text-xs font-bold text-slate-400">
//               Showing {startIndex + 1} to {Math.min(startIndex + entries, filteredData.length)} of {filteredData.length} entries
//             </p>
//             <div className="flex gap-2">
//               <button
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage((p) => p - 1)}
//                 className="px-4 py-2 border border-slate-100 bg-white rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 disabled:opacity-50 transition-all"
//               >
//                 Previous
//               </button>
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`w-9 h-9 rounded-xl font-bold text-xs transition-all ${currentPage === i + 1 ? "bg-[#0a4d44] text-white shadow-lg" : "bg-white text-slate-400 border border-slate-100"
//                     }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//               <button
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage((p) => p + 1)}
//                 className="px-4 py-2 border border-slate-100 bg-white rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 disabled:opacity-50 transition-all"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmployeeList;



import React, { useState, useEffect, useMemo } from "react";
import { Pencil, Trash2, Plus, Search, Users, Mail, Phone, UserCheck, X, Loader2 } from "lucide-react";
import { employeeAPI, departmentAPI } from "../../services/api";

const ENTRIES = [5, 10, 25];

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyForm = { name: "", email: "", mobile: "", position: "", salary: "", status: "Active", department: "" };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [empRes, deptRes] = await Promise.all([employeeAPI.getAll(), departmentAPI.getAll()]);
      setEmployees(empRes.data);
      setDepartments(deptRes.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSave = async () => {
    if (!form.name || !form.email) return alert("Name and email are required");
    try {
      if (editId) {
        const res = await employeeAPI.update(editId, form);
        setEmployees(employees.map(e => e._id === editId ? res.data : e));
      } else {
        const res = await employeeAPI.create(form);
        setEmployees([res.data, ...employees]);
      }
      setForm(emptyForm); setShowForm(false); setEditId(null);
    } catch (err) { alert(err.message); }
  };

  const handleEdit = (emp) => {
    setForm({
      name: emp.name, email: emp.email, mobile: emp.mobile || "",
      position: emp.position || "", salary: emp.salary || "",
      status: emp.status, department: emp.department?._id || emp.department || "",
    });
    setEditId(emp._id); setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await employeeAPI.delete(id);
      setEmployees(employees.filter(e => e._id !== id));
    } catch (err) { alert(err.message); }
  };

  const filtered = useMemo(() => {
    let data = [...employees];
    if (search) data = data.filter(e =>
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.email?.toLowerCase().includes(search.toLowerCase()) ||
      e.employeeId?.includes(search)
    );
    if (statusFilter !== "All") data = data.filter(e => e.status === statusFilter);
    return data;
  }, [employees, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / entries);
  const paginated = filtered.slice((currentPage-1)*entries, currentPage*entries);

  const performanceColor = (score) => {
    if (!score && score !== 0) return "bg-gray-100 text-gray-500";
    if (score >= 80) return "bg-emerald-100 text-emerald-700";
    if (score >= 60) return "bg-blue-100 text-blue-700";
    if (score >= 40) return "bg-orange-100 text-orange-600";
    return "bg-red-100 text-red-600";
  };

  return (
    <div className="bg-[#f3f4f6] min-h-screen p-4 md:p-8 pt-24 font-sans">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-xl"><Users className="text-indigo-600" size={24} /></div>
              Employee Directory
            </h1>
            <p className="text-slate-500 text-sm mt-1">All employees — including auto-created from user registrations</p>
          </div>
          <button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}
            className="bg-[#0a4d44] hover:bg-slate-800 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg transition">
            <Plus size={18} /> Add Employee
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
            <p className="text-2xl font-black text-slate-800">{employees.length}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total</p>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 text-center">
            <p className="text-2xl font-black text-emerald-700">{employees.filter(e=>e.status==="Active").length}</p>
            <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mt-0.5">Active</p>
          </div>
          <div className="bg-red-50 rounded-2xl p-4 border border-red-100 text-center">
            <p className="text-2xl font-black text-red-600">{employees.filter(e=>e.status==="Inactive").length}</p>
            <p className="text-xs font-bold text-red-400 uppercase tracking-widest mt-0.5">Inactive</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search name, email or ID..."
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 ring-indigo-100 shadow-sm" />
          </div>
          <div className="flex gap-2">
            {["All", "Active", "Inactive"].map(s => (
              <button key={s} onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition ${
                  statusFilter === s ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:bg-indigo-50"
                }`}>{s}</button>
            ))}
          </div>
          <select value={entries} onChange={e => setEntries(Number(e.target.value))}
            className="border border-slate-200 bg-white rounded-xl px-3 py-2.5 text-sm focus:outline-none">
            {ENTRIES.map(n => <option key={n} value={n}>Show {n}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-500" size={36} /></div>
        ) : (
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                  <th className="py-4 px-5 text-left">Employee</th>
                  <th className="py-4 px-4 text-left">Emp ID</th>
                  <th className="py-4 px-4 text-left hidden md:table-cell">Contact</th>
                  <th className="py-4 px-4 text-left hidden lg:table-cell">Position</th>
                  <th className="py-4 px-4 text-left">Status</th>
                  <th className="py-4 px-4 text-left hidden lg:table-cell">Performance</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan="7" className="py-16 text-center text-slate-400">No employees found</td></tr>
                ) : paginated.map(emp => (
                  <tr key={emp._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-black text-sm shrink-0">
                          {emp.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{emp.name}</p>
                          <p className="text-[10px] text-slate-400">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-black text-indigo-600 text-xs tracking-wider">
                      {emp.employeeId || "—"}
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <p className="text-xs text-slate-600 flex items-center gap-1"><Phone size={10} />{emp.mobile || "—"}</p>
                    </td>
                    <td className="py-4 px-4 hidden lg:table-cell">
                      <p className="text-xs text-slate-600">{emp.position || "Employee"}</p>
                      {emp.department?.name && <p className="text-[10px] text-slate-400">{emp.department.name}</p>}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${
                        emp.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
                      }`}>{emp.status}</span>
                    </td>
                    <td className="py-4 px-4 hidden lg:table-cell">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black ${performanceColor(emp.performance?.score)}`}>
                        {emp.performance?.score != null ? `${emp.performance.score}%` : "N/A"}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(emp)} className="p-1.5 hover:bg-slate-100 rounded-lg transition">
                          <Pencil size={14} className="text-slate-500" />
                        </button>
                        <button onClick={() => handleDelete(emp._id)} className="p-1.5 hover:bg-red-50 rounded-lg transition">
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
                <p className="text-xs text-slate-400">Showing {(currentPage-1)*entries+1}–{Math.min(currentPage*entries, filtered.length)} of {filtered.length}</p>
                <div className="flex gap-1">
                  {Array.from({length: totalPages}, (_, i) => i+1).map(p => (
                    <button key={p} onClick={() => setCurrentPage(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                        currentPage === p ? "bg-indigo-600 text-white" : "hover:bg-slate-100 text-slate-600"
                      }`}>{p}</button>
                  ))}
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
              <h2 className="font-bold text-lg">{editId ? "Edit Employee" : "Add Employee"}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Full Name *</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Full Name"
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 ring-indigo-200" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email"
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 ring-indigo-200" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Mobile</label>
                  <input value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} placeholder="Mobile"
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 ring-indigo-200" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Position</label>
                  <input value={form.position} onChange={e => setForm({...form, position: e.target.value})} placeholder="Position"
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 ring-indigo-200" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Salary</label>
                  <input type="number" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} placeholder="Salary"
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 ring-indigo-200" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 ring-indigo-200">
                    <option>Active</option><option>Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Department</label>
                <select value={form.department} onChange={e => setForm({...form, department: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 ring-indigo-200">
                  <option value="">-- Select Department --</option>
                  {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button onClick={handleSave} className="flex-1 bg-[#0a4d44] text-white py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition">
                  {editId ? "Update" : "Add Employee"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
