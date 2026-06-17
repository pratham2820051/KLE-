import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";

import Dashboard from "./component/Dashboard";
import AddPatientPage from "./Pages/Faculty/AddPatientPage";
import ViewPatient from "./Pages/Faculty/ViewPatient/ViewPatient";
import EditPatient from "./Pages/Faculty/EditPatient/EditPatient";
import SoberPeriodPrediction from "./Pages/Faculty/PredictPatient/SoberPeriodPrediction";
import RiskLevelPrediction from "./Pages/Faculty/PredictPatient/RiskLevelPrediction";
import AAOPrediction from "./Pages/Faculty/PredictPatient/AAOPrediction";
import DashboardFaculty from "./component/FacultyPanel/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import Topbar from "./component/Topbar/Topbar";

// ── Route Guards ──────────────────────────────────────────────────────────────
function AdminRoute({ children }) {
  const token = localStorage.getItem("auth");
  const role = localStorage.getItem("role");
  if (!token || role !== "admin") return <Navigate to="/" replace />;
  return children;
}

function CounsellorRoute({ children }) {
  const token = localStorage.getItem("facultyAuth");
  const role = localStorage.getItem("role");
  if (!token || role === "admin") return <Navigate to="/" replace />;
  return children;
}
// ─────────────────────────────────────────────────────────────────────────────

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Topbar />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />

          {/* Admin only */}
          <Route path="/admin/home" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/admin/:id" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/admin/add-patient" element={<AdminRoute><AddPatientPage /></AdminRoute>} />

          {/* Counsellor / Nurse only */}
          <Route path="/faculty" element={<CounsellorRoute><DashboardFaculty /></CounsellorRoute>} />
          <Route path="/patientadd/:id" element={<CounsellorRoute><AddPatientPage /></CounsellorRoute>} />
          <Route path="/patientview/:id" element={<CounsellorRoute><ViewPatient /></CounsellorRoute>} />

          {/* Shared (both roles) */}
          <Route path="/patient/:id" element={
            (localStorage.getItem("auth") || localStorage.getItem("facultyAuth"))
              ? <EditPatient />
              : <Navigate to="/" replace />
          } />
          <Route path="/predictSoberPeriod" element={<SoberPeriodPrediction />} />
          <Route path="/predictRiskLevel" element={<RiskLevelPrediction />} />
          <Route path="/predictAAO" element={<AAOPrediction />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;
