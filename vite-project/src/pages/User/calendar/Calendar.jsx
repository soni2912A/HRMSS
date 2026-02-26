// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { useState } from "react";

// const CalendarPage = () => {
//   const [events, setEvents] = useState([
//     {
//       id: "1",
//       title: "Project Alpha Review",
//       start: "2026-02-26T15:30:00",
//       end: "2026-02-26T16:30:00",
//       backgroundColor: "#2563eb",
//     },
//     {
//       id: "2",
//       title: "Republic Day",
//       start: "2026-01-26",
//       allDay: true,
//       backgroundColor: "#16a34a",
//     },
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [note, setNote] = useState("");
//   const [editEventId, setEditEventId] = useState(null);

//   /* 👉 Date click (Add note) */
//   const handleDateClick = (info) => {
//     setSelectedDate(info.dateStr);
//     setNote("");
//     setEditEventId(null);
//     setShowModal(true);
//   };

//   /* 👉 Event click (Edit/Delete note) */
//   const handleEventClick = (info) => {
//     setSelectedDate(info.event.startStr);
//     setNote(info.event.title);
//     setEditEventId(info.event.id);
//     setShowModal(true);
//   };

//   /* 👉 Save or Update note */
//   const saveNote = () => {
//     if (!note) return;

//     if (editEventId) {
//       // EDIT
//       setEvents((prev) =>
//         prev.map((ev) =>
//           ev.id === editEventId ? { ...ev, title: note } : ev
//         )
//       );
//     } else {
//       // ADD
//       setEvents((prev) => [
//         ...prev,
//         {
//           id: Date.now().toString(),
//           title: note,
//           start: selectedDate,
//           allDay: true,
//           backgroundColor: "#facc15",
//           textColor: "#000",
//         },
//       ]);
//     }

//     closeModal();
//   };

//   /* 👉 Delete note */
//   const deleteNote = () => {
//     setEvents((prev) => prev.filter((ev) => ev.id !== editEventId));
//     closeModal();
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setNote("");
//     setEditEventId(null);
//   };

//   return (
//     <div className="bg-[#f8fafa] p-4">
//       <div className="bg-white rounded-2xl shadow-lg p-4">

//         <h1 className="text-2xl font-bold mb-4">Calendar</h1>

//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           dateClick={handleDateClick}
//           eventClick={handleEventClick}
//           events={events}
//           headerToolbar={{
//             left: "prev,next today",
//             center: "title",
//             right: "dayGridMonth,timeGridWeek,timeGridDay",
//           }}
//         />

//         {/* 📝 Add / Edit Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl p-5 w-[90%] max-w-md">
//               <h2 className="text-lg font-semibold mb-2">
//                 {editEventId ? "Edit Note" : "Add Note"} ({selectedDate})
//               </h2>

//               <textarea
//                 value={note}
//                 onChange={(e) => setNote(e.target.value)}
//                 placeholder="Write your note..."
//                 className="w-full border rounded-lg p-2 mb-3"
//                 rows={4}
//               />

//               <div className="flex justify-between items-center">
//                 {editEventId && (
//                   <button
//                     onClick={deleteNote}
//                     className="px-4 py-2 rounded-lg bg-red-500 text-white"
//                   >
//                     Delete
//                   </button>
//                 )}

//                 <div className="flex gap-2 ml-auto">
//                   <button
//                     onClick={closeModal}
//                     className="px-4 py-2 rounded-lg bg-gray-200"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={saveNote}
//                     className="px-4 py-2 rounded-lg bg-blue-600 text-white"
//                   >
//                     {editEventId ? "Update" : "Save"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default CalendarPage;



import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";
import { leaveAPI, meetingAPI, attendanceAPI } from "../../../services/api";
import { Loader2 } from "lucide-react";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [holidayRes, meetingRes, leaveRes, attRes] = await Promise.all([
          leaveAPI.getHolidays(),
          meetingAPI.getAll(),
          leaveAPI.getAll(),
          attendanceAPI.getAll(),
        ]);

        const allEvents = [];

        // 🟢 Holidays
        holidayRes.data.forEach(h => allEvents.push({
          id: `holiday-${h._id}`,
          title: `🏖 ${h.name}`,
          start: h.date?.slice(0, 10),
          allDay: true,
          backgroundColor: "#16a34a",
          borderColor: "#16a34a",
          extendedProps: { type: "Holiday", description: h.description },
        }));

        // 🔵 Meetings
        meetingRes.data.forEach(m => allEvents.push({
          id: `meeting-${m._id}`,
          title: `📅 ${m.title}`,
          start: m.date?.slice(0, 10) + (m.time ? `T${m.time}` : ""),
          backgroundColor: "#2563eb",
          borderColor: "#2563eb",
          extendedProps: { type: "Meeting", description: `Organizer: ${m.organizer}`, location: m.location },
        }));

        // 🟡 Leave Applications
        leaveRes.data.forEach(l => {
          if (l.status === "Approved") allEvents.push({
            id: `leave-${l._id}`,
            title: `🏝 ${l.type}`,
            start: l.startDate?.slice(0, 10),
            end: l.endDate?.slice(0, 10),
            allDay: true,
            backgroundColor: "#f59e0b",
            borderColor: "#f59e0b",
            extendedProps: { type: "Approved Leave", description: l.reason },
          });
        });

        // ✅ Attendance
        attRes.data.forEach(a => allEvents.push({
          id: `att-${a._id}`,
          title: a.checkOut ? `✅ Present` : `🕐 On Duty`,
          start: a.date?.slice(0, 10),
          allDay: true,
          backgroundColor: a.checkOut ? "#10b981" : "#f97316",
          borderColor: a.checkOut ? "#10b981" : "#f97316",
          extendedProps: {
            type: "Attendance",
            description: `In: ${a.checkIn || "--"} | Out: ${a.checkOut || "--"}`,
          },
        }));

        setEvents(allEvents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleEventClick = (info) => {
    setSelectedEvent({
      title: info.event.title,
      date: info.event.startStr,
      ...info.event.extendedProps,
    });
    setShowModal(true);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#f8fafa] flex items-center justify-center">
      <Loader2 className="animate-spin text-emerald-600" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafa] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        <div>
          <h1 className="text-2xl font-black text-[#0f2e2e]">My Calendar</h1>
          <p className="text-gray-400 text-sm mt-1">Attendance, leaves, meetings & holidays</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3">
          {[
            { color: "#16a34a", label: "Holidays" },
            { color: "#2563eb", label: "Meetings" },
            { color: "#f59e0b", label: "Approved Leaves" },
            { color: "#10b981", label: "Present" },
            { color: "#f97316", label: "On Duty" },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }}></div>
              <span className="text-xs font-medium text-gray-600">{l.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-4">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{ left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek" }}
            events={events}
            eventClick={handleEventClick}
            height="auto"
            eventDisplay="block"
          />
        </div>
      </div>

      {/* Event Detail Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {selectedEvent.type}
                </span>
                <h3 className="font-black text-[#0f2e2e] text-lg mt-2">{selectedEvent.title.replace(/^[^\s]+ /, "")}</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700 font-bold text-xl leading-none">×</button>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📅 {selectedEvent.date?.slice(0, 10)}</p>
              {selectedEvent.description && <p>📝 {selectedEvent.description}</p>}
              {selectedEvent.location && <p>📍 {selectedEvent.location}</p>}
            </div>
            <button onClick={() => setShowModal(false)}
              className="mt-5 w-full bg-[#0f2e2e] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
