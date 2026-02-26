
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "./component/layouts/Layout";
import Login from "./pages/Login";
import UserRegister from "./pages/UserRegister";

import Dashboard from "./pages/Dashboard";
import AttendanceForm from "./pages/Attendance/AttendanceForm";
import MonthlyAttendance from "./pages/Attendance/MonthlyAttendance";
import MissingAttendance from "./pages/Attendance/MissingAttendance";
import AwardList from "./pages/award/AwardList";
import Department from "./pages/department/Department";
import SubDepartment from "./pages/department/SubDepartment";
import Employee from "./pages/employee/Employee";
import EmployeePerformance from "./pages/employee/Performance";
import Position from "./pages/employee/Position";
import Holiday from "./pages/leave/Holiday";
import WeeklyHoliday from "./pages/leave/WeeklyHoliday";
import LeaveApplication from "./pages/leave/LeaveApplication";
import SalaryAdvance from "./pages/Payroll/SalaryAdvance";
import { SalaryGenerate } from "./pages/Payroll/SalaryGenerate";
import { ManageEmployeeSalary } from "./pages/Payroll/ManageEmployeeSalary";
import Request from "./pages/procurement/RequestList";
import Quotation from "./pages/procurement/QuotationList";
import BidAnalysis from "./pages/procurement/BidAnalysis";
import PurchaseOrder from "./pages/procurement/PurchaseOrder";
import GoodsReceived from "./pages/procurement/GoodsReceived";
import Vendors from "./pages/procurement/VendorList";
import Units from "./pages/procurement/Units";
import Client from "./pages/projectManagement/Client";
import Project from "./pages/projectManagement/Project";
import ManageTasks from "./pages/projectManagement/ManageTasks";
import Reports from "./pages/projectManagement/Reports";
import TeamMembers from "./pages/projectManagement/TeamMembers";
import CandidateTable from "./pages/Recruitment/CandidateList";
import CandidateSelection from "./pages/Recruitment/CandidateSelection";
import ShortlistTable from "./pages/Recruitment/CandidateShortList";
import InterviewTable from "./pages/Recruitment/Interview";
import AdhocReport from "./pages/Reports/AdhocReport";
import AttendanceReport from "./pages/Reports/AttendanceReport";
import EmployeeReport from "./pages/Reports/EmployeeReports";
import LeaveReport from "./pages/Reports/LeaveReport";
import Payroll from "./pages/Reports/Payroll";
import LoanList from "./pages/loan/LoanList";
import Notice from "./pages/notice/Notice";
import MeetingAdmin from "./pages/User/meeting/MeetingAdmin"
import UserSalary from "./pages/User/salary/UserSalary";

import UserLayout from "./component/User/UserLayout";
import UserDashboard from "./pages/User/dashboard/UserDashboard";
import UserAttendance from "./pages/User/attendance/UserAttendance";
import UserLeaves from "./pages/User/leaves/UserLeaves";
import UserProjects from "./pages/User/projects/UserProjects";
import UserNoticeBoard from "./pages/User/notice/UserNotice";
import UserAchievements from "./pages/User/achivement/UserAchivement";
import CalendarPage from "./pages/User/calendar/Calendar";
import MeetingsPage from "./pages/User/meeting/Meeting";

const App = () => {
  const { isLoggedIn, loginType } = useAuth();

  return (
    <Routes>
      <Route path="/" element={
        isLoggedIn
          ? loginType === "admin" ? <Navigate to="/dashboard" replace /> : <Navigate to="/user/dashboard" replace />
          : <Navigate to="/login" replace />
      } />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<UserRegister />} />

      {/* ── ADMIN ROUTES ── */}
      <Route element={isLoggedIn && loginType === "admin" ? <Layout /> : <Navigate to="/login" replace />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance/form" element={<AttendanceForm />} />
        <Route path="/attendance/monthly" element={<MonthlyAttendance />} />
        <Route path="/attendance/missing" element={<MissingAttendance />} />
        <Route path="/award/list" element={<AwardList />} />
        <Route path="/department" element={<Department />} />
        <Route path="/department/sub" element={<SubDepartment />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employee/position" element={<Position />} />
        <Route path="/employee/performance" element={<EmployeePerformance />} />
        <Route path="/leave/holiday" element={<Holiday />} />
        <Route path="/leave/weekly-holiday" element={<WeeklyHoliday />} />
        <Route path="/leave/application" element={<LeaveApplication />} />
        <Route path="/payroll/salary-advance" element={<SalaryAdvance />} />
        <Route path="/payroll/salary-generate" element={<SalaryGenerate />} />
        <Route path="/payroll/manage-employee-salary" element={<ManageEmployeeSalary />} />
        <Route path="/procurement/request" element={<Request />} />
        <Route path="/procurement/quotation" element={<Quotation />} />
        <Route path="/procurement/bid-analysis" element={<BidAnalysis />} />
        <Route path="/procurement/purchase-order" element={<PurchaseOrder />} />
        <Route path="/procurement/goods-received" element={<GoodsReceived />} />
        <Route path="/procurement/vendors" element={<Vendors />} />
        <Route path="/procurement/units" element={<Units />} />
        <Route path="/project/client" element={<Client />} />
        <Route path="/project/project" element={<Project />} />
        <Route path="/project/tasks" element={<ManageTasks />} />
        <Route path="/project/reports" element={<Reports />} />
        <Route path="/project/team" element={<TeamMembers />} />
        <Route path="/recruitment/candidates" element={<CandidateTable />} />
        <Route path="/recruitment/shortlist" element={<ShortlistTable />} />
        <Route path="/recruitment/interview" element={<InterviewTable />} />
        <Route path="/recruitment/selection" element={<CandidateSelection />} />
        <Route path="/reports/adhoc" element={<AdhocReport />} />
        <Route path="/reports/attendance" element={<AttendanceReport />} />
        <Route path="/reports/employee" element={<EmployeeReport />} />
        <Route path="/reports/leave" element={<LeaveReport />} />
        <Route path="/reports/payroll" element={<Payroll />} />
        <Route path="/loan/list" element={<LoanList />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/meetings" element={<MeetingAdmin />} />
      </Route>

      {/* ── USER ROUTES ── */}
      <Route path="/user" element={isLoggedIn && loginType === "user" ? <UserLayout /> : <Navigate to="/login" replace />}>
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="attendance" element={<UserAttendance />} />
        <Route path="leaves" element={<UserLeaves />} />
        <Route path="projects" element={<UserProjects />} />
        <Route path="notice" element={<UserNoticeBoard />} />
        <Route path="achivement" element={<UserAchievements />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="meeting" element={<MeetingsPage />} />
        <Route path="salary" element={<UserSalary />} />
      </Route>
    </Routes>
  );
};

export default App;