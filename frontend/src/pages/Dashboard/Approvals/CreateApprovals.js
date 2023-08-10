import React, { useState, useMemo, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import {
  Container,
  Avatar,
  Button,
  Card,
  Stack,
  Grid,
  MenuItem,
  Box,
  Typography,
  TextField,
  Autocomplete,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
// import { DatePicker } from '@mui/material/pickers';
import { useSettingsContext } from '../../../components/settings';
import { GeneralInput } from '../styles';
import Iconify from '../../../components/iconify/Iconify';
import { PATH_DASHBOARD } from '../../../routes/paths';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Scrollbar from '../../../components/scrollbar';
import ConfirmDialog from '../../../components/confirm-dialog';
import { SuccessIcon } from '../../../theme/overrides/CustomIcons';
import ApprovalApplicationStartForm from './ApprovalApplicationForm';

const steps = ['Create Application','Facility Configuration','Select Approver','Review & Comment'];
const CreateApprovals = ({ _locations }) => {
  const { themeStretch } = useSettingsContext();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tripLga, setTripLga] = useState('oneWay');
  const [tripTitle, setTripTitle] = useState('');
  const [tripCountry, setTripCountry] = useState('');
  const [tripState, setTripState] = useState('');
  const [tripVenue, setTripVenue] = useState('');
  const [tripMemo, setTripMemo] = useState(null);
  const [tripType, setTripType] = useState('');
  const [tripDescription, setTripDescription] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [isLoading, setLoading] = useState(false);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

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


  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  
  return (
    <>
      <Helmet>
        <title> Request Approval | Ajala Travel</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box sx={{width: '100%'}}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {
              steps.map((label,index)=>{
                const stepProps = {};
                const labelProps = {};
              
                if (isStepSkipped(index)){
                  stepProps.completed = false;
                }
                return (
                  <Step key={label}{...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                )
              })
            }
          </Stepper>
          {
            <Box sx={{m:4}}>
              <ApprovalApplicationStartForm tripTitle={tripTitle} setTitle={setTripTitle} type={tripType} setTripType={setTripType} country={tripCountry}
                setCountry={setTripCountry} lga={tripLga} setTripLga={setTripLga} memo={tripMemo} setTripMemo={setTripMemo} description={tripDescription} 
                setDescription={setTripDescription} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
               state={tripState} setTripState={setTripState}  venue={tripVenue} setVenue={setTripVenue} />
            </Box>
          }
          <Box sx={{ display: 'flex', p: 2 }}>
                      {
                        activeStep > 0 
                        ?
                        <Button color="inherit" size="large" disabled={activeStep === 0 && isLoading} onClick={handleBack} sx={{ mr: 1, color: 'lightgreen' }}>
                          Back to Application
                        </Button>
                        :
                        null
                      }                      
                      <Box sx={{ flexGrow: 1 }} />
                      <Button xs={3} variant="contained" disabled={isLoading} size="large" onClick={handleNext}>
                        Next  
                      </Button>
                    </Box>
        </Box>
        {/* <CustomBreadcrumbs
          heading="Request Approval"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Travel Request',
              href: '/dashboard/approvals',
            },
            {
              name: 'Create Request',
            },
          ]}
        />

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Box sx={{ py: 3, px: 4 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Request Approval</Typography>
            </Box>

            <Grid container>
              <Grid xs={12} md={12} sx={{ pl: '2rem' }}>
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <TextField
                      className="remove-bottom-border"
                      variant="outlined"
                      sx={{ width: '95%', mb: 4 }}
                      label="Title"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      select
                      className="remove-bottom-border"
                      variant="outlined"
                      sx={{ width: '95%', mb: 4 }}
                      label="Travel Type"
                      // value={trip}
                    >
                      <MenuItem value="oneWay">One-way</MenuItem>
                      <MenuItem value="roundTrip">Round-trip</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      select
                      className="remove-bottom-border"
                      variant="outlined"
                      sx={{ width: '95%', mb: 4 }}
                      label="Locations"
                      // value={trip}
                    >
                      <MenuItem value="Abuja">Abuja</MenuItem>
                      <MenuItem value="Lagos">Lagos</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item sm={12}>
                    <TextField
                      variant="outlined"
                      sx={{ width: '98%', mb: 4 }}
                      fullWidth
                      multiline
                      minRows={4}
                      label="Description"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <DesktopDatePicker
                      value={startDate}
                      label="Start Date"
                      onChange={(newValue) => {
                        setStartDate(newValue);
                      }}
                      minDate={new Date('2017-01-01')}
                      renderInput={(params) => (
                        <TextField sx={{ width: '95%', mb: 4 }} variant="outlined" fullWidth {...params} />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <DesktopDatePicker
                      label="End Date"
                      // variant="outlined"
                      value={endDate}
                      minDate={new Date('2017-01-01')}
                      onChange={(newValue) => {
                        setEndDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField sx={{ width: '95%', mb: 4 }} variant="outlined" fullWidth {...params} />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      className="remove-bottom-border"
                      variant="outlined"
                      sx={{ width: '95%', mb: 4 }}
                      label="Attatchment URL"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button
                      onClick={handleOpenConfirm}
                      sx={{ width: '95%', py: 1.8, mb: 4, background: '#00AB55', color: 'white' }}
                    >
                      Submit Request
                    </Button>

                    <ConfirmDialog
                      open={openConfirm}
                      onClose={handleCloseConfirm}
                      title="Successfully Submitted"
                      content={
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                          }}
                        >
                          <p>Your Request has been submitted successfully!!!</p>
                          <SuccessIcon sx={{ color: '#00AB55', height: 200, width: 200 }} />
                        </Box>
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Scrollbar>
        </Card> */}
      </Container>
    </>
  );
};

export default CreateApprovals;
