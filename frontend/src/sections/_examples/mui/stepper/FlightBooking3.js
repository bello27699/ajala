import React, { useState, useMemo, useEffect, useCallback } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Accordion, AccordionSummary, AccordionDetails, Stack, Card, CardHeader, Checkbox, Box, Step, Paper, IconButton, Button, Stepper, StepLabel, Typography, Grid, TextField, MenuItem, Autocomplete, StepButton, Divider,List } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import QRCode from 'react-qr-code';
import Image from '../../../../components/image';
import { useDispatch, useSelector } from '../../../../redux/store';
import Iconify from '../../../../components/iconify';
import tiqwaAxios from '../../../../utils/tiqwaAxios';

// const steps = ['Search Flights', 'Select Flight', 'Checkout'];
const steps = [
  'Customer Information', 
  'Payment information', 
  'Booking is confirmed!'
];

export default function FlightBooking3({_airports, _roundtrips}) {
  
  const { selectedFlight } = useSelector((state) => state.flights);
  // const { selectedFlight } = useSelector((state) => state.selectedFlight);

  const navigate = useNavigate();
  const _airportNames = useMemo(() => {
      if (_airports.length >= 1) {
          return _airports.map(airport => {
              return {
                label: `${airport.city} (${airport.iata_code})`,
                iataCode: airport.iata_code
              }
          });
      } 
      return [];
  }, [_airports]);

  const [numAdult, setAdult] = useState(parseInt(localStorage.getItem("adults"),10) || 0);
  const [numChildren, setChildren] = useState(parseInt(localStorage.getItem("children"),10)||0);
  const [numInfant, setInfants] = useState(parseInt(localStorage.getItem("infant"),10) || 0);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Kindly ensure all fields are correctly filled.');
  const [currentPassengerInfo, setCurrentPassengerInfo] = useState('Adult');
  const [bookingReference, setBookingReference] = useState('');
  const [flightDetail,setFlightDetail] = useState(null)

  const [payWithENaira, setPayWithENaira] = useState(true);
  const [flightBooked, setFlightBooked] = useState(false);
  const [qrCodeReady, setQrCodeStatus] = useState(false);
  const [invoiceId,setInvoiceId] = useState('');
  const  { csrf }   = useSelector((state) => state.form);
  
  const [passengerType, setPassengerType] = useState('Adult');
  const [passengerInfo, setPassengerInfo] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [DOB, setDOB] = useState(null);
  const [gender, setGender] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const [trip, setTrip] = useState(selectedFlight.tripType ?? 'One-way');

    // ADD DOCUMENTS

  const [address, setAddress] = useState('');
  console.log("selected flight:",selectedFlight);
  console.log("csrf:",csrf);
  const [returnDate, setReturnDate] = useState(new Date());
  
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => step === 10;// 1;

  const isStepSkipped = (step) => skipped.has(step);

  const stepsLabel= [
    'Save & Continue', 
    qrCodeReady ? 'Verify Payment':'Proceed to Payment', 
    'Finish'
  ];
  
  
  const verifyPayment = useCallback(async (bookingRef) => {
    try { 
      setLoading(true)
      const response = await tiqwaAxios.get(`flights/invoice/${invoiceId}`);
      console.log('Payment Verification:',response);
      if(response.status === 200 && response.data.data.state === 'complete'){
        console.log('reeference passed',bookingReference)
        const ticketResponse = await tiqwaAxios.get(`flights/pay/${bookingReference}`);
        // console.log('ticket issue responseee:',ticketResponse);
        if(ticketResponse.status === 200){
          const flightDetails = await tiqwaAxios.get(`flights/booking_details/${bookingReference}`);
          console.log('flight details',flightDetails.data);
          if(flightDetails.status === 200){
            console.log('flight details',flightDetails.data);
            setFlightDetail(flightDetails.data);
            localStorage.removeItem('adults');
            localStorage.removeItem('children');
            localStorage.removeItem('infant');
          }
          setErrorMsg("");
            setShowAlert(false)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }else{
          let err = "Attempt to issue ticket failed";
          if(ticketResponse.status === 403){
            const flightDetails = await tiqwaAxios.get(`flights/booking_details/${bookingReference}`);
            console.log('flight details',flightDetails.data);
            if(flightDetails.status === 200){
              console.log('flight details',flightDetails.data);
              setFlightDetail(flightDetails.data);
            }
          }
          if(ticketResponse.message){
            err = ticketResponse.message;
          }
          setErrorMsg(err)
          setShowAlert(true);
        }
        console.log('ticket response',ticketResponse);
      }else{
        let err = "Attempt to verify payment failed";
        if(response.message){
          err = response.message;
        }
        setErrorMsg(err)
        setShowAlert(true);
      }

      // handleNext();
    } catch (error) {
      setErrorMsg(error.message ?? "An error occurred when making payment!");
      setShowAlert(true)
      console.log("payment error:",error)
    } 
    finally {
      setLoading(false)
    }
  }, [
    bookingReference
  ]);

  const resetPassengerInfo = ()=>{
    setFirstName('');
      setLastName('');
      setGender('');
      setTitle('');
      setEmail('');
      setPhone('');
      setPassengerType('')
      setDOB(null);
  }

  const validateCustomerInfoForm = ()=>{
    console.log('validation',[firstName !== '', lastName !== '' , email !== '' , phone !== '' , DOB !== null]);
    return firstName !== '' && lastName !== '' && email !== '' && phone !== '' && DOB !== null && gender !== '';
  }
  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    switch(activeStep){
      case 0:
        if(!validateCustomerInfoForm()){
          // console.log('Hello');
          setErrorMsg("Fields not complete!!");
          setShowAlert(true)
        // return false;
        }else{
          const cleanedDOB = DOB.toISOString().substring(0,10);
          let passenger = {
            first_name: firstName,
            last_name: lastName,
            dob: cleanedDOB,
            gender: gender.toLowerCase(),
            title: title.toLowerCase(),
            email: email.toString(),
            phone_number: phone
          }
          let filled = false;
          let adult = numAdult;
          let children = numChildren;
          let infant = numInfant;

          console.log('after num passengers:',infant,children,adult);
          if(adult > 0){
            console.log('before adult minus:',adult);
            passenger = { ...passenger, passenger_type: 'adult'}
            // passenger.passenger_type = 'Adult';
            setPassengerInfo([...passengerInfo,passenger]);
            adult -= 1;
            setAdult(adult);
            console.log('after adult minus:',adult);
            resetPassengerInfo();
            filled = true;
          }
          console.log('filled after adult:',filled);
          if(numChildren > 0 && !filled){
            console.log('before children minus:',children);
            passenger = { ...passenger, passenger_type: 'child'}
            // passenger.passenger_type = 'Child';
            setPassengerInfo([...passengerInfo,passenger]);
            children -=1;
            setChildren(children);
            console.log('after children minus:',children);
            resetPassengerInfo();
            filled = true;
          }
          console.log('filled after children:',filled);
          if(numInfant > 0 && !filled){
            console.log('before infant minus:',infant);
            passenger = { ...passenger, passenger_type: 'infant'}
            // passenger.passenger_type = 'Infant';
            setPassengerInfo([...passengerInfo,passenger]);
            infant -= 1;
            setInfants(infant);
            console.log('after infant minus:',numInfant);
            resetPassengerInfo();
            filled = true;
          }
          if(adult > 0){
            setCurrentPassengerInfo(`Adult ${parseInt(localStorage.getItem('adults'),10) - adult + 1}`)
          }else if(children > 0){
            setCurrentPassengerInfo(`Child ${parseInt(localStorage.getItem('children'),10) - children + 1}`)
          }else{
            setCurrentPassengerInfo(`Infant ${parseInt(localStorage.getItem('infant'),10) - infant + 1}`)
          }
          console.log('filled after infant:',filled);
          console.log("number of passenger remaining",numAdult===0,numChildren===0,numInfant===0,typeof numInfant);
          if(adult === 0 && children === 0 && infant === 0){

            console.log('Inside here oooooooo:',filled);
            setErrorMsg("");
            setShowAlert(false)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
          }
          
        }
        break;
        // return;
      case 1:
        if(flightBooked){
          await verifyPayment(bookingReference);
        }else{
          await confirmBooking();
        }
        break;
      default:
        navigate('/bookings');
        break;
    }
    // if(showAlert){
    //   return; // false
    // }
    // if(activeStep === 0){
      
    //   if(!validateCustomerInfoForm){
    //     alert("Fields not complete!!");
    //   return
    //   }
    //   if(Object.keys(selectedFlight).length ===0){
    //     alert("You must select a flight first")
    //     navigate('/bookings/search-result');
    //     return
    //   }
    // }
    // if(activeStep === 1){
    //   confirmBooking()
    // }
  };
  const handleBack = () => {
    if(activeStep === 0){
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleEmailChange = (str)=>{
    if(str.includes("cbn.gov.ng")){
      setErrorMsg("Official email not allowed")
      setShowAlert(true)
      setEmail('');
    }else{
      setEmail(str);
    }
  }

  useEffect(() => {
    if (selectedFlight) {
      if (selectedFlight.tripType === 'One-way') {
        setTrip('One-way');
      } else {
        setTrip('Round-trip');
        if (selectedFlight.inbound) {
          if (selectedFlight.inbound.length >= 1) {
            setReturnDate(new Date(selectedFlight.inbound[selectedFlight.outbound.length - 1].arrival_time));
          }
        }
      }
    }
  }, [selectedFlight]);

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
    const number = val ? val.toString() : '0';
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

  const getClockTime = (time) => {
    const result = new Date(time).toLocaleTimeString().replace(':00', '').toLowerCase().replace(' am', '').replace(' pm', '');
    return result;
  }

  // const confirmBooking = () => {
  //   makePayment();
  // }
  // const 

  const confirmBooking = useCallback(async () => {
    
        if(Object.keys(selectedFlight).length === 0){
          setErrorMsg("You must select a flight first!!");
          setShowAlert(true)
          await new Promise((_)=>{
            setTimeout(()=>{
              navigate('/bookings');
            },3000)
          })
          return;
        }
    
    if(!payWithENaira){
      setErrorMsg("This payment method is not available yet!!, please try other options.");
      setShowAlert(true)
      return;
    }
    try {
      // console.log('Passengers: ',passengerInfo);
      // console.log('token',csrf);
      // return;
      setLoading(true)

      // const csrfResponse = await fetch(`https://cbnlnxprojectajalabackenddevtest.azurewebsites.net/csrf`,{
      //   headers:{
      //       'Content-Type': 'application/json',
      //       'Accept': 'application/json'
      //   }
      // }).then( (response) => {
      //   return response.json()
      // });
      // let csrfToken = '';
      // if(csrfResponse.csrfToken){
      //   console.log('resp:', csrfResponse);
      //   csrfToken = csrfResponse.csrfToken;
      const response = await tiqwaAxios.post(`airports/book_flight`, {
        flight_id:selectedFlight.data.id,
        passengers: passengerInfo,
        _csrf: "csrfToken"
      });
      if(response.status === 200){
        setInvoiceId(response.data.data.guid);
        setQrCodeStatus(true);
        setBookingReference(response.data.data.reference);
        setFlightBooked(true);
      }
      console.log('booking response ',response);
      // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      
  }   
      // setSkipped(newSkipped);
     catch (error) {
      if(error.message){
        setErrorMsg(error.message)
      }else{
        setErrorMsg("Error occurred when trying to book the flight.");
      }
      setShowAlert(true)
      console.log('Confirm booking error: ',error)
    } finally{
      setLoading(false);
    }
  }, [
    passengerType,
    firstName,
    lastName,
    DOB,
    gender,
    title,
    email,
    phone,
    selectedFlight
  ]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
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
          <Stack style={{marginTop: '10px'}} spacing={5}>
            <Card>
              <Box style={{padding: '20px'}}>
                <Stepper activeStep={activeStep} >
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                      labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                        {/* <StepButton >
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </StepButton> */}
                      </Step>
                    );
                  })}
                </Stepper>
                {activeStep === steps.length ? (
                  <>
                    <Paper
                      sx={{
                        p: 3,
                        my: 3,
                        minHeight: 120,
                        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                      }}
                    >
                      <Typography sx={{ my: 1 }}>All steps completed - you&apos;re finished</Typography>
                    </Paper>

                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ flexGrow: 1 }} />
                      <RouterLink className='router-link-anchor' to="/bookings">
                      <Button>Finish</Button>
                      </RouterLink>
                      {/* <Button onClick={handleReset}>Reset</Button> */}
                    </Box>
                  </>
                ) : (
                  <>
                    <div
                      // sx={{
                      //   p: 2,
                      //   my: 2,
                      //   minHeight: 120,
                      //   // bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                      // }}
                    >
                      {
                        activeStep === 0 
                        ?
                          (
                            <Stack style={{marginTop: '20px'}} spacing={5}>
                                <Box sx={{p: 2}}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <h3 style={{margin: '0px'}}>Passenger Information {currentPassengerInfo}</h3>
                                        </Grid>
                                        
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                            variant="outlined"
                                            select
                                            fullWidth
                                            label="Title"
                                            value={title}
                                            onChange={(str)=>(
                                              setTitle(str.target.value)
                                            )}
                                            // disabled
                                            >
                                                <MenuItem value="Mr">
                                                Mr
                                                </MenuItem>
                                                <MenuItem value="Miss">
                                                Miss
                                                </MenuItem>
                                                <MenuItem value="Mrs">
                                                Mrs
                                                </MenuItem>
                                                <MenuItem value="Ms">
                                                Ms
                                                </MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField 
                                            variant='outlined' 
                                            fullWidth
                                            value={firstName}
                                            onChange={(str)=>(
                                              setFirstName(str.target.value)
                                            )}
                                            // disabled
                                            label="First Name*" />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField 
                                            variant='outlined' 
                                            fullWidth
                                            value={lastName}
                                            onChange={(str)=>(
                                              setLastName(str.target.value)
                                            )}
                                            // disabled
                                            label="Last Name*" />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DesktopDatePicker
                                                label="Date of Birth*"
                                                // variant="outlined"
                                                value={DOB}
                                                minDate={new Date('1922-01-01')}
                                                maxDate={new Date()}
                                                onChange={(newValue) => {
                                                  setDOB(newValue);
                                                }}
                                                // disabled
                                                renderInput={(params) => <TextField variant="outlined" fullWidth {...params} />}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                            variant="outlined"
                                            select
                                            fullWidth
                                            label="Gender*"
                                            value={gender}
                                            onChange={(str)=>(
                                              setGender(str.target.value)
                                            )}
                                            // disabled
                                            >
                                                <MenuItem value="Male">
                                                Male
                                                </MenuItem>
                                                <MenuItem value="Female">
                                                Female
                                                </MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField 
                                            variant='outlined' 
                                            fullWidth
                                            value={email}
                                            // disabled
                                            onChange={(str)=>(
                                              handleEmailChange(str.target.value)
                                            )}
                                            label="Personal Email Address*" />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField 
                                            variant='outlined' 
                                            fullWidth
                                            value={phone}
                                            // disabled
                                            onChange={(str)=>(
                                              setPhone(str.target.value)
                                            )}
                                            label="Phone Number*" />
                                        </Grid>
                                        
                                    </Grid>
                                </Box>
                            </Stack>
                          )
                        :
                        activeStep === 1
                        ?
                        (
                          <Stack style={{marginTop: '20px'}} spacing={5}>
                            <Box sx={{p: 2}}>
                              <Grid container spacing={5}>
                                <Grid item xs={12} sm={6}>
                                  <Stack
                                    spacing={2}
                                    direction={{
                                      xs: 'column',
                                      md: 'row',
                                    }}
                                  >
                                    <Paper
                                      variant="outlined"
                                      sx={{
                                        p: 3,
                                        width: 1,
                                        position: 'relative',
                                      }}
                                      style={payWithENaira ? {border: '2px solid #00ab55'} : {border: '2px solid #637381a8'}}
                                    >
                                      <Image
                                        alt="icon"
                                        src='/assets/icons/payments/e-naira.png'
                                        sx={{ mb: 1, maxWidth: 36 }}
                                      />

                                      <Typography variant="subtitle2">Pay with E-naira</Typography>

                                      <IconButton
                                        onClick={() => setPayWithENaira(true)} 
                                        sx={{
                                          top: 8,
                                          right: 8,
                                          position: 'absolute',
                                        }}
                                      >
                                        <Checkbox checked={payWithENaira} sx={{
                                        '&.Mui-checked': {
                                          color: '#00ab55',
                                        }}} />
                                      </IconButton>
                                    </Paper>
                                  </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <Stack
                                    spacing={2}
                                    direction={{
                                      xs: 'column',
                                      md: 'row',
                                    }}
                                  >
                                    <Paper
                                      variant="outlined"
                                      sx={{
                                        p: 3,
                                        width: 1,
                                        position: 'relative',
                                      }}
                                      style={!payWithENaira ? {border: '2px solid #00ab55'} : {border: '2px solid #637381a8'}}
                                    >
                                      <Image
                                        alt="icon"
                                        src='/assets/icons/payments/approval-code.png'
                                        sx={{ mb: 1, maxWidth: 36 }}
                                      />

                                      <Typography variant="subtitle2">Pay with approval code</Typography>

                                      <IconButton
                                        onClick={() => setPayWithENaira(false)} 
                                        sx={{
                                          top: 8,
                                          right: 8,
                                          position: 'absolute',
                                        }}
                                      >
                                        
                                        <Checkbox checked={!payWithENaira} sx={{
                                        '&.Mui-checked': {
                                          color: '#00ab55',
                                        }}} />
                                      </IconButton>
                                    </Paper>
                                  </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                  {
                                    payWithENaira
                                    ?
                                    <Box>
                                      {
                                        qrCodeReady
                                        ?
                                          <Grid container item direction="column"
                                            spacing={2}
                                            alignItems="center" justifyContent="center">
                                            <Grid item>
                                              <Typography>Please scan the QR Code or Copy Invoice ID to make payment.</Typography>
                                            </Grid>
                                            <Grid item>
                                              <QRCode
                                              title="Qrcode"
                                              value={`ENGN://#${invoiceId}`}
                                              style={{margin:'auto',maxWidth:'250px'}}
                                              />
                                            </Grid>
                                            <Grid item>
                                            <CopyToClipboard text={invoiceId}>
                                              <Button>Copy Invoice ID</Button>
                                            </CopyToClipboard>
                                          </Grid>
                                            <Grid item>
                                              <Typography variant='subtitle2'>Please click Verify Payment once payment is made..</Typography>
                                            </Grid>
                                          </Grid>
                                        :
                                        <img
                                      alt="qa-code"
                                      // src='/assets/images/placeholder/qr-code.svg' paymentGenerated */
                                      src='/assets/icons/payments/e-naira.png'
                                      style={{maxWidth: '250px', margin: 'auto'}} />
                                      }
                                    </Box>
                                    :
                                    <Grid container>
                                      <Grid item xs={12}>
                                          <TextField 
                                          variant='outlined' 
                                          fullWidth
                                          disabled
                                          label="Approval Code" />
                                      </Grid>
                                    </Grid>
                                  }
                                </Grid>
                              </Grid>
                            </Box>
                          </Stack>
                        )
                        :
                          (
                            <Stack style={{marginTop: '20px'}} spacing={5}>
                              <Box sx={{p: 2}}>
                                <Grid container spacing={5}>
                                  <Grid item xs={12}>
                                    <Alert severity='success'>
                                      <AlertTitle sx={{ textTransform: 'capitalize' }}> <span style={{fontWeight: 'bold'}}>Booking Reference: {bookingReference}</span>. Your Booking Order is Confirmed Now. </AlertTitle>
                                      A confirmation email has been sent.
                                    </Alert>
                                  </Grid>
                                  {/* <hr /> */}
                                  {
                                    flightDetail ?
                                    <List
                                      sx={{
                                        width:'100%',
                                        overflow:'auto',
                                        maxHeight: 300
                                      }}
                                    >
                                      {
                                        flightDetail.data.passengers.map((p,ind)=>{
                                          return (
                                            <Stack style={{marginTop: '20px'}} key={ind} spacing={5}>
                                              <Box sx={{p: 4}}>
                                                <Grid container spacing={2}>
                                                  <Grid item xs={12} md={6}>
                                                    <Typography style={{fontWeight: 600}}>Ticket Number</Typography>
                                                    <Typography>{`${flightDetail.data.tickets[ind]?.ticket_number || 'N/A'}`}</Typography>
                                                  </Grid>
                                                  <Grid item xs={12} md={6}>
                                                  <Typography style={{textAlign: 'right',fontWeight:600}}>Passenger Type</Typography>
                                                    <Typography style={{textAlign: 'right'}}>{`${p.passenger_type.toUpperCase()}`}</Typography>
                                                  </Grid>
                                                  
                                                  <Grid item xs={12} md={6}>
                                                    <Typography style={{fontWeight: 600}}>First Name</Typography>
                                                    <Typography >{`${p.first_name}`}</Typography>
                                                  </Grid>
                                                  {/* <Grid item xs={12} md={6}>
                                                  <Typography style={{textAlign: 'right'}}>{`${p.first_name} ${firstName}`}</Typography>
                                                  </Grid> */}
                                                  <Divider/>
                                                  <Grid item xs={12} md={6} alignContent="flex-end">
                                                    <Typography style={{fontWeight: 600, textAlign:'right'}}>Last Name</Typography>
                                                    <Typography style={{textAlign: 'right'}}>{`${p.last_name} `}</Typography>
                                                  </Grid>
                                                  <Divider/>
                                                  {/* <Grid item xs={12} md={6}>
                                                    <Typography style={{textAlign: 'right'}}>{`${p.last_name} ${lastName}`}</Typography>
                                                  </Grid> */}
                                                  
                                                  <Grid item xs={12} md={6}>
                                                    <Typography style={{fontWeight: 600}}>E-mail Address</Typography>
                                                  </Grid>
                                                  <Grid item xs={12} md={6}>
                                                    <Typography style={{textAlign: 'right'}}>{`${p.email} `}</Typography>
                                                  </Grid>
                                                </Grid>
                                              </Box>
                                              
                                              
                                              {/* <Grid item xs={12} md={6}>
                                                <Typography style={{fontWeight: 600}}>Street Address & Number</Typography>
                                              </Grid>
                                              <Grid item xs={12} md={6}>
                                                <Typography style={{textAlign: 'right'}}>{`${p.last_name} ${address}`}</Typography>
                                              </Grid> */}
                                            </Stack>
                                          )
                                        })
                                      }
                                    </List>
                                     :(<></>)
                                  }
                                  
                                </Grid>
                              </Box>
                            </Stack>
                          )
                      }
                      {/* <Typography sx={{ my: 1 }}> Step {activeStep + 1}</Typography> */}
                    </div>
                    
                    <Box sx={{ display: 'flex', p: 2 }}>
                      {
                        activeStep !== steps.length - 1 
                        ?
                        <Button color="inherit" size="large" disabled={activeStep === 0 && isLoading} onClick={handleBack} sx={{ mr: 1 }}>
                          Back
                        </Button>
                        :
                        null
                      }                      
                      <Box sx={{ flexGrow: 1 }} />
                      {isStepOptional(activeStep) && (
                        <Button color="inherit" size="large" onClick={handleSkip} sx={{ mr: 1 }}>
                          Skip
                        </Button>
                      )}
                      <Button variant="contained" disabled={isLoading} size="large" onClick={handleNext}>
                        {stepsLabel[activeStep]}
                        {/* {
                          activeStep === steps.length - 1 
                          ?  
                            <RouterLink className='router-link-button' to="/bookings">
                              <Button variant="contained" size="large">
                                View History
                              </Button>
                            </RouterLink>
                          : 
                          (
                            activeStep === 0 
                            ?
                            <Button variant="contained" size="large" onClick={handleNext}>
                              Save & Continue
                            </Button>
                            :
                            activeStep === 1
                            ?
                            <Button disabled={!payWithENaira} variant="contained" size="large" onClick={() => confirmBooking()}>
                              Proceed to Pay
                            </Button>
                            :
                            <Button variant="contained" size="large" onClick={handleNext}>
                              Next
                            </Button>
                          )
                        } */}
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={12} md={3}>
          <Stack style={{marginTop: '10px'}} spacing={5}>
            <Card>
              <Box style={{padding: '20px'}}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography style={{textAlign: 'right'}}>
                      <RouterLink className='router-link-anchor' to="/bookings">
                        Edit
                      </RouterLink>
                    </Typography>
                  </Grid>
                  {
                    selectedFlight.data?.inbound 
                    ?
                    selectedFlight.data.inbound.map((inbound, index) => {
                      return (
                        <Grid key={`inbound-${index}`} className="accordion-customizer" sm={12}>
                          <Accordion>
                            <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                                <Typography variant="subtitle1" sx={{ flexShrink: 0 }}>
                                    Flight Details {`#${index+1}`}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* <Stack direction="row" alignItems="center" spacing={1} width={1}> */}
                                  <Grid container spacing={2}>
                                    {/* <Grid item sm={12}>
                                      <Box>
                                        <img
                                        alt="qa-code"
                                        src='/assets/images/placeholder/Arik-Logo.jpg'
                                        style={{margin: 'auto'}} />
                                      </Box>
                                    </Grid> */}
                                    <Grid item sm={12}>
                                      <Typography style={{fontWeight: 600}}>{`${inbound.airport_from}-${inbound.airport_to} (${inbound.operating_airline})`}</Typography>
                                    </Grid>
                                    <Grid container item sm={12}>
                                      <Grid item xs={12}>
                                        <Typography>{`${inbound.cabin_type.substring(0,1).toUpperCase()}${inbound.cabin_type.substring(1).toLowerCase()}`}</Typography>
                                      </Grid>
                                    </Grid>
                                    <Grid item sm={12}>
                                      <Typography style={{fontWeight: 600}}>{getHoursAndMins(inbound.departure_time, inbound.arrival_time)}</Typography>
                                      <Typography>Nonstop</Typography>
                                    </Grid>
                                    <Grid container item sm={12}>
                                      <Grid container spacing={2} item xs={6}>
                                        <Grid item sm={3} style={{alignSelf: 'center'}}>
                                          <Box>
                                            <img
                                            alt="outbound-plane"
                                            src='/assets/images/placeholder/outbound-plane.svg'
                                            style={{margin: 'auto', width: '80%'}} />
                                          </Box>
                                        </Grid>
                                        <Grid item sm={9}>
                                          <Typography variant="h4" style={{fontWeight: 600}}>{getClockTime(inbound.departure_time)}</Typography>
                                          <Typography>{`${inbound.airport_from}`}</Typography>
                                        </Grid>
                                      </Grid>
                                      <Grid container spacing={2} item xs={6}>
                                        <Grid item sm={3} style={{alignSelf: 'center'}}>
                                          <Box>
                                            <img
                                            alt="outbound-plane"
                                            src='/assets/images/placeholder/inbound-plane.svg'
                                            style={{margin: 'auto', width: '80%'}} />
                                          </Box>
                                        </Grid>
                                        <Grid item sm={9}>
                                          <Typography variant="h4" style={{fontWeight: 600}}>{getClockTime(inbound.arrival_time)}</Typography>
                                          <Typography>{inbound.airport_to}</Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                {/* </Stack> */}
                            </AccordionDetails>
                          </Accordion>
                        </Grid>
                      )
                    })
                    :
                    null
                  }
                  {
                    selectedFlight.inbound && selectedFlight.outbound 
                    ?
                    selectedFlight.outbound.map((outbound, index) => {
                      return (
                        <Grid key={`outbound-${index}`} className="accordion-customizer" sm={12}>
                          <Accordion>
                            <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                                <Typography variant="subtitle1" sx={{ flexShrink: 0 }}>
                                    Flight Details {`#${index+selectedFlight.inbound.length+1}`}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* <Stack direction="row" alignItems="center" spacing={1} width={1}> */}
                                  <Grid container spacing={2}>
                                    {/* <Grid item sm={12}>
                                      <Box>
                                        <img
                                        alt="qa-code"
                                        src='/assets/images/placeholder/Arik-Logo.jpg'
                                        style={{margin: 'auto'}} />
                                      </Box>
                                    </Grid> */}
                                    <Grid item sm={12}>
                                      <Typography style={{fontWeight: 600}}>{`${outbound.airport_from}-${outbound.airport_to} (${outbound.operating_airline})`}</Typography>
                                    </Grid>
                                    <Grid container item sm={12}>
                                      <Grid item xs={12}>
                                        <Typography>{`${outbound.cabin_type.substring(0,1).toUpperCase()}${outbound.cabin_type.substring(1).toLowerCase()}`}</Typography>
                                      </Grid>
                                    </Grid>
                                    <Grid item sm={12}>
                                      <Typography style={{fontWeight: 600}}>{getHoursAndMins(outbound.departure_time, outbound.arrival_time)}</Typography>
                                      <Typography>Nonstop</Typography>
                                    </Grid>
                                    <Grid container item sm={12}>
                                      <Grid container spacing={2} item xs={6}>
                                        <Grid item sm={3} style={{alignSelf: 'center'}}>
                                          <Box>
                                            <img
                                            alt="outbound-plane"
                                            src='/assets/images/placeholder/outbound-plane.svg'
                                            style={{margin: 'auto', width: '80%'}} />
                                          </Box>
                                        </Grid>
                                        <Grid item sm={9}>
                                          <Typography variant="h4" style={{fontWeight: 600}}>{getClockTime(outbound.departure_time)}</Typography>
                                          <Typography>{`${outbound.airport_from}`}</Typography>
                                        </Grid>
                                      </Grid>
                                      <Grid container spacing={2} item xs={6}>
                                        <Grid item sm={3} style={{alignSelf: 'center'}}>
                                          <Box>
                                            <img
                                            alt="outbound-plane"
                                            src='/assets/images/placeholder/inbound-plane.svg'
                                            style={{margin: 'auto', width: '80%'}} />
                                          </Box>
                                        </Grid>
                                        <Grid item sm={9}>
                                          <Typography variant="h4" style={{fontWeight: 600}}>{getClockTime(outbound.arrival_time)}</Typography>
                                          <Typography>{outbound.airport_to}</Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                {/* </Stack> */}
                            </AccordionDetails>
                          </Accordion>
                        </Grid>
                      )
                    })
                    :
                    null
                  }
                  <Grid className="accordion-customizer" sm={12}>
                    <Accordion>
                        <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                            <Typography variant="subtitle1" sx={{ flexShrink: 0 }}>
                                Booking Details
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack direction="row" alignItems="center" spacing={1} width={1}>
                              <Grid container spacing={2}>
                                {/* <Grid item xs={12} md={6}>
                                  <Typography style={{fontWeight: 600}}>
                                      Airline
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Typography style={{textAlign: 'right'}}>
                                      Arik Air
                                  </Typography>
                                </Grid> */}
                                <Grid item xs={12} md={6}>
                                  <Typography style={{fontWeight: 600}}>
                                      Trip Type
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Typography style={{textAlign: 'right'}}>
                                    {
                                      trip.toLowerCase() === 'one-way'
                                      ?
                                      'One Way '
                                      :
                                      'Round Trip '
                                    } Flight</Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Typography style={{fontWeight: 600}}>
                                      Base Fare
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Typography style={{textAlign: 'right'}}>
                                    {`${selectedFlight.data?.currency ?? 'NGN'} ${numberWithCommas(selectedFlight.data?.amount)}`}
                                  </Typography>
                                </Grid>
                                {/* <Grid item xs={12} md={6}>
                                  <Typography style={{fontWeight: 600}}>
                                      Taxes & Fees
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Typography style={{textAlign: 'right'}}>
                                  {`${selectedFlight.data?.currency ?? 'NGN'} ${numberWithCommas(selectedFlight.data?.amount * 0.075)}`}
                                  </Typography>
                                </Grid> */}
                              </Grid>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                  </Grid>
                  <Grid className="accordion-customizer" sm={12} style={{marginTop: '0px'}}>
                    <Accordion>
                        <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                            <Typography variant="subtitle1" sx={{ flexShrink: 0 }}>
                                Payment
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack direction="row" alignItems="center" spacing={1} width={1}>
                              <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                  <Typography style={{fontWeight: 600}}>
                                      Payment Breakdown
                                  </Typography>
                                </Grid>
                                {
                                  selectedFlight.data?.price_summary.map((details,i)=>
                                  <Grid item xs={12} md={12}>
                                    <Typography style={{fontWeight: 600}}>
                                          {`${details.passenger_type.toUpperCase()} (${details.quantity})`}
                                      </Typography>
                                      <Typography style={{textAlign: 'right'}}>
                                      {selectedFlight.data?.currency ?? 'NGN'} {numberWithCommas(details.total_price)}
                                      </Typography>
                                  </Grid>
                                  )
                                }
                                {/* <Grid item xs={12} md={6}>
                                  <Typography style={{textAlign: 'right'}}>
                                  {`${selectedFlight.data?.currency ?? 'NGN'} ${numberWithCommas(selectedFlight.data?.amount)}`}
                                  </Typography>
                                </Grid> */}
                                <Grid item xs={12} md={6}>
                                  <Typography style={{fontWeight: 600}}>
                                      Extra Price
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Typography style={{textAlign: 'right'}}>
                                  {`${selectedFlight.data?.currency ?? 'NGN'} 0`}
                                  </Typography>
                                </Grid>
                                {/* <Grid item xs={12} md={6}>
                                  <Typography style={{fontWeight: 600}}>
                                      VAT
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Typography style={{textAlign: 'right'}}>
                                    7.5%
                                  </Typography>
                                </Grid> */}
                                <Grid item xs={12} md={6}>
                                  <Typography style={{fontWeight: 600}}>
                                      Total Amount
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Typography style={{textAlign: 'right', fontWeight: 600}}>
                                    {`${selectedFlight.data?.currency ?? 'NGN'} ${numberWithCommas(selectedFlight.data?.amount)}`}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
