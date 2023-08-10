import { Avatar, Card, Stack, Grid, Box, TextField, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';

export default function Profile() {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Card>
            <Box sx={{ py: 15, px: 15 }}>
              <Avatar
                sx={{
                  mx: 'auto',
                  borderWidth: 2,
                  borderStyle: 'solid',
                  borderColor: 'common.white',
                  width: { xs: 80, md: 180 },
                  height: { xs: 80, md: 180 },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Iconify icon={'eva:camera-fill'} sx={{ width: 40, height: 40, textAlign: 'center' }} />
                  <FormHelperText sx={{ textAlign: 'center' }}>Upload Image</FormHelperText>
                </Box>
              </Avatar>

              <FormHelperText sx={{ px: 2, py: 5, textAlign: 'center' }}>
                Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
              </FormHelperText>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3 }}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <TextField
                  className="remove-bottom-border"
                  variant="outlined"
                  sx={{ width: '95%', mb: 4 }}
                  label="Full Name"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className="remove-bottom-border"
                  variant="outlined"
                  sx={{ width: '95%', mb: 4 }}
                  label="Email Address"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  className="remove-bottom-border"
                  variant="outlined"
                  sx={{ width: '95%', mb: 4 }}
                  label="Phone Number"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  className="remove-bottom-border"
                  variant="outlined"
                  sx={{ width: '95%', mb: 4 }}
                  label="Country"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  className="remove-bottom-border"
                  variant="outlined"
                  sx={{ width: '95%', mb: 4 }}
                  label="State/Region"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  className="remove-bottom-border"
                  variant="outlined"
                  sx={{ width: '95%', mb: 4 }}
                  label="City"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  className="remove-bottom-border"
                  variant="outlined"
                  sx={{ width: '95%', mb: 4 }}
                  label="Address"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  className="remove-bottom-border"
                  variant="outlined"
                  sx={{ width: '95%', mb: 4 }}
                  label="Zip/Code"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className="remove-bottom-border"
                  variant="outlined"
                  sx={{ width: '95%', mb: 4 }}
                  label="Department"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  className="remove-bottom-border"
                  variant="outlined"
                  sx={{ width: '95%', mb: 4 }}
                  label="Role"
                />
              </Grid>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained">
                  Save Changes
                </LoadingButton>
              </Stack>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
