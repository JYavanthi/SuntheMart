import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AdminRoute: React.FC<Props> = ({ children }) => {
  const user = localStorage.getItem("user");
  const roleId = Number(localStorage.getItem("roleId"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roleId !== 1) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;

// import React from "react";
// import { Navigate } from "react-router-dom";

// interface Props {
//   children: React.ReactNode;
// }

// const AdminRoute: React.FC<Props> = ({ children }) => {
//   const admin = sessionStorage.getItem("admin");       // ✅ changed
//   const roleId = Number(sessionStorage.getItem("adminRoleId")); // ✅ changed

//   if (!admin) {
//     return <Navigate to="/login" replace />;
//   }

//   if (roleId !== 1) {
//     return <Navigate to="/" replace />;
//   }

//   return <>{children}</>;
// };

// export default AdminRoute;