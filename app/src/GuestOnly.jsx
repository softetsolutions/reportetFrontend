import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";

/** Redirect already-logged-in users away from login/signup. */
export default function GuestOnly({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}
