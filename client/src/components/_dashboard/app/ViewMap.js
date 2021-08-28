import { styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
}));

export default function ViewMap() {
  return (
    <RootStyle>
      <Typography
        variant="h3"
        component={Link}
        to="/dashboard/map"
        sx={{ textDecoration: 'none', color: '#7A4F01' }}
      >
        View Map
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Locate Classes
      </Typography>
    </RootStyle>
  );
}
