// resources/js/Layouts/AdminLayout.jsx
import logo from '../images/logoname.png'
import logod from '../images/logosdisgn.png'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react'; // Corrected import
import "../styles/main.scss";
const AdminLayout = ({ children }) => {
    const { url } = usePage(); // Destructure url from usePage hook

    const [closeMenu, setCloseMenu] = useState(false);

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    return (
        <div className={closeMenu === false ? 'adminLayout' : 'adminLayout active'}>
            {/* Sidebar */}
            <div className={closeMenu === false ? 'sidebar' : 'sidebar active'}>
                <div className={closeMenu === false ? 'logoContainer' : 'logoContainer active'}>
                  <img src={logod}  alt="icon" className="logo" />
                  <img src={logo}  alt="icon" className="logo" />
                   
                </div>
                <div className={closeMenu === false ? 'burgerContainer' : 'burgerContainer active'}>
                    <div
                        className="burgerTrigger"
                        onClick={() => {
                            handleCloseMenu();
                        }}
                    ></div>
                    <div className="burgerMenu"></div>
                </div>
                <div className={closeMenu === false ? 'profileContainer' : 'profileContainer active'}>
                    <div className="profileContents">
                        <p className="name">Hello, ilyas</p>
                        <p>ilyas@gmail.com</p>
                    </div>
                </div>
                <div className={closeMenu === false ? 'contentsContainer' : 'contentsContainer active'}>
                    <ul>
                        <li className={route('admin.dashboard') ? 'active' : ''}>
                          
                        <Link href={route('admin.dashboard')}> <i class="fa-solid fa-chart-line"></i> &nbsp;Dashboard </Link>
                        </li>
                        <li className={route('admin.users') ? 'active' : ''}>
                            <Link href={route('admin.users')}><i class="fa-solid fa-users"></i> &nbsp;Users</Link>
                        </li>
                        <li className={route('admin.internships') ? 'active' : ''}>
                            <Link href={route('admin.internships')}><i class="fa-solid fa-briefcase"></i> &nbsp;Internships</Link>
                        </li>
                        <li className={route('admin.company') ? 'active' : ''}>
                            <Link href={route('admin.company')}><i class="fa-solid fa-briefcase"></i> &nbsp;Companies</Link>
                        </li>
                        <li className={route('admin.requests') ? 'active' : ''}>
                            <Link href={route('admin.requests')}><i class="fa-solid fa-briefcase"></i> &nbsp;Requested Offers</Link>
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
