import { FaHome, FaInfoCircle, FaServicestack, FaBriefcase, FaPhoneAlt } from "react-icons/fa";

export const NavLinks = [
    {
        id: 1,
        url: '/',
        label: 'Home',
        icon: <FaHome />,
    },
    {
        id: 2,
        url: '/about_us',
        label: 'About',
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
        url: '/portfolio',
        label: 'Portfolio',
        icon: <FaBriefcase />,
    },
    {
        id: 5,
        url: '/contact_us',
        label: 'Contact',
        icon: <FaPhoneAlt />,
    },
];
