import keyBy from 'lodash/keyBy';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import tiqwaAxios from '../../utils/tiqwaAxios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: null,

    airports: [],
    airlines: [],
    bookingForm: {
        trip: 'oneWay',
        cabin: 'economy',
        adults: 1,
        children: 0,
        infants: 0,
        origin: '',
        destination: '',
        departureDate: null,
        returnDate: null,
    },

    availableFlights: [],
    selectedFlight: {}
};

const slice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET AIRPORTS
    getAirportsSuccess(state, action) {
        state.isLoading = false;
        state.airports = action.payload;
    },

    // GET AIRLINES
    getAirlinesSuccess(state, action) {
        state.isLoading = false;
        state.airlines = action.payload;
    },

    // GET FLIGHTS
    getFlightsSuccess(state, action) {
        state.isLoading = false;
        state.availableFlights = action.payload;
    },

    // STORE SELECTED FLIGHT
    saveSelectedFlightSuccess(state, action) {
        state.isLoading = false;
        state.selectedFlight = action.payload;
        console.log("Flight saved:",action.payload);
    },
    
    // STORE SEARCH INPUT
    saveSearchInputSuccess(state, action) {
      console.log("from search input: ",action.payload);
        const { 
            trip, 
            cabin, 
            adults, 
            children,
            infants,
            origin,
            destination,
            departureDate,
            returnDate 
        } = action.payload;
        const newBookingForm = {
            trip, 
            cabin, 
            adults, 
            children,
            infants,
            origin,
            destination,
            departureDate,
            returnDate 
        };
        state.bookingForm = newBookingForm;
    }
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAirports() {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
        // const response = await tiqwaAxios.get(`4371211/airports?keyword='nigeria'`);
        const response = await tiqwaAxios.get(`airports`);
        console.log('airports response:',response)
        dispatch(slice.actions.getAirportsSuccess(response.data.data ?? []));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
}

export function getAirlines() {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
        // const response = await tiqwaAxios.get(`4371211/airlines`);
        
        const response = await tiqwaAxios.get(`airlines`);
        console.log('airline response:',response)
        dispatch(slice.actions.getAirlinesSuccess(response.data.data ?? []));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
}

export function saveSearchInput(payload) {
    return async () => {
        dispatch(slice.actions.saveSearchInputSuccess(payload));
    }
}

export function saveFlights(payload) {
    return async () => {
        dispatch(slice.actions.getFlightsSuccess(payload));
    }
}

export function saveSelectedFlight(payload) {
  console.log('saving selected flight',payload);
  return async () => {
      dispatch(slice.actions.saveSelectedFlightSuccess(payload));
  }
}

// ----------------------------------------------------------------------

export function getMail(mailId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/mail/mail', {
        params: { mailId },
      });
      dispatch(slice.actions.getMailSuccess(response.data.mail));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
