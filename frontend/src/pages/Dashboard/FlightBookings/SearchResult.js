import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useEffect, useCallback, useState } from 'react';

// import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { LinearProgress, Box, Card, CardHeader, Container, Stack, Paper, /* Typography, Button, */ Grid } from '@mui/material';
// axios
import axios from '../../../utils/tiqwaAxios';
// components
import { useSettingsContext } from '../../../components/settings';

import { useDispatch, useSelector } from '../../../redux/store';
import { getAirports, getAirlines } from '../../../redux/slices/flights';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
// import Iconify from '../../../components/iconify';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';

// sections
import BookingDetails from '../../../sections/@dashboard/general/booking/BookingDetails'
import { Block } from '../../../sections/_examples/Block';
import FlightBooking2 from '../../../sections/_examples/mui/stepper/FlightBooking2';
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

export default function SearchResult() {

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.flights);

  const { themeStretch } = useSettingsContext();

  const theme = useTheme();
  const smallerThanMd = useMediaQuery(theme.breakpoints.down('md'));

  // useEffect(() => {
  //   dispatch(getAirports());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getAirlines());
  // }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> Flight Bookings | Ajala Travel</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Search Results"
          links={[
            //
          ]}
        />

        {isLoading && (
          <LinearProgress
            color="inherit"
            sx={{
              top: 0,
              width: 1,
              position: 'absolute',
            }}
          />
        )}

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
                <FlightBooking2
                _smallerThanMd={smallerThanMd}
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
