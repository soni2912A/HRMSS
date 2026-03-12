// import { useState, useMemo, useEffect } from "react";

// const INITIAL_RULES = [
//   { id:1,  name:"Deduction",             type:"Deduction", amount:"10(%)",  startTime:"",      endTime:"",      onGross:false, onBasic:true,  status:"Active"   },
//   { id:2,  name:"Shift A",               type:"Time",      amount:"",       startTime:"06:17", endTime:"18:17", onGross:false, onBasic:false, status:"Active"   },
//   { id:3,  name:"Salary",                type:"Deduction", amount:"10(%)",  startTime:"",      endTime:"",      onGross:true,  onBasic:false, status:"Active"   },
//   { id:4,  name:"Basic 2",               type:"Basic",     amount:"3000",   startTime:"",      endTime:"",      onGross:false, onBasic:true,  status:"Active"   },
//   { id:5,  name:"Fix",                   type:"Basic",     amount:"1",      startTime:"",      endTime:"",      onGross:true,  onBasic:false, status:"Active"   },
//   { id:6,  name:"Employee",              type:"Time",      amount:"",       startTime:"16:27", endTime:"16:27", onGross:false, onBasic:false, status:"Active"   },
//   { id:7,  name:"Attendance Incentive",  type:"Allowance", amount:"9(%)",   startTime:"",      endTime:"",      onGross:true,  onBasic:false, status:"Active"   },
//   { id:8,  name:"New Client Connection", type:"Allowance", amount:"100",    startTime:"",      endTime:"",      onGross:true,  onBasic:false, status:"Active"   },
//   { id:9,  name:"Bvf",                   type:"Allowance", amount:"456(%)", startTime:"",      endTime:"",      onGross:true,  onBasic:false, status:"Active"   },
//   { id:10, name:"Basic Hour Rate",       type:"Basic",     amount:"3.5",    startTime:"",      endTime:"",      onGross:true,  onBasic:false, status:"Inactive" },
// ];

// const EMPTY_FORM = { name:"", type:"", amount:"", startTime:"", endTime:"", onGross:false, onBasic:false, status:true };

// const fmtTime = t => t ? t + ":00" : "—";

// /* ─── useIsMobile hook ─── */
// function useIsMobile() {
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   useEffect(() => {
//     const handler = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handler);
//     return () => window.removeEventListener("resize", handler);
//   }, []);
//   return isMobile;
// }

// /* ─── Badges ─── */
// function YesNoBadge({ val }) {
//   return (
//     <span style={{
//       display:"inline-block", padding:"3px 12px", borderRadius:4,
//       fontSize:12, fontWeight:600,
//       background: val ? "#16a34a" : "#ef4444", color:"#fff"
//     }}>
//       {val ? "Yes" : "No"}
//     </span>
//   );
// }

// function StatusBadge({ status }) {
//   return (
//     <span style={{
//       display:"inline-block", padding:"3px 12px", borderRadius:4,
//       fontSize:12, fontWeight:600,
//       background: status === "Active" ? "#16a34a" : "#ef4444", color:"#fff"
//     }}>
//       {status}
//     </span>
//   );
// }

// function SortIcon() {
//   return (
//     <span style={{ display:"inline-flex", flexDirection:"column", gap:1, opacity:0.45, marginLeft:4 }}>
//       <svg width="8" height="5" viewBox="0 0 8 5"><path d="M4 0L8 5H0z" fill="currentColor"/></svg>
//       <svg width="8" height="5" viewBox="0 0 8 5" style={{ transform:"rotate(180deg)" }}><path d="M4 0L8 5H0z" fill="currentColor"/></svg>
//     </span>
//   );
// }

// /* ─── Toggle ─── */
// function Toggle({ checked, onChange }) {
//   return (
//     <label style={{ position:"relative", width:38, height:20, display:"inline-block", cursor:"pointer" }}>
//       <input type="checkbox" checked={checked} onChange={onChange} style={{ opacity:0, width:0, height:0 }} />
//       <span style={{ position:"absolute", inset:0, background: checked ? "#16a34a" : "#cbd5e1", borderRadius:20, transition:".2s" }}>
//         <span style={{ position:"absolute", width:14, height:14, left: checked ? 21 : 3, bottom:3,
//                        background:"#fff", borderRadius:"50%", transition:".2s", boxShadow:"0 1px 2px rgba(0,0,0,.2)" }}/>
//       </span>
//     </label>
//   );
// }

// /* ─── Shared modal pieces ─── */
// function Overlay({ children, onClose }) {
//   return (
//     <div onClick={e => e.target === e.currentTarget && onClose()}
//       style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.45)", display:"flex",
//                alignItems:"center", justifyContent:"center", zIndex:999, padding:16 }}>
//       {children}
//     </div>
//   );
// }

// function ModalHeader({ title, onClose }) {
//   return (
//     <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
//                   padding:"16px 20px", borderBottom:"1px solid #e5e7eb" }}>
//       <span style={{ fontSize:15, fontWeight:600, color:"#1f2937" }}>{title}</span>
//       <button onClick={onClose}
//         style={{ width:28, height:28, border:"1px solid #e5e7eb", borderRadius:4,
//                  background:"#f9fafb", cursor:"pointer", display:"flex",
//                  alignItems:"center", justifyContent:"center", color:"#6b7280", fontSize:15 }}>✕</button>
//     </div>
//   );
// }

// function Btn({ variant, onClick, children }) {
//   const map = {
//     cancel: { background:"#f3f4f6", border:"1px solid #d1d5db", color:"#374151" },
//     save:   { background:"#16a34a", border:"none", color:"#fff" },
//     delete: { background:"#ef4444", border:"none", color:"#fff" },
//   };
//   return (
//     <button onClick={onClick}
//       style={{ flex:1, padding:"9px 0", borderRadius:4, fontFamily:"inherit",
//                fontSize:13, fontWeight:600, cursor:"pointer", transition:"opacity .15s", ...map[variant] }}
//       onMouseEnter={e => e.currentTarget.style.opacity=".82"}
//       onMouseLeave={e => e.currentTarget.style.opacity="1"}>
//       {children}
//     </button>
//   );
// }

// /* ─── Form Modal ─── */
// function FormModal({ editRule, onClose, onSave }) {
//   const [form, setForm] = useState(editRule ? { ...editRule, status: editRule.status === "Active" } : { ...EMPTY_FORM });
//   const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

//   const handleSave = () => {
//     if (!form.name.trim()) { alert("Please enter a rule name."); return; }
//     if (!form.type)        { alert("Please select a type.");     return; }
//     onSave({ ...form, status: form.status ? "Active" : "Inactive" });
//   };

//   const inp = { border:"1px solid #d1d5db", borderRadius:4, padding:"8px 10px",
//                 fontFamily:"inherit", fontSize:13, color:"#1f2937", width:"100%", outline:"none" };
//   const lbl = { fontSize:12, fontWeight:600, color:"#374151", marginBottom:4, display:"block" };
//   const row = { display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 };

//   return (
//     <Overlay onClose={onClose}>
//       <div style={{ background:"#fff", borderRadius:6, width:"100%", maxWidth:480,
//                     maxHeight:"90vh", overflowY:"auto", boxShadow:"0 20px 40px rgba(0,0,0,.18)" }}>
//         <ModalHeader title={editRule ? "Edit Setup Rule" : "Add Setup Rule"} onClose={onClose} />
//         <div style={{ padding:"20px 20px 0" }}>
//           <div style={{ marginBottom:14 }}>
//             <label style={lbl}>Name *</label>
//             <input style={inp} value={form.name} placeholder="Rule name" onChange={e => set("name", e.target.value)} />
//           </div>
//           <div style={row}>
//             <div>
//               <label style={lbl}>Type *</label>
//               <select style={{ ...inp, cursor:"pointer", appearance:"none",
//                 backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
//                 backgroundRepeat:"no-repeat", backgroundPosition:"right 10px center", paddingRight:28 }}
//                 value={form.type} onChange={e => set("type", e.target.value)}>
//                 <option value="">Select type</option>
//                 {["Deduction","Time","Basic","Allowance"].map(t => <option key={t} value={t}>{t}</option>)}
//               </select>
//             </div>
//             <div>
//               <label style={lbl}>Amount</label>
//               <input style={inp} value={form.amount} placeholder="e.g. 10(%) or 3000" onChange={e => set("amount", e.target.value)} />
//             </div>
//           </div>
//           <div style={row}>
//             <div>
//               <label style={lbl}>Start Time</label>
//               <input style={inp} type="time" value={form.startTime} onChange={e => set("startTime", e.target.value)} />
//             </div>
//             <div>
//               <label style={lbl}>End Time</label>
//               <input style={inp} type="time" value={form.endTime} onChange={e => set("endTime", e.target.value)} />
//             </div>
//           </div>
//           <div style={row}>
//             {[["On Gross","onGross"],["On Basic","onBasic"]].map(([label, key]) => (
//               <div key={key}>
//                 <label style={lbl}>{label}</label>
//                 <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
//                               border:"1px solid #d1d5db", borderRadius:4, padding:"7px 10px", background:"#f9fafb" }}>
//                   <span style={{ fontSize:13, color:"#374151" }}>Enable</span>
//                   <Toggle checked={form[key]} onChange={e => set(key, e.target.checked)} />
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div style={{ marginBottom:14 }}>
//             <label style={lbl}>Status</label>
//             <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
//                           border:"1px solid #d1d5db", borderRadius:4, padding:"7px 10px", background:"#f9fafb" }}>
//               <span style={{ fontSize:13, color:"#374151" }}>Active</span>
//               <Toggle checked={form.status} onChange={e => set("status", e.target.checked)} />
//             </div>
//           </div>
//         </div>
//         <div style={{ display:"flex", gap:10, padding:"12px 20px 20px" }}>
//           <Btn variant="cancel" onClick={onClose}>Cancel</Btn>
//           <Btn variant="save"   onClick={handleSave}>Save Rule</Btn>
//         </div>
//       </div>
//     </Overlay>
//   );
// }

// /* ─── Delete Modal ─── */
// function DeleteModal({ ruleName, onClose, onConfirm }) {
//   return (
//     <Overlay onClose={onClose}>
//       <div style={{ background:"#fff", borderRadius:6, width:"100%", maxWidth:420,
//                     boxShadow:"0 20px 40px rgba(0,0,0,.18)" }}>
//         <ModalHeader title="Delete Rule" onClose={onClose} />
//         <div style={{ textAlign:"center", padding:"20px 24px 0" }}>
//           <div style={{ width:56, height:56, background:"#fee2e2", borderRadius:"50%",
//                         display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
//             <svg width="24" height="24" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
//             </svg>
//           </div>
//           <p style={{ fontSize:15, fontWeight:700, color:"#1f2937", marginBottom:6 }}>Are you sure?</p>
//           <p style={{ fontSize:13, color:"#6b7280", lineHeight:1.6 }}>
//             You're about to delete <strong>"{ruleName}"</strong>.<br/>This cannot be undone.
//           </p>
//         </div>
//         <div style={{ display:"flex", gap:10, padding:"16px 24px 20px" }}>
//           <Btn variant="cancel" onClick={onClose}>Cancel</Btn>
//           <Btn variant="delete" onClick={onConfirm}>Yes, Delete</Btn>
//         </div>
//       </div>
//     </Overlay>
//   );
// }

// /* ─── PgBtn ─── */
// function PgBtn({ children, active, disabled, onClick }) {
//   return (
//     <button disabled={disabled} onClick={onClick}
//       style={{ minWidth:32, height:32, padding:"0 8px", borderRadius:4,
//                border: active ? "1px solid #16a34a" : "1px solid #d1d5db",
//                background: active ? "#16a34a" : "#fff",
//                color: active ? "#fff" : "#374151",
//                fontFamily:"inherit", fontSize:13, fontWeight: active ? 600 : 500,
//                cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1 }}>
//       {children}
//     </button>
//   );
// }

// /* ─── Mobile Rule Card ─── */
// function RuleCard({ rule, idx, onEdit, onDelete }) {
//   const fieldLabel = { fontSize:11, fontWeight:600, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.05em" };
//   const fieldVal   = { fontSize:13, fontWeight:500, color:"#374151", marginTop:2 };

//   return (
//     <div style={{ background:"#fff", borderRadius:8, border:"1px solid #e5e7eb",
//                   boxShadow:"0 1px 3px rgba(0,0,0,.07)", padding:16, marginBottom:12 }}>
//       {/* Card top row */}
//       <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
//         <div style={{ display:"flex", alignItems:"center", gap:10 }}>
//           <span style={{ width:26, height:26, background:"#f3f4f6", border:"1px solid #e5e7eb",
//                          borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
//                          fontSize:11, fontWeight:700, color:"#6b7280", flexShrink:0 }}>
//             {idx}
//           </span>
//           <span style={{ fontSize:15, fontWeight:700, color:"#1f2937" }}>{rule.name}</span>
//         </div>
//         <div style={{ display:"flex", gap:6 }}>
//           <button onClick={() => onEdit(rule)} title="Edit"
//             style={{ width:30, height:30, borderRadius:4, border:"1px solid #93c5fd",
//                      background:"#fff", color:"#2563eb", cursor:"pointer",
//                      display:"flex", alignItems:"center", justifyContent:"center" }}>
//             <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path strokeLinecap="round" d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
//             </svg>
//           </button>
//           <button onClick={() => onDelete(rule)} title="Delete"
//             style={{ width:30, height:30, borderRadius:4, border:"1px solid #fca5a5",
//                      background:"#fff5f5", color:"#ef4444", cursor:"pointer",
//                      display:"flex", alignItems:"center", justifyContent:"center" }}>
//             <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path strokeLinecap="round" d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Card fields grid 2-col */}
//       <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px 16px" }}>
//         <div>
//           <div style={fieldLabel}>Type</div>
//           <div style={fieldVal}>{rule.type}</div>
//         </div>
//         <div>
//           <div style={fieldLabel}>Amount</div>
//           <div style={fieldVal}>{rule.amount || "—"}</div>
//         </div>
//         <div>
//           <div style={fieldLabel}>Start Time</div>
//           <div style={fieldVal}>{fmtTime(rule.startTime)}</div>
//         </div>
//         <div>
//           <div style={fieldLabel}>End Time</div>
//           <div style={fieldVal}>{fmtTime(rule.endTime)}</div>
//         </div>
//         <div>
//           <div style={fieldLabel}>On Gross</div>
//           <div style={{ marginTop:4 }}><YesNoBadge val={rule.onGross} /></div>
//         </div>
//         <div>
//           <div style={fieldLabel}>On Basic</div>
//           <div style={{ marginTop:4 }}><YesNoBadge val={rule.onBasic} /></div>
//         </div>
//         <div style={{ gridColumn:"1 / -1" }}>
//           <div style={fieldLabel}>Status</div>
//           <div style={{ marginTop:4 }}><StatusBadge status={rule.status} /></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════
//    MAIN COMPONENT
// ══════════════════════════════════════════ */
// export default function SetupRules() {
//   const isMobile = useIsMobile();

//   const [rules,   setRules]   = useState(INITIAL_RULES);
//   const [perPage, setPerPage] = useState(10);
//   const [curPage, setCurPage] = useState(1);
//   const [search,  setSearch]  = useState("");
//   const [sortKey, setSortKey] = useState("");
//   const [sortAsc, setSortAsc] = useState(true);
//   const [modal,   setModal]   = useState(null);
//   const [nextId,  setNextId]  = useState(11);

//   const filtered = useMemo(() => {
//     const q = search.toLowerCase();
//     let data = rules.filter(r =>
//       r.name.toLowerCase().includes(q) || r.type.toLowerCase().includes(q) ||
//       r.amount.toLowerCase().includes(q) || r.status.toLowerCase().includes(q)
//     );
//     if (sortKey && sortKey !== "action") {
//       data = [...data].sort((a, b) => {
//         let av = a[sortKey], bv = b[sortKey];
//         if (typeof av === "boolean") { av = av ? 1 : 0; bv = bv ? 1 : 0; }
//         return (av < bv ? -1 : av > bv ? 1 : 0) * (sortAsc ? 1 : -1);
//       });
//     }
//     return data;
//   }, [rules, search, sortKey, sortAsc]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
//   const startIdx   = (curPage - 1) * perPage;
//   const page       = filtered.slice(startIdx, startIdx + perPage);

//   const goPage    = p => { if (p < 1 || p > totalPages) return; setCurPage(p); };
//   const handleSort= key => { if (sortKey === key) setSortAsc(a => !a); else { setSortKey(key); setSortAsc(true); } };

//   const handleSave = formData => {
//     if (modal.rule) {
//       setRules(rs => rs.map(r => r.id === modal.rule.id ? { ...r, ...formData } : r));
//     } else {
//       const newId = nextId;
//       setRules(rs => [...rs, { id: newId, ...formData }]);
//       setNextId(n => n + 1);
//       setCurPage(Math.ceil((filtered.length + 1) / perPage));
//     }
//     setModal(null);
//   };

//   const handleDelete = () => {
//     setRules(rs => rs.filter(r => r.id !== modal.rule.id));
//     setModal(null);
//   };

//   const showS = filtered.length ? startIdx + 1 : 0;
//   const showE = Math.min(startIdx + perPage, filtered.length);

//   const thStyle = key => ({
//     padding:"11px 14px", textAlign:"left", fontSize:13, fontWeight:600,
//     color:"#1f2937", whiteSpace:"nowrap", cursor:"pointer", userSelect:"none",
//     background: sortKey === key ? "#f0fdf4" : "transparent"
//   });

//   const inpStyle = { border:"1px solid #d1d5db", borderRadius:4, padding:"5px 10px",
//                      fontFamily:"inherit", fontSize:13, color:"#374151", outline:"none" };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
//         *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
//         body { font-family:'Inter',sans-serif; background:#f4f6f9; }
//         tbody tr:hover td { background:#f9fafb; }
//       `}</style>

//       {/* ── outer wrapper: 20% top margin ── */}
//       <div style={{ fontFamily:"'Inter',sans-serif", background:"#f4f6f9",
//                     minHeight:"100vh", paddingTop:"5%" }}>
//         <div style={{ background:"#fff", borderRadius:6,
//                       boxShadow:"0 1px 4px rgba(0,0,0,.1)",
//                       margin: isMobile ? "0 12px" : "0 24px",
//                       overflow:"hidden" }}>

//           {/* ── Header ── */}
//           <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
//                         padding:"16px 20px", borderBottom:"1px solid #e5e7eb",
//                         flexWrap:"wrap", gap:10 }}>
//             <span style={{ fontSize:15, fontWeight:600, color:"#1f2937" }}>Setup rules</span>
//             <button onClick={() => setModal({ type:"add" })}
//               style={{ display:"inline-flex", alignItems:"center", gap:6,
//                        background:"#16a34a", color:"#fff", border:"none", borderRadius:4,
//                        padding:"8px 16px", fontFamily:"inherit", fontSize:13,
//                        fontWeight:500, cursor:"pointer", whiteSpace:"nowrap" }}>
//               <span style={{ width:18, height:18, border:"2px solid #fff", borderRadius:"50%",
//                              display:"inline-flex", alignItems:"center", justifyContent:"center",
//                              fontSize:14, fontWeight:700, lineHeight:1 }}>+</span>
//               Add setup rule
//             </button>
//           </div>

//           {/* ── Toolbar ── */}
//           <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
//                         padding:"14px 20px 10px", flexWrap:"wrap", gap:10 }}>
//             <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#374151" }}>
//               Show
//               <select value={perPage} onChange={e => { setPerPage(+e.target.value); setCurPage(1); }}
//                 style={{ ...inpStyle, width:60, padding:"4px 6px", cursor:"pointer" }}>
//                 {[5,10,25,50].map(n => <option key={n} value={n}>{n}</option>)}
//               </select>
//               entries
//             </div>
//             <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#374151",
//                           width: isMobile ? "100%" : "auto" }}>
//               Search:
//               <input value={search} onChange={e => { setSearch(e.target.value); setCurPage(1); }}
//                 style={{ ...inpStyle, width: isMobile ? "100%" : 200 }} />
//             </div>
//           </div>

//           {/* ── TABLE (tablet + desktop) ── */}
//           {!isMobile && (
//             <div style={{ overflowX:"auto" }}>
//               <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13.5, minWidth:860 }}>
//                 <thead>
//                   <tr style={{ borderTop:"1px solid #e5e7eb", borderBottom:"1px solid #e5e7eb" }}>
//                     {[["Sl","idx"],["Name","name"],["Type","type"],["Amount","amount"],
//                       ["Start time","startTime"],["End time","endTime"],
//                       ["On gross","onGross"],["On basic","onBasic"],
//                       ["Status","status"],["Action","action"]
//                     ].map(([label, key]) => (
//                       <th key={key} onClick={() => handleSort(key)} style={thStyle(key)}>
//                         <span style={{ display:"inline-flex", alignItems:"center" }}>
//                           {label}<SortIcon />
//                         </span>
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {page.length === 0 ? (
//                     <tr>
//                       <td colSpan={10} style={{ textAlign:"center", padding:40, color:"#9ca3af", fontSize:13 }}>
//                         No matching records found.
//                       </td>
//                     </tr>
//                   ) : page.map((r, i) => (
//                     <tr key={r.id} style={{ borderBottom:"1px solid #f0f0f0" }}>
//                       <td style={{ padding:"11px 14px", color:"#6b7280", fontSize:13 }}>{startIdx + i + 1}</td>
//                       <td style={{ padding:"11px 14px" }}>{r.name}</td>
//                       <td style={{ padding:"11px 14px" }}>{r.type}</td>
//                       <td style={{ padding:"11px 14px" }}>{r.amount || "—"}</td>
//                       <td style={{ padding:"11px 14px" }}>{fmtTime(r.startTime)}</td>
//                       <td style={{ padding:"11px 14px" }}>{fmtTime(r.endTime)}</td>
//                       <td style={{ padding:"11px 14px" }}><YesNoBadge val={r.onGross} /></td>
//                       <td style={{ padding:"11px 14px" }}><YesNoBadge val={r.onBasic} /></td>
//                       <td style={{ padding:"11px 14px" }}><StatusBadge status={r.status} /></td>
//                       <td style={{ padding:"11px 14px" }}>
//                         <div style={{ display:"flex", gap:6 }}>
//                           <button onClick={() => setModal({ type:"edit", rule:r })} title="Edit"
//                             style={{ width:30, height:30, borderRadius:4, border:"1px solid #93c5fd",
//                                      background:"#fff", color:"#2563eb", cursor:"pointer",
//                                      display:"inline-flex", alignItems:"center", justifyContent:"center" }}>
//                             <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
//                             </svg>
//                           </button>
//                           <button onClick={() => setModal({ type:"delete", rule:r })} title="Delete"
//                             style={{ width:30, height:30, borderRadius:4, border:"1px solid #fca5a5",
//                                      background:"#fff5f5", color:"#ef4444", cursor:"pointer",
//                                      display:"inline-flex", alignItems:"center", justifyContent:"center" }}>
//                             <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
//                             </svg>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* ── CARDS (mobile) ── */}
//           {isMobile && (
//             <div style={{ padding:"12px 12px 0" }}>
//               {page.length === 0 ? (
//                 <p style={{ textAlign:"center", padding:32, color:"#9ca3af", fontSize:13 }}>
//                   No matching records found.
//                 </p>
//               ) : page.map((r, i) => (
//                 <RuleCard
//                   key={r.id}
//                   rule={r}
//                   idx={startIdx + i + 1}
//                   onEdit={rule => setModal({ type:"edit", rule })}
//                   onDelete={rule => setModal({ type:"delete", rule })}
//                 />
//               ))}
//             </div>
//           )}

//           {/* ── Footer ── */}
//           <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
//                         padding:"12px 20px 16px", borderTop:"1px solid #e5e7eb",
//                         flexWrap:"wrap", gap:10 }}>
//             <span style={{ fontSize:13, color:"#6b7280" }}>
//               Showing {showS} to {showE} of {filtered.length} entries
//             </span>
//             <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
//               <PgBtn disabled={curPage === 1} onClick={() => goPage(curPage - 1)}>Previous</PgBtn>
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
//                 <PgBtn key={p} active={p === curPage} onClick={() => goPage(p)}>{p}</PgBtn>
//               ))}
//               <PgBtn disabled={curPage === totalPages} onClick={() => goPage(curPage + 1)}>Next</PgBtn>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* ── Modals ── */}
//       {(modal?.type === "add" || modal?.type === "edit") && (
//         <FormModal editRule={modal.rule ?? null} onClose={() => setModal(null)} onSave={handleSave} />
//       )}
//       {modal?.type === "delete" && (
//         <DeleteModal ruleName={modal.rule.name} onClose={() => setModal(null)} onConfirm={handleDelete} />
//       )}
//     </>
//   );
// }


import { useState } from "react";

const initialData = [
  { id: 1, name: "Deduction", type: "Deduction", amount: "10(%)", startTime: "–", endTime: "–", onGross: false, onBasic: true, status: "Active" },
  { id: 2, name: "Shift A", type: "Time", amount: "–", startTime: "06:17:00", endTime: "18:17:00", onGross: false, onBasic: false, status: "Active" },
  { id: 3, name: "Salary", type: "Deduction", amount: "10(%)", startTime: "–", endTime: "–", onGross: true, onBasic: false, status: "Active" },
  { id: 4, name: "Basic 2", type: "Basic", amount: "3000", startTime: "–", endTime: "–", onGross: false, onBasic: true, status: "Active" },
  { id: 5, name: "Fix", type: "Basic", amount: "1", startTime: "–", endTime: "–", onGross: true, onBasic: false, status: "Active" },
  { id: 6, name: "Employee", type: "Time", amount: "–", startTime: "16:27:00", endTime: "16:27:00", onGross: false, onBasic: false, status: "Active" },
  { id: 7, name: "Attendance Incentive", type: "Allowance", amount: "9(%)", startTime: "–", endTime: "–", onGross: true, onBasic: false, status: "Active" },
  { id: 8, name: "New Client Connection", type: "Allowance", amount: "100", startTime: "–", endTime: "–", onGross: true, onBasic: false, status: "Active" },
  { id: 9, name: "Bvf", type: "Allowance", amount: "456(%)", startTime: "–", endTime: "–", onGross: true, onBasic: false, status: "Active" },
  { id: 10, name: "Basic Hour Rate", type: "Basic", amount: "3.5", startTime: "–", endTime: "–", onGross: true, onBasic: false, status: "Inactive" },
];

const emptyForm = { name: "", type: "Deduction", amount: "", startTime: "", endTime: "", onGross: false, onBasic: false, status: "Active" };
const PAGE_SIZE = 5;

export default function SetupRules() {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null); // null | { mode: 'add'|'edit', row }
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = data.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.type.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openAdd = () => { setForm(emptyForm); setModal({ mode: "add" }); };
  const openEdit = (row) => { setForm({ ...row }); setModal({ mode: "edit", row }); };
  const closeModal = () => setModal(null);

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (modal.mode === "add") {
      const newId = data.length ? Math.max(...data.map(d => d.id)) + 1 : 1;
      setData([...data, { ...form, id: newId }]);
    } else {
      setData(data.map(r => r.id === modal.row.id ? { ...form, id: modal.row.id } : r));
    }
    closeModal();
    setPage(1);
  };

  const handleDelete = (id) => {
    setData(data.filter(r => r.id !== id));
    setDeleteConfirm(null);
    setPage(1);
  };

  const Badge = ({ val, yes = "Yes", no = "No" }) => (
    <span style={{
      display: "inline-block", padding: "2px 10px", borderRadius: 4, fontSize: 12, fontWeight: 700,
      background: val ? "#16a34a" : "#dc2626", color: "#fff", minWidth: 36, textAlign: "center"
    }}>{val ? yes : no}</span>
  );

  const StatusBadge = ({ status }) => (
    <span style={{
      display: "inline-block", padding: "3px 12px", borderRadius: 4, fontSize: 12, fontWeight: 700,
      background: status === "Active" ? "#16a34a" : "#dc2626", color: "#fff"
    }}>{status}</span>
  );

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f8fafc", minHeight: "100vh", padding: "0" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 28px 10px 28px", background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1e293b" }}>Setup rules</h2>
        <button onClick={openAdd} style={{
          background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "9px 18px",
          fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6
        }}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>⊕</span> Add setup rule
        </button>
      </div>

      <div style={{ padding: "20px 28px" }}>
        {/* Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontSize: 14, color: "#475569" }}>
            Show <span style={{ border: "1px solid #d1d5db", borderRadius: 4, padding: "2px 8px", margin: "0 4px", background: "#fff" }}>10</span> entries
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <label style={{ fontSize: 14, color: "#475569" }}>Search:</label>
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              style={{ border: "1px solid #d1d5db", borderRadius: 4, padding: "5px 10px", fontSize: 14, outline: "none" }} />
          </div>
        </div>

        {/* Desktop/Tablet Table */}
        <div className="table-wrap" style={{ overflowX: "auto", background: "#fff", borderRadius: 8, boxShadow: "0 1px 4px #0001" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }} className="main-table">
            <thead>
              <tr style={{ background: "#f1f5f9", borderBottom: "2px solid #e2e8f0" }}>
                {["Sl", "Name", "Type", "Amount", "Start time", "End time", "On gross", "On basic", "Status", "Action"].map(h => (
                  <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 700, color: "#374151", whiteSpace: "nowrap", fontSize: 13 }}>
                    {h} {["Sl","Name","Type","Amount","Start time","End time","On gross","On basic","Status"].includes(h) ? <span style={{ color: "#9ca3af", fontSize: 10 }}>↕</span> : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 && (
                <tr><td colSpan={10} style={{ textAlign: "center", padding: 32, color: "#9ca3af" }}>No records found</td></tr>
              )}
              {paginated.map((row, i) => (
                <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                  <td style={{ padding: "11px 14px", color: "#374151" }}>{(page - 1) * PAGE_SIZE + i + 1}</td>
                  <td style={{ padding: "11px 14px", color: "#374151" }}>{row.name}</td>
                  <td style={{ padding: "11px 14px", color: "#374151" }}>{row.type}</td>
                  <td style={{ padding: "11px 14px", color: "#374151" }}>{row.amount || "–"}</td>
                  <td style={{ padding: "11px 14px", color: "#374151" }}>{row.startTime || "–"}</td>
                  <td style={{ padding: "11px 14px", color: "#374151" }}>{row.endTime || "–"}</td>
                  <td style={{ padding: "11px 14px" }}><Badge val={row.onGross} /></td>
                  <td style={{ padding: "11px 14px" }}><Badge val={row.onBasic} /></td>
                  <td style={{ padding: "11px 14px" }}><StatusBadge status={row.status} /></td>
                  <td style={{ padding: "11px 14px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => openEdit(row)} style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 5, padding: "5px 9px", cursor: "pointer", color: "#2563eb", fontSize: 15 }}>✏️</button>
                      <button onClick={() => setDeleteConfirm(row)} style={{ background: "#fff1f2", border: "1px solid #fecaca", borderRadius: 5, padding: "5px 9px", cursor: "pointer", color: "#dc2626", fontSize: 15 }}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="card-wrap" style={{ display: "none" }}>
          {paginated.length === 0 && <div style={{ textAlign: "center", padding: 32, color: "#9ca3af" }}>No records found</div>}
          {paginated.map((row, i) => (
            <div key={row.id} style={{ background: "#fff", borderRadius: 10, boxShadow: "0 1px 6px #0001", padding: "16px", marginBottom: 12, border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#1e293b" }}>{row.name}</div>
                  <div style={{ color: "#64748b", fontSize: 13 }}>{row.type}</div>
                </div>
                <StatusBadge status={row.status} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px", fontSize: 13, color: "#374151", marginBottom: 10 }}>
                <div><span style={{ color: "#94a3b8" }}>Amount: </span>{row.amount || "–"}</div>
                <div><span style={{ color: "#94a3b8" }}>Start: </span>{row.startTime || "–"}</div>
                <div><span style={{ color: "#94a3b8" }}>End: </span>{row.endTime || "–"}</div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ color: "#94a3b8" }}>Gross: </span><Badge val={row.onGross} />
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ color: "#94a3b8" }}>Basic: </span><Badge val={row.onBasic} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <button onClick={() => openEdit(row)} style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 6, padding: "7px 14px", cursor: "pointer", color: "#2563eb", fontWeight: 600, fontSize: 13 }}>✏️ Edit</button>
                <button onClick={() => setDeleteConfirm(row)} style={{ background: "#fff1f2", border: "1px solid #fecaca", borderRadius: 6, padding: "7px 14px", cursor: "pointer", color: "#dc2626", fontWeight: 600, fontSize: 13 }}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontSize: 13, color: "#64748b" }}>
            Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} entries
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              style={{ padding: "6px 14px", borderRadius: 5, border: "1px solid #d1d5db", background: "#fff", cursor: page === 1 ? "not-allowed" : "pointer", color: page === 1 ? "#9ca3af" : "#374151", fontWeight: 600, fontSize: 13 }}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, k) => k + 1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                style={{ padding: "6px 12px", borderRadius: 5, border: "1px solid #d1d5db", background: n === page ? "#16a34a" : "#fff", color: n === page ? "#fff" : "#374151", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              style={{ padding: "6px 14px", borderRadius: 5, border: "1px solid #d1d5db", background: "#16a34a", cursor: page === totalPages ? "not-allowed" : "pointer", color: "#fff", fontWeight: 600, fontSize: 13, opacity: page === totalPages ? 0.5 : 1 }}>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "#00000055", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 12, width: "100%", maxWidth: 520, boxShadow: "0 8px 32px #0003", padding: "28px 28px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1e293b" }}>
                {modal.mode === "add" ? "Add Setup Rule" : "Edit Setup Rule"}
              </h3>
              <button onClick={closeModal} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#64748b", lineHeight: 1 }}>×</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 16px" }}>
              {[
                { label: "Name", key: "name", type: "text", full: true },
                { label: "Type", key: "type", type: "select", opts: ["Deduction", "Basic", "Time", "Allowance"] },
                { label: "Amount", key: "amount", type: "text" },
                { label: "Start Time", key: "startTime", type: "time" },
                { label: "End Time", key: "endTime", type: "time" },
                { label: "Status", key: "status", type: "select", opts: ["Active", "Inactive"] },
              ].map(({ label, key, type, opts, full }) => (
                <div key={key} style={{ gridColumn: full ? "1 / -1" : undefined }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 5 }}>{label}</label>
                  {type === "select" ? (
                    <select value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                      style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 6, padding: "8px 10px", fontSize: 14, outline: "none", background: "#fff" }}>
                      {opts.map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                      style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 6, padding: "8px 10px", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                  )}
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" id="og" checked={form.onGross} onChange={e => setForm({ ...form, onGross: e.target.checked })} style={{ width: 16, height: 16, cursor: "pointer" }} />
                <label htmlFor="og" style={{ fontSize: 14, color: "#374151", cursor: "pointer" }}>On Gross</label>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" id="ob" checked={form.onBasic} onChange={e => setForm({ ...form, onBasic: e.target.checked })} style={{ width: 16, height: 16, cursor: "pointer" }} />
                <label htmlFor="ob" style={{ fontSize: 14, color: "#374151", cursor: "pointer" }}>On Basic</label>
              </div>
            </div>
            {!form.name.trim() && modal && <div style={{ color: "#dc2626", fontSize: 12, marginTop: 8 }}>Name is required.</div>}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
              <button onClick={closeModal} style={{ padding: "8px 20px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: "#374151" }}>Cancel</button>
              <button onClick={handleSave} style={{ padding: "8px 22px", borderRadius: 6, border: "none", background: "#16a34a", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                {modal.mode === "add" ? "Add" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "#00000055", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 12, width: "100%", maxWidth: 380, padding: "28px", textAlign: "center", boxShadow: "0 8px 32px #0003" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ margin: "0 0 8px", fontSize: 18, color: "#1e293b" }}>Delete Rule</h3>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 22 }}>Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This action cannot be undone.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: "8px 22px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontWeight: 600 }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm.id)} style={{ padding: "8px 22px", borderRadius: 6, border: "none", background: "#dc2626", color: "#fff", cursor: "pointer", fontWeight: 700 }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .table-wrap { display: none !important; }
          .card-wrap { display: block !important; }
        }
      `}</style>
    </div>
  );
}