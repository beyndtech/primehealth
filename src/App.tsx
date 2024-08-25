import { Route, Routes, Navigate } from "react-router-dom";

// Importing pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordReset from "./pages/PasswordReset";
import PageLoader from "./components/PageLoader";
import { contextData } from "./context/AuthContext";
import UpdatePatientProfile from "./pages/PatientDashboard/UpdatePatientProfile";
import Profile from "./pages/PatientDashboard/Profile";
import PatientDashboard from "./pages/PatientDashboard/PatientDashboard";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Settings from "./pages/DoctorDashboard/Settings";
import DrsLayout from "./components/Layouts/DrsLayout";
import DoctorDashboard from "./pages/DoctorDashboard/DoctorDashboard";
import ManagePatients from "./pages/DoctorDashboard/ManagePatients";
import UpdateDoctorProfile from "./pages/DoctorDashboard/UpdateDoctorProfile";
import DoctorProfile from "./components/DoctorProfileInfo";

function App() {
  const { fetching, user } = contextData();

  if (fetching) return <PageLoader />;

  if (!user) {
    return (
      <Routes>
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/password-reset/:page" element={<PasswordReset />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/dashboard/*" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  if (user.accountType === "doctor") {
    if (user.firstName === "") {
      return (
        <Routes>
          <Route path="*" element={<Navigate to="/dashboard/doctor" />} />
          <Route
            path="/dashboard/doctor/updateProfile"
            element={<UpdateDoctorProfile />}
          />
          <Route
            path="/dashboard/doctor/*"
            element={<Navigate to="/dashboard/doctor/updateProfile" />}
          />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard/doctor" />} />
        <Route path="/dashboard/doctor/" element={<DrsLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="/dashboard/doctor/home" element={<DoctorDashboard />} />
          <Route
            path="/dashboard/doctor/manage-patients"
            element={<ManagePatients />}
          />
          <Route path="/dashboard/doctor/profile" element={<DoctorProfile />} />
          <Route path="/dashboard/doctor/settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Navigate to="/dashboard/doctor/" />} />
        <Route
          path="/register"
          element={<Navigate to="/dashboard/doctor/" />}
        />
      </Routes>
    );
  }

  if (user.accountType === "patient") {
    if (user.firstName === "") {
      return (
        <Routes>
          <Route path="*" element={<Navigate to="/dashboard/patient" />} />
          <Route
            path="/dashboard/patient/updateProfile"
            element={<UpdatePatientProfile />}
          />
          <Route
            path="/dashboard/patient/*"
            element={<Navigate to="/dashboard/patient/updateProfile" />}
          />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard/patient" />} />
        <Route path="/dashboard/patient/" element={<DefaultLayout />}>
          <Route index element={<PatientDashboard />} />
          <Route
            path="/dashboard/patient/home"
            element={<PatientDashboard />}
          />
          <Route path="/dashboard/patient/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Navigate to="/dashboard/patient/" />} />
        <Route
          path="/register"
          element={<Navigate to="/dashboard/patient/" />}
        />
      </Routes>
    );
  }

  return null;
}

export default App;
