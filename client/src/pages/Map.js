import React, { useState } from 'react';
import {
  Container,
  Stack,
  Typography,
  Box,
  Icon,
  InputAdornment,
  OutlinedInput,
  Button
} from '@material-ui/core';
import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip } from 'react-leaflet';
import axios from 'axios';
import searchFill from '@iconify/icons-eva/search-fill';
import Page from '../components/Page';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Map() {
  const position = [12.9692, 79.1559];
  const [courseCode, setCourseCode] = useState('');
  const [allCourses, setAllCourses] = useState([]);
  const [courseFound, setCourseFound] = useState('');

  function TooltipCircle({ posi }) {
    return <Circle center={posi} pathOptions={{ fillColor: 'blue' }} radius={40} />;
  }

  const searchCourse = async () => {
    if (courseCode !== '') {
      await axios
        .get(`http://localhost:5000/classes-on-map/${courseCode}`)
        .then((res) => {
          console.log(res);
          if (res?.data?.message !== 'No courses found') {
            setAllCourses(res?.data?.searchResults);
            setCourseFound('');
          } else {
            setAllCourses([]);
            setCourseFound(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAllCourses([]);
    }
  };

  return (
    <Page title="Map | FFCS">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={1}>
          <Typography variant="h4" gutterBottom>
            Map
          </Typography>
          <div>
            <OutlinedInput
              value={courseCode}
              size="small"
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="Search course..."
            />
            <Button variant="contained" sx={{ ml: 3 }} onClick={searchCourse}>
              Search
            </Button>
          </div>
        </Stack>
        <h3 style={{ textAlign: 'center' }}>{courseFound}</h3>

        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom
          style={{ height: '480px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {allCourses.map((course) => {
            console.log(course.location);
            return (
              <Marker position={course.location}>
                <Tooltip>
                  Course Name : {course.courseName} <br />
                  Building Name: {course.building}
                  <br />
                  Number of students registered to this class:{course.numOfStudents}
                </Tooltip>
                <TooltipCircle posi={course.location} />
              </Marker>
            );
          })}
        </MapContainer>
      </Container>
    </Page>
  );
}
