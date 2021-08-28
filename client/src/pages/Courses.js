import React, { useState } from 'react';

import { Icon } from '@iconify/react';
import { styled } from '@material-ui/core/styles';
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Divider,
  TableHead,
  InputAdornment,
  Box,
  OutlinedInput
} from '@material-ui/core';

// components
import searchFill from '@iconify/icons-eva/search-fill';
import Page from '../components/Page';

import Scrollbar from '../components/Scrollbar';
// ----------------------------------------------------------------------

export default function Courses() {
  const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  }));

  const [courseCode, setCourseCode] = useState('');

  const searchCourse = (e) => {
    setCourseCode(e.target.value);
  };

  console.log(courseCode);

  return (
    <Page title="Courses | FFCS">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            All Courses
          </Typography>
        </Stack>

        <Card sx={{ p: 3 }}>
          <SearchStyle
            value={courseCode}
            onChange={searchCourse}
            placeholder="Search user..."
            startAdornment={
              <InputAdornment position="start">
                <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
          />
          <Divider sx={{ my: 3 }} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Course Code</TableCell>
                    <TableCell align="right">Faculty</TableCell>
                    <TableCell align="right">Building</TableCell>
                    <TableCell align="right">Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {rows?.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Card>
      </Container>
    </Page>
  );
}
