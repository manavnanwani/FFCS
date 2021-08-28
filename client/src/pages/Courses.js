import React, { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
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
  OutlinedInput,
  Button
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// components
import axios from 'axios';
import searchFill from '@iconify/icons-eva/search-fill';
import Page from '../components/Page';

import Scrollbar from '../components/Scrollbar';
// ----------------------------------------------------------------------

export default function Courses() {
  const [courseCode, setCourseCode] = useState('');
  const [allCourses, setAllCourses] = useState([]);
  const [courseFound, setCourseFound] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async (e) => {
    setCourseCode('');
    await axios
      .get(`http://localhost:5000/classes/`)
      .then((res) => {
        setAllCourses(res.data.searchResults);
        setCourseFound(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchCourse = async (e) => {
    if (courseCode !== '') {
      await axios
        .get(`http://localhost:5000/classes/${courseCode}`)
        .then((res) => {
          if (res !== undefined) {
            setAllCourses(res.data.searchResults);
            setCourseFound(true);
          } else {
            setAllCourses([]);
            setCourseFound(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAllCourses([]);
    }
  };

  const addCourse = async (course) => {
    const studentId = sessionStorage.getItem('studentId');
    axios
      .post(`http://localhost:5000/class/${studentId}`, course)
      .then((res) => {
        if (res.status === 200) {
          setMessage('Course Added');
          handleClick();
        } else if (res.status === 201) {
          setMessage(res.data.message);
          handleClick();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Page title="Courses | FFCS">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            All Courses
          </Typography>
        </Stack>

        <Card sx={{ p: 3 }}>
          <OutlinedInput
            value={courseCode}
            size="small"
            onChange={(e) => setCourseCode(e.target.value)}
            placeholder="Search course..."
            startAdornment={
              <InputAdornment position="start">
                <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
          />
          <Button variant="contained" sx={{ ml: 3 }} onClick={searchCourse}>
            Search
          </Button>
          {courseCode.length > 0 && (
            <Button variant="outlined" sx={{ ml: 3 }} onClick={getAllCourses}>
              Clear
            </Button>
          )}
          <Divider sx={{ my: 3 }} />
          {allCourses?.length > 0 && (
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Course Code</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="center">Faculty</TableCell>
                      <TableCell align="center">Building</TableCell>
                      <TableCell align="center">Time</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allCourses?.map((course) => (
                      <TableRow key={course._id}>
                        <TableCell>{course.courseCode}</TableCell>
                        <TableCell component="th" scope="row">
                          {course.courseName}
                        </TableCell>
                        <TableCell align="center">{course.faculty}</TableCell>
                        <TableCell align="center">{course.building}</TableCell>
                        <TableCell align="center">{course.time}</TableCell>
                        <TableCell align="center">
                          <Button variant="outlined" onClick={() => addCourse(course)}>
                            Add
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          )}
          {!courseFound && 'No such course found'}
          {allCourses?.length === 0 && courseCode.length >= 0 && 'Search with course code'}
        </Card>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        message={message}
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </Page>
  );
}
