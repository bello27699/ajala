import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));

export const Dashboard = Loadable(lazy(() => import('../pages/Dashboard/Dashboard')));
// export const FlightBookings = Loadable(lazy(() => import('../pages/Dashboard/FlightBookings')));
// export const Approvals = Loadable(lazy(() => import('../pages/Dashboard/Approvals')));
export const FlightBookings = Loadable(lazy(() => import('../pages/Dashboard/FlightBookings/All')));
export const FlightBookingSearchResult = Loadable(lazy(() => import('../pages/Dashboard/FlightBookings/SearchResult')));
export const ConfirmFlightBooking = Loadable(lazy(() => import('../pages/Dashboard/FlightBookings/Confirm')));
/* LINK BELOW IS THE ADMIN VIEW FOR THE FLIGHTS MODULE (DANIEL) */
export const AdminFlightBookings = Loadable(lazy(() => import('../pages/Dashboard/AdminFlightBookings')));
/* LINK ABOVE IS THE ADMIN VIEW FOR THE FLIGHTS MODULE (DANIEL) */
export const Account = Loadable(lazy(() => import('../pages/Dashboard/Account')));
export const Reporting = Loadable(lazy(() => import('../pages/Dashboard/Reporting')));
export const HotelBookings = Loadable(lazy(() => import('../pages/Dashboard/HotelBookings')));
export const CarBookings = Loadable(lazy(() => import('../pages/Dashboard/CarBookings')));
export const Finance = Loadable(lazy(() => import('../pages/Dashboard/Finance')));

// DASHBOARD: APPROVALS
export const Approvals = Loadable(lazy(() => import('../pages/Dashboard/Approvals/Approvals')));
export const CreateApprovals = Loadable(lazy(() => import('../pages/Dashboard/Approvals/CreateApprovals')));

// DASHBOARD: ADMIN TRAVEL REQUEST
export const AdminTravelRequest = Loadable(lazy(() => import('../pages/Admin/AdminTravelRequest')));
export const ViewRequest = Loadable(lazy(() => import('../pages/Admin/AdminTravelRequest/ViewRequest')));

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
