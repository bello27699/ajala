import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config';
//
import {
  Page404,
  Dashboard,
  LoginPage,
  Approvals,
  FlightBookings,
  FlightBookingSearchResult,
  ConfirmFlightBooking,
  AdminFlightBookings,
  Account,
  Reporting,
  HotelBookings,
  CarBookings,
  Finance,
  AdminTravelRequest,
  ViewRequest,
} from './elements';
import CreateApprovals from '../pages/Dashboard/Approvals/CreateApprovals';

// ----------------------------------------------------------------------

export default function Router() {
  const {urlParams} = useLocation();
  const currentPath = window.location.pathname;
  return useRoutes([
    /* THE ROUTE BELOW IS FOR THE FLIGHT BOOKING SCREEN [REGULAR STAFF] (DANIEL) */
    {
      element: <DashboardLayout />,
      children: [{ path: 'bookings', element: <FlightBookings /> }],
    },
    {
      element: <DashboardLayout />,
      children: [{ path: 'bookings/search-result', element: <FlightBookingSearchResult /> }],
    },
    {
      element: <DashboardLayout />,
      children: [{ path: 'bookings/search-result/confirm', element: <ConfirmFlightBooking /> }],
    },
    
    {
      element: <DashboardLayout />,
      children: [{ path: 'approvals/create', element: <CreateApprovals /> }],
    },
    /* THE ROUTE BELOW IS FOR THE FLIGHT BOOKING SCREEN [REGULAR STAFF] (DANIEL) */

    /* THE ROUTE BELOW IS FOR THE FLIGHT BOOKING SCREEN [ADMIN] (DANIEL) */
    {
      element: <DashboardLayout />,
      children: [{ path: 'adminbookings', element: <AdminFlightBookings /> }],
    },
    /* THE ROUTE BELOW IS FOR THE FLIGHT BOOKING SCREEN [ADMIN] (DANIEL) */

    // {
    //   path: '/',
    //   children: [
    //     { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
    //     {
    //       path: 'login',
    //       element: (
    //         // <GuestGuard>
    //         <LoginPage />
    //         // </GuestGuard>
    //       ),
    //     },
    //   ],
    // },

    {
      path: '/',
      children: [
        { element: <Navigate to="/dashboard/bookings" replace />, index: true },
        {
          path: 'login',
          element: (
            // <GuestGuard>
            <LoginPage />
            // </GuestGuard>
          ),
        },
      ],
    },

    {
      path: '/dashboard',
      element: (
        // <AuthGuard>
        <DashboardLayout />
      ),
      // </AuthGuard>
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'one', element: <Dashboard /> },
        { path: 'approvals', element: <Approvals /> },
        { path: 'bookings', element: <FlightBookings /> },
        { path: 'hotel_bookings', element: <HotelBookings /> },
        { path: 'car_bookings', element: <CarBookings /> },
        { path: 'finance', element: <Finance /> },
        { path: 'account', element: <Account /> },
        { path: 'reporting', element: <Reporting /> },
        { path: 'create_approvals', element: <CreateApprovals /> },
        { path: 'admin_travel_request', element: <AdminTravelRequest /> },
        { path: 'admin_view_request', element: <ViewRequest /> },
        // { path: 'admin_view_request', element: <Hi /> },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
