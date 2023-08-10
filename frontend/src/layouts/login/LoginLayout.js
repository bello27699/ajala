import PropTypes from 'prop-types';
// @mui
import { Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/logo';
import Image from '../../components/image';
// import FlightImg from '../../assets/images/flight.svg';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';

// ----------------------------------------------------------------------

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default function LoginLayout({ children, illustration, title }) {
  return (
    <StyledRoot sx={{ backgroundColor: '#F8F9FD' }}>
      <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      />

      <StyledSection>
        <Typography variant="h3" sx={{ mb: 5, maxWidth: 480, textAlign: 'center' }}>
          {title || 'Hi, Welcome back'}
        </Typography>

        {/* <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          // src={illustration || '/assets/illustrations/illustration_dashboard.png'}
          src={illustration || '/assets/images/flight.svg'}
          sx={{ maxWidth: 600 }}
        /> */}

        {/* <img src={Flighter} alt="img" /> */}

        {/* <img src={FlightImg} alt="img" /> */}

        <StyledSectionBg />
      </StyledSection>

      <StyledContent sx={{ backgroundColor: 'white' }}>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
