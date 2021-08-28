import { styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

// ----------------------------------------------------------------------

export default function VisitCourse() {
  return (
    <RootStyle>
      <Typography
        variant="h3"
        component={Link}
        to="/dashboard/courses"
        sx={{ textDecoration: 'none' }}
      >
        Visit Course Page
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Add Courses
      </Typography>
    </RootStyle>
  );
}
