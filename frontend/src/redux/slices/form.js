import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// utils
import tiqwaAxios from '../../utils/tiqwaAxios';
//
import { dispatch } from '../store';

const initialState = {
    isLoading: false,
    error: null,
    csrf: null,
  };

  const slice = createSlice({
    name: 'form',
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
        // GET CSRF
        getCSRFSuccess(state, action) {
            state.isLoading = false;
            state.csrf = action.payload;
        },
    },
  });

  // Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getCsrfToken() {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
        // const response = await tiqwaAxios.get(`csrf`);
        axios({
            url: 'https://cbnlnxprojectajalabackenddevtest.azurewebsites.net/csrf',
            method: 'get',
            headers:{
                'Content-Type': 'application/json',
                'accept': 'application/json',
            }
        }).then((response) => { 
            if(response.status === 200){
                dispatch(slice.actions.getCSRFSuccess(response.data.csrfToken ?? ''));
            }
            console.log('csrf response:',response)
        })
  
        // Catch errors if any
        .catch((error) => { 
            console.log('csrf error:',error)
            dispatch(slice.actions.hasError(error));
        });
        // dispatch(slice.actions.getCSRFSuccess(response.data.data ?? []));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
}