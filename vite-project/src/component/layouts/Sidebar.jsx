
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Users,
  Award,
  Building2,
  User,
  Plane,
  Wallet,
  Bell,
  CreditCard,
  ShoppingCart,
  FolderKanban,
  ChevronDown,
  ChevronUp,
  X,
  Video,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [awardOpen, setAwardOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [loanOpen, setLoanOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [payrollOpen, setPayrollOpen] = useState(false);
  const [procurementOpen, setProcurementOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [recruitmentOpen, setRecruitmentOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [rewardOpen, setRewardOpen] = useState(false);
  const [setupOpen, setSetupOpen] = useState(false);

  return (
    <>
      {/* Overlay for mobile/tablet */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 xl:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-16 bottom-0 left-0 z-50
          w-[300px] sm:w-[300px] md:w-[300px] xl:w-[300px]
          bg-gradient-to-b from-[#0f3d3e] to-[#062b2c]
          text-white shadow-2xl
          transition-transform duration-300 ease-in-out
          flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ minWidth: 0 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 flex-shrink-0">
          <h2 className="text-lg font-bold tracking-widest text-white">
            BIZZFLY
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-white/10 transition"
            aria-label="Close sidebar"
          >
            <X size={20} className="hover:text-red-400 transition" />
          </button>
        </div>

        {/* Nav — scrollable */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 text-sm scrollbar-thin scrollbar-thumb-white/20">

          <MenuItem
            to="/dashboard"
            icon={<Home size={18} />}
            label="Dashboard"
            onClose={onClose}
          />

          <Dropdown label="Attendance" icon={<Users size={18} />} open={attendanceOpen} setOpen={setAttendanceOpen}>
            <SubMenu to="/attendance/form" label="Attendance Form" onClose={onClose} />
            <SubMenu to="/attendance/monthly" label="Monthly Attendance" onClose={onClose} />
            <SubMenu to="/attendance/missing" label="Missing Attendance" onClose={onClose} />
          </Dropdown>

          <Dropdown label="Award" icon={<Award size={18} />} open={awardOpen} setOpen={setAwardOpen}>
            <SubMenu to="/award/list" label="Award List" onClose={onClose} />
          </Dropdown>

          <Dropdown label="Department" icon={<Building2 size={18} />} open={departmentOpen} setOpen={setDepartmentOpen}>
            <SubMenu to="/department" label="Department" onClose={onClose} />
            <SubMenu to="/department/sub" label="Sub Department" onClose={onClose} />
          </Dropdown>

          <Dropdown label="Employee" icon={<User size={18} />} open={employeeOpen} setOpen={setEmployeeOpen}>
            <SubMenu to="/employee" label="Employee" onClose={onClose} />
            <SubMenu to="/employee/position" label="Position" onClose={onClose} />
            <SubMenu to="/employee/performance" label="Performance" onClose={onClose} />
          </Dropdown>

          <Dropdown label="Leave" icon={<Plane size={18} />} open={leaveOpen} setOpen={setLeaveOpen}>
            <SubMenu to="/leave/weekly-holiday" label="Weekly Holiday" onClose={onClose} />
            <SubMenu to="/leave/holiday" label="Holiday" onClose={onClose} />
            <SubMenu to="/leave/application" label="Leave Application" onClose={onClose} />
          </Dropdown>

          <Dropdown label="Loan" icon={<Wallet size={18} />} open={loanOpen} setOpen={setLoanOpen}>
            <SubMenu to="/loan/list" label="Loan List" onClose={onClose} />
          </Dropdown>

          <Dropdown label="Notice Board" icon={<Bell size={18} />} open={noticeOpen} setOpen={setNoticeOpen}>
            <SubMenu to="/notice" label="Notice" onClose={onClose} />
          </Dropdown>

          <Dropdown label="Meetings" icon={<Video size={18} />} open={meetingOpen} setOpen={setMeetingOpen}>
            <SubMenu to="/meetings" label="All Meetings" onClose={onClose} />
          </Dropdown>

          <Dropdown label="Payroll" icon={<CreditCard size={18} />} open={payrollOpen} setOpen={setPayrollOpen}>
            <SubMenu to="/payroll/salary-advance" label="Salary Advance" onClose={onClose} />
            <SubMenu to="/payroll/salary-generate" label="Salary Generate" onClose={onClose} />
            <SubMenu to="/payroll/manage-employee-salary" label="Manage Employee Salary" onClose={onClose} />
          </Dropdown>

          <Dropdown label="Procurement" icon={<ShoppingCart size={18} />} open={procurementOpen} setOpen={setProcurementOpen}>
            <SubMenu to="/procurement/request" label="Request" onClose={onClose} />
            <SubMenu to="/procurement/quotation" label="Quotation" onClose={onClose} />
            <SubMenu to="/procurement/bid-analysis" label="Bid Analysis" onClose={onClose} />
            <SubMenu to="/procurement/purchase-order" label="Purchase Order" onClose={onClose} />
            <SubMenu to="/procurement/goods-received" label="Goods Received" onClose={onClose} />
            <SubMenu to="/procurement/vendors" label="Vendors" onClose={onClose} />
            <SubMenu to="/procurement/units" label="Units" onClose={onClose} />
          </Dropdown>

          <Dropdown label="Project Management" icon={<FolderKanban size={18} />} open={projectOpen} setOpen={setProjectOpen}>
            <SubMenu to="/project/client" label="Client" onClose={onClose} />
            <SubMenu to="/project/project" label="Project" onClose={onClose} />
            <SubMenu to="/project/tasks" label="Manage Tasks" onClose={onClose} />
            <SubMenu to="/project/reports" label="Reports" onClose={onClose} />
            <SubMenu to="/project/team" label="Team Members" onClose={onClose} />
          </Dropdown>

          <Dropdown label="Recruitment" icon={<Users size={18} />} open={recruitmentOpen} setOpen={setRecruitmentOpen}>
            <SubMenu to="/recruitment/candidates" label="Candidate List" onClose={onClose} />
            <SubMenu to="/recruitment/shortlist" label="Candidate Shortlist" onClose={onClose} />
            <SubMenu to="/recruitment/interview" label="Interview" onClose={onClose} />
            <SubMenu to="/recruitment/selection" label="Candidate Selection" onClose={onClose} />
          </Dropdown>

          <Dropdown label="Reports" icon={<FolderKanban size={18} />} open={reportsOpen} setOpen={setReportsOpen}>
            <SubMenu to="/reports/attendance" label="Attendance Report" onClose={onClose} />
            <SubMenu to="/reports/leave" label="Leave Report" onClose={onClose} />
            <SubMenu to="/reports/payroll" label="Payroll Report" onClose={onClose} />
            <SubMenu to="/reports/adhoc" label="Adhoc Report" onClose={onClose} />
          </Dropdown>

          <Dropdown label="Reward Points" icon={<Award size={18} />} open={rewardOpen} setOpen={setRewardOpen}>
            <SubMenu to="/reward/settings" label="Point Settings" onClose={onClose} />
            <SubMenu to="/reward/categories" label="Point Categories" onClose={onClose} />
            {/* <SubMenu to="/reward/management" label="Management Points" onClose={onClose} /> */}
            <SubMenu to="/reward/collaborative" label="Collaborative Points" onClose={onClose} />
            <SubMenu to="/reward/attendance" label="Attendance Points" onClose={onClose} />
            <SubMenu to="/reward/employee" label="Employee Points" onClose={onClose} />
          </Dropdown>

          <Dropdown label="Setup Rules" icon={<Building2 size={18} />} open={setupOpen} setOpen={setSetupOpen}>
            <SubMenu to="/setup/rules" label="Rules" onClose={onClose} />
          </Dropdown>

          {/* Bottom padding so last item isn't cut off */}
          <div className="h-6" />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;


/* ── Sub-components ─────────────────────────────────────────── */

const MenuItem = ({ icon, label, to, onClose }) => (
  <Link
    to={to}
    onClick={onClose}
    className="flex items-center gap-3 px-4 py-2.5 rounded-lg
      hover:bg-white/10 transition duration-200 w-full"
  >
    <span className="flex-shrink-0">{icon}</span>
    <span className="truncate">{label}</span>
  </Link>
);

const SubMenu = ({ label, to, onClose }) => (
  <Link
    to={to}
    onClick={onClose}
    className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-300
      hover:text-white hover:bg-white/10 transition w-full"
  >
    <span className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
    <span className="truncate">{label}</span>
  </Link>
);

const Dropdown = ({ icon, label, open, setOpen, children }) => (
  <div>
    <button
      onClick={() => setOpen(!open)}
      className="w-full flex justify-between items-center
        px-4 py-2.5 rounded-lg hover:bg-white/10 transition text-left"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="flex-shrink-0">{icon}</span>
        <span className="truncate">{label}</span>
      </div>
      <span className="flex-shrink-0 ml-2">
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </span>
    </button>

    {open && (
      <div className="ml-7 mt-1 space-y-0.5 border-l border-white/10 pl-2">
        {children}
      </div>
    )}
  </div>
);