import { useState, useMemo, useCallback } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import moment from 'moment/moment';
import { Alert, AlertTitle, Stack, Card, CardHeader, Box, Step, Paper, Button, Stepper, StepLabel, Typography, Grid, TextField, MenuItem, Autocomplete } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { Link as RouterLink, useNavigate  } from 'react-router-dom';
import Iconify from '../../../../components/iconify';
import { useDispatch } from '../../../../redux/store';
import { saveSearchInput, saveFlights } from '../../../../redux/slices/flights';
// tiqwaAxios
import tiqwaAxios from '../../../../utils/tiqwaAxios';
// ----------------------------------------------------------------------

import LoadingScreen from '../../../../components/loading-screen';

localStorage.removeItem('adults')
localStorage.removeItem('children')
localStorage.removeItem('infant')
console.log("Invoked:::::");

export default function FlightBooking1({_airports, _smallerThanMd}) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingData,setLoading] = useState(false);
  const airportNames = useMemo(() => {
    // console.log('from 1:',_airports)
      if (_airports && _airports.length >= 1) {
         const _airportsCopy = [..._airports];
        _airportsCopy.sort((a,b)=>{
          const _firstArg = a.city.toLowerCase(); const _secArg = b.city.toLowerCase(); 
          if(_firstArg < _secArg){
            return -1;
          }
          if(_secArg > _firstArg){
            return 1;
          }
          return 0;
        });
          return _airportsCopy.map(airport => {
              return {
                label: `${airport.city} (${airport.iata_code})`,
                iataCode: airport.iata_code
              }
          });
      } 
      return [];
  }, [_airports]);

  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Kindly ensure all fields are correctly filled.');

  const [trip, setTrip] = useState('oneWay');
  const [cabin, setCabin] = useState('economy');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  /* FUNCTIONS SECTION */
  const handleTripSelection = e => setTrip(e.target.value);
  const handleCabinSelection = e => setCabin(e.target.value);
  const handleAdultsSelection = (e)=>{
    localStorage.setItem('adults',e.target.value);
    setAdults(e.target.value)
  }
  const handleChildrenSelection = (e) =>{
    localStorage.setItem('children',e.target.value);
    setChildren(e.target.value)
  }
  const handleInfantsSelection = (e) =>{
    localStorage.setItem('infant',e.target.value);
    setInfants(e.target.value);
  } 
  // setInfants(e.target.value);
  
  // const handleOriginSelection = e => setOrigin(e.target.value);
  // const handleDestinationSelection = e => setDestination(e.target.value);
  
  const handleDepartureDateEntry = e => setDepartureDate(e.target.value);
  const handleReturnDateEntry = e => setReturnDate(e.target.value);

  const submitSearchInput = () => {
    if (
      !origin
      || 
      !destination
      || 
      !departureDate
      || 
      (trip === 'roundTrip' && !returnDate)
    ) {
      setShowAlert(true);
      return;
    }
    const payload = { 
      trip, 
      cabin, 
      adults, 
      children,
      infants,
      origin,
      destination,
      departureDate,
      returnDate 
    }
    searchFlight();
    dispatch(saveSearchInput(payload));
  }

  const searchFlight = useCallback(async () => {
    console.log('Search is called');
    const cleanedDepartureDate =  moment(departureDate).format('yyyy-MM-DD') 
    let cleanedReturnDate = null;
    localStorage.setItem('adults',adults);
    setLoading(true)
    if (trip !== 'oneWay') {
      cleanedReturnDate = moment(returnDate).format('yyyy-MM-DD') 
    }
    console.log("dates:",cleanedDepartureDate,cleanedReturnDate,departureDate,returnDate);
    try {
      if (trip === 'oneWay') {
        tiqwaAxios.get(`flights/search?adults=${adults}&cabin=${cabin}&departure_date=${cleanedDepartureDate}&destination=${destination.iataCode}&origin=${origin.iataCode}&children=${children}&infants=${infants}`)
          .then((response)=>{
            setLoading(false)
            console.log('tiqwa response one way: ',response.data)
            dispatch(saveFlights(response.data.data)).then(() => {
              navigate('/bookings/search-result');
            });
          })  
          .catch((error)=>{
            setLoading(false)
            setErrorMsg(error.message);
              console.log(error)
            });
        // const response = await tiqwaAxios.get(`flight/adults=${adults}&cabin=${cabin}&departure_date=${cleanedDepartureDate}&destination=${destination.iataCode}&origin=${origin.iataCode}&children=${children}&infants=${infants}`);

        // setLoading(false)
        
      } else {
        tiqwaAxios.get(`flights/search?adults=${adults}&cabin=${cabin}&departure_date=${cleanedDepartureDate}&destination=${destination.iataCode}&origin=${origin.iataCode}&children=${children}&infants=${infants}&return_date=${cleanedReturnDate}`)
          .then((response)=>{
            setLoading(false)
            console.log('tiqwa response round trip: ',response.data)
            dispatch(saveFlights(response.data.data)).then(() => {
              navigate('/bookings/search-result');
            });
          })  
          .catch((error)=>{
            setLoading(false)
              console.log(error)
            });
      }
      // navigate('/bookings/search-result');
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }, [
    trip, 
    cabin, 
    adults, 
    children,
    infants,
    origin,
    destination,
    departureDate,
    returnDate 
  ]);

  return (
    loadingData ? <>
                                <LoadingScreen/>
                                </> :
    <>
      <Grid container spacing={3}>
        {
          showAlert
          ?
          <Grid item xs={12}>
            <Alert severity='error' onClose={() => setShowAlert(false)}>
              <AlertTitle sx={{ textTransform: 'capitalize' }}> {errorMsg} </AlertTitle>
              { errorMsg }
            </Alert>
          </Grid>
          :
          null
        }
        <Grid item xs={6} sm={4} md={2}>
          <TextField
            className='remove-bottom-border'
            variant="outlined"
            select
            // fullWidth
            size="small"
            // value={currency}
            label="Trip type *"
            // SelectProps={{ native: true }}
            // onChange={handleChangeCurrency}
            // helperText="Please select your currency"
            onChange={handleTripSelection}
            value={trip}
            fullWidth
          >
            <MenuItem value="oneWay">
              One-way
            </MenuItem>
            <MenuItem value="roundTrip">
              Round-trip
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <TextField
            className='remove-bottom-border'
            variant="outlined"
            select
            // fullWidth
            size="small"
            // value={currency}
            label="Cabin *"
            // SelectProps={{ native: true }}
            // onChange={handleChangeCurrency}
            // helperText="Please select your currency"
            onChange={handleCabinSelection}
            value={cabin}
            fullWidth
          >
            <MenuItem value="economy">
              Economy
            </MenuItem>
            <MenuItem value="premium_economy">
              Premium Economy
            </MenuItem>
            <MenuItem value="business">
              Business
            </MenuItem>
            <MenuItem value="first">
              First
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
        <TextField
            className='remove-bottom-border'
            variant="outlined"
            select
            // fullWidth
            size="small"
            // sx={{width: '5ch'}}
            // value={currency}
            label="Adults *"
            // SelectProps={{ native: true }}
            // onChange={handleChangeCurrency}
            // helperText="Please select your currency"
            onChange={handleAdultsSelection}
            value={adults}
            fullWidth
        >
            {
            [1,2,3,4,5,6,7,8,9].map((item, index) => {
                return (
                <MenuItem key={`adult-${index}`} value={item}>
                    {item}
                </MenuItem>
                )
            })
            }
        </TextField>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
        <TextField
            className='remove-bottom-border'
            variant="outlined"
            select
            // fullWidth
            size="small"
            // sx={{width: '5ch'}}
            // value={currency}
            label="Children"
            // SelectProps={{ native: true }}
            // onChange={handleChangeCurrency}
            // helperText="Please select your currency"
            onChange={handleChildrenSelection}
            value={children}
            fullWidth
        >
            {
            [0,1,2,3,4,5,6,7].map((item, index) => {
                return (
                <MenuItem key={`children-${index}`} value={item}>
                    {item}
                </MenuItem>
                )
            })
            }
        </TextField>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
        <TextField
            className='remove-bottom-border'
            variant="outlined"
            select
            // fullWidth
            size="small"
            // sx={{width: '5ch'}}
            // value={currency}
            label="Infants"
            // SelectProps={{ native: true }}
            // onChange={handleChangeCurrency}
            // helperText="Please select your currency"
            onChange={handleInfantsSelection}
            value={infants}
            fullWidth
        >
            {
            [0,1,2,3,4,5,6,7,8,9].map((item, index) => {
                return (
                <MenuItem key={`infant-${index}`} value={item}>
                    {item}
                </MenuItem>
                )
            })
            }
        </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{marginTop: '10px'}}>
        <Grid item xs={12} sm={11}>
          <Grid container spacing={1}>
            {
              trip === 'oneWay'
              ?
              (
                <>
                  <Grid item xs={6} sm={4}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={airportNames}
                      // value={origin}
                      onChange={(event, newValue) => {
                        setOrigin(newValue);
                      }}
                      // inputValue={origin}
                      onInputChange={(event, newInputValue) => {
                        setOrigin(newInputValue);
                      }}
                      renderInput={(params) => <TextField variant='outlined' {...params} label="From *" />}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={airportNames}
                      // value={destination}
                      onChange={(event, newValue) => {
                        setDestination(newValue);
                      }}
                      // inputValue={destination}
                      onInputChange={(event, newInputValue) => {
                        setDestination(newInputValue);
                      }}
                      renderInput={(params) => <TextField variant='outlined' {...params} label="To *" />}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <DesktopDatePicker
                      label="Departure *"
                      value={departureDate}
                      minDate={new Date()}
                      onChange={(newValue) => {
                        setDepartureDate(newValue);
                      }}
                      renderInput={(params) => <TextField variant="outlined" fullWidth {...params} />}
                    />
                  </Grid>
                </>
              )
              :
              (
                <>
                  <Grid item xs={6} sm={3} md={3}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={airportNames}
                      value={origin}
                      onChange={(event, newValue) => {
                        setOrigin(newValue);
                      }}
                      inputValue={origin}
                      onInputChange={(event, newInputValue) => {
                        setOrigin(newInputValue);
                      }}
                      renderInput={(params) => <TextField variant='outlined' {...params} label="From *" />}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} md={3}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={airportNames}
                      value={destination}
                      onChange={(event, newValue) => {
                        setDestination(newValue);
                      }}
                      inputValue={destination}
                      onInputChange={(event, newInputValue) => {
                        setDestination(newInputValue);
                      }}
                      renderInput={(params) => <TextField variant='outlined' {...params} label="To *" />}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} md={3}>
                    <DesktopDatePicker
                      label="Departure *"
                      value={departureDate}
                      minDate={new Date()}
                      onChange={(newValue) => {
                        setDepartureDate(newValue);
                      }}
                      renderInput={(params) => <TextField variant="outlined" fullWidth {...params} />}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3} md={3}>
                    <DesktopDatePicker
                      label="Return *"
                      value={returnDate}
                      minDate={new Date()}
                      onChange={(newValue) => {
                        setReturnDate(newValue);
                      }}
                      renderInput={(params) => <TextField variant="outlined" fullWidth {...params} />}
                    />
                  </Grid>
                </>
              )
            }
            
          </Grid>
        </Grid>
        <Grid item xs={12} sm={1}>
          {/* <RouterLink className='router-link-button' to="/bookings/search-result"> */}
            <Button onClick={() => submitSearchInput()} variant="contained" size="large" fullWidth style={{height: '100%'}}>
              {
                _smallerThanMd
                ?
                <Typography variant="subtitle2">Search</Typography>
                :
                <Iconify icon="eva:search-fill" width={30} />
              }
            </Button>
          {/* </RouterLink> */}
        </Grid>
      </Grid>
    </>
  );
}
