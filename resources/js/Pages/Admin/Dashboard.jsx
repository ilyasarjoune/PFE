// resources/js/Pages/Admin/Dashboard.jsx

import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { usePage } from '@inertiajs/react';


const Dashboard = () => {
  const { url } = usePage(); // Use usePage within an Inertia component

  return (
    <AdminLayout>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard!</p>
    </AdminLayout>
  );
};

export default Dashboard;
