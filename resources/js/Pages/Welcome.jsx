import { Link, Head } from '@inertiajs/react';
import '../styles/welcome.css';
import logo from '../images/logo.png';
import inter from '../images/10819567_4574122-removebg-preview.png';
import ddd from '../images/ddd.png';
import opr from '../images/22378313_6566480-removebg-preview.png';
import guid from '../images/7732656_5283-removebg-preview.png';
import reach from '../images/Screenshot 2024-06-04 134454.png';
import about from '../images/group-business-executives-discussing-laptop-their-des.jpg';


export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
           <header>
            
            <nav className='navbar-w'>
        <img src={logo} className='logo-w' />
        <div className='links'><a href="#">Home</a><a href="#about">About us</a><a href="#service">Services</a>
        </div>

        <div className='blue'>
            
        {auth.user ? (
                                    <a
                                        href={route('internship.index')}
                                        className="sign"
                                    >
                                        Home
                                    </a>
                                ) : (
                                    <>
                                        
                                        <a href={route('login')} id='sign'>sign in</a>
                                        <a href={route('register')}id='join'>Join now</a>
                                        <a href={route('company.login')} id='signcompany'>Post offer</a>
                                    </>
                                )}
        
        
        
        </div>
        </nav>
           </header>


           <main>
            <div className='intro'>
                <div className='text-w'>
                <p>Looking for</p>
                <img src={ddd} alt="" className='ddd' />
                <p> a internship?</p>
                <p>Discover internships effortlessly with our platform
                    Minimize the hassle, maximize the potential
                        Start your career journey with us today.</p>
                        <a href={route('register')}>Join now</a>
                </div>
                <img src={inter} alt=""  className='inter'/>
            </div>
            <div className="services">
                <h3 id="service">SERVICES</h3>
                <h2>We Offer Best Services</h2>
                <div className="cards">
<div className="cardinfo"><img src={opr} alt="" className='cardimg'/> <h2>Opportunities</h2><p><strong>EasyInter</strong> compiles internship listings from various sources into one platform, saving time for students and graduates.</p></div>
<div className="cardinfo"><img src={guid} alt="" className='cardimg'/> <h2>Guidance</h2><p><strong>EasyInter</strong>  offers tips for resumes, cover letters, interviews, and insights into internship expectations</p></div>
<div className="cardinfo"><img src={reach} alt="" className='cardimg'/> <h2>Reach</h2><p><strong>EasyInter</strong>  increases access to internships for students and graduates, regardless of their location, broadening their options.</p></div>



                </div>
            </div> 
<div className="about" id='about'>
    <p className='title-ab'>About us</p>
    <div className="aboutcontent">
        <div className="about-text">
            <h1>About Us</h1>
            <p>
            At <span>EasyInter</span>, our goal is to streamline the internship search for students and recent graduates while also linking them with valuable opportunities that match their career goals.</p>

<p>We strive to be the go-to platform where users can effortlessly discover and apply for internships across various industries and regions. With a focus on accessibility and user-friendliness, EasyInter provides a streamlined experience for both students seeking hands-on experience and employers eager to find top talent.</p>

<p>Join EasyInter today to embark on your internship journey with confidence!</p>
            
        </div>
        <img src={about} alt="" className='' />
    </div>
</div>
           </main>
           
           <footer>
            <div><h2>Easyinter.</h2><p>Stay updated on your professional world</p>
            <span className='social' ><i class="fa-brands fa-instagram"></i><i class="fa-brands fa-facebook"></i><i class="fa-brands fa-x-twitter"></i></span>
            </div>
            <div><span>Contact Information</span>
            <p>Address: 123 Internship Drive, Career City, 45678</p>
            <p>Company Name: EasyInter</p>
            <a href="mailto:contact@easyinter.com">contact@easyinter.com</a>
            </div>
            <div>
                <span>Legal Information</span>
                <a href="">Privacy Policy</a><a href="">Terms of Service</a>
            </div>
            <div>
                <span>join EasyInter Today</span>
                <a href=""> Start your internship journey with us!</a>
            </div>
           </footer>
        </>
    );
}
