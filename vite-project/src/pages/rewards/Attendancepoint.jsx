// import { useState, useMemo } from "react";

// const rawData = Array.from({ length: 173 * 10 }, (_, i) => {
//   const names = [
//     "Jonathan Ibrahim Shekh", "Maisha Lucy Zamora Gonzales",
//     "Honorato Imogene Curry Terry", "Amy Aphrodite Zamora Peck",
//     "Arnika Paula Roach Mcmillan", "David Chen Wei", "Sofia Martinez Luna",
//     "Priya Sharma Patel", "James Oliver Brown", "Fatima Al-Hassan Noor"
//   ];
//   const dates = [
//     "2026-03-11", "2026-03-10", "2026-03-09", "2026-03-08",
//     "2026-03-07", "2026-03-06", "2026-03-05", "2026-03-04"
//   ];
//   const times = ["15:39","11:22","11:21","21:35","21:26","04:11","00:20","11:03","01:12","09:45"];
//   const points = [0, 0, 0, 0, 0, 5, 0, 0, 5, 0];
//   return {
//     id: i + 1,
//     employee: names[i % names.length],
//     inTime: times[i % times.length],
//     points: points[i % points.length],
//     date: dates[i % dates.length],
//   };
// });

// const TOTAL = rawData.length;

// function SortIcon({ active, dir }) {
//   return (
    
//     <span style={{ marginLeft: 4, opacity: active ? 1 : 0.35, fontSize: 11, color: active ? "#2d8a4e" : "#888" }}>
//       {active ? (dir === "asc" ? "↑" : "↓") : "↑↓"}
//     </span>
//   );
// }

// const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

// export default function AttendancePoints() {
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [sortKey, setSortKey] = useState("id");
//   const [sortDir, setSortDir] = useState("asc");

//   const handleSort = (key) => {
//     if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
//     else { setSortKey(key); setSortDir("asc"); }
//     setPage(1);
//   };

//   const filtered = useMemo(() => {
//     const q = search.toLowerCase();
//     return rawData.filter(r =>
//       r.employee.toLowerCase().includes(q) ||
//       r.inTime.includes(q) ||
//       String(r.points).includes(q) ||
//       r.date.includes(q)
//     );
//   }, [search]);

//   const sorted = useMemo(() => {
//     return [...filtered].sort((a, b) => {
//       const av = a[sortKey], bv = b[sortKey];
//       if (av < bv) return sortDir === "asc" ? -1 : 1;
//       if (av > bv) return sortDir === "asc" ? 1 : -1;
//       return 0;
//     });
//   }, [filtered, sortKey, sortDir]);

//   const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
//   const safePage = Math.min(page, totalPages);
//   const paginated = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

//   const getPageNums = () => {
//     const pages = [];
//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
//       pages.push(1);
//       if (safePage > 3) pages.push("...");
//       for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) pages.push(i);
//       if (safePage < totalPages - 2) pages.push("...");
//       pages.push(totalPages);
//     }
//     return pages;
//   };

//   const showFrom = sorted.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
//   const showTo = Math.min(safePage * pageSize, sorted.length);

//   const pBtn = (active, disabled) => ({
//     padding: "7px 13px", borderRadius: 6,
//     border: "1px solid #d1d5db",
//     background: active ? "#2d8a4e" : "#fff",
//     color: active ? "#fff" : disabled ? "#bbb" : "#333",
//     cursor: disabled ? "not-allowed" : "pointer",
//     fontSize: 13, fontWeight: 600,
//     opacity: disabled ? 0.5 : 1,
//     minWidth: 36, textAlign: "center"
//   }
  
// );

//   return (
//     <>
//       <style>{`
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         body { font-family: 'Segoe UI', sans-serif; }

//         .ap-wrap { background: #eef0f3; min-height: 100vh; padding: 20px 12px; }

//         .ap-card {
//           background: #fff; border-radius: 12px;
//           padding: 24px 20px; max-width: 1200px;
//           margin: 0 auto; box-shadow: 0 1px 6px rgba(0,0,0,0.08);
//         }

//         .ap-title { font-size: 20px; font-weight: 700; color: #1a1a1a; margin-bottom: 20px; }

//         .ap-controls {
//           display: flex; justify-content: space-between;
//           align-items: center; flex-wrap: wrap;
//           gap: 10px; margin-bottom: 16px; font-size: 14px; color: #555;
//         }

//         .ap-controls select, .ap-search {
//           border: 1px solid #d1d5db; border-radius: 5px;
//           padding: 5px 9px; font-size: 14px; outline: none;
//         }
//         .ap-search { width: 180px; }
//         .ap-search:focus { border-color: #2d8a4e; box-shadow: 0 0 0 3px rgba(45,138,78,0.12); }

//         /* Table */
//         .ap-table-wrap { display: block; }
//         .ap-table { width: 100%; border-collapse: collapse; font-size: 14px; }
//         .ap-table thead { background: #f9fafb; border-bottom: 2px solid #e5e7eb; }
//         .ap-table th {
//           padding: 11px 14px; text-align: left; font-weight: 700;
//           color: #374151; cursor: pointer; user-select: none; white-space: nowrap;
//         }
//         .ap-table th:first-child { width: 60px; text-align: center; }
//         .ap-table td { padding: 11px 14px; color: #1a1a1a; border-bottom: 1px solid #f0f0f0; }
//         .ap-table td:first-child { text-align: center; color: #666; }
//         .ap-table tr:nth-child(even) td { background: #f9fafb; }
//         .ap-table tr:hover td { background: #f0fdf4; }

//         /* Mobile cards */
//         .ap-cards { display: none; flex-direction: column; gap: 10px; }

//         .ap-mob-card {
//           background: #f9fafb; border: 1px solid #e5e7eb;
//           border-radius: 10px; padding: 14px 16px;
//         }
//         .ap-mob-row {
//           display: flex; justify-content: space-between;
//           align-items: center; padding: 6px 0;
//           border-bottom: 1px solid #eee; font-size: 13px;
//         }
//         .ap-mob-row:last-child { border-bottom: none; padding-bottom: 0; }
//         .ap-mob-label { font-weight: 600; color: #64748b; }
//         .ap-mob-val { color: #1a1a1a; text-align: right; max-width: 60%; word-break: break-word; }

//         /* Footer */
//         .ap-footer {
//           display: flex; justify-content: space-between;
//           align-items: center; margin-top: 18px;
//           flex-wrap: wrap; gap: 10px;
//         }
//         .ap-footer-info { font-size: 13px; color: #666; }
//         .ap-pages { display: flex; gap: 4px; flex-wrap: wrap; align-items: center; }

//         @media (max-width: 620px) {
//           .ap-card { padding: 16px 12px; }
//           .ap-title { font-size: 17px; }
//           .ap-table-wrap { display: none; }
//           .ap-cards { display: flex; }
//           .ap-controls { flex-direction: column; align-items: stretch; }
//           .ap-search { width: 100%; }
//           .ap-footer { flex-direction: column; align-items: flex-start; }
//           .ap-pages { width: 100%; justify-content: flex-start; }
//         }
//       `}</style>

//       <div className="ap-wrap">
//         <div className="ap-card">
//           <div className="ap-title">Attendance points</div>

//           {/* Controls */}
//           <div className="ap-controls">
//             <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//               Show
//               <select value={pageSize} onChange={e => { setPageSize(+e.target.value); setPage(1); }}>
//                 {PAGE_SIZE_OPTIONS.map(n => <option key={n}>{n}</option>)}
//               </select>
//               entries
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//               Search:
//               <input
//                 className="ap-search"
//                 value={search}
//                 onChange={e => { setSearch(e.target.value); setPage(1); }}
//                 placeholder=""
//               />
//             </div>
//           </div>

//           {/* Desktop Table */}
//           <div className="ap-table-wrap">
//             <table className="ap-table">
//               <thead>
//                 <tr>
//                   <th onClick={() => handleSort("id")}>
//                     Sl <SortIcon active={sortKey === "id"} dir={sortDir} />
//                   </th>
//                   <th onClick={() => handleSort("employee")}>
//                     Employee <SortIcon active={sortKey === "employee"} dir={sortDir} />
//                   </th>
//                   <th onClick={() => handleSort("inTime")}>
//                     In time <SortIcon active={sortKey === "inTime"} dir={sortDir} />
//                   </th>
//                   <th onClick={() => handleSort("points")}>
//                     Points <SortIcon active={sortKey === "points"} dir={sortDir} />
//                   </th>
//                   <th onClick={() => handleSort("date")}>
//                     Date <SortIcon active={sortKey === "date"} dir={sortDir} />
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginated.length === 0 ? (
//                   <tr><td colSpan={5} style={{ textAlign: "center", padding: 40, color: "#999" }}>No records found</td></tr>
//                 ) : paginated.map((row, idx) => (
//                   <tr key={row.id}>
//                     <td>{(safePage - 1) * pageSize + idx + 1}</td>
//                     <td>{row.employee}</td>
//                     <td>{row.inTime}</td>
//                     <td>{row.points}</td>
//                     <td>{row.date}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="ap-cards">
//             {paginated.length === 0 ? (
//               <div style={{ textAlign: "center", padding: 40, color: "#999" }}>No records found</div>
//             ) : paginated.map((row, idx) => (
//               <div className="ap-mob-card" key={row.id}>
//                 <div className="ap-mob-row">
//                   <span className="ap-mob-label">Sl</span>
//                   <span className="ap-mob-val">{(safePage - 1) * pageSize + idx + 1}</span>
//                 </div>
//                 <div className="ap-mob-row">
//                   <span className="ap-mob-label">Employee</span>
//                   <span className="ap-mob-val">{row.employee}</span>
//                 </div>
//                 <div className="ap-mob-row">
//                   <span className="ap-mob-label">In time</span>
//                   <span className="ap-mob-val">{row.inTime}</span>
//                 </div>
//                 <div className="ap-mob-row">
//                   <span className="ap-mob-label">Points</span>
//                   <span className="ap-mob-val">{row.points}</span>
//                 </div>
//                 <div className="ap-mob-row">
//                   <span className="ap-mob-label">Date</span>
//                   <span className="ap-mob-val">{row.date}</span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Footer */}
//           <div className="ap-footer">
//             <span className="ap-footer-info">
//               Showing {showFrom} to {showTo} of {sorted.length} entries
//             </span>
//             <div className="ap-pages">
//               <button
//                 onClick={() => setPage(p => Math.max(1, p - 1))}
//                 disabled={safePage === 1}
//                 style={pBtn(false, safePage === 1)}
//               >Previous</button>

//               {getPageNums().map((n, i) =>
//                 n === "..." ? (
//                   <span key={`dots-${i}`} style={{ padding: "7px 4px", fontSize: 13, color: "#888" }}>...</span>
//                 ) : (
//                   <button key={n} onClick={() => setPage(n)} style={pBtn(n === safePage, false)}>{n}</button>
//                 )
//               )}

//               <button
//                 onClick={() => setPage(p => Math.min(totalPages, p + 1))}
//                 disabled={safePage === totalPages}
//                 style={pBtn(false, safePage === totalPages)}
//               >Next</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import { useState, useMemo } from "react";

// Generate 1729 entries
const names = [
  "Jonathan Ibrahim Shekh", "Maisha Lucy Zamora Gonzales", "Honorato Imogene Curry Terry",
  "Amy Aphrodite Zamora Peck", "Kristen Lillith Stout Rodriquez", "Arnika Paula Roach Mcmillan",
  "Scarlet Melvin Reese Rogers", "Marcus Eliot Barnes", "Diana Rose Fletcher",
  "Leonard Victor Shaw", "Priya Sunita Mehta", "Carlos Eduardo Reyes",
  "Olivia Grace Bennett", "Samuel James Okafor", "Yuki Haruto Nakamura",
  "Isabella Marie Costa", "Thomas Andrew Kelley", "Fatima Al-Hassan",
];

const times = ["00:20","01:12","04:11","05:30","08:45","09:00","09:15","10:30","11:03","11:21","11:22","12:00","13:45","15:39","16:20","17:00","18:30","19:45","20:10","21:26","21:35","22:00","23:15"];

function generateDate(i) {
  const base = new Date("2026-03-11");
  base.setDate(base.getDate() - Math.floor(i / 3));
  return base.toISOString().split("T")[0];
}

const allData = Array.from({ length: 1729 }, (_, i) => ({
  id: i + 1,
  name: names[i % names.length],
  inTime: times[i % times.length],
  points: i % 5 === 0 ? 5 : i % 7 === 0 ? 10 : 0,
  date: generateDate(i),
}));

const ITEMS_PER_PAGE = 10;

function SortIcon() {
  return (
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" style={{ marginLeft: 4, verticalAlign: "middle", opacity: 0.45 }}>
      <path d="M5 0L9.33 5H0.67L5 0Z" fill="#555"/>
      <path d="M5 14L0.67 9H9.33L5 14Z" fill="#555"/>
    </svg>
  );
}

export default function AttendancePoints() {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return allData;
    return allData.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.inTime.includes(q) ||
      String(r.points).includes(q) ||
      r.date.includes(q)
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / entriesPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * entriesPerPage, safePage * entriesPerPage);

  const getPageNums = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (safePage <= 3) return [1, 2, 3, 4, 5, "...", totalPages];
    if (safePage >= totalPages - 2) return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", safePage - 1, safePage, safePage + 1, "...", totalPages];
  };

  const goTo = (p) => { if (typeof p === "number") setCurrentPage(p); };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        .ap-wrap { background: #f0f2f5; min-height: 100vh; padding: 28px; font-family: 'Segoe UI', sans-serif; }
        .ap-card { background: #fff; border-radius: 12px; padding: 28px 32px; box-shadow: 0 1px 6px rgba(0,0,0,0.08); }
        .ap-title { font-size: 20px; font-weight: 700; color: #111; margin: 0 0 24px; }
        .ap-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px; }
        .ap-show { font-size: 13px; color: #555; display: flex; align-items: center; gap: 6px; }
        .ap-show select { border: 1px solid #d1d5db; border-radius: 5px; padding: 4px 8px; font-size: 13px; cursor: pointer; }
        .ap-search { font-size: 13px; color: #555; display: flex; align-items: center; gap: 8px; }
        .ap-search input { border: 1px solid #d1d5db; border-radius: 5px; padding: 6px 10px; font-size: 13px; outline: none; width: 200px; }
        /* Table */
        .ap-table-wrap { overflow-x: auto; }
        .ap-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .ap-table thead tr { border-top: 1px solid #e5e7eb; border-bottom: 2px solid #e5e7eb; }
        .ap-table th { padding: 12px 16px; text-align: left; font-weight: 700; color: #111; white-space: nowrap; }
        .ap-table tbody tr { border-bottom: 1px solid #f0f0f0; }
        .ap-table tbody tr:nth-child(odd) { background: #fff; }
        .ap-table tbody tr:nth-child(even) { background: #f9fafb; }
        .ap-table td { padding: 11px 16px; color: #222; }
        .ap-table .td-sl { color: #555; text-align: center; width: 60px; }
        .ap-table .td-points { color: #16a34a; font-weight: 600; }
        /* Cards (mobile) */
        .ap-cards { display: none; flex-direction: column; gap: 12px; }
        .ap-row-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .ap-row-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .ap-row-card-sl { font-size: 11px; font-weight: 700; color: #fff; background: #16a34a; border-radius: 20px; padding: 3px 10px; }
        .ap-row-card-date { font-size: 12px; color: #6b7280; font-weight: 500; }
        .ap-row-card-name { font-size: 15px; font-weight: 700; color: #111; margin-bottom: 10px; }
        .ap-row-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .ap-row-card-item { background: #f9fafb; border-radius: 7px; padding: 8px 12px; }
        .ap-row-card-label { font-size: 11px; color: #9ca3af; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
        .ap-row-card-val { font-size: 14px; font-weight: 600; color: #222; }
        .ap-row-card-val.green { color: #16a34a; }
        /* Pagination */
        .ap-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; flex-wrap: wrap; gap: 12px; }
        .ap-info { font-size: 13px; color: #555; }
        .ap-pages { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; }
        .ap-pages button { padding: 7px 12px; border-radius: 6px; border: 1px solid #d1d5db; background: #fff; cursor: pointer; font-size: 13px; font-weight: 500; color: #333; min-width: 36px; transition: background 0.15s; }
        .ap-pages button:hover:not(:disabled):not(.active) { background: #f3f4f6; }
        .ap-pages button.active { background: #16a34a; color: #fff; font-weight: 700; border-color: #16a34a; }
        .ap-pages button:disabled { opacity: 0.45; cursor: not-allowed; }
        .ap-pages button.ellipsis { cursor: default; background: transparent; border: none; color: #9ca3af; }
        .ap-pages .prev-next { font-weight: 600; padding: 7px 14px; }
        /* Responsive */
        @media (max-width: 700px) {
          .ap-wrap { padding: 14px; }
          .ap-card { padding: 18px 16px; }
          .ap-title { font-size: 17px; }
          .ap-table-wrap { display: none; }
          .ap-cards { display: flex; }
          .ap-search input { width: 130px; }
          .ap-footer { flex-direction: column; align-items: flex-start; }
          .ap-pages { justify-content: center; width: 100%; }
        }
      `}</style>

      <div className="ap-wrap">
        <div className="ap-card">
          <h2 className="ap-title">Attendance points</h2>

          {/* Controls */}
          <div className="ap-controls">
            <div className="ap-show">
              Show&nbsp;
              <select value={entriesPerPage} onChange={e => { setEntriesPerPage(+e.target.value); setCurrentPage(1); }}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              &nbsp;entries
            </div>
            <div className="ap-search">
              Search:
              <input value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Search…" />
            </div>
          </div>

          {/* Table (desktop) */}
          <div className="ap-table-wrap">
            <table className="ap-table">
              <thead>
                <tr>
                  <th>Sl <SortIcon /></th>
                  <th>Employee <SortIcon /></th>
                  <th>In time <SortIcon /></th>
                  <th>Points <SortIcon /></th>
                  <th>Date <SortIcon /></th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0
                  ? <tr><td colSpan={5} style={{ textAlign: "center", padding: 40, color: "#999" }}>No records found</td></tr>
                  : paginated.map((row, idx) => (
                    <tr key={row.id}>
                      <td className="td-sl">{(safePage - 1) * entriesPerPage + idx + 1}</td>
                      <td>{row.name}</td>
                      <td>{row.inTime}</td>
                      <td className="td-points">{row.points}</td>
                      <td>{row.date}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          {/* Cards (mobile) */}
          <div className="ap-cards">
            {paginated.length === 0
              ? <div style={{ textAlign: "center", padding: 40, color: "#999" }}>No records found</div>
              : paginated.map((row, idx) => (
                <div className="ap-row-card" key={row.id}>
                  <div className="ap-row-card-header">
                    <span className="ap-row-card-sl">#{(safePage - 1) * entriesPerPage + idx + 1}</span>
                    <span className="ap-row-card-date">📅 {row.date}</span>
                  </div>
                  <div className="ap-row-card-name">{row.name}</div>
                  <div className="ap-row-card-grid">
                    <div className="ap-row-card-item">
                      <div className="ap-row-card-label">In Time</div>
                      <div className="ap-row-card-val">🕐 {row.inTime}</div>
                    </div>
                    <div className="ap-row-card-item">
                      <div className="ap-row-card-label">Points</div>
                      <div className={`ap-row-card-val ${row.points > 0 ? "green" : ""}`}>
                        {row.points > 0 ? "⭐ " : ""}{row.points}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Footer / Pagination */}
          <div className="ap-footer">
            <span className="ap-info">
              Showing {filtered.length === 0 ? 0 : (safePage - 1) * entriesPerPage + 1} to{" "}
              {Math.min(safePage * entriesPerPage, filtered.length)} of {filtered.length.toLocaleString()} entries
            </span>
            <div className="ap-pages">
              <button className="prev-next" onClick={() => goTo(safePage - 1)} disabled={safePage === 1}>Previous</button>
              {getPageNums().map((n, i) =>
                n === "..."
                  ? <button key={`e${i}`} className="ellipsis" disabled>…</button>
                  : <button key={n} className={n === safePage ? "active" : ""} onClick={() => goTo(n)}>{n}</button>
              )}
              <button className="prev-next" onClick={() => goTo(safePage + 1)} disabled={safePage === totalPages}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}