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
import { API_SERVICE } from '../config/API';
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
      .get(`${API_SERVICE}/classes/`)
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
        .get(`${API_SERVICE}/classes/${courseCode}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.searchResults !== undefined) {
            setAllCourses(res.data.searchResults);
            setCourseFound(true);
          } else {
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
      .post(`${API_SERVICE}/class/${studentId}`, course)
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
  const studentId = sessionStorage.getItem('studentId');
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
              Reset
            </Button>
          )}
          <span>
            <p style={{ color: 'red', fontSize: '12px' }}>
              {!courseFound && 'No such course found'}
            </p>
          </span>
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
                      <TableCell align="center">Seats Left</TableCell>
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
                        <TableCell align="center">{65 - course.numOfStudents.length}</TableCell>
                        <TableCell align="center">
                          {course.numOfStudents.includes(studentId) ||
                          65 - course.numOfStudents.length === 0 ? (
                            <Button variant="contained" disabled>
                              Added
                            </Button>
                          ) : (
                            <Button variant="outlined" onClick={() => addCourse(course)}>
                              Add
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          )}

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
