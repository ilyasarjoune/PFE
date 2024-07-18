import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function CreateOfferRequest({ showModal, handleModalClose }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        paid: 'no',
        duration: '',
        type: '',
    });

    const [showContent, setShowContent] = useState(true);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('offer-requests.store'), {
            onSuccess: () => {
                setShowContent(false);
                setShowSuccessMessage(true);

                setTimeout(() => {
                    setShowSuccessMessage(false);
                    handleModalClose();
                }, 2000);
            }
        });
        window.location.reload();
        try {
            const response =  axios.get(route('company.offers'));
            
            setOffers(response.data);
            setActiveTab('posted'); // Set active tab to requested
        } catch (error) {
            console.error('Error fetching offers:', error);
        }

    };

    return (
        <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Post Offer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showContent ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Offer Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter offer title" 
                                name="title"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                required 
                            />
                            {errors.title && <div className="text-danger">{errors.title}</div>}
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Enter offer description" 
                                name="description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                required 
                            />
                            {errors.description && <div className="text-danger">{errors.description}</div>}
                        </Form.Group>

                        <Form.Group controlId="paid">
                            <Form.Label>Paid</Form.Label>
                            <Form.Control 
                                as="select" 
                                name="paid"
                                value={data.paid}
                                onChange={e => setData('paid', e.target.value)}
                                required 
                            >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </Form.Control>
                            {errors.paid && <div className="text-danger">{errors.paid}</div>}
                        </Form.Group>

                        <Form.Group controlId="duration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter duration" 
                                name="duration"
                                value={data.duration}
                                onChange={e => setData('duration', e.target.value)}
                                required 
                            />
                            {errors.duration && <div className="text-danger">{errors.duration}</div>}
                        </Form.Group>

                        <Form.Group controlId="type">
                            <Form.Label>Type</Form.Label>
                            <Form.Control 
                                as="select" 
                                name="type"
                                value={data.type}
                                onChange={e => setData('type', e.target.value)}
                                required 
                            >
                                <option value="">Select Type</option>
                                <option value="PFE">PFE</option>
                                <option value="OBS">Observation</option>
                                <option value="FON">Fonctionelle</option>
                                <option value="TEL">A Distance</option>
                                <option value="ALT">Alternance</option>
                                <option value="EMP">Emploi</option>
                            </Form.Control>
                            {errors.type && <div className="text-danger">{errors.type}</div>}
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={processing}>
                            Submit
                        </Button>
                    </Form>
                ) : (
                    <div className="text-center">
                        <p className="text-success">Offer is requested successfully!</p>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}
