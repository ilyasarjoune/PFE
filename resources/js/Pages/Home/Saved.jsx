import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';

export default function Saved({ auth, savedInternships }) {
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [internships, setInternships] = useState(savedInternships);

  const handleSelectInternship = (internship) => {
    setSelectedInternship(internship);
  };

  const handleUnsaveInternship = (internshipId) => {
    axios.post(route('internships.unsave'), { internship_id: internshipId })
      .then(response => {
        alert('Internship unsaved successfully');
        setInternships(internships.filter(internship => internship.id !== internshipId));
        setSelectedInternship(null);
      })
      .catch(error => {
        console.error('There was an error unsaving the internship!', error);
      });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Saved Internships" />
      <div className="py-0">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm ">
            <div className='feed-container'>
              <div className='interMenu'>
                <div className='searchresult'>
                  <h3>Saved Internships: {internships.length}</h3>
                </div>
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
                    <div className='inter-details'>
                      <p>{selectedInternship.company}</p>
                      <p>{selectedInternship.title}</p>
                      <p><i className="fa-solid fa-location-dot"></i> {selectedInternship.location}</p>
                      <p><i className="fa-solid fa-calendar-days"></i> {selectedInternship.date}</p>
                      <p>Domain: {selectedInternship.domain}</p>
                    </div>
                    <hr />
                    <div className='more-details'>
                      <p><h1><i className="fa-solid fa-circle-info"></i> Details:</h1>{selectedInternship.description}</p>
                    </div>
                    <hr />
                    <div className='btns'>
                      <a href={selectedInternship.link} target='_blank'>
                        <span>Apply <i className="fa-solid fa-arrow-up-right-from-square"></i></span>
                      </a>
                      <a onClick={() => handleUnsaveInternship(selectedInternship.id)}>
                        <i className="fa-regular fa-bookmark"></i> Unsave
                      </a>
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
