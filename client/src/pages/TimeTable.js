import { useState, useEffect } from 'react';
// material
import {
  Container,
  Card,
  Typography,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Button
} from '@material-ui/core';
// components

import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Scrollbar from '../components/Scrollbar';
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [allCourses, setAllCourses] = useState([]);
  const studentId = sessionStorage.getItem('studentId');
  const [open, setOpen] = useState(false);

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
    axios
      .get(`http://localhost:5000/class/${studentId}`)
      .then((res) => {
        setAllCourses(res.data.selectedCourses);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteCourse = (id) => {
    axios
      .delete(`http://localhost:5000/class/${studentId}/${id}`)
      .then((res) => {
        setAllCourses(res.data);
        handleClick();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Page title="TimeTable | FFCS">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          TimeTable
        </Typography>

        <Card sx={{ p: 3 }}>
          {allCourses?.length > 0 ? (
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
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => deleteCourse(course._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          ) : (
            'No Courses Added'
          )}
        </Card>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Course Deleted"
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
