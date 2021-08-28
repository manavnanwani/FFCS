// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import { ViewTimetable, ViewMap, VisitCourse } from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | FFCS">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">FFCS, 2021</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <VisitCourse />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ViewTimetable />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ViewMap />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
