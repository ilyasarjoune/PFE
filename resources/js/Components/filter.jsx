import React from 'react'
import Dropdown from './Dropdown'

export default function filter() {
  return (
    <div>
       <Dropdown>
            <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                    <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
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
    </div>
  )
}
