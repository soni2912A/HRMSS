import { useState } from "react";

const initialData = [
  { id: 1, pointShareWith: "Honorato Imogene Curry Terry", point: 1, pointDate: "2024-12-03" },
  { id: 2, pointShareWith: "Arnika Paula Roach Mcmillan", point: 1, pointDate: "2024-05-04" },
];

const ITEMS_PER_PAGE = 5;

function SortIcon() {
  return <span style={{ marginLeft: 4, opacity: 0.5, fontSize: 11 }}>↑↓</span>;
}

function Modal({ title, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: "16px", boxSizing: "border-box"
    }}>
      <div style={{
        background: "#fff", borderRadius: 10,
        padding: "24px 20px",
        width: "100%", maxWidth: 520,
        boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        boxSizing: "border-box",
        maxHeight: "90vh", overflowY: "auto"
      }}>
        <h2 style={{ margin: "0 0 20px", fontSize: 17, fontWeight: 700, color: "#1a1a1a" }}>{title}</h2>
        {children}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%", border: "1px solid #d1d5db", borderRadius: 6,
  padding: "10px 12px", fontSize: 14, outline: "none",
  color: "#333", background: "#fafafa", boxSizing: "border-box",
  display: "block"
};

function AddModal({ onClose, onSave }) {
  const [form, setForm] = useState({ pointShareWith: "", point: "", pointDate: "" });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    if (!form.pointShareWith.trim() || !form.point || !form.pointDate) return;
    onSave({ ...form, point: Number(form.point) });
  };

  return (
    <Modal title="Add collaborative point">
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "#222", marginBottom: 6 }}>
          Point share with <span style={{ color: "#e53e3e" }}>*</span>
        </label>
        <input style={inputStyle} value={form.pointShareWith} onChange={set("pointShareWith")} placeholder="Enter name" />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "#222", marginBottom: 6 }}>
          Point <span style={{ color: "#e53e3e" }}>*</span>
        </label>
        <input style={inputStyle} type="number" value={form.point} onChange={set("point")} placeholder="Enter point" />
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "#222", marginBottom: 6 }}>
          Point date <span style={{ color: "#e53e3e" }}>*</span>
        </label>
        <input style={inputStyle} type="date" value={form.pointDate} onChange={set("pointDate")} />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button onClick={onClose} style={btnStyle("red")}>Close</button>
        <button onClick={handleSave} style={btnStyle("green")}>Save</button>
      </div>
    </Modal>
  );
}

function btnStyle(color) {
  const bg = color === "red" ? "#e53e3e" : color === "green" ? "#2d8a4e" : "#3182ce";
  return {
    padding: "9px 20px", borderRadius: 6, border: "none", cursor: "pointer",
    fontWeight: 600, fontSize: 14, color: "#fff", background: bg,
  };
}

const paginBtn = {
  padding: "6px 12px", borderRadius: 5, border: "1px solid #d1d5db",
  background: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#333"
};

export default function CollaborativePoints() {
  const [data, setData] = useState(initialData);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showEntries, setShowEntries] = useState(10);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered = data.filter(r =>
    r.pointShareWith.toLowerCase().includes(search.toLowerCase()) ||
    String(r.point).includes(search) ||
    r.pointDate.includes(search)
  );

  const sorted = sortKey ? [...filtered].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    return sortDir === "asc" ? (av > bv ? 1 : av < bv ? -1 : 0) : (av < bv ? 1 : av > bv ? -1 : 0);
  }) : filtered;

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = sorted.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const getPageNums = () => {
    const nums = [];
    let start = Math.max(1, safePage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++) nums.push(i);
    return nums;
  };

  const handleAdd = (row) => {
    const newId = Math.max(...data.map(d => d.id), 0) + 1;
    setData(d => [...d, { id: newId, ...row }]);
    setShowAdd(false);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        .cp-wrapper {
          font-family: 'Segoe UI', sans-serif;
          background: #eef0f3;
          min-height: 100vh;
          padding: 20px 12px;
        }

        .cp-card {
          background: #fff;
          border-radius: 12px;
          padding: 24px 20px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.08);
          max-width: 1100px;
          margin: 0 auto;
        }

        .cp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .cp-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .cp-table-wrap { overflow-x: auto; }

        table { width: 100%; border-collapse: collapse; font-size: 14px; min-width: 420px; }

        th {
          padding: 11px 14px;
          text-align: left;
          font-weight: 700;
          color: #374151;
          background: #f9fafb;
          cursor: pointer;
          user-select: none;
          white-space: nowrap;
          border-bottom: 2px solid #e5e7eb;
        }

        td { padding: 11px 14px; color: #222; border-bottom: 1px solid #f0f0f0; }

        tr:nth-child(odd) td { background: #f9fafb; }
        tr:nth-child(even) td { background: #fff; }

        .cp-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .cp-pagination { display: flex; gap: 5px; align-items: center; flex-wrap: wrap; }

        @media (max-width: 500px) {
          .cp-card { padding: 16px 12px; }
          .cp-header h2 { font-size: 16px; }
          th, td { padding: 9px 10px; font-size: 13px; }
          .cp-footer { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="cp-wrapper">
        <div className="cp-card">

          {/* Header */}
          <div className="cp-header">
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1a1a1a" }}>
              Collaborative points
            </h2>
            <button onClick={() => setShowAdd(true)} style={{ ...btnStyle("green"), display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 18, lineHeight: 1 }}>⊕</span> Add collaborative point
            </button>
          </div>

          {/* Controls */}
          <div className="cp-controls">
            <div style={{ fontSize: 14, color: "#555", display: "flex", alignItems: "center", gap: 6 }}>
              Show
              <select value={showEntries} onChange={e => { setShowEntries(+e.target.value); setPage(1); }}
                style={{ border: "1px solid #d1d5db", borderRadius: 4, padding: "4px 8px", fontSize: 14 }}>
                {[5, 10, 25, 50].map(n => <option key={n}>{n}</option>)}
              </select>
              entries
            </div>
            <div style={{ fontSize: 14, color: "#555", display: "flex", alignItems: "center", gap: 6 }}>
              Search:
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                style={{ border: "1px solid #d1d5db", borderRadius: 4, padding: "6px 10px", fontSize: 14, outline: "none", width: 160 }} />
            </div>
          </div>

          {/* Table */}
          <div className="cp-table-wrap">
            <table>
              <thead>
                <tr>
                  <th style={{ width: 55 }} onClick={() => handleSort("id")}>Sl <SortIcon /></th>
                  <th onClick={() => handleSort("pointShareWith")}>Point share with <SortIcon /></th>
                  <th onClick={() => handleSort("point")}>Point <SortIcon /></th>
                  <th onClick={() => handleSort("pointDate")}>Point date <SortIcon /></th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: "center", padding: 36, color: "#999" }}>No records found</td></tr>
                ) : paginated.map((row, idx) => (
                  <tr key={row.id}>
                    <td style={{ textAlign: "center", color: "#555" }}>{(safePage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                    <td>{row.pointShareWith}</td>
                    <td>{row.point}</td>
                    <td>{row.pointDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="cp-footer">
            <span style={{ fontSize: 13, color: "#666" }}>
              Showing {sorted.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(safePage * ITEMS_PER_PAGE, sorted.length)} of {sorted.length} entries
            </span>
            <div className="cp-pagination">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage === 1}
                style={{ ...paginBtn, opacity: safePage === 1 ? 0.4 : 1 }}>Previous</button>
              {getPageNums().map(n => (
                <button key={n} onClick={() => setPage(n)}
                  style={{ ...paginBtn, background: n === safePage ? "#2d8a4e" : "#fff", color: n === safePage ? "#fff" : "#333" }}>
                  {n}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}
                style={{ ...paginBtn, opacity: safePage === totalPages ? 0.4 : 1 }}>Next</button>
            </div>
          </div>
        </div>
      </div>

      {showAdd && <AddModal onClose={() => setShowAdd(false)} onSave={handleAdd} />}
    </>
  );
}