import logo from '../images/logosdisgn.png'
import logo2 from '../images/logoname.png'
export default function ApplicationLogo(props) {

    return (
        <div className='logoContainer'>
        <img src={logo} alt="kdkd" className='logo'/>
        <img src={logo2} alt="" srcset="" className='logoname' />
        </div>
    );
}
