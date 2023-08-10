import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router';
// import { format } from 'date-fns';
// import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  // Stack,
  Table,
  // Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  CardHeader,
  Typography,
  // IconButton,
  TableContainer,
} from '@mui/material';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import MenuPopover from '../../components/menu-popover';
import { TableHeadCustom } from '../../components/table';

// ----------------------------------------------------------------------

ApprovalTable.propTypes = {
  title: PropTypes.string,
  tableData: PropTypes.array,
  subheader: PropTypes.string,
  tableLabels: PropTypes.array,
};

export default function ApprovalTable({ title, subheader, tableLabels, tableData, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 960 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <ApprovalTableRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}>
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

ApprovalTableRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string,
    staff_id: PropTypes.string,
    title: PropTypes.string,
    travel_type: PropTypes.string,
    location: PropTypes.string,
    travel_date: PropTypes.string,
    return_date: PropTypes.string,
    approver_name: PropTypes.string,
  }),
};

function ApprovalTableRow({ row }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleDownload = () => {
    handleClosePopover();
    console.log('DOWNLOAD', row.id);
  };

  const handlePrint = () => {
    handleClosePopover();
    console.log('PRINT', row.id);
  };

  const handleShare = () => {
    handleClosePopover();
    console.log('SHARE', row.id);
  };

  const handleDelete = () => {
    handleClosePopover();
    console.log('DELETE', row.id);
  };

  return (
    <>
      <TableRow
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          navigate('/dashboard/admin_view_request');
        }}
      >
        <TableCell>
          <Typography variant="subtitle2">{row.id}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{row.staff_id}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{row.title}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{row.travel_type}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{row.location}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{row.travel_date}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{row.return_date}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{row.approver_name}</Typography>
        </TableCell>

        <TableCell>
          <Label
            sx={{ background: '#f2f2f2' }}
            variant={isLight ? 'soft' : 'filled'}
            color={(row.status === 'paid' && 'success') || (row.status === 'pending' && 'warning') || 'error'}
          >
            {/* {sentenceCase(row.status)}  */} {row.status}
          </Label>
        </TableCell>

        {/* <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top" sx={{ width: 160 }}>
        <MenuItem onClick={handleDownload}>
          <Iconify icon="eva:download-fill" />
          Download
        </MenuItem>

        <MenuItem onClick={handlePrint}>
          <Iconify icon="eva:printer-fill" />
          Print
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon="eva:share-fill" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}
