import { useState, useMemo, useEffect, useCallback } from 'react';
// @mui
import moment from 'moment';
import { Alert, AlertTitle, Stack, Slider, Card, Box, Button, Typography, Grid, TextField, MenuItem, Autocomplete, Accordion, AccordionSummary, AccordionDetails, FormGroup } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

// import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

import LoadingScreen from '../../../../components/loading-screen';

import { useDispatch, useSelector } from '../../../../redux/store';
import Iconify from '../../../../components/iconify';

// _mock_
import _mock from '../../../../_mock';

import { saveSearchInput, saveFlights, saveSelectedFlight } from '../../../../redux/slices/flights';
// tiqwaAxios
import tiqwaAxios from '../../../../utils/tiqwaAxios';
// import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
// ----------------------------------------------------------------------

export default function FlightBooking2({_airports, _smallerThanMd}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { bookingForm, availableFlights, airlines } = useSelector((state) => state.flights);

    // console.log('Booking form: ',bookingForm);

    const [filter1, showFilter1] = useState(false);
    const [filter2, showFilter2] = useState(false);
    const [filter3, showFilter3] = useState(false);

    const [cabinTypesFilter, updateCabinTypesFilter] = useState(
        [
            {
                name: 'First Class',
                checked: true
            },
            {
                name: 'Business',
                checked: true
            },
            {
                name: 'Premium Economy',
                checked: true
            },
            {
                name: 'Economy',
                checked: true
            }
        ]
    );

    const handleCabinTypesFilter = index => {
        const cabinArr = [...cabinTypesFilter];
        cabinArr[index].checked = !cabinArr[index].checked;
        updateCabinTypesFilter(cabinArr);
    }

    const [loadingData,setLoading] = useState(false);
    const [sliderValue, setSliderValue] = useState(30);

    const handleSliderValueChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    const _selectedCabinTypeNames = useMemo(() => {
        const lowerCasedNames = cabinTypesFilter.filter(cabin => cabin.checked).map(cabin => cabin.name.toLowerCase());
        return lowerCasedNames;
    }, [cabinTypesFilter]);

    const _airportNames = useMemo(() => {
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
    // const _destinationAirportNames = useMemo(() => {
    //     if (_airports && _airports.length >= 1) {
    //         const _airportsCopy = [..._airports];
    //         _airportsCopy.sort((a,b)=>{
    //           const _firstArg = a.city.toLowerCase(); const _secArg = b.city.toLowerCase(); 
    //           if(_firstArg < _secArg){
    //             return -1;
    //           }
    //           if(_secArg > _firstArg){
    //             return 1;
    //           }
    //           return 0;
    //         });
    //         const filtered = _airportsCopy.filter((a)=>{
    //             return a === origin
    //         });
    //         console.log('filtered',filtered);
    //           return _airportsCopy.map(airport => {
    //             return {
    //                 label: `${airport.city} (${airport.iata_code})`,
    //                 iataCode: airport.iata_code
    //             }
    //         });
    //     } 
    //     return [];
    // }, [_airports]);

    const _maxPrice = useMemo(() => {
        // console.log('available Flights',availableFlights)
        const prices = Array.isArray(availableFlights) ? availableFlights?.map(flight => Number(flight.amount)) : [] ;
        return Math.max(...prices);
    }, [availableFlights]);

    const _airlineNames = useMemo(() => {
        // console.log("Airlines:",availableFlights ? availableFlights[0] : 'Nada');
        // const airlinesFromFlights = availableFlights ? availableFlights.map(flight=> flight.)
        return airlines.map(airline => airline.name);
    }, [airlines]);

    const _filteredAvailableFlights = useMemo(() => {
        let filtered = [];
        // 1ST FILTER
        if (sliderValue === 0) {
            filtered = availableFlights ?? [];
        } else {
            filtered = Array.isArray(availableFlights) ? availableFlights?.filter(flight => sliderValue <= flight.amount) : [] ;
        }
        // 2ND FILTER
        
        // 3RD FILTER
        // filtered = filtered.filter(flight => {
        //     return flight.inbound.filter(inbound => _selectedCabinTypeNames.indexOf(inbound.cabin_type.toLowerCase()) !== -1).length >= 1 || flight.outbound.filter(outbound => _selectedCabinTypeNames.indexOf(outbound.cabin_type.toLowerCase()) !== -1).length >= 1;
        // });
        return filtered;
    }, [sliderValue, _selectedCabinTypeNames, availableFlights]);
    

  
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Kindly ensure all fields are correctly filled.');

  const [trip, setTrip] = useState('oneWay');
  const [cabin, setCabin] = useState('economy');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [origin, setOrigin] = useState(bookingForm.origin);
  const [destination, setDestination] = useState(bookingForm.destination);

  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  /* FUNCTIONS SECTION */
  const handleTripSelection = e => setTrip(e.target.value);
  const handleCabinSelection = e => setCabin(e.target.value);
  const handleAdultsSelection = e => setAdults(e.target.value);
  const handleChildrenSelection = e => setChildren(e.target.value);
  const handleInfantsSelection = e => setInfants(e.target.value);
  
//   const handleOriginSelection = e => setOrigin(e.target.value);
//   const handleDestinationSelection = e => setDestination(e.target.value);
  
//   const handleDepartureDateEntry = e => setDepartureDate(e.target.value);
//   const handleReturnDateEntry = e => setReturnDate(e.target.value);

  const getClockTime = (time) => {
    const result = new Date(time).toLocaleTimeString().replace(':00', '').toLowerCase();
    return result;
  }

  const getHoursAndMins = (departureTime, arrivalTime) => {
    const durationInMinutes = (new Date(arrivalTime).getTime() - new Date(departureTime).getTime())/1000/60;
    let value = 0;
    let remainder = 0;
    let result = ''; 
    if (durationInMinutes === 0) {
        return value;
    }
    value = Math.floor(durationInMinutes / 60);
    remainder = durationInMinutes % 60;
    if (value >= 1) {
        if (remainder) {
            result = `${value}${value === 1 ? 'h' : 'h'} ${remainder}${remainder === 1 ? 'm' : 'm'}`;
        } else {
            result = `${value}${value === 1 ? 'h' : 'h'}`;
        }
    } else {
        result = `${remainder}${remainder === 1 ? 'm' : 'm'}`
    }
    result = result.toUpperCase();
    return result;
  }

  const numberWithCommas = (val) => {
    const number = val.toString();
    const split = number.split('.');
    const int = split[0];
    if (split.length === 1) {
        const final = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return final;
    }
    const dec = split[1];
    const final = `${int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${dec.substring(0, 2)}`;
    return final;
  }

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
    setLoading(true);
    // const cleanedDepartureDate = departureDate.toISOString().substring(0,10);
    const cleanedDepartureDate = moment(departureDate).format('yyyy-MM-DD');
    let cleanedReturnDate = null;
    if (trip !== 'oneWay') {
    //   cleanedReturnDate = returnDate.toISOString().substring(0,10);
      cleanedReturnDate = moment(returnDate).format('yyyy-MM-DD');
    }
    // console.log("values:",destination,origin,children,infants,adults);
    let originIataCode = origin.iataCode;
    if((typeof origin) === 'string'){
        // console.log("origin string");
        originIataCode = origin.split('(').pop().split(')')[0];
        setOrigin({
            label: origin,
            iataCode: originIataCode
        });
    }
    let destinationIataCode = destination.iataCode;
    if((typeof destination) === 'string'){
        // console.log("destination string");
        destinationIataCode = destination.split('(').pop().split(')')[0]
        setDestination({
            label: destination,
            iataCode: destinationIataCode
        })
    }
    try {
        localStorage.setItem('adults',adults);
        localStorage.setItem('children',children);
        localStorage.setItem('infant',infants)
      if (trip === 'oneWay') {
        
        const response = await tiqwaAxios.get(`flights/search?adults=${adults}&cabin=${cabin}&departure_date=${cleanedDepartureDate}&destination=${destinationIataCode}&origin=${originIataCode}&children=${children}&infants=${infants}`);
       
        dispatch(saveFlights(response.data.data)).then(() => {
          navigate('/bookings/search-result');
        });
      } else {
        // setLoading(true)
        const response = await tiqwaAxios.get(`flights/search?adults=${adults}&cabin=${cabin}&departure_date=${cleanedDepartureDate}&destination=${destinationIataCode}&origin=${originIataCode}&children=${children}&infants=${infants}&return_date=${cleanedReturnDate}`);
       
        dispatch(saveFlights(response.data.data)).then(() => {
            navigate('/bookings/search-result');
        });
      }
      // navigate('/bookings/search-result');
    } catch (error) {
        
    //   console.log(error)
    }finally{
        setLoading(false)
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

  const confirmPrices = useCallback(async (flightId) => {
    let goToInfoPage = false;
    try {
        setLoading(true)
        const response = await tiqwaAxios.get(`flights/confirm_price/${flightId}`);
        // console.log('confirmed:',response,trip);
        // return;
        if(response.status === 200){
            // console.log('hello from inside,',response.data);
            await dispatch(saveSelectedFlight({
                tripType: trip === 'oneWay' ? 'One-way' : 'Round-trip',
                ...response.data
            }));
            goToInfoPage = true;
        }else{
            setErrorMsg("This flight could not be confirmed!!, Try another provider.");
            setShowAlert(true)
            dispatch(saveSelectedFlight({
                tripType: trip === 'oneWay' ? 'One-way' : 'Round-trip',
                data:{},
            }));
        }
        // console.log('Going to info',goToInfoPage);
        if(goToInfoPage){
            navigate('/bookings/search-result/confirm');
        }
        // setLoading(false)
        
    } catch (error) {
        setErrorMsg(error.data?.description ?? "This flight could not be confirmed!!, Try another provider.");
        setShowAlert(true);
        dispatch(saveSelectedFlight({
            tripType: trip === 'oneWay' ? 'One-way' : 'Round-trip',
            data:{},
        }));
    //   console.log(error)
    } finally{
        setLoading(false)
    }
  }, []);

  useEffect(() => {
    setTrip(bookingForm.trip);
    setCabin(bookingForm.cabin);
    setAdults(bookingForm.adults);
    setChildren(bookingForm.children);
    setInfants(bookingForm.infants);
    setDepartureDate(bookingForm.departureDate);
    setReturnDate(bookingForm.returnDate);
  }, [bookingForm]);

  return (
    
    <>
        <Grid container spacing={3}>
            {
                showAlert
                ?
                <Grid item xs={12}>
                    <Alert severity='error' onClose={() => setShowAlert(false)}>
                    <AlertTitle sx={{ textTransform: 'capitalize' }}> Something is wrong! </AlertTitle>
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
                                    options={_airportNames}
                                    value={origin}
                                    defaultValue={bookingForm.origin}
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
                                    options={_airportNames}
                                    value={destination}
                                    defaultValue={bookingForm.destination}
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
                                    options={_airportNames}
                                    value={origin}
                                    defaultValue={bookingForm.origin}
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
                            <Grid item xs={6} sm={3} md={3}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={_airportNames}
                                    value={destination}
                                    defaultValue={bookingForm.destination}
                                    onChange={(event, newValue) => {
                                      setDestination(newValue);
                                    }}
                                    // inputValue={origin}
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
                                    minDate={departureDate}
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
            <Button onClick={() => submitSearchInput()} variant="contained" size="large" fullWidth style={{height: '100%'}}>
                {
                    _smallerThanMd
                    ?
                    <Typography variant="subtitle2">Search</Typography>
                    :
                    <Iconify icon="eva:search-fill" width={30} />
                }
            </Button>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                    {/* <Block title="Controlled"> */}
                    <Stack style={{marginTop: '20px'}} spacing={5}>
                        <Card>
                            <Box className="accordion-customizer">
                                <Accordion expanded={filter1} onChange={() => showFilter1(!filter1)}>
                                    <AccordionSummary style={{borderBottom: '1px solid #eee'}} expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                                        <Typography variant="subtitle1" sx={{ flexShrink: 0 }}>
                                            Price Range (NGN)
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack direction="row" alignItems="center" spacing={1} width={1}>
                                            {/* <Iconify icon="eva:volume-mute-fill" width={24} /> */}
                                            <Typography>0</Typography>
                                            <Slider min={0} max={_maxPrice} value={sliderValue} onChange={handleSliderValueChange} aria-labelledby="continuous-slider" valueLabelDisplay="auto" />
                                            <Typography>{_maxPrice}</Typography>
                                            {/* <Iconify icon="eva:volume-up-fill" width={24} /> */}
                                        </Stack>
                                    </AccordionDetails>
                                </Accordion>
                                {/* <Accordion expanded={filter2} onChange={() => showFilter2(!filter2)}>
                                    <AccordionSummary style={{borderBottom: '1px solid #eee'}} expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                                        <Typography variant="subtitle1" sx={{ flexShrink: 0 }}>
                                            Airline
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                         <Block title="Colors"> 
                                            <FormGroup>
                                                {
                                                    _airlineNames.map((airline, index) => {
                                                        return (
                                                            <FormControlLabel
                                                                key={`airline-name-${index}`}
                                                                control={<Checkbox defaultChecked sx={{
                                                                '&.Mui-checked': {
                                                                color: '#00ab55',
                                                                }}} />}
                                                                label={airline}
                                                                sx={{ textTransform: 'capitalize' }}
                                                                />
                                                        )
                                                    })
                                                }
                                            </FormGroup>
                                        </Block>
                                    </AccordionDetails>
                                </Accordion> */}
                                <Accordion expanded={filter3} onChange={() => showFilter3(!filter3)}>
                                    <AccordionSummary style={{borderBottom: '1px solid #eee'}} expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                                        <Typography variant="subtitle1" sx={{ flexShrink: 0 }}>
                                            Cabin
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormGroup>
                                            {cabin.toUpperCase()}
                                            {/* {
                                                cabinTypesFilter.map((cabin, index) => {
                                                    return (
                                                        <FormControlLabel
                                                        key={`cabin-${index}`}
                                                        control={<Checkbox defaultChecked sx={{
                                                        '&.Mui-checked': {
                                                            color: '#00ab55',
                                                        }}} />}
                                                        label={cabin.name}
                                                        checked={cabin.checked}
                                                        onClick={() => handleCabinTypesFilter(index)}
                                                        sx={{ textTransform: 'capitalize' }}
                                                        />
                                                    )
                                                })
                                            } */}
                                            {/* <FormControlLabel
                                                control={<Checkbox defaultChecked sx={{
                                                '&.Mui-checked': {
                                                    color: '#00ab55',
                                                }}} />}
                                                label="First Class"
                                                sx={{ textTransform: 'capitalize' }}
                                                />
                                            <FormControlLabel
                                                control={<Checkbox defaultChecked sx={{
                                                '&.Mui-checked': {
                                                    color: '#00ab55',
                                                }}} />}
                                                label="Business"
                                                sx={{ textTransform: 'capitalize' }}
                                                />
                                            <FormControlLabel
                                                control={<Checkbox defaultChecked sx={{
                                                '&.Mui-checked': {
                                                    color: '#00ab55',
                                                }}} />}
                                                label="Premium Economy"
                                                sx={{ textTransform: 'capitalize' }}
                                                />
                                            <FormControlLabel
                                                control={<Checkbox defaultChecked sx={{
                                                '&.Mui-checked': {
                                                    color: '#00ab55',
                                                }}} />}
                                                label="Economy"
                                                sx={{ textTransform: 'capitalize' }}
                                                /> */}
                                        </FormGroup>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </Card>
                    </Stack>
                    {/* </Block> */}
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Stack style={{marginTop: '20px'}} spacing={5}>
                            {
                                loadingData ? <>
                                <LoadingScreen/>
                                </>:
                                _filteredAvailableFlights.length === 0 ? <Typography>
                                    No flight available for the selected inputs
                                </Typography>
                                 : _filteredAvailableFlights.map(flight => {
                                    return (
                                        <Card key={`available-flight-${flight.id}`} style={{marginTop: '0px', marginBottom: '15px'}}>
                                            <Box>
                                                <Grid container>
                                                    <Grid style={{borderRight: '1px solid #eee'}} item xs={12} md={9}>
                                                        {
                                                            flight.inbound.map((flightInbound, index) => {
                                                                return (
                                                                    <Grid key={ `flightInbound-${(index + 1)}` } container spacing={2} style={{ padding: '20px' }}>
                                                                        <Grid item xs={12} sm={6}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={6} md={3}>
                                                                                    <img style={{width: '55px'}} src={flightInbound.airline_details.logo} alt="Flight icon" />
                                                                                </Grid>
                                                                                <Grid item xs={6} md={9}>
                                                                                    <div style={{fontWeight: 'bold'}}>{getClockTime(flightInbound.departure_time)} - {getClockTime(flightInbound.arrival_time)}</div>
                                                                                    <div>{flightInbound.airline_details.name}</div>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={6} sm={3}>
                                                                            <div style={{fontWeight: 'bold'}}>Inbound</div>
                                                                            <div>{`${flightInbound.cabin_type.substring(0,1).toUpperCase()}${flightInbound.cabin_type.substring(1).toLowerCase()}`}</div>
                                                                        </Grid>
                                                                        <Grid item xs={6} sm={3}>
                                                                            <div style={{fontWeight: 'bold'}}>{getHoursAndMins(flightInbound.departure_time, flightInbound.arrival_time)}</div>
                                                                            <div>{flightInbound.airport_from} - {flightInbound.airport_to}</div>
                                                                        </Grid>
                                                                    </Grid>
                                                                );
                                                            })
                                                        }
                                                        {
                                                            flight.outbound.map((flightOutbound, index) => {
                                                                return (
                                                                    <Grid key={ `flightOutbound-${(index + 1)}` } container spacing={2} style={{ padding: '20px' }}>
                                                                        <Grid item xs={12} sm={6}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={6} md={3}>
                                                                                    <img style={{width: '55px'}} src={flightOutbound.airline_details.logo} alt="Flight icon" />
                                                                                </Grid>
                                                                                <Grid item xs={6} md={9}>
                                                                                    <div style={{fontWeight: 'bold'}}>{getClockTime(flightOutbound.departure_time)} - {getClockTime(flightOutbound.arrival_time)}</div>
                                                                                    <div>{flightOutbound.airline_details.name}</div>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={6} sm={3}>
                                                                            <div style={{fontWeight: 'bold'}}>Outbound</div>
                                                                            <div>{`${flightOutbound.cabin_type.substring(0,1).toUpperCase()}${flightOutbound.cabin_type.substring(1).toLowerCase()}`}</div>
                                                                        </Grid>
                                                                        <Grid item xs={6} sm={3}>
                                                                            <div style={{fontWeight: 'bold'}}>{getHoursAndMins(flightOutbound.departure_time, flightOutbound.arrival_time)}</div>
                                                                            <div>{flightOutbound.airport_from} - {flightOutbound.airport_to}</div>
                                                                        </Grid>
                                                                    </Grid>
                                                                );
                                                            })
                                                        }
                                                    </Grid>
                                                    <Grid item xs={12} md={3} style={{alignSelf: 'self-end'}}>
                                                        <Grid container spacing={5} style={{ padding: '20px' }}>
                                                            {/* <Grid item xs={3}>
                                                                <div style={{display: 'inline-flex'}}>
                                                                <Iconify icon="eva:briefcase-fill" width={24} />
                                                                <span style={{marginLeft: '5px'}}>1</span>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <div style={{display: 'inline-flex'}}>
                                                                <Iconify icon="eva:briefcase-outline" width={24} />
                                                                <span style={{marginLeft: '5px'}}>1</span>
                                                                </div>
                                                            </Grid> */}
                                                            <Grid item xs={12} style={{paddingTop: '0px'}}>
                                                                <h2 style={{marginBottom: '0px'}}>
                                                                {`${flight.currency} ${numberWithCommas(flight.amount)}`}
                                                                </h2>
                                                                {/* <div style={{marginBottom: '15px'}}>Economy</div> */}
                                                                <Button onClick={() => confirmPrices(flight.id, flight.amount)} variant="contained" size="large" fullWidth>
                                                                        Choose
                                                                    </Button>
                                                                {/* <RouterLink className='router-link-button' to="/bookings/search-result/confirm">
                                                                    
                                                                </RouterLink> */}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Card>
                                    );
                                })
                            }
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </>
  );
}
