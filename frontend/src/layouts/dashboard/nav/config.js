// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  booking: icon('ic_booking'),
  finance: icon('ic_finance'),
  hotel: icon('ic_hotel'),
  transport: icon('ic_transportation'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.one, icon: ICONS.dashboard },
      { title: 'Flight Bookings', path: PATH_DASHBOARD.bookings, icon: ICONS.booking },
      { title: 'Request For Approval', path: PATH_DASHBOARD.approvals, icon: ICONS.ecommerce },
      { title: 'Hotel Bookings', path: PATH_DASHBOARD.hotel_bookings, icon: ICONS.hotel },
      // { title: 'Car Bookings', path: PATH_DASHBOARD.car_bookings, icon: ICONS.transport },
      { title: 'Duty Tour Allowance', path: PATH_DASHBOARD.finance, icon: ICONS.finance },
      { title: 'Account/Profile', path: PATH_DASHBOARD.account, icon: ICONS.user },

      // { title: 'Admin Travel Request', path: PATH_DASHBOARD.admin_travel_request, icon: ICONS.ecommerce },

      // { title: 'Reporting', path: PATH_DASHBOARD.reporting, icon: ICONS.analytics },

      // {
      //   title: 'Flight Bookings',
      //   path: PATH_DASHBOARD.bookings,
      //   icon: ICONS.booking,
      //   children: [
      //     { title: 'All', path: PATH_DASHBOARD.bookings },
      //     { title: 'Create', path: PATH_DASHBOARD.bookings }
      //   ],
      // },
      // { title: 'Flight Bookings', path: PATH_DASHBOARD.bookings, icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Four', path: PATH_DASHBOARD.user.four },
  //         { title: 'Five', path: PATH_DASHBOARD.user.five },
  //         { title: 'Six', path: PATH_DASHBOARD.user.six },
  //       ],
  //     },
  //   ],
  // },
];

export default navConfig;
