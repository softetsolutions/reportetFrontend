import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ReportetProtectedRoute from "./admin/ProtectedRoute.jsx";
import ContextProviderForReportetLayout from "./ContextProviderForReportetLayout.jsx";
import GuestOnly from "./GuestOnly.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import ResetPassword from "./ResetPassword.jsx";
import ReportetLogin from "./Login.jsx";
import UserSignupPage from "./UserSignup.jsx";
import { isAuthenticated } from "./utils/auth";

const Sidebar = lazy(() => import("./Sidebar.jsx"));

const MARKETING_URL =
  import.meta.env.VITE_MARKETING_URL || "http://localhost:5500";

function LazyFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      Loading…
    </div>
  );
}

function App() {
  return (
    <>
      <Suspense fallback={<LazyFallback />}>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={isAuthenticated() ? "/admin" : "/login"}
                replace
              />
            }
          />

          <Route element={<ContextProviderForReportetLayout />}>
            <Route
              path="/login"
              element={
                <GuestOnly>
                  <ReportetLogin />
                </GuestOnly>
              }
            />
            <Route
              path="/signup"
              element={
                <GuestOnly>
                  <UserSignupPage />
                </GuestOnly>
              }
            />
            <Route
              path="/employee/forgot-password"
              element={<ForgotPassword />}
            />
            <Route
              path="/employee/reset-password/:token"
              element={<ResetPassword />}
            />
            {/* Legacy softet path — keep working if old emails are opened */}
            <Route
              path="/reportet/employee/forgot-password"
              element={<ForgotPassword />}
            />
            <Route
              path="/reportet/employee/reset-password/:token"
              element={<ResetPassword />}
            />
            <Route
              path="/admin"
              element={
                <ReportetProtectedRoute requireTyp="org">
                  <Sidebar />
                </ReportetProtectedRoute>
              }
            />
          </Route>

          <Route
            path="*"
            element={
              <Navigate
                to="/login"
                replace
                state={{ marketing: MARKETING_URL }}
              />
            }
          />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
