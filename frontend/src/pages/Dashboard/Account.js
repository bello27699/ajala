// import { Helmet } from 'react-helmet-async';
// import { useState } from 'react';
// // @mui
// import { Tab, Card, Tabs, Container, Box } from '@mui/material';
// // routes
// import { PATH_DASHBOARD } from '../../routes/paths';
// // auth
// import { useAuthContext } from '../../auth/useAuthContext';
// // _mock_
// import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from '../../_mock/arrays';
// // components
// import Iconify from '../../components/iconify';
// import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// import { useSettingsContext } from '../../components/settings';
// // sections
// // import {
// //   Profile,
// //   ProfileCover,
// //   ProfileFriends,
// //   ProfileGallery,
// //   ProfileFollowers,
// // } from '../../sections/@dashboard/user/profile';

// import Profile from '../../sections/@dashboard/user/Profile';
// import ProfileCover from '../../sections/@dashboard/user/ProfileCover';
// import ProfileEdit from '../../sections/@dashboard/user/ProfileEdit';
// import ProfileNotification from '../../sections/@dashboard/user/ProfileNotification';
// import ProfileTravelHistory from '../../sections/@dashboard/user/ProfileTravelHistory';

// // ----------------------------------------------------------------------

// export default function UserProfilePage() {
//   const { themeStretch } = useSettingsContext();

//   const { user } = useAuthContext();

//   const [searchFriends, setSearchFriends] = useState('');

//   const [currentTab, setCurrentTab] = useState('profile');

//   const TABS = [
//     {
//       value: 'profile',
//       label: 'Profile',
//       icon: <Iconify icon="ic:round-account-box" />,
//       component: <Profile />,
//     },
//     {
//       value: 'travel_history',
//       label: 'Travel History',
//       icon: <Iconify icon="eva:heart-fill" />,
//       component: <ProfileTravelHistory />,
//     },
//     {
//       value: 'notifications',
//       label: 'Notifications',
//       icon: <Iconify icon="eva:bell-fill" />,
//       component: <ProfileNotification />,
//     },
//     {
//       value: 'edit',
//       label: 'Edit Profile',
//       icon: <Iconify icon="eva:edit-fill" />,
//       component: <ProfileEdit />,
//     },
//   ];

//   return (
//     <>
//       <Helmet>
//         <title> User: Profile | Ajala</title>
//       </Helmet>

//       <Container maxWidth={themeStretch ? false : 'lg'}>
//         <CustomBreadcrumbs
//           heading="Profile"
//           links={[
//             { name: 'Dashboard', href: PATH_DASHBOARD.root },
//             { name: 'User', href: PATH_DASHBOARD.user },
//             { name: user?.displayName },
//           ]}
//         />
//         <Card
//           sx={{
//             mb: 3,
//             height: 280,
//             position: 'relative',
//           }}
//         >
//           <ProfileCover name={user?.displayName} role={_userAbout.role} cover={_userAbout.cover} />

//           <Tabs
//             value={currentTab}
//             onChange={(event, newValue) => setCurrentTab(newValue)}
//             sx={{
//               width: 1,
//               bottom: 0,
//               zIndex: 9,
//               position: 'absolute',
//               bgcolor: 'background.paper',
//               '& .MuiTabs-flexContainer': {
//                 pr: { md: 3 },
//                 justifyContent: {
//                   sm: 'center',
//                   md: 'flex-end',
//                 },
//               },
//             }}
//           >
//             {TABS.map((tab) => (
//               <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
//             ))}
//           </Tabs>
//         </Card>

//         {TABS.map((tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>)}
//       </Container>
//     </>
//   );
// }

import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Stack, Button, Typography, IconButton, InputAdornment } from '@mui/material';
// hooks
import useCountdown from '../../hooks/useCountdown';
// _mock
import { _socials } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import { CustomTextField } from '../../components/custom-input';
// assets
import { ComingSoonIllustration } from '../../assets/illustrations';

// ----------------------------------------------------------------------

export default function Account() {
  const { days, hours, minutes, seconds } = useCountdown(new Date('02/11/2023 21:30'));

  return (
    <>
      <Helmet>
        <title> Account/Profile | Minimal UI</title>
      </Helmet>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant="h3" paragraph>
          Coming Soon!
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>We are currently working hard on this page!</Typography>
      </Box>

      <ComingSoonIllustration sx={{ my: 10, height: 240 }} />

      <Stack
        direction="row"
        justifyContent="center"
        divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
        sx={{ typography: 'h2' }}
      >
        <TimeBlock label="Days" value={days} />

        <TimeBlock label="Hours" value={hours} />

        <TimeBlock label="Minutes" value={minutes} />

        <TimeBlock label="Seconds" value={seconds} />
      </Stack>

      <Box sx={{ mx: 50 }}>
        <CustomTextField
          fullWidth
          placeholder="Enter your email"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" size="large">
                  Notify Me
                </Button>
              </InputAdornment>
            ),
            sx: { pr: 0.5 },
          }}
          sx={{ my: 5 }}
        />
      </Box>

      <Stack spacing={1} alignItems="center" justifyContent="center" direction="row">
        {_socials.map((social) => (
          <IconButton
            key={social.name}
            sx={{
              color: social.color,
              '&:hover': {
                bgcolor: alpha(social.color, 0.08),
              },
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack>
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
