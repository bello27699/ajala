import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Button, Grid } from '@mui/material';
// components
import { useSettingsContext } from '../../components/settings';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';

// sections
import BookingDetails from '../../sections/@dashboard/general/booking/BookingDetails'

// _mock_
import { _bookings } from '../../_mock/arrays';

// ----------------------------------------------------------------------

export default function PageThree() {
  const { themeStretch } = useSettingsContext();

  const dummyUserData = _bookings;

  return (
    <>
      <Helmet>
        <title> Flight Bookings | Ajala Travel</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
          heading="Flight Bookings"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.bookings,
            },
            {
              name: 'Flight Bookings',
              href: PATH_DASHBOARD.bookings,
            },
            {
              name: 'All',
            },
          ]}
          action={
            <Button
              to={PATH_DASHBOARD.bookings}
              component={RouterLink}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Flight Booking
            </Button>
          }
        />

        <Grid item xs={12}>
          <BookingDetails
            title="Booking Details"
            tableData={dummyUserData}
            tableLabels={[
              { id: 'booker', label: 'Booker' },
              { id: 'checkIn', label: 'Check In' },
              { id: 'checkOut', label: 'Check Out' },
              { id: 'status', label: 'Status' },
              { id: 'phone', label: 'Phone' },
              { id: 'roomType', label: 'Room Type' },
              { id: '' },
            ]}
          />
        </Grid>

      </Container>
    </>
  );
}
