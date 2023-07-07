import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GradeIcon from '@mui/icons-material/Grade';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
export const SidebarData = [
    // {Icon:<ViewHeadlineIcon/>,link:"/"},
  { title: "Dashboard", Icon: <DashboardIcon />, link: "/dashboard" },
  { title: "Courses", Icon: <LibraryBooksIcon/>, link: "/courses" },
  { title: "Grades", Icon: <GradeIcon />, link: "/grades" },
  { title: "Schedule", Icon: <ScheduleRoundedIcon />, link: "/schedule" },
];
