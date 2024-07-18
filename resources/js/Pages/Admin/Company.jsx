import React from 'react'
import { Inertia } from '@inertiajs/inertia'
import AdminLayout from '@/Layouts/AdminLayout'

const Company = ({ company }) => {
  const deletecompany = (id) => {
    Inertia.delete(`/admin/companie/${id}`)
  }

  return (
    <AdminLayout>
      <h1><i class="fa-solid fa-company"></i> Companies :</h1>
      <table class="table table-striped" >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Site Web</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
        {company.map(company => (
       
          
            <tr key={company.id}> 
              <th scope="row">{company.id}</th>
              <td>{company.name}</td>
              <td>{company.email}</td>
              <td>{company.site_web_url}</td>
              <td><button onClick={() => deletecompany(company.id)} class="text-red-700 hover:text-red-500">Delete</button></td>
            </tr>
          
      
      

        ))}
     
     </tbody>
     </table>
    </AdminLayout>
  )
}

export default Company
