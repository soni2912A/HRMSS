import { useState } from "react";

const initialData = [
  { id: 1, pointShareWith: "Honorato Imogene Curry Terry", point: 1, pointDate: "2024-12-03" },
  { id: 2, pointShareWith: "Arnika Paula Roach Mcmillan", point: 1, pointDate: "2024-05-04" },
];

const ITEMS_PER_PAGE = 5;

function SortIcon() {
  return <span style={{ marginLeft: 4, opacity: 0.4, fontSize: 10 }}>↑↓</span>;
}

function Modal({ title, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: "16px", boxSizing: "border-box"
    }}>
      <div style={{
        background: "#fff", borderRadius: 12,
        padding: "24px 20px", width: "100%", maxWidth: 480,
        boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
        boxSizing: "border-box", maxHeight: "90vh", overflowY: "auto"
      }}>
        <h3 style={{ margin: "0 0 18px", fontSize: 15, fontWeight: 600, color: "#1a1a1a" }}>{title}</h3>
        {children}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%", border: "1px solid #d1d5db", borderRadius: 6,
  padding: "9px 12px", fontSize: 13, outline: "none",
  color: "#333", background: "#fafafa", boxSizing: "border-box", display: "block"
};

function AddModal({ onClose, onSave }) {
  const [form, setForm] = useState({ pointShareWith: "", point: "", pointDate: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    if (!form.pointShareWith.trim() || !form.point || !form.pointDate) return;
    onSave({ ...form, point: Number(form.point) });
  };

  return (
    <Modal title="Add collaborative point">
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontWeight: 600, fontSize: 12, color: "#555", marginBottom: 5 }}>
          Point share with <span style={{ color: "#e53e3e" }}>*</span>
        </label>
        <input style={inputStyle} value={form.pointShareWith} onChange={set("pointShareWith")} placeholder="Enter name" />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontWeight: 600, fontSize: 12, color: "#555", marginBottom: 5 }}>
          Point <span style={{ color: "#e53e3e" }}>*</span>
        </label>
        <input style={inputStyle} type="number" value={form.point} onChange={set("point")} placeholder="Enter point" />
      </div>
      <div style={{ marginBottom: 22 }}>
        <label style={{ display: "block", fontWeight: 600, fontSize: 12, color: "#555", marginBottom: 5 }}>
          Point date <span style={{ color: "#e53e3e" }}>*</span>
        </label>
        <input style={inputStyle} type="date" value={form.pointDate} onChange={set("pointDate")} />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button onClick={onClose} style={btnStyle("red")}>Close</button>
        <button onClick={handleSave} style={btnStyle("green")}>Save</button>
      </div>
    </Modal>
  );
}

function btnStyle(color) {
  const bg = color === "red" ? "#e53e3e" : color === "green" ? "#2d8a4e" : "#3182ce";
  return {
    padding: "8px 18px", borderRadius: 6, border: "none", cursor: "pointer",
    fontWeight: 600, fontSize: 13, color: "#fff", background: bg,
  };
}

const paginBtn = (active) => ({
  padding: "5px 11px", borderRadius: 5, border: "1px solid #d1d5db",
  background: active ? "#2d8a4e" : "#fff",
  color: active ? "#fff" : "#333",
  cursor: "pointer", fontSize: 12, fontWeight: 500,
});

// Mobile Card Component
function MobileCard({ row, index }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10,
      padding: "14px 16px", marginBottom: 10,
    }}>
      {/* Card Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%", background: "#f3f4f6",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 600, color: "#6b7280"
        }}>
          {index}
        </div>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: "3px 10px",
          borderRadius: 999, background: "#dcfce7", color: "#166534"
        }}>
          +{row.point} pt
        </span>
      </div>

      {/* Name */}
      <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 10 }}>
        {row.pointShareWith}
      </div>

      {/* Point Row */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 12, padding: "6px 0", borderTop: "1px solid #f0f0f0"
      }}>
        <span style={{ color: "#6b7280" }}>Point</span>
        <span style={{ fontWeight: 600, color: "#1a1a1a" }}>{row.point}</span>
      </div>

      {/* Date Row */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 12, padding: "6px 0", borderTop: "1px solid #f0f0f0"
      }}>
        <span style={{ color: "#6b7280" }}>Point date</span>
        <span style={{ fontWeight: 600, color: "#1a1a1a" }}>{row.pointDate}</span>
      </div>
    </div>
  );
}

export default function CollaborativePoints() {
  const [data, setData] = useState(initialData);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showEntries, setShowEntries] = useState(10);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  // Use window width for responsive detection
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  // Listen to resize
  if (typeof window !== "undefined") {
    window.onresize = () => setWindowWidth(window.innerWidth);
  }

  const isMobile = windowWidth <= 640;
  const isTablet = windowWidth > 640 && windowWidth <= 1024;

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered = data.filter((r) =>
    r.pointShareWith.toLowerCase().includes(search.toLowerCase()) ||
    String(r.point).includes(search) ||
    r.pointDate.includes(search)
  );

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        return sortDir === "asc" ? (av > bv ? 1 : av < bv ? -1 : 0) : (av < bv ? 1 : av > bv ? -1 : 0);
      })
    : filtered;

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
    const newId = Math.max(...data.map((d) => d.id), 0) + 1;
    setData((d) => [...d, { id: newId, ...row }]);
    setShowAdd(false);
  };

  return (
    <>
      <div style={{
        fontFamily: "'Segoe UI', sans-serif",
        background: "#eef0f3",
        minHeight: "100vh",
        padding: isMobile ? "12px 8px" : isTablet ? "16px 12px" : "24px 16px",
      }}>
        <div style={{
          background: "#fff",
          borderRadius: 12,
          padding: isMobile ? "14px 12px" : isTablet ? "18px 16px" : "24px 20px",
          boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
          maxWidth: 1100,
          margin: "0 auto",
        }}>

          {/* Header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            flexWrap: "wrap",
            gap: 10,
          }}>
            <h2 style={{ margin: 0, fontSize: isMobile ? 16 : 18, fontWeight: 700, color: "#1a1a1a" }}>
              Collaborative points
            </h2>
            <button
              onClick={() => setShowAdd(true)}
              style={{ ...btnStyle("green"), display: "flex", alignItems: "center", gap: 6, fontSize: isMobile ? 12 : 13 }}
            >
              <span style={{ fontSize: 16, lineHeight: 1 }}>⊕</span>
              {!isMobile && "Add collaborative point"}
              {isMobile && "Add"}
            </button>
          </div>

          {/* Controls */}
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            marginBottom: 14,
            gap: 10,
          }}>
            <div style={{ fontSize: 13, color: "#555", display: "flex", alignItems: "center", gap: 6 }}>
              Show
              <select
                value={showEntries}
                onChange={(e) => { setShowEntries(+e.target.value); setPage(1); }}
                style={{ border: "1px solid #d1d5db", borderRadius: 4, padding: "4px 8px", fontSize: 13 }}
              >
                {[5, 10, 25, 50].map((n) => <option key={n}>{n}</option>)}
              </select>
              entries
            </div>
            <div style={{ fontSize: 13, color: "#555", display: "flex", alignItems: "center", gap: 6 }}>
              Search:
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                style={{
                  border: "1px solid #d1d5db", borderRadius: 4,
                  padding: "6px 10px", fontSize: 13, outline: "none",
                  width: isMobile ? "100%" : 160,
                }}
              />
            </div>
          </div>

          {/* Table — Desktop & Tablet */}
          {!isMobile && (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 420 }}>
                <thead>
                  <tr>
                    <th onClick={() => handleSort("id")} style={thStyle(55)}>Sl <SortIcon /></th>
                    <th onClick={() => handleSort("pointShareWith")} style={thStyle()}>Point share with <SortIcon /></th>
                    <th onClick={() => handleSort("point")} style={thStyle()}>Point <SortIcon /></th>
                    <th onClick={() => handleSort("pointDate")} style={thStyle()}>Point date <SortIcon /></th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center", padding: 40, color: "#999", fontSize: 13 }}>
                        No records found
                      </td>
                    </tr>
                  ) : paginated.map((row, idx) => (
                    <tr key={row.id}>
                      <td style={{ ...tdStyle, textAlign: "center", color: "#6b7280", background: idx % 2 === 0 ? "#f9fafb" : "#fff" }}>
                        {(safePage - 1) * ITEMS_PER_PAGE + idx + 1}
                      </td>
                      <td style={{ ...tdStyle, background: idx % 2 === 0 ? "#f9fafb" : "#fff" }}>{row.pointShareWith}</td>
                      <td style={{ ...tdStyle, background: idx % 2 === 0 ? "#f9fafb" : "#fff" }}>{row.point}</td>
                      <td style={{ ...tdStyle, background: idx % 2 === 0 ? "#f9fafb" : "#fff" }}>{row.pointDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Cards — Mobile */}
          {isMobile && (
            <div>
              {paginated.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, color: "#999", fontSize: 13 }}>
                  No records found
                </div>
              ) : paginated.map((row, idx) => (
                <MobileCard
                  key={row.id}
                  row={row}
                  index={(safePage - 1) * ITEMS_PER_PAGE + idx + 1}
                />
              ))}
            </div>
          )}

          {/* Footer */}
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            marginTop: 16,
            gap: 10,
          }}>
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              Showing {sorted.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(safePage * ITEMS_PER_PAGE, sorted.length)} of {sorted.length} entries
            </span>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                style={{ ...paginBtn(false), opacity: safePage === 1 ? 0.4 : 1 }}
              >
                Previous
              </button>
              {getPageNums().map((n) => (
                <button key={n} onClick={() => setPage(n)} style={paginBtn(n === safePage)}>
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                style={{ ...paginBtn(false), opacity: safePage === totalPages ? 0.4 : 1 }}
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </div>

      {showAdd && <AddModal onClose={() => setShowAdd(false)} onSave={handleAdd} />}
    </>
  );
}

function thStyle(width) {
  return {
    padding: "10px 14px",
    textAlign: "left",
    fontWeight: 600,
    color: "#374151",
    background: "#f9fafb",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    borderBottom: "2px solid #e5e7eb",
    fontSize: 13,
    ...(width ? { width } : {}),
  };
}

const tdStyle = {
  padding: "10px 14px",
  color: "#1a1a1a",
  borderBottom: "1px solid #f0f0f0",
  fontSize: 13,
};