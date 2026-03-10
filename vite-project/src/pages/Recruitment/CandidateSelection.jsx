import React, { useState } from 'react';
import { Plus, FileText, Download, Edit, Trash2, X, Search, CheckCircle, Briefcase, AlertCircle } from 'lucide-react';

/* ── CDN loader ── */
const loadScript = (src) =>
    new Promise((res, rej) => {
        if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
        const s = document.createElement("script");
        s.src = src; s.onload = res; s.onerror = rej;
        document.head.appendChild(s);
    });

/* ── Validation rules ── */
const RULES = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 80,
        pattern: /^[a-zA-Z\s.'-]+$/,
        label: "Candidate Name",
        messages: {
            required: "Candidate name is required.",
            minLength: "Name must be at least 2 characters.",
            maxLength: "Name cannot exceed 80 characters.",
            pattern: "Name can only contain letters, spaces, and . ' - characters.",
        },
    },
    employeeId: {
        required: true,
        pattern: /^EMP-\d{3,6}$/,
        label: "Employee ID",
        messages: {
            required: "Employee ID is required.",
            pattern: "Must follow the format EMP-### (e.g. EMP-901).",
        },
    },
    candidateId: {
        required: true,
        pattern: /^\d{7,12}$/,
        label: "Candidate ID",
        messages: {
            required: "Candidate ID is required.",
            pattern: "Must be 7–12 digits (numbers only).",
        },
    },
    position: {
        required: true,
        minLength: 2,
        maxLength: 60,
        label: "Designation",
        messages: {
            required: "Designation is required.",
            minLength: "Designation must be at least 2 characters.",
            maxLength: "Designation cannot exceed 60 characters.",
        },
    },
};

const validateField = (field, value) => {
    const rule = RULES[field];
    if (!rule) return "";
    if (rule.required && !value.trim()) return rule.messages.required;
    if (rule.minLength && value.trim().length < rule.minLength) return rule.messages.minLength;
    if (rule.maxLength && value.trim().length > rule.maxLength) return rule.messages.maxLength;
    if (rule.pattern && !rule.pattern.test(value.trim())) return rule.messages.pattern;
    return "";
};

const validateAll = (formData) => {
    const errs = {};
    ["name", "employeeId", "candidateId", "position"].forEach((f) => {
        const msg = validateField(f, formData[f]);
        if (msg) errs[f] = msg;
    });
    return errs;
};

/* ── Field component ── */
const Field = ({ label, error, children }) => (
    <div className="space-y-1">
        <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-wider">{label}</label>
        {children}
        {error && (
            <p className="flex items-center gap-1 text-[11px] font-bold text-rose-500 ml-1 mt-0.5">
                <AlertCircle size={11} className="flex-shrink-0" /> {error}
            </p>
        )}
    </div>
);

const inputCls = (err) =>
    `w-full bg-slate-50 border ${err ? "border-rose-400 focus:ring-rose-100" : "border-slate-200 focus:ring-indigo-50"}
     p-3 sm:p-4 rounded-2xl outline-none focus:ring-4 font-medium text-sm sm:text-base transition-all`;

const CandidateSelection = () => {
    const [selections, setSelections] = useState([
        { id: 1, name: "Anastasia Whitney", candidateId: "2121895214", employeeId: "EMP-901", position: "DevOps", terms: "Full Time" },
        { id: 2, name: "Md Naim", candidateId: "5078176922", employeeId: "EMP-442", position: "Manager", terms: "Contract" },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({ id: null, name: "", candidateId: "", employeeId: "", position: "", terms: "Full Time" });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleOpenModal = (item = null) => {
        if (item) setFormData(item);
        else setFormData({ id: null, name: "", candidateId: "", employeeId: "", position: "", terms: "Full Time" });
        setErrors({});
        setTouched({});
        setIsModalOpen(true);
    };

    const handleChange = (field, value) => {
        const updated = { ...formData, [field]: value };
        setFormData(updated);
        if (touched[field]) {
            setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
        }
    };

    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        setErrors((prev) => ({ ...prev, [field]: validateField(field, formData[field]) }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Mark all fields touched
        setTouched({ name: true, employeeId: true, candidateId: true, position: true });
        const errs = validateAll(formData);
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        if (formData.id) {
            setSelections(selections.map((s) => (s.id === formData.id ? formData : s)));
        } else {
            // Duplicate EMP ID check
            if (selections.some((s) => s.employeeId === formData.employeeId)) {
                setErrors((prev) => ({ ...prev, employeeId: "This Employee ID already exists." }));
                return;
            }
            // Duplicate Candidate ID check
            if (selections.some((s) => s.candidateId === formData.candidateId)) {
                setErrors((prev) => ({ ...prev, candidateId: "This Candidate ID already exists." }));
                return;
            }
            setSelections([...selections, { ...formData, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Confirm deletion of this record?")) {
            setSelections(selections.filter((s) => s.id !== id));
        }
    };

    const filteredData = selections.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    /* ── Export CSV ── */
    const exportCSV = () => {
        const headers = ["Name", "Candidate ID", "Employee ID", "Position", "Terms"];
        const rows = filteredData.map((r) => [r.name, r.candidateId, r.employeeId, r.position, r.terms]);
        const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "Candidate_Selection.csv"; a.click();
        URL.revokeObjectURL(url);
    };

    /* ── Export Excel ── */
    const exportExcel = async () => {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js");
        const XLSX = window.XLSX;
        const rows = filteredData.map((r) => ({
            "Name": r.name,
            "Candidate ID": r.candidateId,
            "Employee ID": r.employeeId,
            "Position": r.position,
            "Terms": r.terms,
        }));
        const ws = XLSX.utils.json_to_sheet(rows);
        ws["!cols"] = [22, 14, 12, 18, 12].map((w) => ({ wch: w }));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Selections");
        XLSX.writeFile(wb, "Candidate_Selection.xlsx");
    };

    return (
        <div className="p-3 sm:p-4 md:p-8 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">

                {/* ── Header Card ── */}
                <div className="bg-white rounded-[2rem] p-4 sm:p-6 md:p-8 border border-slate-200 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                            <div className="w-11 h-11 sm:w-14 sm:h-14 bg-indigo-50 rounded-2xl flex items-center
                                justify-center text-indigo-600 border border-indigo-100 flex-shrink-0">
                                <Briefcase size={22} />
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900
                                    italic tracking-tighter leading-tight">Hiring Board</h2>
                                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-0.5">
                                    Selection Workflow
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleOpenModal()}
                            className="w-full sm:w-auto px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white
                                rounded-2xl font-black shadow-lg shadow-indigo-100 transition-all active:scale-95
                                flex items-center justify-center gap-2 text-sm whitespace-nowrap flex-shrink-0"
                        >
                            <Plus size={17} /> New Selection
                        </button>
                    </div>
                </div>

                {/* ── Toolbar ── */}
                <div className="bg-white rounded-[1.5rem] p-3 sm:p-4 border border-slate-200
                    flex flex-col sm:flex-row justify-between gap-3">
                    <div className="flex gap-2 flex-shrink-0">
                        <button
                            onClick={exportCSV}
                            className="px-3 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black
                                uppercase tracking-tighter flex items-center gap-1.5 whitespace-nowrap
                                hover:bg-slate-700 transition-colors active:scale-95"
                        >
                            <FileText size={13} /> CSV
                        </button>
                        <button
                            onClick={exportExcel}
                            className="px-3 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black
                                uppercase tracking-tighter flex items-center gap-1.5 whitespace-nowrap
                                hover:bg-slate-700 transition-colors active:scale-95"
                        >
                            <Download size={13} /> Excel
                        </button>
                    </div>
                    <div className="relative w-full sm:w-80 md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Find by name or EMP ID..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl
                                text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* ── Desktop Table ── */}
                <div className="hidden md:block bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left table-fixed">
                        <colgroup>
                            <col style={{ width: "30%" }} />
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "20%" }} />
                            <col style={{ width: "17%" }} />
                            <col style={{ width: "18%" }} />
                        </colgroup>
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                {["Candidate", "Employee ID", "Role", "Status", "Actions"].map((h, i) => (
                                    <th key={h} className={`p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest
                                        ${i === 3 ? "text-center" : i === 4 ? "text-right" : ""}`}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredData.map((item) => (
                                <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors group">
                                    <td className="p-5">
                                        <div className="font-black text-slate-800 text-base leading-tight truncate" title={item.name}>
                                            {item.name}
                                        </div>
                                        <div className="text-[11px] font-bold text-slate-400 mt-1 uppercase truncate">
                                            CID: {item.candidateId}
                                        </div>
                                    </td>
                                    <td className="p-5 font-mono text-indigo-600 font-bold truncate">{item.employeeId}</td>
                                    <td className="p-5">
                                        <span className="text-slate-600 font-medium truncate block" title={item.position}>{item.position}</span>
                                    </td>
                                    <td className="p-5 text-center">
                                        <span className="inline-block bg-emerald-50 text-emerald-600 border border-emerald-100
                                            px-3 py-1.5 rounded-full text-[10px] font-black uppercase max-w-full truncate">
                                            {item.terms}
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleOpenModal(item)}
                                                className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600
                                                    transition-colors border border-slate-100">
                                                <Edit size={15} />
                                            </button>
                                            <button onClick={() => handleDelete(item.id)}
                                                className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-rose-600
                                                    transition-colors border border-slate-100">
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredData.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-slate-400 font-medium text-sm">
                                        No records match your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ── Mobile Cards ── */}
                <div className="md:hidden space-y-3">
                    {filteredData.map((item) => (
                        <div key={item.id} className="bg-white border border-slate-200 rounded-[1.5rem] p-4 shadow-sm">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="min-w-0">
                                    <h3 className="font-black text-slate-800 text-base leading-tight break-words">{item.name}</h3>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 block">{item.position}</span>
                                </div>
                                <span className="bg-indigo-600 text-white px-2.5 py-1 rounded-lg text-[10px]
                                    font-black uppercase tracking-tighter whitespace-nowrap flex-shrink-0">
                                    {item.employeeId}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                    <p className="text-[9px] font-black text-slate-400 uppercase mb-0.5">Candidate ID</p>
                                    <p className="font-mono text-xs font-bold truncate">{item.candidateId}</p>
                                </div>
                                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                    <p className="text-[9px] font-black text-slate-400 uppercase mb-0.5">Hiring Terms</p>
                                    <p className="font-bold text-xs text-emerald-600 italic">{item.terms}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleOpenModal(item)}
                                    className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl font-black text-sm">Edit</button>
                                <button onClick={() => handleDelete(item.id)}
                                    className="flex-1 py-2.5 bg-rose-50 text-rose-600 rounded-xl font-black text-sm">Remove</button>
                            </div>
                        </div>
                    ))}
                    {filteredData.length === 0 && (
                        <p className="text-center text-slate-400 font-medium text-sm py-10">No records match your search.</p>
                    )}
                </div>
            </div>

            {/* ── Modal ── */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/70 flex items-center justify-center
                    z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-xl rounded-[2rem]
                        shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

                        {/* Modal header */}
                        <div className="px-5 sm:px-8 py-4 sm:py-6 border-b border-slate-100 flex justify-between
                            items-center bg-slate-50/50 flex-shrink-0">
                            <h3 className="font-black text-slate-800 text-lg sm:text-xl flex items-center gap-2 sm:gap-3">
                                <CheckCircle size={20} className="text-emerald-500 flex-shrink-0" />
                                {formData.id ? "Edit Record" : "Hiring Selection"}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <Field label="Candidate Name" error={touched.name && errors.name}>
                                    <input
                                        className={inputCls(touched.name && errors.name)}
                                        value={formData.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        onBlur={() => handleBlur("name")}
                                        placeholder="e.g. Rahul Sharma"
                                    />
                                </Field>

                                <Field label="Employee ID" error={touched.employeeId && errors.employeeId}>
                                    <input
                                        className={`${inputCls(touched.employeeId && errors.employeeId)} font-mono`}
                                        value={formData.employeeId}
                                        onChange={(e) => handleChange("employeeId", e.target.value.toUpperCase())}
                                        onBlur={() => handleBlur("employeeId")}
                                        placeholder="EMP-123"
                                    />
                                </Field>

                                <Field label="System Candidate ID" error={touched.candidateId && errors.candidateId}>
                                    <input
                                        className={`${inputCls(touched.candidateId && errors.candidateId)} font-mono`}
                                        value={formData.candidateId}
                                        onChange={(e) => handleChange("candidateId", e.target.value)}
                                        onBlur={() => handleBlur("candidateId")}
                                        placeholder="7–12 digit number"
                                        inputMode="numeric"
                                    />
                                </Field>

                                <Field label="Designation" error={touched.position && errors.position}>
                                    <input
                                        className={inputCls(touched.position && errors.position)}
                                        value={formData.position}
                                        onChange={(e) => handleChange("position", e.target.value)}
                                        onBlur={() => handleBlur("position")}
                                        placeholder="e.g. DevOps Engineer"
                                    />
                                </Field>

                                <div className="sm:col-span-2 space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-wider">
                                        Employment Terms
                                    </label>
                                    <select
                                        className="w-full bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-2xl
                                            outline-none focus:ring-4 focus:ring-indigo-50 font-bold text-sm sm:text-base"
                                        value={formData.terms}
                                        onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                                    >
                                        <option>Full Time</option>
                                        <option>Contract</option>
                                        <option>Probation</option>
                                        <option>Remote</option>
                                    </select>
                                </div>

                                {/* Summary error banner */}
                                {Object.values(errors).some(Boolean) && Object.keys(touched).length > 0 && (
                                    <div className="sm:col-span-2 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3
                                        flex items-center gap-2 text-rose-600 text-xs font-bold">
                                        <AlertCircle size={14} className="flex-shrink-0" />
                                        Please fix the errors above before submitting.
                                    </div>
                                )}

                                <button
                                    onClick={handleSave}
                                    className="sm:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white py-4
                                        rounded-2xl font-black text-base sm:text-lg shadow-xl shadow-indigo-100
                                        transition-all active:scale-[0.98]"
                                >
                                    Confirm Selection
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CandidateSelection;