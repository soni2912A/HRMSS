import { useState, useMemo } from "react";

const allData = [
  { id: 1, name: "Kristen Lillith Stout Rodriquez", attendance: null, collaborative: null, management: 0, total: 0, date: "May 2024" },
  { id: 2, name: "Arnika Paula Roach Mcmillan", attendance: null, collaborative: 1, management: null, total: 1, date: "May 2024" },
  { id: 3, name: "Scarlet Melvin Reese Rogers", attendance: null, collaborative: null, management: 0, total: 0, date: "June 2024" },
  { id: 4, name: "Scarlet Melvin Reese Rogers", attendance: null, collaborative: null, management: 0, total: 0, date: "May 2024" },
  { id: 5, name: "Jonathan Ibrahim Shekh", attendance: 5, collaborative: null, management: null, total: 5, date: "July 2025" },
  { id: 6, name: "Jonathan Ibrahim Shekh", attendance: 2, collaborative: null, management: null, total: 2, date: "March 2025" },
  { id: 7, name: "Jonathan Ibrahim Shekh", attendance: 1, collaborative: null, management: null, total: 1, date: "January 2025" },
  { id: 8, name: "Jonathan Ibrahim Shekh", attendance: 1, collaborative: null, management: null, total: 1, date: "September 2024" },
  { id: 9, name: "Amy Aphrodite Zamora Peck", attendance: 5, collaborative: null, management: null, total: 5, date: "August 2025" },
  { id: 10, name: "Amy Aphrodite Zamora Peck", attendance: 15, collaborative: null, management: null, total: 15, date: "July 2025" },
  { id: 11, name: "Marcus Eliot Barnes", attendance: 3, collaborative: 2, management: 1, total: 6, date: "June 2025" },
  { id: 12, name: "Diana Rose Fletcher", attendance: null, collaborative: 4, management: 2, total: 6, date: "May 2025" },
  { id: 13, name: "Leonard Victor Shaw", attendance: 8, collaborative: null, management: null, total: 8, date: "April 2025" },
  { id: 14, name: "Priya Sunita Mehta", attendance: 2, collaborative: 3, management: null, total: 5, date: "March 2025" },
  { id: 15, name: "Carlos Eduardo Reyes", attendance: null, collaborative: null, management: 4, total: 4, date: "February 2025" },
  { id: 16, name: "Olivia Grace Bennett", attendance: 10, collaborative: 1, management: null, total: 11, date: "January 2025" },
  { id: 17, name: "Samuel James Okafor", attendance: 6, collaborative: null, management: 3, total: 9, date: "December 2024" },
  { id: 18, name: "Yuki Haruto Nakamura", attendance: null, collaborative: 5, management: null, total: 5, date: "November 2024" },
  { id: 19, name: "Isabella Marie Costa", attendance: 7, collaborative: 2, management: 1, total: 10, date: "October 2024" },
  { id: 20, name: "Thomas Andrew Kelley", attendance: 4, collaborative: null, management: 2, total: 6, date: "September 2024" },
  { id: 21, name: "Fatima Al-Hassan", attendance: null, collaborative: 3, management: null, total: 3, date: "August 2024" },
  { id: 22, name: "Henry Patrick Walsh", attendance: 12, collaborative: null, management: null, total: 12, date: "July 2024" },
  { id: 23, name: "Nadia Sofia Petrov", attendance: 1, collaborative: 1, management: 1, total: 3, date: "June 2024" },
  { id: 24, name: "Blake Austin Monroe", attendance: null, collaborative: 6, management: 2, total: 8, date: "May 2024" },
  { id: 25, name: "Zara Imogen Clarke", attendance: 9, collaborative: null, management: null, total: 9, date: "April 2024" },
  { id: 26, name: "Ethan Cole Nguyen", attendance: 3, collaborative: 4, management: null, total: 7, date: "March 2024" },
  { id: 27, name: "Sophie Anne Dubois", attendance: null, collaborative: null, management: 5, total: 5, date: "February 2024" },
  { id: 28, name: "Rafael Antonio Lima", attendance: 5, collaborative: 2, management: 3, total: 10, date: "January 2024" },
  { id: 29, name: "Chloe Elizabeth Park", attendance: 2, collaborative: null, management: null, total: 2, date: "December 2023" },
  { id: 30, name: "Andre Pierre Martin", attendance: null, collaborative: 7, management: 1, total: 8, date: "November 2023" },
  { id: 31, name: "Mia Ruth Johnson", attendance: 4, collaborative: 3, management: null, total: 7, date: "October 2023" },
  { id: 32, name: "Owen Frederick Grant", attendance: 6, collaborative: null, management: 4, total: 10, date: "September 2023" },
  { id: 33, name: "Luna Victoria Cruz", attendance: null, collaborative: 2, management: 2, total: 4, date: "August 2023" },
  { id: 34, name: "Noah Sebastian Kim", attendance: 11, collaborative: null, management: null, total: 11, date: "July 2023" },
  { id: 35, name: "Aria Penelope Scott", attendance: 1, collaborative: 5, management: null, total: 6, date: "June 2023" },
  { id: 36, name: "Jack Daniel Murphy", attendance: null, collaborative: null, management: 3, total: 3, date: "May 2023" },
  { id: 37, name: "Elena Natasha Volkov", attendance: 8, collaborative: 1, management: 2, total: 11, date: "April 2023" },
  { id: 38, name: "Liam Connor Brady", attendance: 3, collaborative: null, management: null, total: 3, date: "March 2023" },
  { id: 39, name: "Hannah Grace Wright", attendance: null, collaborative: 4, management: 1, total: 5, date: "February 2023" },
  { id: 40, name: "Felix Anton Braun", attendance: 7, collaborative: 2, management: null, total: 9, date: "January 2023" },
  { id: 41, name: "Isla Fern Campbell", attendance: 2, collaborative: null, management: 4, total: 6, date: "December 2022" },
  { id: 42, name: "Mateo Santiago Rios", attendance: null, collaborative: 3, management: null, total: 3, date: "November 2022" },
  { id: 43, name: "Penelope Dawn Evans", attendance: 5, collaborative: 1, management: 2, total: 8, date: "October 2022" },
  { id: 44, name: "Caleb Joshua Turner", attendance: 9, collaborative: null, management: null, total: 9, date: "September 2022" },
  { id: 45, name: "Aurora May Robinson", attendance: null, collaborative: 6, management: 3, total: 9, date: "August 2022" },
  { id: 46, name: "Sebastian Drew Hall", attendance: 4, collaborative: 2, management: null, total: 6, date: "July 2022" },
  { id: 47, name: "Violet Lynn Adams", attendance: null, collaborative: null, management: 5, total: 5, date: "June 2022" },
  { id: 48, name: "Julian Marc Fontaine", attendance: 6, collaborative: 3, management: 1, total: 10, date: "May 2022" },
  { id: 49, name: "Stella Iris Morgan", attendance: 1, collaborative: null, management: null, total: 1, date: "April 2022" },
  { id: 50, name: "Damian Luke Porter", attendance: null, collaborative: 8, management: 2, total: 10, date: "March 2022" },
  { id: 51, name: "Genevieve Rose Lane", attendance: 10, collaborative: null, management: null, total: 10, date: "February 2022" },
  { id: 52, name: "Oscar Finn Sanderson", attendance: 3, collaborative: 1, management: 3, total: 7, date: "January 2022" },
  { id: 53, name: "Celeste Pearl Young", attendance: null, collaborative: 4, management: null, total: 4, date: "December 2021" },
  { id: 54, name: "Dominic Ray Stone", attendance: 7, collaborative: null, management: 2, total: 9, date: "November 2021" },
  { id: 55, name: "Freya Elise Larsen", attendance: 2, collaborative: 3, management: null, total: 5, date: "October 2021" },
  { id: 56, name: "Tobias Karl Richter", attendance: null, collaborative: null, management: 6, total: 6, date: "September 2021" },
  { id: 57, name: "Nora Beatrice Flynn", attendance: 5, collaborative: 2, management: 1, total: 8, date: "August 2021" },
  { id: 58, name: "Elias John Christensen", attendance: 4, collaborative: null, management: null, total: 4, date: "July 2021" },
  { id: 59, name: "Rosalie Faye Thornton", attendance: null, collaborative: 5, management: 3, total: 8, date: "June 2021" },
  { id: 60, name: "Atticus Reed Warner", attendance: 8, collaborative: 1, management: null, total: 9, date: "May 2021" },
  { id: 61, name: "Evangeline Sky Fischer", attendance: null, collaborative: null, management: 4, total: 4, date: "April 2021" },
  { id: 62, name: "Jasper Leo Hoffman", attendance: 6, collaborative: 2, management: 2, total: 10, date: "March 2021" },
  { id: 63, name: "Seraphina Blue Walsh", attendance: 3, collaborative: null, management: null, total: 3, date: "February 2021" },
  { id: 64, name: "Beckett Cole Harmon", attendance: null, collaborative: 3, management: 1, total: 4, date: "January 2021" },
  { id: 65, name: "Lyra Dawn Simmons", attendance: 9, collaborative: null, management: null, total: 9, date: "December 2020" },
  { id: 66, name: "Dorian Max Pierce", attendance: 1, collaborative: 4, management: 2, total: 7, date: "November 2020" },
  { id: 67, name: "Corinna Belle Ashford", attendance: null, collaborative: null, management: 5, total: 5, date: "October 2020" },
  { id: 68, name: "Theron James Locke", attendance: 7, collaborative: 1, management: null, total: 8, date: "September 2020" },
  { id: 69, name: "Selene Ivy Chambers", attendance: 2, collaborative: null, management: 3, total: 5, date: "August 2020" },
  { id: 70, name: "Rafferty Oak Dalton", attendance: null, collaborative: 6, management: null, total: 6, date: "July 2020" },
  { id: 71, name: "Zephyr Blue Nash", attendance: 5, collaborative: 2, management: 1, total: 8, date: "June 2020" },
  { id: 72, name: "Clover Rose Holt", attendance: 4, collaborative: null, management: 4, total: 8, date: "May 2020" },
  { id: 73, name: "Stellan Finn Burke", attendance: null, collaborative: 3, management: null, total: 3, date: "April 2020" },
  { id: 74, name: "Isadora Grey Vale", attendance: 8, collaborative: null, management: 2, total: 10, date: "March 2020" },
  { id: 75, name: "Peregrine Cole Marsh", attendance: 3, collaborative: 1, management: null, total: 4, date: "February 2020" },
  { id: 76, name: "Vesper Dawn Cross", attendance: null, collaborative: 5, management: 3, total: 8, date: "January 2020" },
  { id: 77, name: "Caspian Rex Ford", attendance: 6, collaborative: null, management: null, total: 6, date: "December 2019" },
  { id: 78, name: "Ondine Pearl West", attendance: 2, collaborative: 4, management: 2, total: 8, date: "November 2019" },
];

function SortIcon() {
  return (
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" style={{ marginLeft: 4, verticalAlign: "middle", opacity: 0.5 }}>
      <path d="M5 0L9 5H1L5 0Z" fill="#555"/>
      <path d="M5 14L1 9H9L5 14Z" fill="#555"/>
    </svg>
  );
}

export default function EmployeePoints() {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filtered = useMemo(() => {
    return allData.filter(row => {
      const matchSearch = search === "" ||
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.date.toLowerCase().includes(search.toLowerCase()) ||
        String(row.total).includes(search);
      const matchName = filterName === "" || row.name.toLowerCase().includes(filterName.toLowerCase());
      const matchDate = filterDate === "" || row.date.toLowerCase().includes(filterDate.toLowerCase());
      return matchSearch && matchName && matchDate;
    });
  }, [search, filterName, filterDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / entriesPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * entriesPerPage, safePage * entriesPerPage);

  const getPageNums = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (safePage <= 3) return [1, 2, 3, 4, 5, "...", totalPages];
    if (safePage >= totalPages - 2) return [1, "...", totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages];
    return [1, "...", safePage - 1, safePage, safePage + 1, "...", totalPages];
  };

  const exportCSV = () => {
    const headers = ["Sl,Employee name,Attendance points,Collaborative points,Management points,Total points,Date"];
    const rows = filtered.map((r, i) =>
      `${i + 1},"${r.name}",${r.attendance ?? ""},${r.collaborative ?? ""},${r.management ?? ""},${r.total},${r.date}`
    );
    const blob = new Blob([headers.concat(rows).join("\n")], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "employee_points.csv"; a.click();
  };

  const startIdx = filtered.length === 0 ? 0 : (safePage - 1) * entriesPerPage + 1;
  const endIdx = Math.min(safePage * entriesPerPage, filtered.length);

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh", padding: "24px 16px", fontFamily: "'Segoe UI', sans-serif", boxSizing: "border-box" }}>
      <style>{`
        * { box-sizing: border-box; }

        .ep-card { background: #fff; borderRadius: 12px; padding: 28px 32px; box-shadow: 0 1px 6px rgba(0,0,0,0.08); max-width: 1200px; margin: 0 auto; border-radius: 12px; }

        /* Header */
        .ep-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px; }
        .ep-title { margin: 0; font-size: 1.2rem; font-weight: 700; color: #111; }
        .ep-btn-filter { background: #16a34a; color: #fff; border: none; border-radius: 7px; padding: 9px 18px; font-weight: 600; font-size: 0.88rem; cursor: pointer; display: flex; align-items: center; gap: 6px; }

        /* Filter panel */
        .ep-filter { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px 20px; margin-bottom: 18px; display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-end; }
        .ep-filter label { font-size: 0.82rem; font-weight: 600; color: #374151; display: block; margin-bottom: 5px; }
        .ep-filter input { border: 1px solid #d1d5db; border-radius: 6px; padding: 7px 10px; font-size: 0.82rem; outline: none; width: 180px; }
        .ep-filter input:focus { border-color: #16a34a; }
        .ep-btn-clear { background: #e53e3e; color: #fff; border: none; border-radius: 6px; padding: 7px 14px; font-weight: 600; font-size: 0.82rem; cursor: pointer; }

        /* Controls row */
        .ep-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px; }
        .ep-show { font-size: 0.84rem; color: #555; display: flex; align-items: center; gap: 6px; }
        .ep-show select { border: 1px solid #d1d5db; border-radius: 5px; padding: 4px 8px; font-size: 0.84rem; cursor: pointer; }
        .ep-export { display: flex; gap: 8px; }
        .ep-btn-export { background: #16a34a; color: #fff; border: none; border-radius: 6px; padding: 7px 14px; font-weight: 600; font-size: 0.82rem; cursor: pointer; display: flex; align-items: center; gap: 5px; }
        .ep-search { font-size: 0.84rem; color: #555; display: flex; align-items: center; gap: 8px; }
        .ep-search input { border: 1px solid #d1d5db; border-radius: 5px; padding: 6px 10px; font-size: 0.84rem; outline: none; width: 170px; }
        .ep-search input:focus { border-color: #16a34a; }

        /* Desktop Table */
        .ep-table-wrap { overflow-x: auto; }
        .ep-table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
        .ep-table thead th { padding: 11px 13px; text-align: left; font-weight: 700; color: #111; border-bottom: 2px solid #e5e7eb; white-space: nowrap; background: #fff; }
        .ep-table tbody tr { border-bottom: 1px solid #f0f0f0; }
        .ep-table tbody tr:nth-child(even) { background: #fafafa; }
        .ep-table tbody td { padding: 10px 13px; color: #222; }
        .ep-total { color: #16a34a; font-weight: 700; }
        .ep-sl { color: #888; text-align: center; }

        /* Mobile Cards */
        .ep-mobile { display: none; }
        .ep-mcard { background: #fff; border: 1px solid #e5e7eb; border-radius: 9px; padding: 14px 16px; margin-bottom: 10px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
        .ep-mcard-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
        .ep-mcard-name { font-weight: 700; color: #111; font-size: 0.9rem; flex: 1; margin-right: 10px; }
        .ep-mcard-total { background: #dcfce7; color: #16a34a; font-weight: 700; border-radius: 20px; padding: 3px 12px; font-size: 0.82rem; white-space: nowrap; }
        .ep-mcard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 12px; }
        .ep-mcard-item { font-size: 0.78rem; }
        .ep-mcard-item .label { color: #888; display: block; margin-bottom: 1px; }
        .ep-mcard-item .val { color: #222; font-weight: 600; }
        .ep-mcard-date { margin-top: 8px; font-size: 0.78rem; color: #888; }

        /* Pagination */
        .ep-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 18px; flex-wrap: wrap; gap: 10px; }
        .ep-info { font-size: 0.82rem; color: #666; }
        .ep-pages { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; }
        .ep-pgbtn { padding: 6px 12px; border-radius: 6px; border: 1px solid #d1d5db; background: #fff; cursor: pointer; font-size: 0.82rem; font-weight: 600; color: #333; min-width: 34px; transition: all 0.15s; }
        .ep-pgbtn:hover:not(:disabled) { background: #f0fdf4; border-color: #16a34a; color: #16a34a; }
        .ep-pgbtn:disabled { opacity: 0.45; cursor: not-allowed; }
        .ep-pgbtn.active { background: #16a34a; color: #fff; border-color: #16a34a; }
        .ep-pgbtn.dots { cursor: default; color: #999; border-color: transparent; background: transparent; }

        @media (max-width: 600px) {
          .ep-card { padding: 16px 14px; }
          .ep-table-wrap { display: none; }
          .ep-mobile { display: block; }
          .ep-controls { flex-direction: column; align-items: flex-start; }
          .ep-search { width: 100%; }
          .ep-search input { flex: 1; width: 100%; }
          .ep-export { width: 100%; }
          .ep-btn-export { flex: 1; justify-content: center; }
          .ep-filter input { width: 100%; }
          .ep-footer { flex-direction: column; align-items: flex-start; }
          .ep-pages { width: 100%; justify-content: center; }
        }

        @media (min-width: 601px) and (max-width: 900px) {
          .ep-card { padding: 20px 18px; }
          .ep-controls { gap: 8px; }
          .ep-search input { width: 140px; }
        }
      `}</style>

      <div className="ep-card">
        {/* Header */}
        <div className="ep-header">
          <h2 className="ep-title">Employee points</h2>
          <button className="ep-btn-filter" onClick={() => setShowFilter(f => !f)}>
            ⚙ Filter
          </button>
        </div>

        {/* Filter Panel */}
        {showFilter && (
          <div className="ep-filter">
            <div>
              <label>Employee Name</label>
              <input value={filterName} onChange={e => { setFilterName(e.target.value); setCurrentPage(1); }} placeholder="Search by name..." />
            </div>
            <div>
              <label>Date</label>
              <input value={filterDate} onChange={e => { setFilterDate(e.target.value); setCurrentPage(1); }} placeholder="e.g. May 2024" />
            </div>
            <button className="ep-btn-clear" onClick={() => { setFilterName(""); setFilterDate(""); setCurrentPage(1); }}>Clear</button>
          </div>
        )}

        {/* Controls */}
        <div className="ep-controls">
          <div className="ep-show">
            Show&nbsp;
            <select value={entriesPerPage} onChange={e => { setEntriesPerPage(+e.target.value); setCurrentPage(1); }}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            &nbsp;entries
          </div>
          <div className="ep-export">
            <button className="ep-btn-export" onClick={exportCSV}>📄 CSV</button>
            <button className="ep-btn-export">📊 Excel</button>
          </div>
          <div className="ep-search">
            Search:
            <input value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Search..." />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="ep-table-wrap">
          <table className="ep-table">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Employee name <SortIcon /></th>
                <th>Attendance points <SortIcon /></th>
                <th>Collaborative points <SortIcon /></th>
                <th>Management points <SortIcon /></th>
                <th>Total points <SortIcon /></th>
                <th>Date <SortIcon /></th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: 40, color: "#999" }}>No records found</td></tr>
              ) : paginated.map((row, idx) => (
                <tr key={row.id}>
                  <td className="ep-sl">{startIdx + idx}</td>
                  <td>{row.name}</td>
                  <td>{row.attendance ?? ""}</td>
                  <td>{row.collaborative ?? ""}</td>
                  <td>{row.management ?? ""}</td>
                  <td className="ep-total">{row.total}</td>
                  <td>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="ep-mobile">
          {paginated.length === 0 ? (
            <div style={{ textAlign: "center", padding: 32, color: "#999" }}>No records found</div>
          ) : paginated.map((row, idx) => (
            <div className="ep-mcard" key={row.id}>
              <div className="ep-mcard-header">
                <div className="ep-mcard-name">#{startIdx + idx} {row.name}</div>
                <div className="ep-mcard-total">Total: {row.total}</div>
              </div>
              <div className="ep-mcard-grid">
                <div className="ep-mcard-item">
                  <span className="label">Attendance</span>
                  <span className="val">{row.attendance ?? "—"}</span>
                </div>
                <div className="ep-mcard-item">
                  <span className="label">Collaborative</span>
                  <span className="val">{row.collaborative ?? "—"}</span>
                </div>
                <div className="ep-mcard-item">
                  <span className="label">Management</span>
                  <span className="val">{row.management ?? "—"}</span>
                </div>
              </div>
              <div className="ep-mcard-date">📅 {row.date}</div>
            </div>
          ))}
        </div>

        {/* Footer / Pagination */}
        <div className="ep-footer">
          <span className="ep-info">Showing {startIdx} to {endIdx} of {filtered.length} entries</span>
          <div className="ep-pages">
            <button className="ep-pgbtn" disabled={safePage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
            {getPageNums().map((n, i) =>
              n === "..." ? (
                <button key={`dots-${i}`} className="ep-pgbtn dots">…</button>
              ) : (
                <button key={n} className={`ep-pgbtn${safePage === n ? " active" : ""}`} onClick={() => setCurrentPage(n)}>{n}</button>
              )
            )}
            <button className="ep-pgbtn" disabled={safePage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}