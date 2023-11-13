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
    navCap: 'Mantenimientos',
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
    displayName: 'Historial de canje',
    iconName: 'checkup-list',
    route: 'home/material-exchange',
  },
  {
    navCap: 'Autenticar',
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
    navCap: 'Adicional',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'aperture',
    route: '/extra/sample-page',
  },
];
