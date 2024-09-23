import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import GradingIcon from '@mui/icons-material/Grading';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';

export const NavbarData = [
    {
        title: "Dashboard",
        icon: <HomeIcon/>,
        link: "/"
    },
    {
        title: "Announcements",
        icon: <NotificationsActiveIcon/>,
        link: "/announcements"
    },
    {
        title: "Attendance",
        icon: <HowToRegIcon/>,
        link: "/attendance"
    },
    {
        title: "Grades",
        icon: <GradingIcon/>,
        link: "/grades"
    },
    {
        title: "Calendar",
        icon: <CalendarMonthIcon/>,
        link: "/calendar"
    },
    {
        title: "Resources",
        icon: <SettingsAccessibilityIcon/>,
        link: "/resources"
    }
];

export const AdminNavbarData = [
    {
        title: "Admin Dashboard",
        icon: <HomeIcon/>,
        link: "/"
    },
    {
        title: "Announcements",
        icon: <NotificationsActiveIcon/>,
        link: "/announcements"
    },
    {
        title: "Attendance",
        icon: <HowToRegIcon/>,
        link: "/attendance"
    },
    {
        title: "Grades",
        icon: <GradingIcon/>,
        link: "/grades"
    },
    {
        title: "Calendar",
        icon: <CalendarMonthIcon/>,
        link: "/calendar"
    },
    {
        title: "Admin Resources",
        icon: <SettingsAccessibilityIcon/>,
        link: "/resources"
    }
]