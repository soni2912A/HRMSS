import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Trophy, X, Loader2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { awardAPI, employeeAPI } from "../../services/api";

const ITEMS_PER_PAGE = 5;

const AwardList = () => {
  const [data, setData]           = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [editId, setEditId]       = useState(null);
  const [page, setPage]           = useState(1);
  const [search, setSearch]       = useState("");

  const emptyForm = {
    awardName: "", description: "", awardType: "Gold",
    date: new Date().toISOString().slice(0, 10),
    employeeName: "", employee: "", giftItem: "", cashPrize: 0, awardBy: "",
  };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { fetchAll(); }, []);

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
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const typeColor = (t) => ({
    Gold:    "bg-amber-100 text-amber-700 border-amber-200",
    Silver:  "bg-slate-100 text-slate-600 border-slate-200",
    Bronze:  "bg-orange-100 text-orange-700 border-orange-200",
    Special: "bg-emerald-100 text-emerald-700 border-emerald-200",
  }[t] || "bg-emerald-100 text-emerald-700 border-emerald-200");

  const typeIcon = (t) => ({ Gold: "🥇", Silver: "🥈", Bronze: "🥉", Special: "⭐" }[t] || "⭐");

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#f8fafc] p-3 sm:p-5 md:p-8 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2.5">
              <Trophy className="text-emerald-600 flex-shrink-0" size={22} />
              Award Recognition
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5 ml-8">
              Award will appear in employee's Achievements page
            </p>
          </div>
          <button
            onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}
            className="w-full sm:w-auto bg-[#0a4d44] hover:bg-slate-800 text-white
              px-5 py-2.5 rounded-2xl flex items-center justify-center gap-2
              font-bold shadow-lg transition text-sm whitespace-nowrap"
          >
            <Plus size={17} /> Give Award
          </button>
        </div>

        {/* ── Search ── */}
        <div className="relative w-full sm:max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search award or employee..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 bg-white rounded-xl
              text-sm focus:outline-none focus:ring-2 ring-emerald-200 shadow-sm"
          />
        </div>

        {/* ── Content ── */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-emerald-600" size={36} />
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

            {/* Desktop table — md+ */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm table-fixed">
                <colgroup>
                  <col style={{ width: "24%" }} />
                  <col style={{ width: "22%" }} />
                  <col style={{ width: "13%" }} />
                  <col style={{ width: "14%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "12%" }} />
                </colgroup>
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
                    <tr>
                      <td colSpan="6" className="py-16 text-center text-slate-400 text-sm">
                        No awards found
                      </td>
                    </tr>
                  ) : paginated.map(item => (
                    <tr key={item._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center
                            text-amber-700 font-black text-sm flex-shrink-0">
                            {(item.employeeName || "?").charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-800 text-sm truncate">{item.employeeName}</p>
                            {item.employee?.employeeId && (
                              <p className="text-[10px] text-slate-400">{item.employee.employeeId}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-slate-800 truncate">{item.awardName}</p>
                        {item.description && (
                          <p className="text-xs text-slate-400 truncate">{item.description}</p>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${typeColor(item.awardType)}`}>
                          {typeIcon(item.awardType)} {item.awardType || "Special"}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-emerald-700 text-sm">
                        {item.cashPrize > 0 ? `₹${item.cashPrize.toLocaleString()}` : "—"}
                      </td>
                      <td className="py-4 px-4 text-slate-500 text-xs">{fmtDate(item.date)}</td>
                      <td className="py-4 px-5">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleEdit(item)}
                            className="p-1.5 hover:bg-slate-100 rounded-lg transition">
                            <Pencil size={14} className="text-slate-500" />
                          </button>
                          <button onClick={() => handleDelete(item._id)}
                            className="p-1.5 hover:bg-red-50 rounded-lg transition">
                            <Trash2 size={14} className="text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards — below md */}
            <div className="md:hidden divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <p className="py-12 text-center text-slate-400 text-sm">No awards found</p>
              ) : paginated.map(item => (
                <div key={item._id} className="p-3 sm:p-4 space-y-3">

                  {/* Top: avatar + name + actions */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center
                      text-amber-700 font-black text-base flex-shrink-0">
                      {(item.employeeName || "?").charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">{item.employeeName}</p>
                      <p className="text-xs font-bold text-slate-700 truncate">{item.awardName}</p>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button onClick={() => handleEdit(item)}
                        className="p-2 bg-slate-50 border border-slate-200 rounded-xl
                          hover:border-amber-200 hover:text-amber-600 transition">
                        <Pencil size={13} className="text-slate-500" />
                      </button>
                      <button onClick={() => handleDelete(item._id)}
                        className="p-2 bg-slate-50 border border-slate-200 rounded-xl
                          hover:border-rose-200 hover:text-rose-500 transition">
                        <Trash2 size={13} className="text-red-400" />
                      </button>
                    </div>
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 min-w-0">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-wide mb-0.5">Type</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                        text-[10px] font-black uppercase border ${typeColor(item.awardType)}`}>
                        {typeIcon(item.awardType)} {item.awardType || "Special"}
                      </span>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 min-w-0">
                      <p className="text-[9px] font-black text-emerald-500 uppercase tracking-wide mb-0.5">Cash Prize</p>
                      <p className="text-xs font-black text-emerald-700 truncate">
                        {item.cashPrize > 0 ? `₹${item.cashPrize.toLocaleString()}` : "—"}
                      </p>
                    </div>
                    <div className="col-span-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 min-w-0">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-wide mb-0.5">Date</p>
                      <p className="text-xs font-bold text-slate-700">{fmtDate(item.date)}</p>
                    </div>
                  </div>

                  {/* Description if present */}
                  {item.description && (
                    <p className="text-xs text-slate-400 line-clamp-2 px-1">{item.description}</p>
                  )}
                </div>
              ))}
            </div>

            {/* ── Pagination — always show Prev, 5 pages max, Next ── */}
            {totalPages > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2
                px-4 sm:px-5 py-3 border-t border-slate-100">

                {/* Count */}
                <p className="text-xs text-slate-400 order-2 sm:order-1">
                  Showing {filtered.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
                </p>

                {/* Prev · page numbers (max 5) · Next */}
                <div className="flex items-center gap-1.5 order-1 sm:order-2">

                  {/* ← Prev */}
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex items-center gap-1 px-3 h-8 rounded-lg border border-slate-200
                      text-xs font-bold text-slate-500 hover:bg-slate-50
                      disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft size={13} /> Prev
                  </button>

                  {/* Page numbers — sliding window of 5 */}
                  {(() => {
                    const windowSize = 5;
                    let start = Math.max(1, page - Math.floor(windowSize / 2));
                    let end   = start + windowSize - 1;
                    if (end > totalPages) { end = totalPages; start = Math.max(1, end - windowSize + 1); }
                    return Array.from({ length: end - start + 1 }, (_, i) => start + i).map(p => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition
                          ${page === p
                            ? "bg-[#0a4d44] text-white shadow-sm"
                            : "border border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                      >
                        {p}
                      </button>
                    ));
                  })()}

                  {/* Next → */}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="flex items-center gap-1 px-3 h-8 rounded-lg border border-slate-200
                      text-xs font-bold text-slate-500 hover:bg-slate-50
                      disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    Next <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Form Modal — always centered ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg
            max-h-[90vh] flex flex-col overflow-hidden">

            {/* Modal header */}
            <div className="flex justify-between items-center px-5 sm:px-6 py-4
              border-b border-slate-100 flex-shrink-0">
              <h2 className="font-black text-base sm:text-lg text-slate-800 flex items-center gap-2">
                <Trophy size={18} className="text-amber-500 flex-shrink-0" />
                {editId ? "Edit Award" : "Give Award"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">

              {/* Employee selector */}
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                  Select Employee *
                </label>
                <select
                  value={form.employee}
                  onChange={handleEmpSelect}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                    focus:outline-none focus:ring-2 ring-amber-200"
                >
                  <option value="">-- Select Employee --</option>
                  {employees.map(e => (
                    <option key={e._id} value={e._id}>{e.name} ({e.employeeId})</option>
                  ))}
                </select>
              </div>

              {/* Award name + type — stack on 320px */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                    Award Name *
                  </label>
                  <input
                    value={form.awardName}
                    onChange={e => setForm({ ...form, awardName: e.target.value })}
                    placeholder="e.g. Employee of the Month"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
                      focus:outline-none focus:ring-2 ring-amber-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                    Award Type
                  </label>
                  <select
                    value={form.awardType}
                    onChange={e => setForm({ ...form, awardType: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
                      focus:outline-none focus:ring-2 ring-amber-200"
                  >
                    <option>Gold</option>
                    <option>Silver</option>
                    <option>Bronze</option>
                    <option>Special</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Why are they receiving this award?"
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                    focus:outline-none focus:ring-2 ring-amber-200 resize-none"
                />
              </div>

              {/* Cash prize + Date — stack on 320px */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                    Cash Prize (₹)
                  </label>
                  <input
                    type="number"
                    value={form.cashPrize}
                    onChange={e => setForm({ ...form, cashPrize: Number(e.target.value) })}
                    placeholder="0"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
                      focus:outline-none focus:ring-2 ring-amber-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
                      focus:outline-none focus:ring-2 ring-amber-200"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-200 py-2.5 rounded-xl text-sm
                    font-bold text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-[#0a4d44] text-white py-2.5 rounded-xl text-sm
                    font-bold hover:bg-slate-800 transition"
                >
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