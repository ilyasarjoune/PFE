import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';

export default function Index({ auth, internships, noResults }) {
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [filterPaid, setFilterPaid] = useState(null);
  const [filterDuration, setFilterDuration] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [filteredInternships, setFilteredInternships] = useState(internships);

  useEffect(() => {
    let result = internships;

    if (filterPaid !== null) {
      result = result.filter(internship => internship.paid === filterPaid);
    }

    if (filterDuration) {
      result = result.filter(internship => internship.duration === filterDuration);
    }

    if (filterType) {
      result = result.filter(internship => internship.type === filterType);
    }

    setFilteredInternships(result);
  }, [filterPaid, filterDuration, filterType, internships]);

  const handleSelectInternship = (internship) => {
    setSelectedInternship(internship);
  };

  const handleSaveInternship = (internshipId) => {
    axios.post(route('internships.save'), { internship_id: internshipId })
      .then(response => {
        alert('Internship saved successfully');
      })
      .catch(error => {
        console.error('There was an error saving the internship!', error);
      });
  };

  const uniqueDurations = [...new Set(internships.map(internship => internship.duration))];
  const uniqueTypes = [...new Set(internships.map(internship => internship.type))];

  return (
    <AuthenticatedLayout
      user={auth.user}
      noResults={noResults}
      header={
        <div className='filter'>
          <div className="dropdown flex items-center rounded-lg">
            <button className="btn btn-outline-success rounded-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Paid
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#" onClick={() => setFilterPaid(null)}>All</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => setFilterPaid(1)}>Yes</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => setFilterPaid(0)}>No</a></li>
            </ul>
            <hr className="vertical-hr"></hr>
          </div>
          
          <div className="dropdown rounded-lg">
            <button className="btn btn-outline-primary rounded-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Duration
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#" onClick={() => setFilterDuration(null)}>All</a></li>
              {uniqueDurations.map((duration, index) => (
                <li key={index}><a className="dropdown-item" href="#" onClick={() => setFilterDuration(duration)}>{duration}</a></li>
              ))}
            </ul>
          </div>
          <div className="dropdown rounded-lg">
            <button className="btn btn-outline-info rounded-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Type
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#" onClick={() => setFilterType(null)}>All</a></li>
              {uniqueTypes.map((type, index) => (
                <li key={index}><a className="dropdown-item" href="#" onClick={() => setFilterType(type)}>{type}</a></li>
              ))}
            </ul>
          </div>
          
        </div>
      }
    >
      <Head title="Internships" />
      <div className="py-0">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm">
            <div className="feed-container">
              <div className="interMenu">
                {noResults ? (
                  <div className="text-center text-red-500">No matching internships found.</div>
                ) : (
                  <>
                    <div className="searchresult">
                      <h3>Result: {filteredInternships.length}</h3>
                    </div>
                    {filteredInternships.map((internship, index) => (
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
                  </>
                )}
              </div>
              <div className="interDesc">
                {selectedInternship ? (
                  <>
                    <div className="inter-details">
                      <p>{selectedInternship.company}</p>
                      <p>{selectedInternship.title}</p>
                      <p><i className="fa-solid fa-location-dot"></i> {selectedInternship.location}</p>
                      <p><i className="fa-solid fa-calendar-days"></i> {selectedInternship.date}</p>
                      <p>Domain: {selectedInternship.domain}</p>
                    </div>
                    <hr />
                    <div className="more-details">
                      <p><h1><i className="fa-solid fa-circle-info"></i> Details:</h1>{selectedInternship.description}</p>
                    </div>
                    <hr />
                    <div className="btns">
                      <a href={selectedInternship.link} target='_blank'>
                        <span>Apply <i className="fa-solid fa-arrow-up-right-from-square"></i></span>
                      </a>
                      <a onClick={() => handleSaveInternship(selectedInternship.id)}>
                        <i className="fa-regular fa-bookmark"></i> Save
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
