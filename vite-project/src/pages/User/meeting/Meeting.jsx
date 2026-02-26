// import { useState, useMemo } from "react";
// import { Eye } from "lucide-react";

// const ITEMS_PER_PAGE = 5;

// const MeetingsPage = () => {
//   const [meetings, setMeetings] = useState([
//     {
//       id: 1,
//       title: "Project Alpha Review",
//       type: "Project Review",
//       date: "2026-02-26",
//       time: "15:30 - 17:00",
//       organizer: "Employee",
//       room: "Conference Room A",
//       recurrence: "Monthly",
//       status: "Scheduled",
//     },
//     {
//       id: 2,
//       title: "Project Alpha Review",
//       type: "Project Review",
//       date: "2026-01-26",
//       time: "15:30 - 17:00",
//       organizer: "Employee",
//       room: "Conference Room A",
//       recurrence: "Monthly",
//       status: "Scheduled",
//     },
//     {
//       id: 3,
//       title: "Project Alpha Review",
//       type: "Project Review",
//       date: "2025-12-26",
//       time: "15:30 - 17:00",
//       organizer: "Employee",
//       room: "Conference Room A",
//       recurrence: "Monthly",
//       status: "Scheduled",
//     },
//     {
//       id: 4,
//       title: "Project Alpha Review",
//       type: "Project Review",
//       date: "2025-11-26",
//       time: "15:30 - 17:00",
//       organizer: "Employee",
//       room: "Conference Room A",
//       recurrence: "Monthly",
//       status: "Scheduled",
//     },
//     {
//       id: 5,
//       title: "Project Alpha Review",
//       type: "Project Review",
//       date: "2025-10-26",
//       time: "15:30 - 17:00",
//       organizer: "Employee",
//       room: "Conference Room A",
//       recurrence: "Monthly",
//       status: "Scheduled",
//     },
//     {
//       id: 6,
//       title: "Project Alpha Review",
//       type: "Project Review",
//       date: "2025-09-26",
//       time: "15:30 - 17:00",
//       organizer: "Employee",
//       room: "Conference Room A",
//       recurrence: "Monthly",
//       status: "Scheduled",
//     },
//   ]);

//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedMeeting, setSelectedMeeting] = useState(null);

//   /* 🔍 Search filter */
//   const filteredMeetings = useMemo(() => {
//     return meetings.filter((m) =>
//       `${m.title} ${m.room} ${m.organizer}`
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     );
//   }, [search, meetings]);

//   /* 📄 Pagination */
//   const totalPages = Math.ceil(filteredMeetings.length / ITEMS_PER_PAGE);

//   const paginatedMeetings = filteredMeetings.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const openModal = (meeting) => setSelectedMeeting({ ...meeting });
//   const closeModal = () => setSelectedMeeting(null);

//   return (
//     <div className="p-6 bg-[#f8fafa] min-h-screen">
//       <div className="bg-white rounded-2xl shadow p-5">

//         <h1 className="text-2xl font-bold mb-4">Meetings</h1>

//         {/* 🔍 Search */}
//         <div className="flex gap-2 mb-4">
//           <input
//             placeholder="Search meetings..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="border rounded-lg px-3 py-2 w-full max-w-sm"
//           />
//         </div>

//         {/* 📋 Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="p-3 text-left">#</th>
//                 <th className="p-3 text-left">Meeting</th>
//                 <th className="p-3 text-left">Date & Time</th>
//                 <th className="p-3 text-left">Organizer</th>
//                 <th className="p-3 text-left">Room</th>
//                 <th className="p-3 text-left">Recurrence</th>
//                 <th className="p-3 text-left">Status</th>
//                 <th className="p-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedMeetings.map((m, index) => (
//                 <tr key={m.id} className="border-t">
//                   <td className="p-3">
//                     {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
//                   </td>
//                   <td className="p-3">
//                     <p className="font-medium">{m.title}</p>
//                     <p className="text-xs text-gray-500">{m.type}</p>
//                   </td>
//                   <td className="p-3">
//                     <p>{m.date}</p>
//                     <p className="text-xs text-gray-500">{m.time}</p>
//                   </td>
//                   <td className="p-3">{m.organizer}</td>
//                   <td className="p-3">{m.room}</td>
//                   <td className="p-3">
//                     <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
//                       {m.recurrence}
//                     </span>
//                   </td>
//                   <td className="p-3">
//                     <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
//                       {m.status}
//                     </span>
//                   </td>
//                   <td className="p-3 text-center">
//                     <button onClick={() => openModal(m)}>
//                       <Eye className="w-5 h-5 text-blue-600" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {paginatedMeetings.length === 0 && (
//                 <tr>
//                   <td colSpan="8" className="p-4 text-center text-gray-500">
//                     No meetings found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* 📄 Pagination */}
//         <div className="flex justify-between items-center mt-4 text-sm">
//           <span>
//             Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
//             {Math.min(
//               currentPage * ITEMS_PER_PAGE,
//               filteredMeetings.length
//             )}{" "}
//             of {filteredMeetings.length} meetings
//           </span>

//           <div className="flex gap-1">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((p) => p - 1)}
//               className="px-3 py-1 border rounded disabled:opacity-50"
//             >
//               Previous
//             </button>

//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 border rounded ${
//                   currentPage === i + 1
//                     ? "bg-green-600 text-white"
//                     : ""
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((p) => p + 1)}
//               className="px-3 py-1 border rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeetingsPage;



import { useState, useEffect } from "react";
import { meetingAPI } from "../../../services/api";
import { Video, Calendar, Clock, MapPin, User, Loader2 } from "lucide-react";

const statusColor = (s) => {
  switch (s) {
    case "Scheduled": return "bg-blue-100 text-blue-700";
    case "Ongoing": return "bg-emerald-100 text-emerald-700";
    case "Completed": return "bg-gray-100 text-gray-600";
    case "Cancelled": return "bg-red-100 text-red-600";
    default: return "bg-gray-100 text-gray-600";
  }
};

const MeetingsPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await meetingAPI.getAll();
        setMeetings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered = filter === "All" ? meetings : meetings.filter(m => m.status === filter);

  return (
    <div className="min-h-screen bg-[#f8fafa] p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-2xl font-black text-[#0f2e2e] flex items-center gap-2">
              <Video className="text-emerald-600" /> Meetings
            </h1>
            <p className="text-gray-400 text-sm mt-1">All company meetings and schedules</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm text-center">
            <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-widest">Total</span>
            <span className="text-lg font-bold text-[#0f2e2e]">{meetings.length}</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {["All", "Scheduled", "Ongoing", "Completed", "Cancelled"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filter === f ? "bg-[#0f2e2e] text-white" : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                }`}>{f}</button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-600" size={36} /></div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
            <Video size={40} className="mx-auto mb-3 text-gray-200" />
            <p className="font-bold text-gray-500">No meetings found</p>
            <p className="text-sm text-gray-400">Your admin will schedule meetings here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((m) => (
              <div key={m._id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-black text-[#0f2e2e] text-base">{m.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${statusColor(m.status)}`}>
                        {m.status}
                      </span>
                    </div>

                    {m.description && <p className="text-xs text-gray-500 mb-3">{m.description}</p>}

                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-emerald-500" />
                        {new Date(m.date).toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })}
                      </span>
                      {m.time && (
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} className="text-blue-400" /> {m.time}
                        </span>
                      )}
                      {m.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-red-400" /> {m.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <User size={12} className="text-purple-400" /> {m.organizer}
                      </span>
                    </div>
                  </div>

                  {m.attendeeNames?.length > 0 && (
                    <div className="shrink-0 text-right">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Attendees</p>
                      <p className="text-xs text-gray-600 font-medium">{m.attendeeNames.slice(0, 3).join(", ")}
                        {m.attendeeNames.length > 3 && ` +${m.attendeeNames.length - 3} more`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingsPage;
