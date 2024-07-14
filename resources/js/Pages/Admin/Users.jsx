import React from 'react'
import { Inertia } from '@inertiajs/inertia'
import AdminLayout from '@/Layouts/AdminLayout'

const Users = ({ users }) => {
  const deleteUser = (id) => {
    Inertia.delete(`/admin/users/${id}`)
  }

  return (
    <AdminLayout>
      <h1><i class="fa-solid fa-users"></i> Users :</h1>
      <table class="table table-striped" >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">delete</th>
            </tr>
          </thead>
          <tbody>
        {users.map(user => (
       
          
            <tr key={user.id}> 
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td><button onClick={() => deleteUser(user.id)} class="btn btn-outline-danger">Delete</button></td>
            </tr>
          
      
      

        ))}
     
     </tbody>
     </table>
    </AdminLayout>
  )
}

export default Users
