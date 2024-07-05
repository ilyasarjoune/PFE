import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, internships }) {
  const [selectedInternship, setSelectedInternship] = useState(null);

  const handleSelectInternship = (internship) => {
    setSelectedInternship(internship);
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Internships" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className='feed-container'>
              <div className='interMenu'>
                {internships.map((internship, index) => (
                  <div
                    key={index}
                    className={`job-item ${selectedInternship === internship ? 'selected' : ''}`}
                    onClick={() => handleSelectInternship(internship)}
                  >
                    <h4>{internship.title}</h4>
                    <p>{internship.responsibilities}</p>
                    <p>{internship.location}</p>
                  </div>
                ))}
              </div>
              <div className='interDesc'>
                {selectedInternship ? (
                  <>
                    <h2>{selectedInternship.title}</h2>
                    <p><strong>Description:</strong> {selectedInternship.description}</p>
                    <p><strong>Responsibilities:</strong> {selectedInternship.responsibilities}</p>
                    <p><strong>Skills:</strong> {selectedInternship.skills}</p>
                    <p><strong>Location:</strong> {selectedInternship.location}</p>
                    <div className='btns'>
                      <button>Apply</button>
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
