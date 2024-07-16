import React from 'react'
import { Inertia } from '@inertiajs/inertia'
import AdminLayout from '@/Layouts/AdminLayout'
import Dropdown from '@/Components/Dropdown';
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
              <Dropdown > 
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type=""
                                                className="drop inline-flex items-center px-3 py-2  border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                              <i class="fa-solid fa-ellipsis-vertical"></i>
                                                    
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                    <a  onClick={() => deleteInternship(internship.id)} className='btn to-red-900' >Delete</a>
                                        
                                    </Dropdown.Content>
                                </Dropdown>
              <h3>{internship.company}</h3>
              <h2>{internship.title}</h2>
              <p>{internship.location}</p>
              <p>{internship.date}</p>
              
             
              
          </div>
        ))}
        </div>
      
    </AdminLayout>
  )
}

export default Internships
