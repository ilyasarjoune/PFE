// resources/js/Pages/Admin/Dashboard.jsx

import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { usePage } from '@inertiajs/react';


const Dashboard = ({ userCount, internshipCount }) => {
  const { url } = usePage(); // Use usePage within an Inertia component

  return (
    <AdminLayout>
    <h1><i className="fa-solid fa-tachometer-alt"></i> Dashboard</h1>
    <div className="row">
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="card text-white bg-primary mb-3">
          <div className="card-header">Users</div>
          <div className="card-body">
            <h5 className="card-title">{userCount}</h5>
            <p className="card-text">Total number of users.</p>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="card text-white bg-success mb-3">
          <div className="card-header">Internships</div>
          <div className="card-body">
            <h5 className="card-title">{internshipCount}</h5>
            <p className="card-text">Total number of internships.</p>
          </div>
        </div>
      </div>

    </div>
    
  </AdminLayout>
  );
};

export default Dashboard;
