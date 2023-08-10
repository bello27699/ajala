import { sentenceCase } from 'change-case';

// @mui
import { Table, TableRow, TableBody, TableCell, TableContainer } from '@mui/material';
// components
import Scrollbar from '../../../../components/scrollbar';
import Label from '../../../../components/label';
import { TableHeadCustom } from '../../../../components/table';

// ----------------------------------------------------------------------

function createData(sn, id, tripType, location, destination, departure, arrival, status, approvalCode) {
  return { sn, id, tripType, location, destination, departure, arrival, status, approvalCode };
}

const TABLE_DATA = [
  createData(
    '01', 
    'TRIP0001', 
    'One Way', 
    'Abuja (ABJ)', 
    'Lagos (LOS)', 
    'Thu, 17th January, 2022 10:00AM',
    'Fri, 18th January, 2022 01:00PM',
    'in_progress',
    'MLSP2PQ',
  ),
  createData(
    '02', 
    'TRIP0002', 
    'One Way', 
    'Abuja (ABJ)', 
    'Lagos (LOS)', 
    'Thu, 17th January, 2022 10:00AM',
    'Fri, 18th January, 2022 01:00PM',
    'approved',
    'JK20SMX',
  ),
  createData(
    '03', 
    'TRIP0003', 
    'One Way', 
    'Abuja (ABJ)', 
    'Lagos (LOS)', 
    'Thu, 17th January, 2022 10:00AM',
    'Fri, 18th January, 2022 01:00PM',
    'in_progress',
    'S29U9DZ',
  ),
  createData(
    '04', 
    'TRIP0004', 
    'One Way', 
    'Abuja (ABJ)', 
    'Lagos (LOS)', 
    'Thu, 17th January, 2022 10:00AM',
    'Fri, 18th January, 2022 01:00PM',
    'completed',
    '02KSPSL',
  ),
  createData(
    '05', 
    'TRIP0005', 
    'One Way', 
    'Abuja (ABJ)', 
    'Lagos (LOS)', 
    'Thu, 17th January, 2022 10:00AM',
    'Fri, 18th January, 2022 01:00PM',
    'in_progress',
    'DPPOA02',
  ),
  createData(
    '06', 
    'TRIP0006', 
    'One Way', 
    'Abuja (ABJ)', 
    'Lagos (LOS)', 
    'Thu, 17th January, 2022 10:00AM',
    'Fri, 18th January, 2022 01:00PM',
    'out_of_date',
    'YEIJS88',
  ),
];

const TABLE_HEAD = [
  { id: 'sn', label: 'S/N' },
  { id: 'id', label: 'Booking ID' },
  { id: 'tripType', label: 'Travel Type' },
  { id: 'location', label: 'Location' },
  { id: 'destination', label: 'Destination' },
  { id: 'departure', label: 'Departure' },
  { id: 'arrival', label: 'Arrival' },
  { id: 'status', label: 'Status' },
  { id: 'approval_code', label: 'Approval Code' },
];

// ----------------------------------------------------------------------

export default function BasicTable() {
  return (
    <TableContainer sx={{ mt: 3, overflow: 'unset' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }}>
          <TableHeadCustom headLabel={TABLE_HEAD} />

          <TableBody>
            {TABLE_DATA.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{fontWeight: '600'}}>{row.sn}</TableCell>
                <TableCell sx={{fontWeight: '600'}}>{row.id}</TableCell>
                <TableCell sx={{fontWeight: '600'}}>{row.tripType}</TableCell>
                <TableCell sx={{fontWeight: '600'}}>{row.location}</TableCell>
                <TableCell sx={{fontWeight: '600'}}>{row.destination}</TableCell>
                <TableCell sx={{fontWeight: '600'}}>{row.departure}</TableCell>
                <TableCell sx={{fontWeight: '600'}}>{row.arrival}</TableCell>
                <TableCell>
                  <Label
                    variant="soft"
                    color={
                      (row.status === 'in_progress' && 'warning') || (row.status === 'out_of_date' && 'error') || 'success'
                    }
                  >
                    {sentenceCase(row.status)}
                  </Label>
                </TableCell>
                <TableCell sx={{fontWeight: '600'}}>{row.approvalCode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
