// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Stack, Tooltip, IconButton } from '@mui/material';
import Iconify from '../../../components/iconify';

export default function Tool() {
  //   const navigate = useNavigate();

  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        sx={{ mb: 2 }}
      >
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton>
              <Iconify icon="eva:edit-fill" />
            </IconButton>
          </Tooltip>

          <Tooltip title="View">
            <IconButton>
              <Iconify icon="eva:eye-fill" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Download">
            <IconButton>
              <Iconify icon="eva:download-fill" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Print">
            <IconButton>
              <Iconify icon="eva:printer-fill" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Send">
            <IconButton>
              <Iconify icon="ic:round-send" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Share">
            <IconButton>
              <Iconify icon="eva:share-fill" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </>
  );
}
