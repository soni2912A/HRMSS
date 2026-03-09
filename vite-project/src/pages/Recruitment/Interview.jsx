import React, { useState } from 'react';
import { Save, CheckCircle2, ClipboardList } from 'lucide-react';

const InterviewTable = () => {
    const [marks, setMarks] = useState({ viva: "", written: "", mcq: "" });
    const [status, setStatus] = useState("Pending");

    const total = Object.values(marks).reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);

    const maxScore = 300;
    const percentage = Math.min((total / maxScore) * 100, 100);
    const grade =
        percentage >= 80 ? { label: "Excellent", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" } :
        percentage >= 60 ? { label: "Good", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" } :
        percentage >= 40 ? { label: "Average", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" } :
        total > 0        ? { label: "Below Avg", color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-200" } :
                           { label: "—", color: "text-slate-400", bg: "bg-slate-50", border: "border-slate-200" };

    const handleInputChange = (field, value) => {
        if (value < 0) return;
        setMarks(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        if (total === 0) {
            alert("Please enter marks for at least one category.");
            return;
        }
        setStatus("Saved");
        setTimeout(() => setStatus("Pending"), 3000);
    };

    const fields = [
        { id: 'viva',    label: 'Viva Marks',    max: 100, icon: '🎤' },
        { id: 'written', label: 'Written',        max: 100, icon: '✍️' },
        { id: 'mcq',     label: 'MCQ',            max: 100, icon: '📝' },
    ];

    return (
        <div className="p-3 sm:p-5 md:p-8 bg-slate-50 min-h-screen flex justify-center items-start">
            <div className="w-full max-w-2xl">

                {/* ── Page header ── */}
                <div className="mb-5 sm:mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-slate-200 rounded-2xl
                        flex items-center justify-center shadow-sm flex-shrink-0">
                        <ClipboardList size={20} className="text-slate-600" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
                            Interview Assessment
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm font-medium mt-0.5">
                            Enter candidate performance metrics below.
                        </p>
                    </div>
                </div>

                {/* ── Main card ── */}
                <div className="bg-white rounded-[1.75rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                    <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">

                        {/* ── Mark inputs ── */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                            {fields.map((field) => (
                                <div key={field.id} className="bg-slate-50 rounded-2xl border border-slate-100 p-3 sm:p-4 space-y-2">
                                    <label
                                        htmlFor={field.id}
                                        className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest"
                                    >
                                        <span>{field.icon}</span>
                                        {field.label}
                                    </label>
                                    <input
                                        id={field.id}
                                        type="number"
                                        placeholder="0"
                                        min="0"
                                        max={field.max}
                                        className="w-full bg-white border border-slate-200 px-3 py-2.5 sm:py-3
                                            rounded-xl outline-none focus:ring-2 focus:ring-emerald-400/30
                                            focus:border-emerald-400 transition-all font-bold text-slate-700
                                            text-base sm:text-lg"
                                        value={marks[field.id]}
                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                    />
                                    <p className="text-[10px] text-slate-400 font-medium text-right">
                                        Max: {field.max}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* ── Score summary ── */}
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400
                                rounded-[1.75rem] blur opacity-20" />
                            <div className="relative bg-emerald-50 rounded-[1.25rem] border border-emerald-100 overflow-hidden">

                                {/* Progress bar */}
                                <div className="h-1.5 bg-emerald-100 w-full">
                                    <div
                                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>

                                <div className="p-4 sm:p-6 flex flex-col xs:flex-row items-start xs:items-center
                                    justify-between gap-3 sm:gap-4">
                                    <div className="min-w-0">
                                        <span className="block text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-0.5">
                                            Performance Score
                                        </span>
                                        <span className="font-bold text-emerald-900 text-sm sm:text-base">
                                            Grand Total Result
                                        </span>
                                        {/* Grade badge */}
                                        <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px]
                                            font-black uppercase border ${grade.bg} ${grade.color} ${grade.border}`}>
                                            {grade.label}
                                        </span>
                                    </div>

                                    <div className="flex items-baseline gap-1 flex-shrink-0">
                                        <span className="text-4xl sm:text-5xl font-black text-emerald-600 leading-none">
                                            {total}
                                        </span>
                                        <span className="text-sm font-bold text-emerald-400">
                                            /{maxScore}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Save button ── */}
                        <button
                            onClick={handleSave}
                            disabled={status === "Saved"}
                            className={`w-full py-3.5 sm:py-4 rounded-2xl font-black flex items-center
                                justify-center gap-2 sm:gap-3 transition-all active:scale-[0.98] shadow-lg
                                text-sm sm:text-base
                                ${status === "Saved"
                                    ? "bg-emerald-600 text-white cursor-default"
                                    : "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-200"
                                }`}
                        >
                            {status === "Pending" ? (
                                <>
                                    <Save size={18} />
                                    <span>Record Assessment</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 size={18} />
                                    <span>Result Saved Successfully</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <p className="text-center mt-4 sm:mt-6 text-slate-400 text-xs font-medium">
                    All entries are automatically time-stamped upon saving.
                </p>
            </div>
        </div>
    );
};

export default InterviewTable;