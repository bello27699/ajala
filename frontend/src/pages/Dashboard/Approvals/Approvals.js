import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
// @mui
import { alpha,useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled,Box, Stack,Paper, Button, Typography, IconButton,Container,TextField,Grid,MenuItem,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TableFooter,TablePagination, tableCellClasses, Icon} from '@mui/material';
import LastPageIcon from '@mui/icons-material/LastPage'
import { useEffect, useCallback, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'

import inboxLogo from '../../../assets/images/icon_inbox.svg';
// _mock
import { _socials } from '../../../_mock/arrays';
// components
import { useSettingsContext } from '../../../components/settings';

// ----------------------------------------------------------------------
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
export default function CarBookings() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const { themeStretch } = useSettingsContext();

  const theme = useTheme();
  const smallerThanMd = useMediaQuery(theme.breakpoints.down('md'));
  const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.grey,
      color: theme.palette.common.black
    },
    [`&.${tableCellClasses.body}`]:{
      fontSize: 14,
    }
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

  function createData(
    name,
    calories,
    fat,
    carbs,
    protein,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    // createData('eNaira Documentation', 'CBN ITI Abuja', '13-MAR-2023', '17-MAR-2023','pending'),
    // createData('eNaira Documentation', 'CBN ITI Abuja', '13-FEB-2023', '17-MAR-2023','completed'),
    // createData('Agile Training', 'CBN ITI Abuja', '13-MAR-2023', '17-MAR-2023','completed'),
    // createData('eNaira Documentation', 'CBN ITI Abuja', '13-MAR-2023', '17-JUL-2023','cancelled'),
    // createData('Github Training', 'CBN ITI Abuja', '13-MAR-2023', '17-MAR-2023','cancelled'),
  ];
  

  return (
    <>
      <Helmet>
        <title> DTMS | RFA</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container columns={16} spacing={2}>
          <Grid item xs={6}>
            {/* <RouterLink className='router-link-anchor' to="/approvals/create">
              <Button variant='contained'>
                <Typography>
                  Create New Trip
                </Typography>
              </Button>
            </RouterLink> */}
            <RouterLink className='router-link-anchor' to="#">
              <Button variant='contained'>
                <Typography>
                  Create New Trip
                </Typography>
              </Button>
            </RouterLink>
          </Grid>
          <Grid item xs={10}>
            <Grid container columns={12} spacing={2}>
              <Grid item xs={4} md={4}>
                <TextField
                  className='remove-bottom-border'
                  variant="outlined"
                  select
                  label="Status"
                  fullWidth
                >
                  <MenuItem value="declined">
                    Declined
                  </MenuItem>
                  <MenuItem value="approved">
                    Approved
                  </MenuItem>
                  <MenuItem value="pending">
                    Pending
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={8} md={8}>
                <TextField 
                  variant='outlined' 
                  fullWidth
                  // disabled
                  label="Search By Trip Title" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Box m={2} pt={4}>
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>S/N</StyledTableCell>
                <StyledTableCell >Approval Title Pint</StyledTableCell>
                <StyledTableCell >Venue</StyledTableCell>
                <StyledTableCell >Start Date</StyledTableCell>
                <StyledTableCell >End Date</StyledTableCell>
                <StyledTableCell >Approval Status</StyledTableCell>
              </TableRow>
            </TableHead>
            {
              rows.length > 0 ?
              <>
              <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row,ind) => (

                <StyledTableRow key={ind}>
                  <StyledTableCell component="th" scope="row">
                    {ind+1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.calories}</StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant='contained' >
                      <Typography>
                        {row.protein}
                      </Typography>
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
              </>
               :
               <>
               <TableBody>
               <StyledTableRow rowSpan={5}>
                  <StyledTableCell component="th" scope="row" colSpan={6} >
                    <Box sx={{p: 2, marginTop:15, height: 9/10}} alignItems="center">
                      <Grid container alignItems="center" direction="column" spacing={1}>
                      <Grid item alignItems="center">
                          <img src={inboxLogo} alt="inbox" style={{ height: '5rem', width: '5rem' }} />
                        </Grid>
                        <Grid item >
                          <Typography variant='body2' align='center'>
                            No Approval to display yet
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
               </TableBody>
               </>
            }
            
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------

TimeBlock.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

function TimeBlock({ label, value }) {
  return (
    <div>
      <Box> {value} </Box>
      <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
    </div>
  );
}
