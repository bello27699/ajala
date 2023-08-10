
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useRef, useState } from 'react';
import { Grid, InputAdornment, TextField,Select,Box, MenuItem,Typography, Autocomplete} from "@mui/material";
// import { makeStyles } from '@mui/material/styles';
import { Description, Search } from '@mui/icons-material'

import documentLogo from '../../../assets/images/ajala_document.svg';

const countries = ['Nigeria','United State of America','United Kingdom','Mauritius'];

export default function ApprovalApplicationStartForm({tripTitle,country,state,lga,venue,type,memo,description,startDate,endDate,
    setTitle,setCountry,setTripState,setTripLga,setVenue,setTripType,setTripMemo,setDescription,setStartDate,setEndDate}){
    const [participantOptions,setParticipantOptions] = useState([])
    const prevController = useRef();

    const getParticipants = async (searchTerm)=>{
        if(prevController.current){
            prevController.current.abort();
        }
        const controller = new AbortController();
        const signal = controller.signal;
        prevController.current = controller;
        fetch(`https://cbnlnxprojectajalabackenddevtest.azurewebsites.net/api/v1/staffs/search?n=${searchTerm}`,{
            signal,
            headers:{
                // 'Authorization': `Bearer ${TIQWA_API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then( (response) => {
            return response.json()
        }).then( (data)=> {
            console.log('Participant search result:',data)
            const updateOptions = data.map((p)=>{
                return p;
            });
            setParticipantOptions(updateOptions);
        })
    };
    const onInputChange = (event, value, reason) => {
        if (value) {
          getParticipants(value);
        } else {
          setParticipantOptions([]);
        }
      };
    return (
        <Box sx={{width: '100%'}}>
            <Grid container spacing={4} direction="row" alignItems="self-start">
                <Grid item container xs={7} spacing={2} >
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{color:'yellowgreen'}}>Create Application</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="title-field" color="secondary" onChange={(str)=>{
                                setTitle(str.target.value)
                            }} value={tripTitle} label="Title of Trip" size='small' fullWidth variant="outlined"/>
                    </Grid>
                    <Grid item xs={6}>
                            <TextField fullWidth id="country" value={country} label="Country" onChange={(newType)=>{
                                setCountry(newType.target.value)
                            }} size="small" select>
                                {countries.map((c)=>(<MenuItem value={c}>{c}</MenuItem>))}
                            </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth id="state" value={state} label="State" onChange={(newState)=>{
                                setTripState(newState.target.value)
                            }} size="small" select>
                            {countries.map((c)=>(<MenuItem value={c}>{c}</MenuItem>))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                            <TextField fullWidth id="lga" value={lga} onChange={(newType)=>{
                                setTripLga(newType.target.value)
                            }} label="LGA" size="small" select>
                                {countries.map((c)=>(<MenuItem value={c}>{c}</MenuItem>))}
                            </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth id="venue" onChange={(newType)=>{
                                setVenue(newType.target.value)
                            }} value={venue} size="small" label="Venue" />
                    </Grid>
                    <Grid item xs={6}>
                            <TextField fullWidth id="type" value={type} size="small" onChange={(newType)=>{
                                setTripType(newType.target.value)
                            }} label="Type" select>
                                {countries.map((c)=>(<MenuItem value={c}>{c}</MenuItem>))}
                            </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth id="memo" size="small" onChange={(file)=>{
                            setTripMemo(file)
                        }}
                         value={memo} label="Attach memo" 
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <img src={documentLogo} alt="document" />
                                </InputAdornment>
                            )
                        }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField aria-label="Description" size="small" onChange={(newType)=>{
                                setDescription(newType.target.value)
                            }} value={description} minRows={4} multiline fullWidth placeholder="Description" />
                    </Grid>
                    <Grid item xs={6}>
                            <DesktopDatePicker fullWidth id="start-date" label="Start Date" 
                                value={startDate}
                                minDate={new Date()}
                                onChange={(newValue) => {
                                    setStartDate(newValue)
                                  }}
                                renderInput={(params) => <TextField variant="outlined" size="small" fullWidth {...params} />}
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <DesktopDatePicker fullWidth id="end-date" label="End Date"
                        value={endDate}
                        minDate={startDate ?? new Date()}
                            onChange={(newValue) => {
                                setEndDate(newValue)
                            }}
                            renderInput={(params) => <TextField variant="outlined" size="small" fullWidth {...params} />}
                         />
                    </Grid>
                </Grid>
                <Grid item xs={5} spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{color:'yellowgreen',mb:2}}>Select Participants</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                        options={participantOptions}
                        onInputChange={onInputChange}

                        />
                        <TextField fullWidth size='small' InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <Search />
                                        </InputAdornment>
                                    )
                                }}
                                label="Enter employee ID to search"
                                />
                       
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}