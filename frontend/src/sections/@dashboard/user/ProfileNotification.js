import { useState } from 'react';
import { Card, Typography, MenuItem, Divider } from '@mui/material';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';

export default function Profile() {
  const [openPopover, setOpenPopover] = useState(null);

  const Notification = [
    { text: 'Your trip to lagos was approved', date: '22 Dec 2022' },
    { text: 'Your profile edit has been updated', date: '10 Jun 2022' },
    { text: 'Your trip to Enugu was declined', date: '18 Apr 2021' },
  ];

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      {Notification.map(({ text, date }) => {
        return (
          <>
            <Card sx={{ my: 3, p: 2 }}>
              <Typography variant="subtitle2">{text}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '12px' }}>
                {date}
              </Typography>

              <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top" sx={{ width: 160 }}>
                <MenuItem>
                  <Iconify icon="eva:link-2-fill" />
                  Copy Link
                </MenuItem>

                <MenuItem>
                  <Iconify icon="eva:share-fill" />
                  Share
                </MenuItem>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem sx={{ color: 'error.main' }}>
                  <Iconify icon="eva:trash-2-outline" />
                  Delete
                </MenuItem>
              </MenuPopover>
            </Card>
          </>
        );
      })}
    </>
  );
}
