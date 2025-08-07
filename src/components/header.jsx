import { FaUserFriends, FaCalendarAlt, FaComments, FaCreditCard, FaHome, FaEllipsisV } from 'react-icons/fa';
import HeaderLogo from "../assets/images/TestLogo.svg"
import Home from "../assets/images/home.svg"
import Card from "../assets/images/credit_card.svg"
import Patient from "../assets/images/group.svg"
import Shedule from "../assets/images/BirthIcon.svg"
import Message from "../assets/images/chat_bubble.svg"
const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white my-4 px-6 py-3 shadow-sm rounded-full w-full max-w-screen-xl mx-auto">
      <div className="flex items-center gap-2">
        <img src={HeaderLogo} alt="" />
      </div>
      <nav className="flex items-center gap-6">
        <NavItem icon={ <img src={Home} alt="Home" className="w-5 h-5" /> } label="Overview" />
        <NavItem icon={<img src={Patient} alt="Patients" className="w-5 h-5" />} label="Patients" active />
        <NavItem icon={<img src={Shedule} alt="Schedule" className="w-5 h-5" />} label="Schedule" />
        <NavItem icon={<img src={Message} alt="Message" className="w-5 h-5" />} label="Message" />
        <NavItem icon={<img src={Card} alt="Transactions" className="w-5 h-5" />} label="Transactions" />
      </nav>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Dr. Jose Simmons"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-sm text-right">
            <p className="font-semibold text-gray-800">Dr. Jose Simmons</p>
            <p className="text-gray-500 text-xs">General Practitioner</p>
          </div>
        </div>
        <FaEllipsisV className="text-gray-600 cursor-pointer" />
      </div>
    </header>
  );
};

const NavItem = ({ icon, label, active = false }) => {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        active
          ? 'bg-cyan-400 text-white shadow-sm'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Header;
