import React, { useState } from 'react';
import Companylayout from '@/Layouts/Companylayout';
import { Head } from '@inertiajs/react';
import CreateOfferRequest from './OfferRequest/Create'; // Adjust path as needed
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

export default function Offer({ auth , internships }) {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isClassSwapped, setIsClassSwapped] = useState(false);
    const [offers, setOffers] = useState([]);
    const [offerToDelete, setOfferToDelete] = useState(null);
    const [activeTab, setActiveTab] = useState('posted'); // New state for active tab

    const handleButtonClick = () => {
        setIsClassSwapped(!isClassSwapped);
    };

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    const handleRequestedOffersClick = async () => {
        try {
            const response = await axios.get(route('company.offers'));
            setOffers(response.data);
            setActiveTab('posted'); // Set active tab to requested
        } catch (error) {
            console.error('Error fetching offers:', error);
        }
    };

    const handlePostedOffersClick = () => {
        setActiveTab('requested'); // Set active tab to posted
    };

    const confirmDeleteOffer = (id) => {
        setOfferToDelete(id);
        setShowDeleteModal(true);
    };

    const handleDeleteOffer = async () => {
        if (offerToDelete) {
            try {
                await axios.delete(route('company.offers.destroy', { id: offerToDelete }));
                setOffers(offers.filter(offer => offer.id !== offerToDelete));
                setShowDeleteModal(false);
                setOfferToDelete(null);
            } catch (error) {
                console.error('Error deleting offer:', error);
            }
        }
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    return (
        <Companylayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-0">
                
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg m-8 p-8">
                        <div className='offers-title flex justify-between items-center'>
                            <h2 className='text-3xl fw-bold'>Offers :</h2>
                            <button className='btn btn-dark' onClick={handleModalShow}>Post offer</button>
                        </div>
                        <div className="btn-group my-6" role="group" aria-label="Basic example">
                            <button 
                                type="button" 
                                className={`btn ${activeTab === 'posted' ? 'btn-dark' : 'btn-outline-secondary'}`}
                                onClick={handlePostedOffersClick}
                            >
                                Posted Offers
                            </button>
                            <button 
                                type="button" 
                                id='btn'
                                className={`btn ${activeTab === 'requested' ? 'btn-dark' : 'btn-outline-primary'}`}
                                onClick={handleRequestedOffersClick}
                            >
                                Requested Offers
                            </button>
                        </div>
                        
                        {activeTab === 'requested' && (
                            <div className='flex justify-between items-center'>
                                <div className="btn-group my-6" role="group" aria-label="Basic example">
                                    <button 
                                        type="button" 
                                        className={isClassSwapped ? "btn btn-outline-secondary" : "btn btn-dark"}
                                        onClick={handleButtonClick}
                                    >
                                        Open
                                    </button>
                                    <button 
                                        type="button" 
                                        className={isClassSwapped ? "btn btn-dark" : "btn btn-outline-secondary"}
                                        onClick={handleButtonClick}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className='offersContainer row custom-grid'>
                            <h1 className='text-4xl font-bold mb-7'>requested offers :</h1>
                            {offers.map(offer => (
                                <div key={offer.id} className="col-sm-6 mb-3 mb-sm-0 ">
                                    <div className="card mb-8 p-4=2">
                                        <div className="card-body">
                                            <h5 className="card-title text-2xl font-bold">{offer.title}</h5>
                                            <p className="card-text mb-4 w-5/6">
                                                {truncateText(offer.description, 100)}
                                            </p>
                                            <button 
                                                className="btn btn-outline-danger ml-80"
                                                onClick={() => confirmDeleteOffer(offer.id)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>
            <CreateOfferRequest showModal={showModal} handleModalClose={handleModalClose} />

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this offer?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteOffer}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Companylayout>
    );
}
