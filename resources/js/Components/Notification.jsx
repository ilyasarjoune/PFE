// resources/js/Components/NotificationDropdown.jsx

import React, { useEffect, useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';

export default function NotificationDropdown({ userId }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        const response = await fetch(`/api/notifications`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust if using Sanctum or Passport
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        const data = await response.json();
        setNotifications(data);
    };

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                    <button
                        type="button"
                        className="inline-flex items-center px-3 py-2  border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                        <i className="fa-solid fa-bell"></i> Notifications
                    </button>
                </span>
            </Dropdown.Trigger>
            <Dropdown.Content>
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <Dropdown.Link key={notification.id} href={route('internship.show', notification.internship_id)}>
                            <i className="fa-solid fa-briefcase"></i> {notification.title} at {notification.company}
                        </Dropdown.Link>
                    ))
                ) : (
                    <div className="p-4 text-gray-500">No new notifications</div>
                )}
            </Dropdown.Content>
        </Dropdown>
    );
}
