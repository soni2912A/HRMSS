import React, { useState, useEffect, useMemo } from "react";
import { Pencil, Trash2, Plus, Search, Users, Phone, X, Loader2 } from "lucide-react";
import { employeeAPI, departmentAPI } from "../../services/api";

const ENTRIES = [5, 10, 25];

// Developer / tech positions always available
const DEV_POSITIONS = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "UI/UX Designer",
  "DevOps Engineer",
  "QA Engineer",
  "Data Analyst",
  "Data Scientist",
  "Project Manager",
  "Scrum Master",
  "Product Manager",
  "System Administrator",
  "Database Administrator",
  "Software Architect",
];

// Per-department role suggestions
const DEPT_POSITIONS = {
  "Sales Team":      ["Sales Executive","Sales Manager","Business Development Executive","Account Manager","Sales Coordinator","Regional Sales Manager"],
  "Legal Team":      ["Legal Advisor","Legal Executive","Compliance Officer","Contract Manager","Corporate Lawyer","Paralegal"],
  "HR Team":         ["HR Manager","HR Executive","Recruiter","Talent Acquisition Specialist","HR Coordinator","Payroll Manager","Training Manager"],
  "Marketing Team":  ["Marketing Manager","Marketing Executive","Content Writer","SEO Specialist","Social Media Manager","Brand Manager","Graphic Designer"],
  "Finance Team":    ["Finance Manager","Accountant","Financial Analyst","Accounts Executive","Auditor","Tax Consultant","Billing Executive"],
};

const EmployeeList = () => {
  const [employees, setEmployees]     = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [entries, setEntries]         = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm]       = useState(false);
  const [editId, setEditId]           = useState(null);

  const emptyForm = { name: "", email: "", mobile: "", position: "", salary: "", status: "Active", department: "" };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const [empRes, deptRes] = await Promise.all([employeeAPI.getAll(), departmentAPI.getAll()]);
      const extractArr = (res) =>
        Array.isArray(res)       ? res :
        Array.isArray(res?.data) ? res.data :
        Array.isArray(res?.employees) ? res.employees :
        Array.isArray(res?.departments) ? res.departments : [];
      setEmployees(extractArr(empRes));
      setDepartments(extractArr(deptRes));
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  // Build position list based on selected department
  const positionOptions = useMemo(() => {
    const selectedDept = departments.find(d => d._id === form.department);
    const deptName = selectedDept?.name || "";
    const deptSpecific = DEPT_POSITIONS[deptName] || [];
    const all = [...new Set([...deptSpecific, ...DEV_POSITIONS])];
    return all.sort();
  }, [form.department, departments]);

  const handleSave = async () => {
    if (!form.name || !form.email) return alert("Name and email are required");
    try {
      if (editId) {
        const res = await employeeAPI.update(editId, form);
        const updated = res.data || res;
        setEmployees(employees.map(e => e._id === editId ? updated : e));
      } else {
        const res = await employeeAPI.create(form);
        const created = res.data || res;
        setEmployees([created, ...employees]);
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
  const paginated  = filtered.slice((currentPage - 1) * entries, currentPage * entries);

  // Chevron icon for custom select styling
  const ChevronDown = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="bg-[#f3f4f6] min-h-screen p-3 sm:p-5 md:p-8 pt-20 md:pt-24 font-sans">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 flex items-center gap-2.5">
              <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-xl flex-shrink-0">
                <Users className="text-indigo-600" size={20} />
              </div>
              Employee Directory
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 ml-9 sm:ml-10">
              All employees — including auto-created from user registrations
            </p>
          </div>
          <button
            onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}
            className="w-full sm:w-auto bg-[#0a4d44] hover:bg-slate-800 text-white
              px-5 py-2.5 rounded-2xl flex items-center justify-center gap-2
              font-bold shadow-lg transition text-sm whitespace-nowrap"
          >
            <Plus size={16} /> Add Employee
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-slate-100 text-center">
            <p className="text-xl sm:text-2xl font-black text-slate-800">{employees.length}</p>
            <p className="text-[9px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total</p>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-3 sm:p-4 border border-emerald-100 text-center">
            <p className="text-xl sm:text-2xl font-black text-emerald-700">
              {employees.filter(e => e.status === "Active").length}
            </p>
            <p className="text-[9px] sm:text-xs font-bold text-emerald-500 uppercase tracking-widest mt-0.5">Active</p>
          </div>
          <div className="bg-red-50 rounded-2xl p-3 sm:p-4 border border-red-100 text-center">
            <p className="text-xl sm:text-2xl font-black text-red-600">
              {employees.filter(e => e.status === "Inactive").length}
            </p>
            <p className="text-[9px] sm:text-xs font-bold text-red-400 uppercase tracking-widest mt-0.5">Inactive</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="relative w-full sm:flex-1 sm:min-w-[180px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search name, email or ID..."
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 bg-white rounded-xl
                text-sm focus:outline-none focus:ring-2 ring-indigo-100 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {["All", "Active", "Inactive"].map(s => (
              <button key={s} onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
                  statusFilter === s
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-indigo-50"
                }`}>{s}</button>
            ))}
            <select value={entries} onChange={e => setEntries(Number(e.target.value))}
              className="border border-slate-200 bg-white rounded-xl px-3 py-2 text-xs focus:outline-none ml-auto sm:ml-0">
              {ENTRIES.map(n => <option key={n} value={n}>Show {n}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-indigo-500" size={36} />
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm table-fixed">
                <colgroup>
                  <col style={{ width: "28%" }} />
                  <col style={{ width: "13%" }} />
                  <col style={{ width: "16%" }} />
                  <col style={{ width: "18%" }} />
                  <col style={{ width: "11%" }} />
                  <col style={{ width: "14%" }} />
                </colgroup>
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                    <th className="py-4 px-5 text-left">Employee</th>
                    <th className="py-4 px-4 text-left">Emp ID</th>
                    <th className="py-4 px-4 text-left">Contact</th>
                    <th className="py-4 px-4 text-left">Position</th>
                    <th className="py-4 px-4 text-left">Status</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr><td colSpan="6" className="py-16 text-center text-slate-400 text-sm">No employees found</td></tr>
                  ) : paginated.map(emp => (
                    <tr key={emp._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-black text-sm flex-shrink-0">
                            {emp.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-800 truncate">{emp.name}</p>
                            <p className="text-[10px] text-slate-400 truncate">{emp.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-black text-indigo-600 text-xs tracking-wider truncate">{emp.employeeId || "—"}</td>
                      <td className="py-4 px-4">
                        <p className="text-xs text-slate-600 flex items-center gap-1 truncate">
                          <Phone size={10} className="flex-shrink-0" />{emp.mobile || "—"}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-xs text-slate-600 truncate">{emp.position || "Employee"}</p>
                        {emp.department?.name && <p className="text-[10px] text-slate-400 truncate">{emp.department.name}</p>}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${emp.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleEdit(emp)} className="p-1.5 hover:bg-slate-100 rounded-lg transition"><Pencil size={14} className="text-slate-500" /></button>
                          <button onClick={() => handleDelete(emp._id)} className="p-1.5 hover:bg-red-50 rounded-lg transition"><Trash2 size={14} className="text-red-400" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <p className="py-12 text-center text-slate-400 text-sm">No employees found</p>
              ) : paginated.map(emp => (
                <div key={emp._id} className="p-3 sm:p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-black text-sm flex-shrink-0">
                      {emp.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">{emp.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{emp.email}</p>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button onClick={() => handleEdit(emp)} className="p-2 bg-slate-50 border border-slate-200 rounded-xl hover:border-indigo-200 transition"><Pencil size={13} className="text-slate-500" /></button>
                      <button onClick={() => handleDelete(emp._id)} className="p-2 bg-slate-50 border border-slate-200 rounded-xl hover:border-rose-200 transition"><Trash2 size={13} className="text-red-400" /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[["Emp ID", emp.employeeId || "—", "text-indigo-600"], ["Mobile", emp.mobile || "—", ""], ["Position", emp.position || "Employee", ""], ["Status", emp.status, emp.status === "Active" ? "text-emerald-600" : "text-red-500"]].map(([label, val, cls]) => (
                      <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 min-w-0">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
                        <p className={`text-xs font-bold truncate ${cls}`}>{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 sm:px-5 py-3 border-t border-slate-100">
                <p className="text-xs text-slate-400 order-2 sm:order-1">
                  Showing {(currentPage - 1) * entries + 1}–{Math.min(currentPage * entries, filtered.length)} of {filtered.length}
                </p>
                <div className="flex gap-1 order-1 sm:order-2 flex-wrap justify-center">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setCurrentPage(p)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition ${currentPage === p ? "bg-indigo-600 text-white" : "hover:bg-slate-100 text-slate-600"}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Add/Edit Modal ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 sm:p-4">
          {/* On mobile: slides up from bottom like a sheet; on sm+: centered modal */}
          <div className="bg-white w-full sm:rounded-2xl sm:max-w-lg rounded-t-3xl shadow-2xl
            max-h-[92dvh] sm:max-h-[90vh] flex flex-col overflow-hidden">

            {/* Modal header */}
            <div className="flex justify-between items-center px-5 sm:px-6 py-4 border-b border-slate-100 flex-shrink-0">
              {/* Drag handle on mobile */}
              <div className="absolute left-1/2 -translate-x-1/2 top-2 w-10 h-1 bg-slate-200 rounded-full sm:hidden" />
              <h2 className="font-bold text-base sm:text-lg">{editId ? "Edit Employee" : "Add Employee"}</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-slate-100 rounded-full transition">
                <X size={18} />
              </button>
            </div>

            {/* Scrollable form body */}
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 overscroll-contain">

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Full Name *</label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm
                      focus:outline-none focus:ring-2 ring-indigo-200 min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="Email"
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm
                      focus:outline-none focus:ring-2 ring-indigo-200 min-h-[44px]"
                  />
                </div>
              </div>

              {/* Mobile + Salary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Mobile</label>
                  <input
                    value={form.mobile}
                    onChange={e => setForm({ ...form, mobile: e.target.value })}
                    placeholder="Mobile"
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm
                      focus:outline-none focus:ring-2 ring-indigo-200 min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                    Salary
                    {form.salary && (
                      <span className="ml-2 text-indigo-500 normal-case font-semibold">
                        ₹{Number(form.salary).toLocaleString("en-IN")}
                      </span>
                    )}
                  </label>
                  <input
                    type="range"
                    min={1000}
                    max={500000}
                    step={1000}
                    value={form.salary || 1000}
                    onChange={e => setForm({ ...form, salary: e.target.value })}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-2"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mb-2">
                    <span>₹1,000</span>
                    <span>₹2,50,000</span>
                    <span>₹5,00,000</span>
                  </div>
                  <input
                    type="number"
                    min={1000}
                    value={form.salary || ""}
                    onChange={e => setForm({ ...form, salary: Math.max(1000, Number(e.target.value)) })}
                    placeholder="Or type exact amount"
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm
                      focus:outline-none focus:ring-2 ring-indigo-200 min-h-[44px]"
                  />
                </div>
              </div>

              {/* ── Department + Position — responsive side-by-side grid ── */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>

                {/* Department */}
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                    Department
                  </label>
                  <div className="relative">
                    <select
                      value={form.department}
                      onChange={e => setForm({ ...form, department: e.target.value, position: "" })}
                      className="w-full appearance-none border border-gray-200 rounded-xl
                        px-3 py-3 pr-9 text-sm bg-white
                        focus:outline-none focus:ring-2 ring-indigo-200
                        min-h-[44px] touch-manipulation cursor-pointer
                        text-slate-700 leading-snug"
                    >
                      <option value="">Select dept…</option>
                      {departments.map(d => (
                        <option key={d._id} value={d._id}>{d.name}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <ChevronDown />
                    </span>
                  </div>
                </div>

                {/* Position dropdown */}
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                    Position
                    {form.department && positionOptions.length > 0 && (
                      <span className="ml-1 text-indigo-400 normal-case font-normal text-[9px]">
                        ({positionOptions.length})
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <select
                      value={form.position}
                      onChange={e => setForm({ ...form, position: e.target.value })}
                      className="w-full appearance-none border border-gray-200 rounded-xl
                        px-3 py-3 pr-9 text-sm bg-white
                        focus:outline-none focus:ring-2 ring-indigo-200
                        min-h-[44px] touch-manipulation cursor-pointer
                        text-slate-700 leading-snug"
                    >
                      <option value="">Select role…</option>
                      {positionOptions.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <ChevronDown />
                    </span>
                  </div>
                </div>
              </div>

              {/* Custom position text input */}
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                  Custom Position
                  <span className="ml-1.5 normal-case font-normal text-slate-400 text-[9px]">— or type your own</span>
                </label>
                <input
                  value={form.position}
                  onChange={e => setForm({ ...form, position: e.target.value })}
                  placeholder="e.g. Senior Developer"
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm
                    focus:outline-none focus:ring-2 ring-indigo-200
                    min-h-[44px] touch-manipulation"
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Status</label>
                <div className="relative">
                  <select
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value })}
                    className="w-full appearance-none border border-gray-200 rounded-xl
                      px-3 py-3 pr-9 text-sm bg-white
                      focus:outline-none focus:ring-2 ring-indigo-200
                      min-h-[44px] touch-manipulation cursor-pointer"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <ChevronDown />
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-1 pb-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-200 py-3 rounded-xl text-sm font-bold
                    text-gray-600 hover:bg-gray-50 transition min-h-[48px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-[#0a4d44] text-white py-3 rounded-xl text-sm font-bold
                    hover:bg-slate-800 transition min-h-[48px]"
                >
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