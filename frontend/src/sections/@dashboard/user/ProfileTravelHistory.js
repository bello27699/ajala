import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Table, TableBody, TableRow, TableHead, Card, TableCell, CardHeader, TableContainer } from '@mui/material';

export const Pending = styled('p')(() => ({
  color: '#F29425',
}));

export const Approved = styled('p')(() => ({
  color: '#10A142',
}));

export default function ProfileTravelHistory() {
  const tableHead = ['S/N', 'Title', 'Travel Type', 'Location', 'Duration'];

  const tableData = [
    {
      id: '01',
      title: 'Duty Tours',
      travel_type: 'One Way',
      location: 'Lagos',
      duration: '2 weeks',
    },

    {
      id: '02',
      title: 'Duty Tours',
      travel_type: 'Round Trip',
      location: 'Abuja',
      duration: '5 days',
    },

    {
      id: '03',
      title: 'Duty Tours',
      travel_type: 'One Way',
      location: 'Enugu',
      duration: '1 weeks',
    },
  ];

  return (
    <>
      <Card>
        <CardHeader title="Your Travel History" sx={{ pb: 2 }} />
        <Box sx={{ p: 3 }}>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 960 }}>
              <TableHead>
                <TableRow>
                  {tableHead.map((td, key) => (
                    <TableCell key={key}>{td}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((data, key) => (
                  <TableRow key={key} sx={{ ' td,  th': { py: 1.5 } }}>
                    <TableCell component="th" scope="row">
                      {key + 1}
                    </TableCell>
                    <TableCell>{data.title}</TableCell>
                    <TableCell>{data.travel_type}</TableCell>
                    <TableCell>{data.location}</TableCell>
                    <TableCell>{data.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </>
  );
}
