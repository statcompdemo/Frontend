import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
// Sub-routes handled by AppLayout
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// SPG User Pages

import Dashboard from "./pages/SpgUser/Dashboard";
import MyActivity from "./pages/SpgUser/MyActivity";
import DailyWork from "./pages/SpgUser/DailyWork";
import AssignedWork from "./pages/SpgUser/AssignedWork";
import Reconciliation from "./pages/SpgUser/Reconciliation";
import Salary from "./pages/SpgUser/Salary";
import RaisedQueryList from "./pages/SpgUser/Raised Query List";
import MyCompliance from "./pages/SpgUser/My Compliance";
import Reports from "./pages/SpgUser/Reports";
import Registers from "./pages/SpgUser/Registers";
import ManageFiles from "./pages/SpgUser/ManageFiles";



// Admin User Pages

import AdminDashboard from "./pages/AdminUser/AdminDashboard";
import Registraction from "./pages/AdminUser/Registraction";
import AllocatedTasks from "./pages/AdminUser/AllocatedTasks";
import AdminActivity from "./pages/AdminUser/AdminActivity";
import ActAssign from "./pages/AdminUser/ActAssign";
import AdminMyCompliance from "./pages/AdminUser/MyCompliance";
import AdminRegisters from "./pages/AdminUser/Registers";
import AdminReports from "./pages/AdminUser/Reports";
import AdminReconciliation from "./pages/AdminUser/Reconciliation";




// Super Admin Pages

import SuperAdminDashboard from "./pages/SuperAdmin/SuperAdminDashboard";
import Users from "./pages/SuperAdmin/Users";
import ClientStatus from "./pages/SuperAdmin/ClientStatus";
import Timeline from "./pages/SuperAdmin/Timeline";
import Act from "./pages/SuperAdmin/Act";


// Accounts Pages
import AccountsDashboard from "./pages/Accounts/Dashboard";
// import AccountsSetup from "./pages/Accounts/Setup";



import { log } from "./utils/logger";

export default function App() {
    log('debug', "App component rendered");
    return (
        <Router basename={import.meta.env.BASE_URL}>
            {log('debug', "Router initialized with base URL:", import.meta.env.BASE_URL)}
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<Login />} />

                {/* SPG User Protected App - /app/dashboard */}

                <Route
                    path="/app/*"
                    element={
                        <ProtectedRoute allowedRoles={['spg', 'spg_user']}>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="MyActivity" element={<MyActivity />} />
                    <Route path="DailyWork" element={<DailyWork />} />
                    <Route path="AssignedWork" element={<AssignedWork />} />
                    <Route path="reconciliation" element={<Reconciliation />} />
                    <Route path="salary" element={<Salary />} />
                    <Route path="raised-queries" element={<RaisedQueryList />} />
                    <Route path="my-compliance" element={<MyCompliance />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="registers" element={<Registers />} />
                    <Route path="manage-files" element={<ManageFiles />} />


                </Route>

                {/* Admin Protected routes - /admin/dashboard */}

                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="registration" element={<Registraction />} />
                    <Route path="allocated-tasks" element={<AllocatedTasks />} />
                    <Route path="activity" element={<AdminActivity />} />
                    <Route path="assign" element={<ActAssign />} />
                    <Route path="my-compliance" element={<AdminMyCompliance />} />
                    <Route path="registers" element={<AdminRegisters />} />
                    <Route path="reports" element={<AdminReports />} />
                    <Route path="reconciliation" element={<AdminReconciliation />} />
                </Route>

                {/* Super Admin Protected routes - /superadmin/dashboard */}

                <Route
                    path="/superadmin/*"
                    element={
                        <ProtectedRoute allowedRoles={['super_admin', 'superadmin']}>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<SuperAdminDashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="client-status" element={<ClientStatus />} />
                    <Route path="timeline" element={<Timeline />} />
                    <Route path="act" element={<Act />} />
                </Route>

                {/* Accounts Protected routes - /accounts/dashboard */}
                <Route
                    path="/accounts/*"
                    element={
                        <ProtectedRoute allowedRoles={['accounts']}>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<AccountsDashboard />} />
                    {/* <Route path="setup" element={<AccountsSetup />} /> */}


                </Route>

                {/* Catch-all - redirect to login or dashboard */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}
