import { useState } from "react";

const initialCategories = [
  { id: 1, name: "Sojib" },
  { id: 2, name: "reporting" },
  { id: 3, name: "team work" },
  { id: 4, name: "smartness" },
  { id: 5, name: "dsds" },
  { id: 6, name: "Employee of the month" },
  { id: 7, name: "Star Performer" },
  { id: 8, name: "Best Employee" },
  { id: 9, name: "Leadership" },
  { id: 10, name: "Innovation" },
  { id: 11, name: "Punctuality" },
  { id: 12, name: "Communication" },
];

const ITEMS_PER_PAGE = 5;

function Modal({ title, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{
        background: "#fff", borderRadius: 10, padding: "32px 36px", minWidth: 520,
        maxWidth: 600, width: "90%", boxShadow: "0 8px 40px rgba(0,0,0,0.18)"
      }}>
        <h2 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 700, color: "#1a1a1a" }}>{title}</h2>
        {children}
      </div>
    </div>
  );
}

function CategoryModal({ initial, onClose, onSave }) {
  const [name, setName] = useState(initial || "");
  return (
    <Modal title={initial ? "Edit point category" : "New point category"}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
        <label style={{ width: 160, fontWeight: 600, fontSize: 14, color: "#222" }}>
          Category name<span style={{ color: "#e53e3e" }}>*</span>
        </label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Category name"
          style={{
            flex: 1, border: "1px solid #d1d5db", borderRadius: 6, padding: "10px 14px",
            fontSize: 14, outline: "none", color: "#333", background: "#fafafa"
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button onClick={onClose} style={btnStyle("red")}>Close</button>
        <button onClick={() => { if (name.trim()) onSave(name.trim()); }} style={btnStyle("blue")}>Save</button>
      </div>
    </Modal>
  );
}

function btnStyle(color) {
  return {
    padding: "9px 22px", borderRadius: 6, border: "none", cursor: "pointer",
    fontWeight: 600, fontSize: 14, color: "#fff",
    background: color === "red" ? "#e53e3e" : color === "blue" ? "#3182ce" : "#38a169",
  };
}

function IconBtn({ color, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      background: color, border: "none", borderRadius: 5, padding: "6px 10px",
      cursor: "pointer", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center"
    }}>
      {children}
    </button>
  );
}

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  );
}

const paginBtn = {
  padding: "6px 14px", borderRadius: 5, border: "1px solid #d1d5db",
  background: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#333"
};

export default function App() {
  const [categories, setCategories] = useState(initialCategories);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showEntries, setShowEntries] = useState(10);

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const getPageNums = () => {
    const nums = [];
    let start = Math.max(1, safePage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++) nums.push(i);
    return nums;
  };

  const handleDelete = (id) => setCategories(cats => cats.filter(c => c.id !== id));
  const handleAdd = (name) => {
    const newId = Math.max(...categories.map(c => c.id), 0) + 1;
    setCategories(cats => [...cats, { id: newId, name }]);
    setShowNewCategory(false);
  };
  const handleEdit = (name) => {
    setCategories(cats => cats.map(c => c.id === editCategory.id ? { ...c, name } : c));
    setEditCategory(null);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f3f4f6", minHeight: "100vh", padding: 30 }}>
      <div style={{ background: "#fff", borderRadius: 10, padding: "28px 32px", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1a1a1a" }}>Point categories</h2>
          <button onClick={() => setShowNewCategory(true)} style={{ ...btnStyle("green"), display: "flex", alignItems: "center", gap: 6 }}>
            ＋ New category
          </button>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 14, color: "#555" }}>
            Show&nbsp;
            <select value={showEntries} onChange={e => setShowEntries(+e.target.value)} style={{ border: "1px solid #d1d5db", borderRadius: 4, padding: "3px 6px" }}>
              {[5, 10, 25].map(n => <option key={n}>{n}</option>)}
            </select>
            &nbsp;entries
          </div>
          <div style={{ fontSize: 14, color: "#555" }}>
            Search:&nbsp;
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              style={{ border: "1px solid #d1d5db", borderRadius: 4, padding: "5px 10px", fontSize: 14 }}
            />
          </div>
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f9fafb", borderBottom: "2px solid #e5e7eb" }}>
              <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700, color: "#374151", width: 60 }}>Sl</th>
              <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700, color: "#374151" }}>Category name</th>
              <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700, color: "#374151", width: 120 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={3} style={{ textAlign: "center", padding: 30, color: "#999" }}>No categories found</td></tr>
            ) : paginated.map((cat, idx) => (
              <tr key={cat.id} style={{ borderBottom: "1px solid #f0f0f0", background: idx % 2 === 1 ? "#f9fafb" : "#fff" }}>
                <td style={{ padding: "10px 16px", color: "#555" }}>{(safePage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                <td style={{ padding: "10px 16px", color: "#222" }}>{cat.name}</td>
                <td style={{ padding: "10px 16px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <IconBtn color="#3182ce" onClick={() => setEditCategory(cat)}><PencilIcon /></IconBtn>
                    <IconBtn color="#e53e3e" onClick={() => handleDelete(cat.id)}><TrashIcon /></IconBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18 }}>
          <span style={{ fontSize: 13, color: "#666" }}>
            Showing {filtered.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(safePage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} entries
          </span>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage === 1} style={{ ...paginBtn, opacity: safePage === 1 ? 0.4 : 1 }}>Previous</button>
            {getPageNums().map(n => (
              <button key={n} onClick={() => setPage(n)} style={{ ...paginBtn, background: n === safePage ? "#38a169" : "#fff", color: n === safePage ? "#fff" : "#333" }}>{n}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages || totalPages === 0} style={{ ...paginBtn, opacity: (safePage === totalPages || totalPages === 0) ? 0.4 : 1 }}>Next</button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showNewCategory && <CategoryModal onClose={() => setShowNewCategory(false)} onSave={handleAdd} />}
      {editCategory && <CategoryModal initial={editCategory.name} onClose={() => setEditCategory(null)} onSave={handleEdit} />}
    </div>
  );
}