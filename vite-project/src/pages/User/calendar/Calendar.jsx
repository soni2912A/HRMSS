import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";
import { leaveAPI, meetingAPI, attendanceAPI } from "../../../services/api";
import { Loader2, Plus, Pencil, Trash2, StickyNote, X, Save, CalendarDays } from "lucide-react";

const NOTES_KEY = "calendar_personal_notes";
const loadNotes = () => {
  try { return JSON.parse(localStorage.getItem(NOTES_KEY) || "[]"); }
  catch { return []; }
};
const saveNotes = (notes) => localStorage.setItem(NOTES_KEY, JSON.stringify(notes));

const NOTE_COLORS = [
  { bg: "#8b5cf6", label: "Purple" },
  { bg: "#ec4899", label: "Pink" },
  { bg: "#f97316", label: "Orange" },
  { bg: "#06b6d4", label: "Cyan" },
  { bg: "#6366f1", label: "Indigo" },
];

const LEGEND = [
  { color: "#16a34a", label: "Holidays" },
  { color: "#2563eb", label: "Meetings" },
  { color: "#f59e0b", label: "Approved Leave" },
  { color: "#10b981", label: "Present" },
  { color: "#f97316", label: "On Duty" },
  { color: "#8b5cf6", label: "My Notes" },
];

const CalendarPage = () => {
  const [apiEvents, setApiEvents] = useState([]);
  const [notes, setNotes] = useState(loadNotes);
  const [loading, setLoading] = useState(true);
  const [viewModal, setViewModal] = useState(null);
  const [noteForm, setNoteForm] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [holidayRes, meetingRes, leaveRes, attRes] = await Promise.all([
          leaveAPI.getHolidays(),
          meetingAPI.getAll(),
          leaveAPI.getAll(),
          attendanceAPI.getAll(),
        ]);
        const ev = [];

        holidayRes.data.forEach(h => ev.push({
          id: `holiday-${h._id}`, title: `🏖 ${h.name}`,
          start: h.date?.slice(0, 10), allDay: true,
          backgroundColor: "#16a34a", borderColor: "#16a34a",
          extendedProps: { type: "Holiday", description: h.description, isApi: true },
        }));

        meetingRes.data.forEach(m => ev.push({
          id: `meeting-${m._id}`, title: `📅 ${m.title}`,
          start: m.date?.slice(0, 10) + (m.time ? `T${m.time}` : ""),
          backgroundColor: "#2563eb", borderColor: "#2563eb",
          extendedProps: { type: "Meeting", description: `Organizer: ${m.organizer}`, location: m.location, isApi: true },
        }));

        leaveRes.data.forEach(l => {
          if (l.status === "Approved") ev.push({
            id: `leave-${l._id}`, title: `🏝 ${l.type || "Leave"}`,
            start: l.startDate?.slice(0, 10), end: l.endDate?.slice(0, 10),
            allDay: true, backgroundColor: "#f59e0b", borderColor: "#f59e0b",
            extendedProps: { type: "Approved Leave", description: l.reason, isApi: true },
          });
        });

        attRes.data.forEach(a => ev.push({
          id: `att-${a._id}`,
          title: a.checkOut ? `✅ Present` : `🕐 On Duty`,
          start: a.date?.slice(0, 10), allDay: true,
          backgroundColor: a.checkOut ? "#10b981" : "#f97316",
          borderColor: a.checkOut ? "#10b981" : "#f97316",
          extendedProps: { type: "Attendance", description: `In: ${a.checkIn || "--"} | Out: ${a.checkOut || "--"}`, isApi: true },
        }));

        setApiEvents(ev);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchAll();
  }, []);

  const noteEvents = notes.map(n => ({
    id: `note-${n.id}`,
    title: `📌 ${n.title}`,
    start: n.date,
    allDay: true,
    backgroundColor: n.color || "#8b5cf6",
    borderColor: n.color || "#8b5cf6",
    extendedProps: { type: "Personal Note", description: n.content, noteId: n.id, isNote: true },
  }));

  const allEvents = [...apiEvents, ...noteEvents];

  const handleDateClick = (info) => {
    setNoteForm({ date: info.dateStr, title: "", content: "", color: NOTE_COLORS[0].bg });
  };

  const handleEventClick = (info) => {
    const props = info.event.extendedProps;
    if (props.isNote) {
      const note = notes.find(n => n.id === props.noteId);
      if (note) setNoteForm({ ...note });
    } else {
      setViewModal({
        title: info.event.title,
        date: info.event.startStr,
        type: props.type,
        description: props.description,
        location: props.location,
      });
    }
  };

  const handleSaveNote = () => {
    if (!noteForm.title.trim()) return;
    const updated = noteForm.id
      ? notes.map(n => n.id === noteForm.id ? { ...noteForm } : n)
      : [...notes, { ...noteForm, id: Date.now() }];
    setNotes(updated);
    saveNotes(updated);
    setNoteForm(null);
  };

  const handleDeleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    saveNotes(updated);
    setNoteForm(null);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#f8fafa] flex items-center justify-center">
      <Loader2 className="animate-spin text-emerald-600" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafa] p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4">

        {/* ── Page header ── */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <CalendarDays size={18} className="text-emerald-600 flex-shrink-0" />
              <h1 className="text-lg sm:text-2xl font-black text-[#0f2e2e] leading-tight truncate">
                My Calendar
              </h1>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">
              Click any date to add a personal note
            </p>
          </div>
          <button
            onClick={() => setNoteForm({
              date: new Date().toISOString().slice(0, 10),
              title: "", content: "", color: NOTE_COLORS[0].bg
            })}
            className="flex items-center gap-1.5 bg-[#0f2e2e] text-white
              px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm
              font-bold hover:bg-emerald-700 transition shadow-sm whitespace-nowrap flex-shrink-0"
          >
            <Plus size={14} /> Add Note
          </button>
        </div>

        {/* ── Legend — wraps cleanly at 320px ── */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {LEGEND.map(l => (
            <div key={l.label}
              className="flex items-center gap-1 sm:gap-1.5 bg-white px-2 sm:px-3
                py-1 sm:py-1.5 rounded-full border border-gray-100 shadow-sm">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: l.color }} />
              <span className="text-[10px] sm:text-xs font-medium text-gray-600 whitespace-nowrap">
                {l.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Calendar ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Scoped CSS to fix FullCalendar overflow on tiny screens */}
          <style>{`
            .fc .fc-toolbar {
              flex-wrap: wrap;
              gap: 6px;
              padding: 10px 12px 6px;
            }
            .fc .fc-toolbar-title {
              font-size: clamp(0.85rem, 3vw, 1.25rem);
              font-weight: 900;
              white-space: nowrap;
            }
            .fc .fc-button {
              padding: 4px 8px !important;
              font-size: 11px !important;
            }
            .fc .fc-button-group {
              flex-wrap: wrap;
            }
            .fc .fc-daygrid-day-number {
              font-size: 11px;
              padding: 2px 4px;
            }
            .fc .fc-col-header-cell-cushion {
              font-size: 10px;
              padding: 4px 2px;
            }
            .fc-event-title {
              font-size: 10px !important;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            @media (max-width: 380px) {
              .fc .fc-toolbar {
                flex-direction: column;
                align-items: flex-start;
              }
              .fc .fc-toolbar-chunk {
                width: 100%;
              }
              .fc-toolbar-title {
                text-align: center;
                width: 100%;
              }
            }
          `}</style>
          <div className="p-2 sm:p-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "today,dayGridMonth,timeGridWeek",
              }}
              events={allEvents}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              height="auto"
              eventDisplay="block"
              editable={false}
              selectable={true}
              dayMaxEvents={2}
            />
          </div>
        </div>

        {/* ── Notes grid ── */}
        {notes.length > 0 && (
          <div>
            <h2 className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-widest mb-3">
              📌 My Notes ({notes.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {[...notes].sort((a, b) => a.date.localeCompare(b.date)).map(note => (
                <div key={note.id}
                  className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-100
                    shadow-sm hover:shadow-md transition group">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: note.color }} />
                      <p className="font-bold text-[#0f2e2e] text-sm truncate">{note.title}</p>
                    </div>
                    <button
                      onClick={() => setNoteForm({ ...note })}
                      className="p-1 hover:bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100
                        transition flex-shrink-0"
                    >
                      <Pencil size={13} className="text-gray-400" />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 ml-4">
                    {new Date(note.date).toLocaleDateString("en-IN", {
                      weekday: "short", day: "2-digit", month: "short"
                    })}
                  </p>
                  {note.content && (
                    <p className="text-xs text-gray-500 mt-1.5 ml-4 line-clamp-2">{note.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── View event modal ── */}
      {viewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 sm:p-6
            max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4 gap-3">
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400
                  bg-gray-100 px-2 py-0.5 rounded-full inline-block">
                  {viewModal.type}
                </span>
                <h3 className="font-black text-[#0f2e2e] text-base sm:text-lg mt-2 break-words">
                  {viewModal.title.replace(/^[\S]+\s/, "")}
                </h3>
              </div>
              <button
                onClick={() => setViewModal(null)}
                className="p-1.5 hover:bg-gray-100 rounded-xl flex-shrink-0 transition"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📅 {viewModal.date?.slice(0, 10)}</p>
              {viewModal.description && <p>📝 {viewModal.description}</p>}
              {viewModal.location && <p>📍 {viewModal.location}</p>}
            </div>
            <button
              onClick={() => setViewModal(null)}
              className="mt-5 w-full bg-[#0f2e2e] text-white py-2.5 rounded-xl
                text-sm font-bold hover:bg-emerald-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── Note form modal — bottom sheet on mobile ── */}
      {noteForm && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl
            max-h-[92vh] flex flex-col overflow-hidden">

            {/* Modal header */}
            <div className="flex justify-between items-center px-4 sm:px-6 pt-4 sm:pt-6 pb-3
              border-b border-gray-100 flex-shrink-0">
              <h2 className="font-black text-[#0f2e2e] text-base sm:text-lg flex items-center gap-2">
                <StickyNote size={18} className="text-purple-500 flex-shrink-0" />
                {noteForm.id ? "Edit Note" : "Add Note"}
              </h2>
              <button
                onClick={() => setNoteForm(null)}
                className="p-1.5 hover:bg-gray-100 rounded-xl transition flex-shrink-0"
              >
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-4 space-y-3 sm:space-y-4">

              {/* Date */}
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={noteForm.date}
                  onChange={e => setNoteForm({ ...noteForm, date: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3
                    text-sm focus:outline-none focus:ring-2 ring-purple-200"
                />
              </div>

              {/* Title */}
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                  Title *
                </label>
                <input
                  placeholder="Note title..."
                  value={noteForm.title}
                  onChange={e => setNoteForm({ ...noteForm, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3
                    text-sm focus:outline-none focus:ring-2 ring-purple-200"
                />
              </div>

              {/* Content */}
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                  Note / Description
                </label>
                <textarea
                  placeholder="Write your note here..."
                  value={noteForm.content}
                  rows={3}
                  onChange={e => setNoteForm({ ...noteForm, content: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3
                    text-sm focus:outline-none focus:ring-2 ring-purple-200 resize-none"
                />
              </div>

              {/* Color picker */}
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">
                  Color
                </label>
                <div className="flex gap-2.5">
                  {NOTE_COLORS.map(c => (
                    <button
                      key={c.bg}
                      onClick={() => setNoteForm({ ...noteForm, color: c.bg })}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-4 transition-all
                        ${noteForm.color === c.bg ? "border-gray-800 scale-110" : "border-transparent"}`}
                      style={{ backgroundColor: c.bg }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1 pb-2">
                {noteForm.id && (
                  <button
                    onClick={() => handleDeleteNote(noteForm.id)}
                    className="flex items-center gap-1.5 px-3 py-2.5 border border-red-200
                      text-red-500 rounded-xl text-xs sm:text-sm font-bold hover:bg-red-50 transition
                      flex-shrink-0"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                )}
                <button
                  onClick={() => setNoteForm(null)}
                  className="flex-1 border border-gray-200 py-2.5 rounded-xl
                    text-xs sm:text-sm font-bold text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNote}
                  className="flex-1 bg-[#0f2e2e] text-white py-2.5 rounded-xl
                    text-xs sm:text-sm font-bold hover:bg-emerald-700 transition
                    flex items-center justify-center gap-1.5"
                >
                  <Save size={14} /> {noteForm.id ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;