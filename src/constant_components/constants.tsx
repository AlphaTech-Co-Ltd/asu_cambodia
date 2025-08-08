import { FaHome, FaInfoCircle, FaServicestack, FaPhoneAlt } from "react-icons/fa";

export const NavLinks = [
    {
        id: 1,
        url: '/',
        label: 'Home',
        icon: <FaHome />,
    },
    {
        id: 2,
        url: '/Information',
        label: 'Information',
        icon: <FaInfoCircle />,
    },
    {
        id: 3,
        url: '/services',
        label: 'Services',
        icon: <FaServicestack />,
    },
    {
        id: 4,
        url: '/ContactUs',
        label: 'Contact',
        icon: <FaPhoneAlt />,
    },
];
