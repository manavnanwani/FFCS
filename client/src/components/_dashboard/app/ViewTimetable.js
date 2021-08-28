import { Link } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

// ----------------------------------------------------------------------

export default function ViewTimetable() {
  return (
    <RootStyle>
      <Typography
        variant="h3"
        component={Link}
        to="/dashboard/timetable"
        sx={{ textDecoration: 'none', color: '#04297A' }}
      >
        View Timetable
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Check your timetable
      </Typography>
    </RootStyle>
  );
}
