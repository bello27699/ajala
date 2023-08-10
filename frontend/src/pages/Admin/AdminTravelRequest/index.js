import React from 'react';
import { useNavigate } from 'react-router';
import { styled, useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import sumBy from 'lodash/sumBy';

import {
  Table,
  Button,
  TableBody,
  Container,
  Paper,
  TableHead,
  TableRow,
  Box,
  Card,
  TableCell,
  TableContainer,
  Typography,
  Divider,
  Stack,
} from '@mui/material';
// import { PATH_DASHBOARD } from '../../../routes/paths';
import InvoiceAnalytic from '../../../sections/@dashboard/InvoiceAnalytic';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import ApprovalTable from '../../../sections/approvals/AdminTravelDetails';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Iconify from '../../../components/iconify/Iconify';
import Scrollbar from '../../../components/scrollbar';

export const Pending = styled('p')(() => ({
  color: '#F29425',
}));

export const Approved = styled('p')(() => ({
  color: '#10A142',
}));

const AdminTravelRequest = () => {
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();

  const tableHead = [
    'S/N',
    'Staff ID',
    'Title',
    'Travel Type',
    'Location',
    'Travel Date',
    'Return Date',
    'Approval Name',
    'Status',
  ];

  const tableData = [
    {
      id: '01',
      staff_id: '02658',
      title: 'HR',
      travel_type: 'One Way',
      location: 'London',
      travel_date: '07/10/2022',
      return_date: '31/12/2022',
      approver_name: 'Mr. Jane Doe',
      status: <Approved>Approved</Approved>,
    },
    {
      id: '02',
      staff_id: '02630',
      title: 'Admin',
      travel_type: 'Round Trip',
      location: 'New York',
      travel_date: '08/07/2022',
      return_date: '02/10/2022',
      approver_name: 'Mrs. Jane Doe',
      status: <Pending>Pending</Pending>,
    },
    {
      id: '03',
      staff_id: '06849',
      title: 'IT',
      travel_type: 'One Way',
      location: 'Lagos',
      travel_date: '02/05/2022',
      return_date: '05/08/2022',
      approver_name: 'Prof. Michael Jackson',
      status: <Approved>Approved</Approved>,
    },

    {
      id: '04',
      staff_id: '03658',
      title: 'IT',
      travel_type: 'One Way',
      location: 'Lagos',
      travel_date: '02/05/2022',
      return_date: '05/08/2022',
      approver_name: 'Mrs. Jane Doe',
      status: <Approved>Approved</Approved>,
    },

    {
      id: '05',
      staff_id: '03599',
      title: 'IT',
      travel_type: 'One Way',
      location: 'Lagos',
      travel_date: '02/05/2022',
      return_date: '05/08/2022',
      approver_name: 'Prof. John Doe',
      status: <Pending>Pending</Pending>,
    },
  ];

  return (
    <>
      <Helmet>
        <title> Travel Request | Ajala Travel</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Travel Request"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Travel Request',
              href: PATH_DASHBOARD.admin_travel_request,
            },
            {
              name: 'Travel Request',
            },
          ]}
        />

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <InvoiceAnalytic
                title="Total"
                total={100}
                percent={100}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />

              <InvoiceAnalytic
                title="Approved"
                total={20}
                percent={30}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />

              <InvoiceAnalytic
                title="Pending"
                total={30}
                percent={50}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />

              <InvoiceAnalytic
                title="Rejected"
                total={50}
                percent={10}
                icon="eva:bell-fill"
                color={theme.palette.error.main}
              />
            </Stack>
          </Scrollbar>
        </Card>

        <ApprovalTable
          title="Travel Request History"
          tableData={tableData}
          tableLabels={[
            { id: 'sn', label: 'S/N' },
            { id: 'staff_id', label: 'Staff ID' },
            { id: 'title', label: 'Title' },
            { id: 'travel_type', label: 'Travel Type' },
            { id: 'location', label: 'Location' },
            { id: 'travel_date', label: 'Travel Date' },
            { id: 'return_date', label: 'Return Date' },
            { id: 'approver_name', label: 'Approver Name' },
            { id: 'status', label: 'Status' },
          ]}
        />
      </Container>
    </>
  );
};

export default AdminTravelRequest;
