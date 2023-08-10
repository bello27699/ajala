import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, Typography } from '@mui/material';
import AjLogo from '../../assets/images/cbn_logo.png';
// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false }, ref) => {
  const logo = (
    <Box ref={ref} component="div" sx={{ p: 2 }}>
      <img src={AjLogo} alt="logo" style={{ height: '5rem', width: '5rem' }} />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
};

export default Logo;
