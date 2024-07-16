import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import Modal from 'react-modal'; // Import react-modal

// Modal styling (can be customized)
const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '80%',
        maxHeight: '80%',
        overflow: 'auto'
    }
};

export default function Offer({ auth }) {
    const [isClassSwapped, setIsClassSwapped] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal

    const handleButtonClick = () => {
        if (!isClassSwapped) {
            setIsClassSwapped(true);
        } else {
            setIsClassSwapped(false);
        }
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-0">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg m-8 p-8">

                        <div className='offers-title flex justify-between items-center'>
                            <h2 className='text-3xl fw-bold'>Offers :</h2>
                            <button className='btn btn-dark' onClick={openModal}>Post offer</button>
                        </div>
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
                        <div className='row custom-grid'>
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <div className="card mb-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Special title treatment</h5>
                                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                        <a href="#" className="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card mb-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Special title treatment</h5>
                                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                        <a href="#" className="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            </div>
                            {/* Add more cards as needed */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for posting offer */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyle}
                contentLabel="Post Offer Modal"
            >
                <h2>Post Offer</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" className="form-control" id="title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea className="form-control" id="description" rows="3"></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="paid" className="form-label">Paid:</label>
                        <select className="form-select" id="paid">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="duration" className="form-label">Duration:</label>
                        <input type="text" className="form-control" id="duration" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Type:</label>
                        <select className="form-select" id="type">
                            <option value="observation">Observation</option>
                            <option value="PFE">PFE</option>
                            <option value="foncionel">Fonctionel</option>
                            <option value="emploi">Emploi</option>
                            <option value="alternance">Alternance</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
