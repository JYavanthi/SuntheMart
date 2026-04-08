import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Dashboard from "./dashboard";
import Topbar from "./topbar";
import AddProduct from "./addProduct";
import AdminProduct from "./AdminProduct";
import AdminChooseCategory from "./AdminChooseCategory";
import AdminCategory from "./AdminCategory";
import AdminOrders from "./AdminOrders";
import AdminCustomers from "./AdminCustomers";
import AdminCustomerDetails from "./AdminCustomerDetails";
import AdminPayment from "./AdminPayment";
import AdminPaymentDetails from "./AdminPaymentDetails"
import React, { useEffect, useState } from "react";
import AdminDiscounts from "./AdminDiscounts";
import AdminViewDiscounts from "./AdminViewDiscounts";
import Login from "../login";

const AdminLayout = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  return (
     <>
        {/* Admin Pages */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/AdminProduct" element={<AdminProduct />} />
            <Route path="/AdminChooseCategory" element={<AdminChooseCategory />} />
             <Route path="/AdminCategory" element={<AdminCategory />} />
            <Route path="/AdminOrders" element={<AdminOrders />} />
            <Route path="/AdminCustomers" element={<AdminCustomers />} />
            <Route path="/AdminCustomerDetails" element={<AdminCustomerDetails customer={selectedCustomer} />} />
            <Route path="/AdminPayment" element={<AdminPayment />} />
            <Route path="/AdminPaymentDetails/:id" element={<AdminPaymentDetails />} />
            <Route path="/AdminDiscounts" element={<AdminDiscounts />} />
            <Route path="/AdminViewDiscounts" element={<AdminViewDiscounts />} />
             <Route path="/login" element={<Login />} />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
        

      
    
    </>
  );
};

export default AdminLayout;
