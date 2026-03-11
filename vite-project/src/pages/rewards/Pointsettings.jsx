import { useState } from "react";

export default function PointSettings() {
  const [form, setForm] = useState({
    generalPoint: "40",
    attendancePoint: "5",
    collaborativeStart: "2024-06-01",
    collaborativeEnd: "2024-06-15",
    startTime: "09:15",
    endTime: "17:00",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => alert("Settings saved!");
  const handleClose = () => alert("Closed!");

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#374151",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block",
    fontWeight: "600",
    fontSize: "14px",
    color: "#1f2937",
    marginBottom: "6px",
  };

  const reqStyle = { color: "#e53935", marginLeft: "2px" };

  const fieldRow = {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "20px",
    gap: "24px",
  };

  const labelCol = {
    width: "220px",
    flexShrink: 0,
    paddingTop: "10px",
  };

  const inputCol = { flex: 1 };

  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: "10px", padding: "36px 40px", width: "100%", maxWidth: "720px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        
        {/* Title */}
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1f2937", marginBottom: "28px" }}>
          Point settings
        </h2>

        {/* General point */}
        <div style={fieldRow}>
          <div style={labelCol}>
            <label style={labelStyle}>General point<span style={reqStyle}>*</span></label>
          </div>
          <div style={inputCol}>
            <input style={inputStyle} name="generalPoint" value={form.generalPoint} onChange={handleChange} type="number" />
          </div>
        </div>

        {/* Attendance point */}
        <div style={fieldRow}>
          <div style={labelCol}>
            <label style={labelStyle}>Attendance point<span style={reqStyle}>*</span></label>
          </div>
          <div style={inputCol}>
            <input style={inputStyle} name="attendancePoint" value={form.attendancePoint} onChange={handleChange} type="number" />
          </div>
        </div>

        {/* Collaborative point start */}
        <div style={fieldRow}>
          <div style={labelCol}>
            <label style={labelStyle}>Collaborative point<br />start<span style={reqStyle}>*</span></label>
          </div>
          <div style={inputCol}>
            <input style={inputStyle} name="collaborativeStart" value={form.collaborativeStart} onChange={handleChange} type="text" />
          </div>
        </div>

        {/* Collaborative point end */}
        <div style={fieldRow}>
          <div style={labelCol}>
            <label style={labelStyle}>Collaborative point end<span style={reqStyle}>*</span></label>
          </div>
          <div style={inputCol}>
            <input style={inputStyle} name="collaborativeEnd" value={form.collaborativeEnd} onChange={handleChange} type="text" />
          </div>
        </div>

        {/* Start time */}
        <div style={fieldRow}>
          <div style={labelCol}>
            <label style={labelStyle}>Start time<span style={reqStyle}>*</span></label>
          </div>
          <div style={inputCol}>
            <input style={inputStyle} name="startTime" value={form.startTime} onChange={handleChange} type="text" />
          </div>
        </div>

        {/* End time */}
        <div style={fieldRow}>
          <div style={labelCol}>
            <label style={labelStyle}>End time<span style={reqStyle}>*</span></label>
          </div>
          <div style={inputCol}>
            <input style={inputStyle} name="endTime" value={form.endTime} onChange={handleChange} type="text" />
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
          <button
            onClick={handleClose}
            style={{ padding: "9px 22px", borderRadius: "6px", border: "none", background: "#e53935", color: "#fff", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}
          >
            Close
          </button>
          <button
            onClick={handleSave}
            style={{ padding: "9px 22px", borderRadius: "6px", border: "none", background: "#1976d2", color: "#fff", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}