import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Card,
  Grid,
  Box,
  Typography,
  Table,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
  Container,
  TableHead,
  Button,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Logo from '../../../assets/images/aj_Logo.png';
import Label from '../../../components/label/Label';
import { useSettingsContext } from '../../../components/settings';
import Scrollbar from '../../../components/scrollbar';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { SuccessIcon, ErrorIcon, CloseIcon } from '../../../theme/overrides/CustomIcons';
// import { ErrorIcon } from '../../../theme/overrides/CustomIcons';
import ConfirmDialog from '../../../components/confirm-dialog';
import Tool from './Tool';

// import { fDate } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

const StyledRowResult = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

const ViewRequest = () => {
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [rejectRequest, setRejectRequest] = useState(false);

  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleRejectRequest = () => setRejectRequest(true);
  const handleCloseReject = () => {
    setRejectRequest(false);
  };

  return (
    <>
      <Helmet>
        <title> View Request | Ajala</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="View Request"
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
              name: 'View Request',
            },
          ]}
        />
        <Tool />

        <Card sx={{ pt: 5, px: 5 }}>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <img alt="logo" src={Logo} style={{ maxWidth: 50 }} />
            </Grid>
            <Grid item xs={12} md={6} sx={{ mb: 5 }}>
              <Box sx={{ textAlign: { sm: 'right' } }}>
                <Label variant="soft" sx={{ textTransform: 'uppercase', mb: 1 }}>
                  UNAPPROVED
                </Label>
                <Typography variant="h6">SVT7586</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                Invoice from
              </Typography>

              <Typography variant="body2">Jane Doe</Typography>

              <Typography variant="body2">John Doe</Typography>

              <Typography variant="body2">Phone: 08044456887</Typography>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                Invoice to
              </Typography>

              <Typography variant="body2">Ibrahim John</Typography>

              <Typography variant="body2">Daniel Dan</Typography>

              <Typography variant="body2">Phone: 07055567490</Typography>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                date create
              </Typography>

              <Typography variant="body2">17 Dec 2022</Typography>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                Due date
              </Typography>

              <Typography variant="body2">09 Jan 2023</Typography>
            </Grid>
          </Grid>

          <TableContainer sx={{ overflow: 'unset' }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled', mt: 5 }}>
              Travel Details
            </Typography>
            <Scrollbar>
              <Table sx={{ minWidth: 960 }}>
                <TableHead
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    '& th': { backgroundColor: 'transparent' },
                  }}
                >
                  <TableRow>
                    <TableCell width={40}>#</TableCell>

                    <TableCell align="left">Staff ID</TableCell>

                    <TableCell align="left">Title</TableCell>

                    <TableCell align="left">Travel Type</TableCell>

                    <TableCell align="left">Location</TableCell>

                    <TableCell align="left">Travel Date</TableCell>

                    <TableCell align="left">Return Date</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow
                    sx={{
                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                  >
                    <TableCell align="left">
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          01
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="left">SVT7586</TableCell>

                    <TableCell align="left">Duty Tour</TableCell>

                    <TableCell align="left">Round Trip</TableCell>

                    <TableCell align="left">Lagos</TableCell>

                    <TableCell align="left">30 Dec 2022</TableCell>

                    <TableCell align="left">15 Jan 2023</TableCell>
                  </TableRow>

                  <StyledRowResult>
                    <TableCell colSpan={5} />

                    <TableCell align="right" width={200} sx={{ typography: 'body1' }}>
                      <Box sx={{ my: 2 }}>
                        <Button
                          sx={{ background: '#00AB55', color: 'white', width: '100%' }}
                          onClick={handleOpenConfirm}
                        >
                          Accept Request
                        </Button>
                      </Box>

                      <ConfirmDialog
                        open={openConfirm}
                        onClose={handleCloseConfirm}
                        title="Accepted"
                        content={
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: 'column',
                            }}
                          >
                            <p>The travel request has been successfully approved</p>
                            <SuccessIcon sx={{ color: '#00AB55', height: 200, width: 200 }} />
                          </Box>
                        }
                      />
                    </TableCell>

                    <TableCell align="right" width={200} sx={{ typography: 'body1' }}>
                      <Box sx={{ my: 2 }}>
                        <Button
                          onClick={handleRejectRequest}
                          sx={{ background: '#FF5630', color: 'white', width: '100%' }}
                        >
                          Decline Request{' '}
                        </Button>
                      </Box>

                      <ConfirmDialog
                        open={rejectRequest}
                        onClose={handleCloseReject}
                        title="Rejected"
                        content={
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: 'column',
                            }}
                          >
                            <p>The travel request has been rejected</p>
                            <CloseIcon sx={{ color: '#FF5630', height: 200, width: 200 }} />
                          </Box>
                        }
                      />
                    </TableCell>
                  </StyledRowResult>
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
};

export default ViewRequest;
