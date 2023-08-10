import PropTypes from 'prop-types';
// @mui
import { Grid, Stack, Card, Typography, Link, CardHeader, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from '../../../components/iconify';

//

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

Profile.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.array,
};

export default function Profile() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <Card sx={{ py: 3 }}>
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
              <Stack width={1} textAlign="center">
                <Typography variant="h4">30</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Total Trip Requested
                </Typography>
              </Stack>

              <Stack width={1} textAlign="center">
                <Typography variant="h4">20</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Total Approved Trips
                </Typography>
              </Stack>

              <Stack width={1} textAlign="center">
                <Typography variant="h4">10</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Total Rejected Trips
                </Typography>
              </Stack>
            </Stack>
          </Card>

          <Card>
            <CardHeader title="Social" />
            <Stack spacing={2} sx={{ p: 3 }}>
              <Stack direction="row">
                <StyledIcon icon="eva:facebook-fill" width={24} />
                <Typography variant="body2">https://www.facebook.com/janedoe</Typography>
              </Stack>
              <Stack direction="row">
                <StyledIcon icon="ant-design:instagram-filled" width={24} />
                <Typography variant="body2">https://www.instagram.com/janedoe</Typography>
              </Stack>
              <Stack direction="row">
                <StyledIcon icon="eva:linkedin-fill" width={24} />
                <Typography variant="body2">https://www.linkedin.com/in/janedoe</Typography>
              </Stack>
              <Stack direction="row">
                <StyledIcon icon="eva:twitter-fill" width={24} />
                <Typography variant="body2">https://www.twitter.com/janedoe</Typography>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card sx={{ pb: 6.5 }}>
          <CardHeader title="About" />

          <Stack spacing={2} sx={{ p: 3 }}>
            <Typography variant="body2">The journey of a thousand miles begins with a single step.</Typography>

            <Stack direction="row">
              <StyledIcon icon="eva:pin-fill" />

              <Typography variant="body2">
                Live at &nbsp;
                <Link component="span" variant="subtitle2" color="text.primary">
                  Nigeria
                </Link>
              </Typography>
            </Stack>

            <Stack direction="row">
              <StyledIcon icon="eva:email-fill" />
              <Typography variant="body2">janedoe@demo</Typography>
            </Stack>

            <Stack direction="row">
              <StyledIcon icon="eva:phone-fill" />
              <Typography variant="body2">09056178435</Typography>
            </Stack>

            <Stack direction="row">
              <StyledIcon icon="ic:round-business-center" />

              <Typography variant="body2">
                {/* {role} at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {company}
            </Link> */}
                Accountant in &nbsp;
                <Link component="span" variant="subtitle2" color="text.primary">
                  Finance Department
                </Link>
              </Typography>
            </Stack>

            <Stack direction="row">
              <StyledIcon icon="ic:round-business-center" />

              <Typography variant="body2">
                Studied at &nbsp;
                <Link component="span" variant="subtitle2" color="text.primary">
                  {/* {school} */} Abuja University, Gwagwalada
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
