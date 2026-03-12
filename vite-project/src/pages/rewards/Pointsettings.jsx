import { useState } from "react";

const PointSettingsForm = () => {
  const [form, setForm] = useState({
    generalPoint: "40",
    attendancePoint: "5",
    collaborativeStart: "2024-06-01",
    collaborativeEnd: "2024-06-15",
    startTime: "09:15",
    endTime: "17:00",
  });
  const [saved, setSaved] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.generalPoint) e.generalPoint = "Required";
    if (!form.attendancePoint) e.attendancePoint = "Required";
    if (!form.collaborativeStart) e.collaborativeStart = "Required";
    if (!form.collaborativeEnd) e.collaborativeEnd = "Required";
    if (!form.startTime) e.startTime = "Required";
    if (!form.endTime) e.endTime = "Required";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSaved(false);
    setCancelled(false);
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaved(true);
    setCancelled(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleClose = () => {
    setForm({
      generalPoint: "40",
      attendancePoint: "5",
      collaborativeStart: "2024-06-01",
      collaborativeEnd: "2024-06-15",
      startTime: "09:15",
      endTime: "17:00",
    });
    setErrors({});
    setSaved(false);
    setCancelled(true);
    setTimeout(() => setCancelled(false), 3000);
  };

  const fields = [
    { label: "General point", name: "generalPoint", type: "number", required: true },
    { label: "Attendance point", name: "attendancePoint", type: "number", required: true },
    { label: "Collaborative point start", name: "collaborativeStart", type: "date", required: true },
    { label: "Collaborative point end", name: "collaborativeEnd", type: "date", required: true },
    { label: "Start time", name: "startTime", type: "time", required: true },
    { label: "End time", name: "endTime", type: "time", required: true },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f6f9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <div style={{
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
        width: "100%",
        maxWidth: "680px",
        padding: "clamp(24px, 5vw, 40px)",
        position: "relative",
      }}>
        {/* Title */}
        <h2 style={{
          fontSize: "clamp(18px, 3vw, 22px)",
          fontWeight: 600,
          color: "#1a1a2e",
          marginBottom: "28px",
          paddingBottom: "16px",
          borderBottom: "2px solid #f0f0f0",
          letterSpacing: "0.2px",
        }}>
          Point Settings
        </h2>

        {/* Toast */}
        {(saved || cancelled) && (
          <div style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            zIndex: 1000,
            background: saved ? "#22c55e" : "#6b7280",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "14px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            animation: "slideIn 0.3s ease",
          }}>
            <span>{saved ? "✓" : "✕"}</span>
            {saved ? "Settings saved successfully!" : "Changes cancelled"}
          </div>
        )}

        {/* Form Fields */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}>
          {fields.map(({ label, name, type, required }) => (
            <div key={name} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#374151",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}>
                {label}
                {required && <span style={{ color: "#ef4444", fontSize: "13px" }}>*</span>}
              </label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                style={{
                  padding: "10px 14px",
                  border: errors[name] ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "15px",
                  color: "#1f2937",
                  background: "#fafafa",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  width: "80%",
                  boxSizing: "border-box",
                  cursor: "pointer",
                }}
                onFocus={e => e.target.style.borderColor = "#3b82f6"}
                onBlur={e => e.target.style.borderColor = errors[name] ? "#ef4444" : "#e5e7eb"}
              />
              {errors[name] && (
                <span style={{ fontSize: "12px", color: "#ef4444" }}>{errors[name]}</span>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "32px",
          paddingTop: "20px",
          borderTop: "1px solid #f0f0f0",
          flexWrap: "wrap",
        }}>
          <button
            onClick={handleClose}
            style={{
              padding: "10px 28px",
              borderRadius: "7px",
              border: "none",
              background: "#ef4444",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s, transform 0.1s",
              minWidth: "90px",
            }}
            onMouseEnter={e => e.target.style.background = "#dc2626"}
            onMouseLeave={e => e.target.style.background = "#ef4444"}
            onMouseDown={e => e.target.style.transform = "scale(0.97)"}
            onMouseUp={e => e.target.style.transform = "scale(1)"}
          >
            Close
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "10px 28px",
              borderRadius: "7px",
              border: "none",
              background: "#3b82f6",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s, transform 0.1s",
              minWidth: "90px",
            }}
            onMouseEnter={e => e.target.style.background = "#2563eb"}
            onMouseLeave={e => e.target.style.background = "#3b82f6"}
            onMouseDown={e => e.target.style.transform = "scale(0.97)"}
            onMouseUp={e => e.target.style.transform = "scale(1)"}
          >
            Save
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          cursor: pointer; opacity: 0.6;
        }
        @media (max-width: 400px) {
          button { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default PointSettingsForm;