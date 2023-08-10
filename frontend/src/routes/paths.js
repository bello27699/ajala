// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  one: path(ROOTS_DASHBOARD, '/one'),
  approvals: path(ROOTS_DASHBOARD, '/approvals'),
  bookings: path(ROOTS_DASHBOARD, '/bookings'),
  account: path(ROOTS_DASHBOARD, '/account'),
  reporting: path(ROOTS_DASHBOARD, '/reporting'),
  hotel_bookings: path(ROOTS_DASHBOARD, '/hotel_bookings'),
  car_bookings: path(ROOTS_DASHBOARD, '/car_bookings'),
  finance: path(ROOTS_DASHBOARD, '/finance'),

  admin_travel_request: path(ROOTS_DASHBOARD, '/admin_travel_request'),
  admin_view_request: path(ROOTS_DASHBOARD, '/admin_view_request'),
};
