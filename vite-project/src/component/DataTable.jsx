import { useState } from "react";
import { Edit, Trash2, Save, Plus, X } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   renderInput — plain function (NOT a React component) so it
   never causes unmount/remount and inputs never lose focus.
───────────────────────────────────────────────────────────── */
function renderInput({ col, value, onChange, onBlur, touched, errors, mobile }) {
    const isError = touched[col.key] && errors[col.key];
    const base = mobile
        ? "w-full border px-2 py-1.5 rounded-lg text-xs font-medium outline-none transition-all"
        : "w-full bg-white border px-3 py-1.5 rounded-lg text-sm outline-none transition-all font-medium";
    const stateClass = isError
        ? "border-rose-400 bg-rose-50/30 focus:border-rose-500"
        : "border-slate-200 bg-slate-50 focus:border-[#0a4d44]";

    return (
        <div className="space-y-1">
            {col.inputType === "date" ? (
                <input
                    type="date"
                    className={`${base} ${stateClass}`}
                    value={value}
                    onChange={(e) => onChange(col.key, e.target.value)}
                    onBlur={(e) => onBlur(col, e.target.value)}
                />
            ) : col.inputType === "select" ? (
                <select
                    className={`${base} ${stateClass} cursor-pointer`}
                    value={value}
                    onChange={(e) => onChange(col.key, e.target.value)}
                    onBlur={(e) => onBlur(col, e.target.value)}
                >
                    <option value="">— Select {col.label} —</option>
                    {(col.options || []).map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            ) : (
                <input
                    type="text"
                    className={`${base} ${stateClass}`}
                    value={value}
                    placeholder={col.placeholder || `Enter ${col.label.toLowerCase()}`}
                    onChange={(e) => onChange(col.key, e.target.value)}
                    onBlur={(e) => onBlur(col, e.target.value)}
                />
            )}
            {isError && (
                <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
                    {!mobile && <span className="inline-block w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />}
                    {errors[col.key]}
                </p>
            )}
        </div>
    );
}

export default function DataTable({ title, addLabel, columns, data }) {
    const [rows, setRows]                 = useState(data || []);
    const [editingIndex, setEditingIndex] = useState(null);
    const [form, setForm]                 = useState({});
    const [errors, setErrors]             = useState({});
    const [touched, setTouched]           = useState({});

    const validateField = (col, value) => {
        const v = (value || "").trim();
        const rules = col.validate || {};

        if (rules.required !== false && !v)             return `${col.label} is required.`;
        if (v && rules.minLength && v.length < rules.minLength) return `${col.label} must be at least ${rules.minLength} characters.`;
        if (v && rules.maxLength && v.length > rules.maxLength) return `${col.label} cannot exceed ${rules.maxLength} characters.`;
        if (v && rules.pattern && !rules.pattern.test(v))      return rules.patternMessage || `${col.label} format is invalid.`;

        if (v && rules.pattern && col.label.toLowerCase().includes("email")) {
            const [local, domain] = v.split("@");
            if (!domain)                                        return "Email must contain an @ symbol.";
            if (local.startsWith(".") || local.endsWith("."))  return "Email cannot start or end with a dot.";
            if (local.includes(".."))                          return "Email cannot contain consecutive dots.";
            if (domain.startsWith("-") || domain.endsWith("-")) return "Email domain cannot start or end with a hyphen.";
            if (!domain.includes("."))                         return "Email domain must include a valid extension (e.g. .com).";
        }

        return "";
    };

    const validateAll = (formData) => {
        const errs = {};
        columns.forEach((col) => {
            const msg = validateField(col, formData[col.key]);
            if (msg) errs[col.key] = msg;
        });
        return errs;
    };

    const handleDelete = (index) => {
        if (window.confirm("Delete this record?")) {
            const copy = [...rows];
            copy.splice(index, 1);
            setRows(copy);
            if (editingIndex === index) {
                setEditingIndex(null); setForm({}); setErrors({}); setTouched({});
            }
        }
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setForm({ ...rows[index] });
        setErrors({});
        setTouched({});
    };

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (touched[key]) {
            const col = columns.find((c) => c.key === key);
            setErrors((prev) => ({ ...prev, [key]: validateField(col, value) }));
        }
    };

    const handleBlur = (col, value) => {
        setTouched((prev) => ({ ...prev, [col.key]: true }));
        setErrors((prev) => ({ ...prev, [col.key]: validateField(col, value) }));
    };

    const handleSave = () => {
        const allTouched = {};
        columns.forEach((c) => (allTouched[c.key] = true));
        setTouched(allTouched);
        const errs = validateAll(form);
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;
        const copy = [...rows];
        copy[editingIndex] = { ...form };
        setRows(copy);
        setEditingIndex(null); setForm({}); setErrors({}); setTouched({});
    };

    const handleCancel = () => {
        const isNew = columns.every((c) => !(rows[editingIndex]?.[c.key] || "").trim());
        if (isNew) {
            const copy = [...rows];
            copy.splice(editingIndex, 1);
            setRows(copy);
        }
        setEditingIndex(null); setForm({}); setErrors({}); setTouched({});
    };

    const handleAdd = () => {
        const empty = {};
        columns.forEach((c) => (empty[c.key] = ""));
        setRows([...rows, empty]);
        setEditingIndex(rows.length);
        setForm(empty);
        setErrors({});
        setTouched({});
    };

    const hasErrors = Object.values(errors).some(Boolean);

    return (
        <div className="p-4 md:p-10 bg-[#f1f5f4] min-h-screen text-slate-800 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-[#0a4d44] tracking-tight mb-1">{title}</h2>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            Overview & Management
                        </p>
                    </div>
                    <button
                        onClick={handleAdd}
                        disabled={editingIndex !== null}
                        className="bg-[#0a4d44] hover:bg-[#063b34] disabled:opacity-40 disabled:cursor-not-allowed
                            text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center
                            gap-2 transition-all active:scale-95 text-sm shadow-md"
                    >
                        <Plus size={16} /> {addLabel}
                    </button>
                </div>

                <div className="bg-[#fcfdfd] rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

                    {/* ── Desktop Table ── */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest w-10">#</th>
                                    {columns.map((col) => (
                                        <th key={col.key} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            {col.label}
                                            {col.validate?.required !== false && (
                                                <span className="text-rose-400 ml-0.5">*</span>
                                            )}
                                        </th>
                                    ))}
                                    <th className="px-6 py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {rows.map((row, i) => (
                                    <tr key={i} className={`transition-colors ${editingIndex === i ? "bg-emerald-50/30" : "hover:bg-[#f8faf9]"}`}>
                                        <td className="px-6 py-4 text-slate-400 font-medium text-xs align-top pt-5">{i + 1}</td>

                                        {columns.map((col) => (
                                            <td key={col.key} className="px-6 py-3 align-top">
                                                {editingIndex === i
                                                    ? renderInput({ col, value: form[col.key] ?? "", onChange: handleChange, onBlur: handleBlur, touched, errors, mobile: false })
                                                    : <span className="font-semibold text-slate-600 text-sm">{row[col.key] || "—"}</span>
                                                }
                                            </td>
                                        ))}

                                        <td className="px-6 py-4 text-center align-top pt-5">
                                            <div className="flex justify-center gap-3">
                                                {editingIndex === i ? (
                                                    <>
                                                        <button onClick={handleSave} title="Save"
                                                            className={`transition-transform ${hasErrors ? "opacity-40 cursor-not-allowed" : "text-emerald-600 hover:scale-110"}`}>
                                                            <Save size={18} />
                                                        </button>
                                                        <button onClick={handleCancel} title="Cancel"
                                                            className="text-slate-400 hover:text-rose-400 transition-all hover:scale-110">
                                                            <X size={18} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button onClick={() => handleEdit(i)} disabled={editingIndex !== null}
                                                        className="text-slate-400 hover:text-[#7ec1e5] transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                                                        <Edit size={16} />
                                                    </button>
                                                )}
                                                <button onClick={() => handleDelete(i)}
                                                    disabled={editingIndex !== null && editingIndex !== i}
                                                    className="text-slate-400 hover:text-rose-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {rows.length === 0 && (
                                    <tr>
                                        <td colSpan={columns.length + 2} className="px-6 py-12 text-center text-slate-400 text-sm font-medium">
                                            No records yet. Click "{addLabel}" to add one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ── Mobile Cards ── */}
                    <div className="md:hidden p-4 space-y-4">
                        {rows.map((row, i) => (
                            <div key={i} className={`border rounded-2xl p-5 shadow-sm transition-colors
                                ${editingIndex === i ? "bg-emerald-50/40 border-emerald-100" : "bg-white border-slate-100"}`}>
                                <div className="space-y-3">
                                    {columns.map((col) => (
                                        <div key={col.key} className="border-b border-slate-50 pb-2">
                                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">
                                                {col.label}
                                                {col.validate?.required !== false && (
                                                    <span className="text-rose-400 ml-0.5">*</span>
                                                )}
                                            </p>
                                            {editingIndex === i
                                                ? renderInput({ col, value: form[col.key] ?? "", onChange: handleChange, onBlur: handleBlur, touched, errors, mobile: true })
                                                : <p className="text-slate-600 font-bold text-xs">{row[col.key] || "—"}</p>
                                            }
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={editingIndex === i ? handleSave : () => handleEdit(i)}
                                        disabled={editingIndex !== null && editingIndex !== i}
                                        className="flex-1 text-[10px] font-bold uppercase tracking-widest text-[#0a4d44] bg-emerald-50 py-2 rounded-lg disabled:opacity-40">
                                        {editingIndex === i ? "Save" : "Edit"}
                                    </button>
                                    {editingIndex === i && (
                                        <button onClick={handleCancel}
                                            className="flex-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-100 py-2 rounded-lg">
                                            Cancel
                                        </button>
                                    )}
                                    <button onClick={() => handleDelete(i)}
                                        disabled={editingIndex !== null && editingIndex !== i}
                                        className="flex-1 text-[10px] font-bold uppercase tracking-widest text-rose-500 bg-rose-50 py-2 rounded-lg disabled:opacity-40">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                        {rows.length === 0 && (
                            <p className="text-center text-slate-400 text-sm font-medium py-8">
                                No records yet. Click "{addLabel}" to add one.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}