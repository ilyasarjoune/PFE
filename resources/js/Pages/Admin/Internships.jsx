import React from 'react'
import { Inertia } from '@inertiajs/inertia'
import AdminLayout from '@/Layouts/AdminLayout'

const Internships = ({ internships }) => {
  const deleteInternship = (id) => {
    Inertia.delete(`/admin/internships/${id}`)
  }

  return (
    <AdminLayout>
      <h1>Internships :</h1>
      <div className='intercontainer' >
      {internships.map(internship => (
          
          <div key={internship.id} className='cardinter'>
            
              {internship.title}
              
             
               <button onClick={() => deleteInternship(internship.id)}>Delete</button>
          </div>
        ))}
        </div>
      
    </AdminLayout>
  )
}

export default Internships
