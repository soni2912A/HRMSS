import { useState } from "react";

const initialData = [
  { id: 1, name: "Sojib" },
  { id: 2, name: "reporting" },
  { id: 3, name: "team work" },
  { id: 4, name: "smartness" },
  { id: 5, name: "dsds" },
  { id: 6, name: "Employee of the month" },
  { id: 7, name: "Star Performer" },
  { id: 8, name: "Best Employee" },
];

const ITEMS_PER_PAGE = 5;

export default function PointCategories() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(null); // null | { type: 'add' | 'edit' | 'delete', item?: {} }
  const [formValue, setFormValue] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const filtered = data.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openAdd = () => {
    setFormValue("");
    setModal({ type: "add" });
  };
  const openEdit = (item) => {
    setFormValue(item.name);
    setModal({ type: "edit", item });
  };
  const openDelete = (item) => setModal({ type: "delete", item });
  const closeModal = () => setModal(null);

  const handleAdd = () => {
    if (!formValue.trim()) return;
    const newItem = { id: Date.now(), name: formValue.trim() };
    setData([...data, newItem]);
    closeModal();
    showToast("Category added successfully!");
    setCurrentPage(Math.ceil((data.length + 1) / ITEMS_PER_PAGE));
  };

  const handleEdit = () => {
    if (!formValue.trim()) return;
    setData(data.map((d) => d.id === modal.item.id ? { ...d, name: formValue.trim() } : d));
    closeModal();
    showToast("Category updated successfully!");
  };

  const handleDelete = () => {
    const newData = data.filter((d) => d.id !== modal.item.id);
    setData(newData);
    const newTotal = Math.ceil(newData.filter(d => d.name.toLowerCase().includes(search.toLowerCase())).length / ITEMS_PER_PAGE);
    if (currentPage > newTotal) setCurrentPage(Math.max(1, newTotal));
    closeModal();
    showToast("Category deleted.", "error");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f4f6f9", minHeight: "100vh", padding: "24px 16px" }}>
      <style>{`
        * { box-sizing: border-box; }
        .card { background: #fff; border-radius: 10px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); padding: 28px 24px; }
        .header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px; }
        h2 { margin: 0; font-size: 1.25rem; font-weight: 700; color: #2d3748; }
        .btn-add { background: #1abc9c; color: #fff; border: none; border-radius: 6px; padding: 9px 18px; font-size: 0.9rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.2s; }
        .btn-add:hover { background: #17a589; }
        .controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px; }
        .show-entries { font-size: 0.85rem; color: #555; }
        .search-wrap { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #555; }
        .search-wrap input { border: 1px solid #ddd; border-radius: 5px; padding: 6px 10px; font-size: 0.85rem; outline: none; width: 180px; }
        .search-wrap input:focus { border-color: #1abc9c; }
        /* Desktop Table */
        .tbl-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
        thead th { background: #f8f9fa; color: #555; font-weight: 600; padding: 12px 14px; text-align: left; border-bottom: 2px solid #e9ecef; }
        tbody tr { border-bottom: 1px solid #f0f0f0; transition: background 0.15s; }
        tbody tr:hover { background: #f9fffe; }
        td { padding: 12px 14px; color: #2d3748; }
        .td-sl { color: #888; width: 80px; }
        .action-btns { display: flex; gap: 8px; }
        .btn-edit { background: #e3f2fd; color: #1565c0; border: none; border-radius: 5px; padding: 7px 10px; cursor: pointer; transition: background 0.2s; }
        .btn-edit:hover { background: #bbdefb; }
        .btn-del { background: #fdecea; color: #c62828; border: none; border-radius: 5px; padding: 7px 10px; cursor: pointer; transition: background 0.2s; }
        .btn-del:hover { background: #ffcdd2; }
        /* Mobile Cards */
        .mobile-cards { display: none; }
        .m-card { background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 14px 16px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
        .m-card-info .m-sl { font-size: 0.75rem; color: #aaa; margin-bottom: 2px; }
        .m-card-info .m-name { font-weight: 600; color: #2d3748; font-size: 0.95rem; }
        /* Pagination */
        .pagination-row { display: flex; justify-content: space-between; align-items: center; margin-top: 18px; flex-wrap: wrap; gap: 10px; }
        .pagination-info { font-size: 0.82rem; color: #777; }
        .pagination-btns { display: flex; align-items: center; gap: 6px; }
        .pg-btn { background: #fff; border: 1px solid #ddd; border-radius: 5px; padding: 6px 12px; font-size: 0.85rem; cursor: pointer; color: #555; transition: all 0.15s; }
        .pg-btn:hover:not(:disabled) { background: #f0fdf9; border-color: #1abc9c; color: #1abc9c; }
        .pg-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .pg-btn.active { background: #1abc9c; color: #fff; border-color: #1abc9c; font-weight: 700; }
        /* Modal */
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 16px; }
        .modal { background: #fff; border-radius: 10px; padding: 28px 24px; width: 100%; max-width: 420px; box-shadow: 0 8px 40px rgba(0,0,0,0.18); }
        .modal h3 { margin: 0 0 18px; font-size: 1.1rem; color: #2d3748; }
        .modal label { font-size: 0.85rem; color: #555; font-weight: 600; display: block; margin-bottom: 6px; }
        .modal input { width: 100%; border: 1px solid #ddd; border-radius: 6px; padding: 9px 12px; font-size: 0.9rem; outline: none; margin-bottom: 18px; }
        .modal input:focus { border-color: #1abc9c; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; }
        .btn-cancel { background: #f1f3f5; border: none; border-radius: 6px; padding: 9px 18px; cursor: pointer; font-size: 0.9rem; color: #555; font-weight: 600; }
        .btn-cancel:hover { background: #e9ecef; }
        .btn-confirm { background: #1abc9c; color: #fff; border: none; border-radius: 6px; padding: 9px 18px; cursor: pointer; font-size: 0.9rem; font-weight: 600; }
        .btn-confirm:hover { background: #17a589; }
        .btn-danger { background: #e53935; color: #fff; border: none; border-radius: 6px; padding: 9px 18px; cursor: pointer; font-size: 0.9rem; font-weight: 600; }
        .btn-danger:hover { background: #c62828; }
        .del-msg { font-size: 0.92rem; color: #555; margin-bottom: 20px; }
        /* Toast */
        .toast { position: fixed; bottom: 28px; right: 24px; padding: 12px 20px; border-radius: 8px; font-size: 0.88rem; font-weight: 600; z-index: 9999; box-shadow: 0 4px 18px rgba(0,0,0,0.15); animation: fadeIn 0.3s; }
        .toast.success { background: #1abc9c; color: #fff; }
        .toast.error { background: #e53935; color: #fff; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 600px) {
          .tbl-wrap table { display: none; }
          .mobile-cards { display: block; }
          .card { padding: 18px 14px; }
          h2 { font-size: 1.05rem; }
          .search-wrap input { width: 130px; }
        }
      `}</style>

      <div className="card">
        <div className="header-row">
          <h2>Point categories</h2>
          <button className="btn-add" onClick={openAdd}>
            <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>+</span> New category
          </button>
        </div>

        <div className="controls">
          <div className="show-entries">
            Show <strong>{ITEMS_PER_PAGE}</strong> entries
          </div>
          <div className="search-wrap">
            Search:
            <input value={search} onChange={handleSearchChange} placeholder="Search..." />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th className="td-sl">Sl ↕</th>
                <th>Category name ↕</th>
                <th>Action ↕</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={3} style={{ textAlign: "center", color: "#aaa", padding: "28px" }}>No categories found.</td></tr>
              ) : paginated.map((item, idx) => (
                <tr key={item.id}>
                  <td className="td-sl">{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" title="Edit" onClick={() => openEdit(item)}>✏️</button>
                      <button className="btn-del" title="Delete" onClick={() => openDelete(item)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="mobile-cards">
          {paginated.length === 0 ? (
            <div style={{ textAlign: "center", color: "#aaa", padding: "28px" }}>No categories found.</div>
          ) : paginated.map((item, idx) => (
            <div className="m-card" key={item.id}>
              <div className="m-card-info">
                <div className="m-sl">#{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</div>
                <div className="m-name">{item.name}</div>
              </div>
              <div className="action-btns">
                <button className="btn-edit" title="Edit" onClick={() => openEdit(item)}>✏️</button>
                <button className="btn-del" title="Delete" onClick={() => openDelete(item)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination-row">
          <div className="pagination-info">
            Showing {filtered.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} entries
          </div>
          <div className="pagination-btns">
            <button className="pg-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} className={`pg-btn${currentPage === i + 1 ? " active" : ""}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
            ))}
            <button className="pg-btn" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modal && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            {modal.type === "add" && (
              <>
                <h3>Add New Category</h3>
                <label>Category Name</label>
                <input autoFocus value={formValue} onChange={e => setFormValue(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAdd()} placeholder="Enter category name..." />
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={closeModal}>Cancel</button>
                  <button className="btn-confirm" onClick={handleAdd}>Add Category</button>
                </div>
              </>
            )}
            {modal.type === "edit" && (
              <>
                <h3>Edit Category</h3>
                <label>Category Name</label>
                <input autoFocus value={formValue} onChange={e => setFormValue(e.target.value)} onKeyDown={e => e.key === "Enter" && handleEdit()} />
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={closeModal}>Cancel</button>
                  <button className="btn-confirm" onClick={handleEdit}>Save Changes</button>
                </div>
              </>
            )}
            {modal.type === "delete" && (
              <>
                <h3>Delete Category</h3>
                <p className="del-msg">Are you sure you want to delete <strong>"{modal.item.name}"</strong>? This action cannot be undone.</p>
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={closeModal}>Cancel</button>
                  <button className="btn-danger" onClick={handleDelete}>Delete</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}