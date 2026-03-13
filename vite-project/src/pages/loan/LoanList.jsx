import React, { useState, useEffect, useMemo, useRef } from "react";
import { Plus, Trash2, Pencil, IndianRupee, ChevronDown, Search, X, Check } from "lucide-react";

import { employeeAPI, authAPI, loanAPI } from "../../services/api";

/* ─────────────────────────────────────────────
   Responsive Custom Select Dropdown
   Works on mobile, tablet, desktop
───────────────────────────────────────────── */
const CustomSelect = ({ value, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  const selected = options.find(o => o.value === value);

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  // Determine if dropdown should open upward (near bottom of screen)
  const triggerRef = useRef(null);
  const [dropUp, setDropUp] = useState(false);
  const handleOpen = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setDropUp(spaceBelow < 280);
    }
    setOpen(true);
    setQuery("");
  };

  return (
    <div ref={ref} className="relative w-full" style={{ fontFamily: "inherit" }}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => open ? setOpen(false) : handleOpen()}
        className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2.5 bg-white text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        style={{ minHeight: "44px", fontSize: "clamp(13px, 3.5vw, 15px)" }}
      >
        <span className={selected ? "text-gray-800 truncate pr-2" : "text-gray-400 truncate pr-2"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className={`absolute z-[99999] w-full bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden`}
          style={{
            ...(dropUp
              ? { bottom: "calc(100% + 6px)", top: "auto" }
              : { top: "calc(100% + 6px)", bottom: "auto" }),
            // On mobile, constrain width to viewport
            maxWidth: "min(100%, calc(100vw - 32px))",
            left: 0,
          }}
        >
          {/* Search box */}
          <div className="p-2 border-b border-gray-100 bg-gray-50">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-8 pr-8 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                style={{ fontSize: "clamp(13px, 3.5vw, 14px)" }}
                onMouseDown={e => e.stopPropagation()}
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Options list */}
          <ul
            className="overflow-y-auto overscroll-contain"
            style={{ maxHeight: "clamp(160px, 40vh, 260px)" }}
          >
            {/* "None" / placeholder option */}
            <li
              onClick={() => { onChange(""); setOpen(false); setQuery(""); }}
              className={`flex items-center gap-2 px-4 py-2.5 cursor-pointer text-sm text-gray-400 hover:bg-gray-50 transition-colors ${!value ? "bg-green-50 text-green-700" : ""}`}
            >
              {!value && <Check size={13} className="text-green-600 flex-shrink-0" />}
              <span className="truncate">{placeholder}</span>
            </li>

            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">No results found</li>
            ) : (
              filtered.map(o => (
                <li
                  key={o.value}
                  onClick={() => { onChange(o.value); setOpen(false); setQuery(""); }}
                  className={`flex items-center gap-2 px-4 py-2.5 cursor-pointer hover:bg-green-50 transition-colors ${value === o.value ? "bg-green-50 text-green-700 font-medium" : "text-gray-700"}`}
                  style={{ fontSize: "clamp(13px, 3.5vw, 15px)" }}
                >
                  {value === o.value && <Check size={13} className="text-green-600 flex-shrink-0" />}
                  <span className="truncate">{o.label}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Loan Component
───────────────────────────────────────────── */
const Loan = () => {
  const [loans, setLoans] = useState([]);
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    employeeName: "",
    employee: "",
    userId: "",
    amount: "",
    installments: "",
    interestRate: "",
    reason: ""
  });

  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadLoans();
    loadUsers();
    loadEmployees();
  }, []);

  const loadLoans = async () => {
    const res = await loanAPI.getAll();
    setLoans(res.data || []);
  };

  const loadUsers = async () => {
    const res = await authAPI.getAllUsers();
    setUsers(res.data || []);
  };

  const loadEmployees = async () => {
    const res = await employeeAPI.getAll();
    setEmployees(res.data || []);
  };

  const saveLoan = async () => {
    if (editId) {
      const res = await loanAPI.update(editId, form);
      setLoans(loans.map(l => l._id === editId ? res.data : l));
    } else {
      const res = await loanAPI.create(form);
      setLoans([res.data, ...loans]);
    }
    closeModal();
  };

  const deleteLoan = async (id) => {
    await loanAPI.delete(id);
    setLoans(loans.filter(l => l._id !== id));
  };

  const closeModal = () => {
    setShow(false);
    setEditId(null);
    setForm({ employeeName: "", employee: "", userId: "", amount: "", installments: "", interestRate: "", reason: "" });
  };

  const filtered = useMemo(() => {
    return loans.filter(l =>
      l.employeeName?.toLowerCase().includes(search.toLowerCase()) ||
      l.userId?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, loans]);

  // Build option arrays for CustomSelect
  const employeeOptions = employees.map(e => ({ value: e._id, label: e.name }));
  const userOptions = users.map(u => ({ value: u._id, label: `${u.name} (${u.email})` }));

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl font-bold mb-6">Loan Management</h1>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          placeholder="Search employee or user"
          className="border p-2 md:w-80 w-full rounded"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          onClick={() => setShow(true)}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 justify-center"
        >
          <Plus size={16} /> Add Loan
        </button>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="grid gap-4 md:hidden">
        {filtered.map(l => (
          <div key={l._id} className="bg-white shadow rounded-lg p-4">
            <div className="font-bold text-lg">{l.employeeName}</div>
            <div className="text-sm text-gray-500">
              {l.userId ? `${l.userId.name} (${l.userId.email})` : "Not Assigned"}
            </div>
            <div className="flex justify-between mt-3 text-sm">
              <span className="flex items-center gap-1 text-green-600 font-semibold">
                <IndianRupee size={14} /> {l.amount}
              </span>
              <span>{l.installments} EMI</span>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="flex-1 bg-blue-500 text-white py-1 rounded"
                onClick={() => {
                  setEditId(l._id);
                  setForm({ employee: l.employee?._id || "", employeeName: l.employeeName, userId: l.userId?._id || "", amount: l.amount, installments: l.installments, interestRate: l.interestRate, reason: l.reason });
                  setShow(true);
                }}
              >Edit</button>
              <button className="flex-1 bg-red-500 text-white py-1 rounded" onClick={() => deleteLoan(l._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Employee</th>
              <th>User</th>
              <th>Amount</th>
              <th>Installments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l._id} className="border-t">
                <td className="p-3">{l.employeeName}</td>
                <td>{l.userId ? `${l.userId.name} (${l.userId.email})` : "Not Assigned"}</td>
                <td className="flex items-center gap-1"><IndianRupee size={14} /> {l.amount}</td>
                <td>{l.installments}</td>
                <td className="flex gap-2 p-3">
                  <button onClick={() => {
                    setEditId(l._id);
                    setForm({ employee: l.employee?._id || "", employeeName: l.employeeName, userId: l.userId?._id || "", amount: l.amount, installments: l.installments, interestRate: l.interestRate, reason: l.reason });
                    setShow(true);
                  }}><Pencil size={16} /></button>
                  <button onClick={() => deleteLoan(l._id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {show && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-[9999]">
          <div
            className="bg-white rounded-xl w-full shadow-2xl overflow-hidden flex flex-col"
            style={{
              maxWidth: "min(480px, calc(100vw - 32px))",
              maxHeight: "min(90vh, 640px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-800 text-base">
                {editId ? "Update Loan" : "Create Loan"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">

              {/* Employee Select */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Employee
                </label>
                <CustomSelect
                  value={form.employee}
                  placeholder="Select Employee"
                  options={employeeOptions}
                  onChange={(val) => {
                    const emp = employees.find(x => x._id === val);
                    setForm({ ...form, employee: val, employeeName: emp?.name || "" });
                  }}
                />
              </div>

              {/* User Select */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Assign User
                </label>
                <CustomSelect
                  value={form.userId}
                  placeholder="Assign User"
                  options={userOptions}
                  onChange={(val) => setForm({ ...form, userId: val })}
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Amount
                </label>
                <div className="relative">
                  <IndianRupee size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    className="border border-gray-300 w-full pl-8 pr-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="Enter amount"
                    value={form.amount}
                    onChange={e => setForm({ ...form, amount: e.target.value })}
                  />
                </div>
              </div>

              {/* Installments */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Installments (EMI)
                </label>
                <input
                  className="border border-gray-300 w-full px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Number of installments"
                  value={form.installments}
                  onChange={e => setForm({ ...form, installments: e.target.value })}
                />
              </div>

            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-gray-100 flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 border border-gray-200 text-gray-500 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={saveLoan}
                className="flex-[2] bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm shadow-sm"
              >
                {editId ? "Update Loan" : "Save Loan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loan;