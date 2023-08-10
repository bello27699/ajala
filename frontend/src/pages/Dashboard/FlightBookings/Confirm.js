import { useEffect, useCallback, useState } from 'react';

// import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Card, CardHeader, Container, Stack, Paper, /* Typography, Button, */ Grid } from '@mui/material';
// axios
import axios from '../../../utils/tiqwaAxios';

import { useDispatch } from '../../../redux/store';
// components
import { useSettingsContext } from '../../../components/settings';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
// import Iconify from '../../../components/iconify';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';

// sections
import BookingDetails from '../../../sections/@dashboard/general/booking/BookingDetails'
import { Block } from '../../../sections/_examples/Block';
import FlightBooking3 from '../../../sections/_examples/mui/stepper/FlightBooking3';
import BasicTable from '../../../sections/_examples/mui/table/BasicTable';

// _mock_
import _airports from '../../../_mock/arrays/_airports';
import _roundtrips from '../../../_mock/arrays/_roundtrips';
import _mock, { randomInArray } from '../../../_mock';

// ----------------------------------------------------------------------

export const _dataGrid = [...Array(36)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  lastLogin: _mock.time(index),
  performance: _mock.number.percent(index),
  rating: _mock.number.rating(index),
  status: randomInArray(['online', 'away', 'busy']),
  isAdmin: _mock.boolean(index),
  lastName: _mock.name.lastName(index),
  firstName: _mock.name.firstName(index),
  age: _mock.number.age(index),
}));

export default function NewFlightBooking() {

  const dispatch = useDispatch();

  const [airports, setAirports] = useState([]);
  const [airlines, setAirlines] = useState([]);

  const getAirlines = useCallback(async () => {
    try {
      const response = await axios.get('/airlines');
      setAirlines(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      /* TEST PURPOSES ONLY */
      // setAirports()
      /* TEST PURPOSES ONLY */
    }
  }, []);

  const getAirports = useCallback(async () => {
    try {
      const response = await axios.get('/airports');
      setAirports(response.data.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
      /* TEST PURPOSES ONLY */
      // setAirports()
      /* TEST PURPOSES ONLY */
    }
  }, []);

  useEffect(() => {
    getAirports();
  }, [getAirports]);

  // useEffect(() => {
  //   dispatch(getCsrfToken());
  // }, [dispatch]);


  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Flight Bookings | Ajala Travel</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Confirm Trip"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.one,
            },
            {
              name: 'Flight Bookings',
              href: PATH_DASHBOARD.bookings,
            },
            {
              name: 'Confirmation'
            }
          ]}
        />

        <Grid item xs={12}>
          <Stack spacing={3}>
            {/* <Block title="Horizontal Linear Stepper"> */}
              <Paper
                sx={{
                  // p: 3,
                  width: '100%',
                  // boxShadow: (theme) => theme.customShadows.z8,
                }}
              >
                <FlightBooking3
                _airports={_airports}
                />
              </Paper>
            {/* </Block> */}
          </Stack>
        </Grid>

        {/* <Stack style={{marginTop: '40px'}} spacing={5}>
          <Card>
            <CardHeader title="Booking History" />
            <BasicTable />
          </Card>
        </Stack> */}

      </Container>
    </>
  );
}
