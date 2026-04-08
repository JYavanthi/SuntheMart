import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const UserRoute: React.FC<Props> = ({ children }) => {
  const user = localStorage.getItem("user");
  const roleId = Number(localStorage.getItem("roleId"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roleId === 1) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default UserRoute;

// import React from "react";
// import { Navigate } from "react-router-dom";

// interface Props {
//   children: React.ReactNode;
// }

// const UserRoute: React.FC<Props> = ({ children }) => {
//   const user = sessionStorage.getItem("user");       // ✅ changed
//   const roleId = Number(sessionStorage.getItem("userRoleId")); // ✅ changed

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (roleId === 1) {
//     return <Navigate to="/admin" replace />;
//   }

//   return <>{children}</>;
// };

// export default UserRoute;