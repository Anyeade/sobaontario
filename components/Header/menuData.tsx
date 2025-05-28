import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "About",
    newTab: false,
    path: "/#about",
  },
  
  
  {
    id: 4,
    title: "Gallery",
    newTab: false,
    path: "/gallery",
  },
  {
    id: 5,
    title: "Shop",
    newTab: false,
    path: "/shop",
  },
  {
    id: 6,
    title: "News",
    newTab: false,
    path: "/news",
  },
  {
    id: 8,
    title: "Contact",
    newTab: false,
    path: "/contact",
  },
  {
    id: 7,
    title: "Get Involved",
    newTab: false,
    submenu: [
      {
        id: 3,
        title: "Membership",
        newTab: false,
        path: "/membership",
      },
      {
        id: 71,
        title: "Volunteer Programs",
        newTab: false,
        path: "/volunteer",
      },
      {
        id: 72,
        title: "Community Outreach",
        newTab: false,
        path: "/outreach",
      },
      {
        id: 73,
        title: "Events",
        newTab: false,
        path: "/events",
      },
      
    ],
  },
 
];

export default menuData;
