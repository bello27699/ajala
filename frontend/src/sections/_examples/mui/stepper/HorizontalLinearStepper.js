import { useState, useMemo } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Stack, Card, CardHeader, Box, Step, Paper, Button, Stepper, StepLabel, Typography, Grid, TextField, MenuItem, Autocomplete } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import Iconify from '../../../../components/iconify';
// ----------------------------------------------------------------------

// const steps = ['Search Flights', 'Select Flight', 'Checkout'];
const steps = [
  'Flight Search', 
  'Price Confirmation of selected flight', 
  'Flight Booking'
];

export default function HorizontalLinearStepper({_airports, _roundtrips}) {
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

  
  const [value, setValue] = useState(new Date());

  const [trip, setTrip] = useState('oneWay');
  const [adults, setAdults] = useState(1);
  const [cabin, setCabin] = useState('economy');
  const [departureDate, setDepartureDate] = useState(null);
  const [destination, setDestination] = useState(null);
  const [origin, setOrigin] = useState(null);

  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [returnDate, setReturnDate] = useState(null);

  /* FUNCTIONS SECTION */
  const handleTripSelection = e => setTrip(e.target.value);
  const handleAdultsSelection = e => setAdults(e.target.value);
  const handleCabinSelection = e => setCabin(e.target.value);
  const handleDepartureDateEntry = e => setDepartureDate(e.target.value);
  const handleDestinationSelection = e => setDestination(e.target.value);
  const handleOriginSelection = e => setOrigin(e.target.value);

  const handleChildrenSelection = e => setChildren(e.target.value);
  const handleInfantsSelection = e => setInfants(e.target.value);
  const handleReturnDateEntry = e => setReturnDate(e.target.value);
  // const handleEmailInput = e => setEmail(e.target.value);
  
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => step === 10;// 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
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

  return (
    <>
      {/* <Stepper activeStep={activeStep}>
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
            </Step>
          );
        })}
      </Stepper> */}
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
            <Button onClick={handleReset}>Reset</Button>
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
                  <>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} md={2}>
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
                      >
                        <MenuItem value="oneWay">
                          One-way
                        </MenuItem>
                        <MenuItem value="roundTrip">
                          Round-trip
                        </MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4} md={2}>
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
                    <Grid item xs={12} sm={4} md={2}>
                      <TextField
                        className='remove-bottom-border'
                        variant="outlined"
                        select
                        // fullWidth
                        size="small"
                        sx={{width: '5ch'}}
                        // value={currency}
                        label="Adults *"
                        // SelectProps={{ native: true }}
                        // onChange={handleChangeCurrency}
                        // helperText="Please select your currency"
                        onChange={handleAdultsSelection}
                        value={adults}
                      >
                        {
                          [1,2,3,4,5,6,7,8,9].map((item, index) => {
                            return (
                              <MenuItem key={index} value={item}>
                                {item}
                              </MenuItem>
                            )
                          })
                        }
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4} md={2}>
                      <TextField
                        className='remove-bottom-border'
                        variant="outlined"
                        select
                        // fullWidth
                        size="small"
                        sx={{width: '5ch'}}
                        // value={currency}
                        label="Children"
                        // SelectProps={{ native: true }}
                        // onChange={handleChangeCurrency}
                        // helperText="Please select your currency"
                        onChange={handleChildrenSelection}
                        value={children}
                      >
                        {
                          [0,1,2,3,4,5,6,7].map((item, index) => {
                            return (
                              <MenuItem key={index} value={item}>
                                {item}
                              </MenuItem>
                            )
                          })
                        }
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4} md={2}>
                      <TextField
                        className='remove-bottom-border'
                        variant="outlined"
                        select
                        // fullWidth
                        size="small"
                        sx={{width: '5ch'}}
                        // value={currency}
                        label="Infants"
                        // SelectProps={{ native: true }}
                        // onChange={handleChangeCurrency}
                        // helperText="Please select your currency"
                        onChange={handleInfantsSelection}
                        value={infants}
                      >
                        {
                          [0,1,2,3,4,5,6,7,8,9].map((item, index) => {
                            return (
                              <MenuItem key={index} value={item}>
                                {item}
                              </MenuItem>
                            )
                          })
                        }
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} style={{marginTop: '0px'}}>
                    <Grid item xs={11}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={3} md={3}>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={_airportNames}
                            // sx={{ width: 300 }}
                            renderInput={(params) => <TextField variant='filled' {...params} label="From" />}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={_airportNames}
                            // sx={{ width: 300 }}
                            renderInput={(params) => <TextField variant='filled' {...params} label="To" />}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <DesktopDatePicker
                            label="Departure"
                            // variant="filled"
                            value={value}
                            minDate={new Date('2017-01-01')}
                            onChange={(newValue) => {
                              setValue(newValue);
                            }}
                            renderInput={(params) => <TextField variant="filled" fullWidth {...params} />}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <DesktopDatePicker
                            label="Return"
                            // variant="filled"
                            value={value}
                            minDate={new Date('2017-01-01')}
                            onChange={(newValue) => {
                              setValue(newValue);
                            }}
                            renderInput={(params) => <TextField variant="filled" fullWidth {...params} />}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={1}>
                      <Button variant="contained" size="large" fullWidth style={{height: '100%'}}>
                        <Iconify icon="eva:search-fill" width={30} />
                      </Button>
                    </Grid>
                  </Grid>
                  </>
                )
              :
              activeStep === 1
              ?
              (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4} md={2}>
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
                    >
                      <MenuItem value="oneWay">
                        One-way
                      </MenuItem>
                      <MenuItem value="roundTrip">
                        Round-trip
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4} md={2}>
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
                  <Grid item xs={12} sm={4} md={2}>
                    <TextField
                      className='remove-bottom-border'
                      variant="outlined"
                      select
                      // fullWidth
                      size="small"
                      sx={{width: '5ch'}}
                      // value={currency}
                      label="Adults *"
                      // SelectProps={{ native: true }}
                      // onChange={handleChangeCurrency}
                      // helperText="Please select your currency"
                      onChange={handleAdultsSelection}
                      value={adults}
                    >
                      {
                        [1,2,3,4,5,6,7,8,9].map((item, index) => {
                          return (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          )
                        })
                      }
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4} md={2}>
                    <TextField
                      className='remove-bottom-border'
                      variant="outlined"
                      select
                      // fullWidth
                      size="small"
                      sx={{width: '5ch'}}
                      // value={currency}
                      label="Children"
                      // SelectProps={{ native: true }}
                      // onChange={handleChangeCurrency}
                      // helperText="Please select your currency"
                      onChange={handleChildrenSelection}
                      value={children}
                    >
                      {
                        [0,1,2,3,4,5,6,7].map((item, index) => {
                          return (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          )
                        })
                      }
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4} md={2}>
                    <TextField
                      className='remove-bottom-border'
                      variant="outlined"
                      select
                      // fullWidth
                      size="small"
                      sx={{width: '5ch'}}
                      // value={currency}
                      label="Infants"
                      // SelectProps={{ native: true }}
                      // onChange={handleChangeCurrency}
                      // helperText="Please select your currency"
                      onChange={handleInfantsSelection}
                      value={infants}
                    >
                      {
                        [0,1,2,3,4,5,6,7,8,9].map((item, index) => {
                          return (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          )
                        })
                      }
                    </TextField>
                  </Grid>
                  <Grid item xs={12} smoffset={4} mdoffset={2} sm={3} md={3}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={_airportNames}
                      // sx={{ width: 300 }}
                      renderInput={(params) => <TextField variant='filled' {...params} label="From" />}
                    />
                  </Grid>
                  <Grid item xs={12} smoffset={4} mdoffset={2} sm={3} md={3}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={_airportNames}
                      // sx={{ width: 300 }}
                      renderInput={(params) => <TextField variant='filled' {...params} label="To" />}
                    />
                  </Grid>
                  <Grid item xs={12} smoffset={4} mdoffset={2} sm={3} md={3}>
                    <DesktopDatePicker
                      label="Departure"
                      // variant="filled"
                      value={value}
                      minDate={new Date('2017-01-01')}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField variant="filled" fullWidth {...params} />}
                    />
                  </Grid>
                  <Grid item xs={12} smoffset={4} mdoffset={2} sm={3} md={3}>
                    <DesktopDatePicker
                      label="Return"
                      // variant="filled"
                      value={value}
                      minDate={new Date('2017-01-01')}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField variant="filled" fullWidth {...params} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack style={{marginTop: '20px'}} spacing={5}>
                      <Card>
                        <Box>
                          <Grid container>
                            <Grid item xs={9}>
                              <Grid container spacing={5} style={{ padding: '20px' }}>
                                <Grid item xs={12} sm={6}>
                                  <Grid container>
                                    <Grid item xs={2}>
                                      <img style={{width: '55px'}} src="/assets/icons/FLIGHT-LOGO.png" alt="Flight icon" />
                                    </Grid>
                                    <Grid item xs={10}>
                                      <div style={{fontWeight: 'bold'}}>11:10 pm - 7:45 am</div>
                                      <div>Lufthansa</div>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                  <div style={{fontWeight: 'bold'}}>nonstop</div>
                                  <div>FRA</div>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                  <div style={{fontWeight: 'bold'}}>9H 35M</div>
                                  <div>ABV - LHR</div>
                                </Grid>
                              </Grid>
                              <Grid container spacing={5} style={{ padding: '20px' }}>
                                <Grid item xs={12} sm={6}>
                                  <Grid container>
                                    <Grid item xs={2}>
                                      <img style={{width: '55px'}} src="/assets/icons/FLIGHT-LOGO.png" alt="Flight icon" />
                                    </Grid>
                                    <Grid item xs={10}>
                                      <div style={{fontWeight: 'bold'}}>11:10 pm - 7:45 am</div>
                                      <div>Lufthansa</div>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                  <div style={{fontWeight: 'bold'}}>nonstop</div>
                                  <div>FRA</div>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                  <div style={{fontWeight: 'bold'}}>9H 35M</div>
                                  <div>ABV - LHR</div>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={3} style={{borderLeft: '1px solid #eee'}}>
                              <Grid container spacing={5} style={{ padding: '20px' }}>
                                <Grid item xs={3}>
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
                                </Grid>
                                <Grid item xs={12} style={{paddingTop: '0px'}}>
                                  <h2 style={{marginBottom: '0px'}}>
                                    NGN 102,000
                                  </h2>
                                  <div style={{marginBottom: '15px'}}>Economy</div>
                                  <Button variant="contained" size="large" fullWidth>
                                    View Deal
                                  </Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Card>
                      <Card>
                        <Box>
                          <Grid container>
                            <Grid item xs={9}>
                              <Grid container spacing={5} style={{ padding: '20px' }}>
                                <Grid item xs={12} sm={6}>
                                  <Grid container>
                                    <Grid item xs={2}>
                                      <img style={{width: '55px'}} src="/assets/icons/FLIGHT-LOGO.png" alt="Flight icon" />
                                    </Grid>
                                    <Grid item xs={10}>
                                      <div style={{fontWeight: 'bold'}}>11:10 pm - 7:45 am</div>
                                      <div>Lufthansa</div>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                  <div style={{fontWeight: 'bold'}}>nonstop</div>
                                  <div>FRA</div>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                  <div style={{fontWeight: 'bold'}}>9H 35M</div>
                                  <div>ABV - LHR</div>
                                </Grid>
                              </Grid>
                              <Grid container spacing={5} style={{ padding: '20px' }}>
                                <Grid item xs={12} sm={6}>
                                  <Grid container>
                                    <Grid item xs={2}>
                                      <img style={{width: '55px'}} src="/assets/icons/FLIGHT-LOGO.png" alt="Flight icon" />
                                    </Grid>
                                    <Grid item xs={10}>
                                      <div style={{fontWeight: 'bold'}}>11:10 pm - 7:45 am</div>
                                      <div>Lufthansa</div>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                  <div style={{fontWeight: 'bold'}}>nonstop</div>
                                  <div>FRA</div>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                  <div style={{fontWeight: 'bold'}}>9H 35M</div>
                                  <div>ABV - LHR</div>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={3} style={{borderLeft: '1px solid #eee'}}>
                              <Grid container spacing={5} style={{ padding: '20px' }}>
                                <Grid item xs={3}>
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
                                </Grid>
                                <Grid item xs={12} style={{paddingTop: '0px'}}>
                                  <h2 style={{marginBottom: '0px'}}>
                                    NGN 102,000
                                  </h2>
                                  <div style={{marginBottom: '15px'}}>Economy</div>
                                  <Button variant="contained" size="large" fullWidth>
                                    View Deal
                                  </Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Card>
                    </Stack>
                  </Grid>
                </Grid>
              )
              :
                ('')
            }
            {/* <Typography sx={{ my: 1 }}> Step {activeStep + 1}</Typography> */}
          </div>
          
          <Box sx={{ display: 'flex' }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button variant="contained" onClick={handleNext}>
              {
                activeStep === steps.length - 1 
                ? 
                'Finish' 
                : 
                (
                  activeStep === 0 
                  ?
                  'Save & Continue'
                  :
                  'Next'
                )
              }
            </Button>
          </Box>
        </>
      )}
    </>
  );
}
