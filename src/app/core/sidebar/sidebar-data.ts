import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Inicio',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Maintenance',
  },
  {
    displayName: 'User',
    iconName: 'list',
    route: 'home/user',
  },
  {
    displayName: 'Center',
    iconName: 'layout-navbar-expand',
    route: 'home/center',
  },
  {
    displayName: 'Material',
    iconName: 'box',
    route: 'home/material',
  },
  {
    displayName: 'Exchange history',
    iconName: 'checkup-list',
    route: 'home/material-exchange',
  },
  {
    navCap: 'Authenticate',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
  {
    navCap: 'Additional',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: '/extra/icons',
  },
];
