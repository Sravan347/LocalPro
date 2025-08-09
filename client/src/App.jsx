import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch} from "react-redux";
import { setCredentials } from "./store/authSlice";
import { fetchCurrentUser } from "./services/authSevices"; // Adjust this import based on your API service

import Login from "./pages/Login";
import Home from "./pages/Home";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ProtectedRoute from "./components/protectedRoute";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";

export default function App() {
    const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const user = await fetchCurrentUser();
      if (user) {
        dispatch(setCredentials(user));
      }
    };
    loadUser();
  }, [dispatch]);
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* Public */}
         <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home/>} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Provider Routes */}
        <Route element={<ProtectedRoute allowedRoles={["provider"]} />}>
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
