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
    displayName: 'Usuario',
    iconName: 'list',
    route: 'home/user',
  },
  {
    displayName: 'Centro',
    iconName: 'layout-navbar-expand',
    route: 'home/center',
  },
  {
    displayName: 'Material',
    iconName: 'box',
    route: 'home/material',
  },
  {
    displayName: 'Historial de Canje',
    iconName: 'checkup-list',
    route: 'home/material-exchange',
  },
  {
    navCap: 'Autenticación',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Registro',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
  {
    navCap: 'Adicional',
  },
  {
    displayName: 'Iconos',
    iconName: 'mood-smile',
    route: '/extra/icons',
  },
  {
    displayName: 'Pagina Simple',
    iconName: 'aperture',
    route: '/extra/sample-page',
  },
];
