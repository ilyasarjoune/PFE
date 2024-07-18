// requests.jsx

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AdminLayout from '@/Layouts/AdminLayout';
import Dropdown from '@/Components/Dropdown';

const Requests = ({ OfferRequests }) => {
    const [expandedDescriptions, setExpandedDescriptions] = useState({});

    const deleteOfferRequest = (id) => {
        Inertia.post(`/admin/offersrequests/${id}/refuse`);
    };

    const acceptOfferRequest = (id) => {
        Inertia.post(`/admin/offersrequests/${id}/accept`);
    };

    const toggleDescription = (id) => {
        setExpandedDescriptions(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const truncateDescription = (description, id, isExpanded) => {
        if (isExpanded || description.length <= 150) {
            return description;
        }
        return (
            <>
                {description.substring(0, 150)}
                <button onClick={() => toggleDescription(id)} className="text-blue-500 ml-1">
                    See More
                </button>
            </>
        );
    };

    return (
        <AdminLayout>
            <h1>Offer Requests :</h1>
            <div className='intercontainer'>
                {OfferRequests.map(OfferRequest => (
                    <div key={OfferRequest.id} className='cardinter'>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="drop inline-flex items-center px-3 py-2 border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                    </button>
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button onClick={() => acceptOfferRequest(OfferRequest.id)} className="btn text-green-500">Accept</button>
                                <button onClick={() => deleteOfferRequest(OfferRequest.id)} className="btn text-red-500">Refuse</button>
                            </Dropdown.Content>
                        </Dropdown>
                        <h3>{OfferRequest.company_name}</h3>
                        <h2>{OfferRequest.title}</h2>
                        <p>{OfferRequest.location}</p>
                        <p>
                            {truncateDescription(OfferRequest.description, OfferRequest.id, expandedDescriptions[OfferRequest.id])}
                            {expandedDescriptions[OfferRequest.id] && (
                                <button onClick={() => toggleDescription(OfferRequest.id)} className="text-blue-500 ml-1">
                                    Show Less
                                </button>
                            )}
                        </p>
                        <p>{OfferRequest.date}</p>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
};

export default Requests;
