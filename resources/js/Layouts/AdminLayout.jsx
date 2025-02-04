// resources/js/Layouts/AdminLayout.jsx
import logo from '../images/logoname.png';
import logod from '../images/logosdisgn.png';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import "../styles/main.scss";

const AdminLayout = ({ children }) => {
    const { url, props } = usePage(); // Destructure url and props from usePage hook
    const { auth } = props; // Get auth from props

    const [closeMenu, setCloseMenu] = useState(false);

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    return (
        <div className={closeMenu === false ? 'adminLayout' : 'adminLayout active'}>
            {/* Sidebar */}
            <div className={closeMenu === false ? 'sidebar' : 'sidebar active'}>
                <div className={closeMenu === false ? 'logoContainer' : 'logoContainer active'}>
                    <img src={logod} alt="icon" className="logo" />
                    <img src={logo} alt="icon" className="logo" />
                </div>
                <div className={closeMenu === false ? 'burgerContainer' : 'burgerContainer active'}>
                    <div
                        className="burgerTrigger"
                        onClick={handleCloseMenu}
                    ></div>
                    <div className="burgerMenu"></div>
                </div>
                <div className={closeMenu === false ? 'profileContainer' : 'profileContainer active'}>
                    <div className="profileContents">
                        <p className="name">Hello, {auth.user.name}</p>
                        <p>{auth.user.email}</p>
                    </div>
                </div>
                <div className={closeMenu === false ? 'contentsContainer' : 'contentsContainer active'}>
                    <ul>
                        <li className={route().current('admin.dashboard') ? 'active' : ''}>
                            <Link href={route('admin.dashboard')}> <i className="fa-solid fa-chart-line"></i> &nbsp;Dashboard </Link>
                        </li>
                        <li className={route().current('admin.users') ? 'active' : ''}>
                            <Link href={route('admin.users')}><i className="fa-solid fa-users"></i> &nbsp;Users</Link>
                        </li>
                        <li className={route().current('admin.internships') ? 'active' : ''}>
                            <Link href={route('admin.internships')}><i className="fa-solid fa-briefcase"></i> &nbsp;Internships</Link>
                        </li>
                        <li className={route().current('admin.company') ? 'active' : ''}>
                            <Link href={route('admin.company')}><i className="fa-solid fa-briefcase"></i> &nbsp;Companies</Link>
                        </li>
                        <li className={route().current('admin.requests') ? 'active' : ''}>
                            <Link href={route('admin.requests')}><i className="fa-solid fa-briefcase"></i> &nbsp;Requested Offers</Link>
                        </li>
                        {/* Add more sidebar items as needed */}
                    </ul>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="main">{children}</main>
        </div>
    );
};

export default AdminLayout;
