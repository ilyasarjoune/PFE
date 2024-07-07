import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, internships }) {
  const [selectedInternship, setSelectedInternship] = useState(null);
  const searchresult = internships.length;

  const handleSelectInternship = (internship) => {
    setSelectedInternship(internship);
  };

  return (
    <AuthenticatedLayout user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">search result : {searchresult}</h2>}>
      <Head title="Internships" />
      <div className="py-0">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm ">
            <div className='feed-container'>
              <div className='interMenu'>
                {internships.map((internship, index) => (
                  <div
                    key={index}
                    className={`job-item ${selectedInternship === internship ? 'selected' : ''}`}
                    onClick={() => handleSelectInternship(internship)}
                  >
                    <h4>{internship.title}</h4>
                    <p>{internship.company}</p>
                    <p>{internship.location}</p>
                    <p>{internship.date}</p>
                  </div>
                ))}
              </div>
              <div className='interDesc'>
                {selectedInternship ? (
                  <>
                    <h2>{selectedInternship.title}</h2>
                    <p><strong>Company:</strong> {selectedInternship.company}</p>
                    <p><strong>Location:</strong> {selectedInternship.location}</p>
                    <p><strong>Date:</strong> {selectedInternship.date}</p>
                    <p><strong>Location:</strong> {selectedInternship.location}</p>
                    <div className='btns'>
                      <a href={selectedInternship.link} >Apply</a>
                      <button>Save</button>
                    </div>
                  </>
                ) : (
                  <p>Select an internship to see the description.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
