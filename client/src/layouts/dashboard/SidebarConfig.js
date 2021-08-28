import { Icon } from '@iconify/react';
import gridFill from '@iconify/icons-eva/grid-fill';
import plusSquareFill from '@iconify/icons-eva/plus-square-fill';
import mapFill from '@iconify/icons-eva/map-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(gridFill)
  },
  {
    title: 'Courses',
    path: '/dashboard/courses',
    icon: getIcon(plusSquareFill)
  },
  {
    title: 'Timetable',
    path: '/dashboard/timetable',
    icon: getIcon(clockFill)
  },
  {
    title: 'Map',
    path: '/dashboard/map',
    icon: getIcon(mapFill)
  }
];

export default sidebarConfig;
