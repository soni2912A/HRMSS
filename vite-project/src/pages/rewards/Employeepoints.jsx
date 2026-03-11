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

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 6h16M7 12h10M10 18h4"/>
      <path d="M3 6l9 7 9-7" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 6l8 6 8-6v12H4V6z" fill="currentColor" opacity="0.15"/>
      <polygon points="4,4 20,4 14,12 14,20 10,18 10,12" fill="currentColor"/>
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

  // Pagination: show first, last, and window around current with ellipsis
  const getPageNums = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    // Always show 1, window of 5, last page, with ellipsis
    const window = [];
    for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) {
      window.push(i);
    }
    // Ensure at least pages 2-5 visible on page 1
    if (safePage <= 3) {
      const base = [2, 3, 4, 5].filter(n => n < totalPages);
      return [1, ...base, "...", totalPages];
    }
    if (safePage >= totalPages - 2) {
      const base = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1].filter(n => n > 1);
      return [1, "...", ...base, totalPages];
    }
    return [1, "...", ...window, "...", totalPages];
  };

  const handlePageChange = (p) => {
    if (p === "...") return;
    setCurrentPage(p);
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

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh", padding: "32px", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 12, padding: "28px 32px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#111" }}>Employee points</h2>
          <button
            onClick={() => setShowFilter(f => !f)}
            style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 7, padding: "10px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
          >
            <FilterIcon /> Filter
          </button>
        </div>

        {/* Filter Panel */}
        {showFilter && (
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: "18px 24px", marginBottom: 20, display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-end" }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Employee Name</label>
              <input value={filterName} onChange={e => { setFilterName(e.target.value); setCurrentPage(1); }}
                placeholder="Search by name..."
                style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: "8px 12px", fontSize: 13, outline: "none", width: 200 }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Date</label>
              <input value={filterDate} onChange={e => { setFilterDate(e.target.value); setCurrentPage(1); }}
                placeholder="e.g. May 2024"
                style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: "8px 12px", fontSize: 13, outline: "none", width: 160 }} />
            </div>
            <button onClick={() => { setFilterName(""); setFilterDate(""); setCurrentPage(1); }}
              style={{ background: "#e53e3e", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
              Clear
            </button>
          </div>
        )}

        {/* Controls Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 13, color: "#555", display: "flex", alignItems: "center", gap: 6 }}>
            Show&nbsp;
            <select value={entriesPerPage} onChange={e => { setEntriesPerPage(+e.target.value); setCurrentPage(1); }}
              style={{ border: "1px solid #d1d5db", borderRadius: 5, padding: "4px 8px", fontSize: 13, cursor: "pointer" }}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            &nbsp;entries
          </div>

          {/* CSV / Excel Buttons */}
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={exportCSV}
              style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <span>📄</span> CSV
            </button>
            <button
              style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <span>📊</span> Excel
            </button>
          </div>

          <div style={{ fontSize: 13, color: "#555", display: "flex", alignItems: "center", gap: 8 }}>
            Search:
            <input value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              style={{ border: "1px solid #d1d5db", borderRadius: 5, padding: "6px 10px", fontSize: 13, outline: "none", width: 180 }} />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", background: "#fff" }}>
                {[
                  { label: "Sl", width: 55 },
                  { label: "Employee name", width: 260 },
                  { label: "Attendance points", width: 160 },
                  { label: "Collaborative points", width: 175 },
                  { label: "Management points", width: 170 },
                  { label: "Total points", width: 130 },
                  { label: "Date", width: 140 },
                ].map(col => (
                  <th key={col.label} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 700, color: "#111", fontSize: 14, width: col.width, whiteSpace: "nowrap", borderBottom: "2px solid #e5e7eb" }}>
                    {col.label} {col.label !== "Sl" && <SortIcon />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: 40, color: "#999", fontSize: 14 }}>No records found</td></tr>
              ) : paginated.map((row, idx) => (
                <tr key={row.id} style={{ borderBottom: "1px solid #f0f0f0", background: idx % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "11px 14px", color: "#555", textAlign: "center" }}>{(safePage - 1) * entriesPerPage + idx + 1}</td>
                  <td style={{ padding: "11px 14px", color: "#222" }}>{row.name}</td>
                  <td style={{ padding: "11px 14px", color: "#222" }}>{row.attendance ?? ""}</td>
                  <td style={{ padding: "11px 14px", color: "#222" }}>{row.collaborative ?? ""}</td>
                  <td style={{ padding: "11px 14px", color: "#222" }}>{row.management ?? ""}</td>
                  <td style={{ padding: "11px 14px", color: "#16a34a", fontWeight: 600 }}>{row.total}</td>
                  <td style={{ padding: "11px 14px", color: "#222" }}>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 13, color: "#555" }}>
            Showing {filtered.length === 0 ? 0 : (safePage - 1) * entriesPerPage + 1} to {Math.min(safePage * entriesPerPage, filtered.length)} of {filtered.length} entries
          </span>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={safePage === 1}
              style={{ padding: "7px 14px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", cursor: safePage === 1 ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 600, color: "#333", opacity: safePage === 1 ? 0.5 : 1 }}
            >Previous</button>

            {getPageNums().map((n, i) => (
              <button key={i} onClick={() => handlePageChange(n)}
                disabled={n === "..."}
                style={{
                  padding: "7px 12px", borderRadius: 6, border: "1px solid #d1d5db",
                  background: n === safePage ? "#16a34a" : "#fff",
                  color: n === safePage ? "#fff" : n === "..." ? "#999" : "#333",
                  cursor: n === "..." ? "default" : "pointer",
                  fontSize: 13, fontWeight: n === safePage ? 700 : 500,
                  minWidth: 36,
                }}>
                {n}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              style={{ padding: "7px 14px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", cursor: safePage === totalPages ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 600, color: "#333", opacity: safePage === totalPages ? 0.5 : 1 }}
            >Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}