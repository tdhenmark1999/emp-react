import { useEffect } from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { getDashboard } from 'store/reducers/dashboard';

import {
  Stack,
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
} from '@mui/material';

//constant options
import {
  inprogress_options,
  counter_options,
  open_options,
  my_tasks_options,
} from 'pages/Dashboard/constant';

// MUI Icons
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CheckIcon from '@mui/icons-material/Check';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SkeletonLoader from 'components/Project/Header/skeleton';
import Fade from 'components/Common/Fade';
// local components
import Header from 'pages/Dashboard/views/Header';
import Counter from 'pages/Dashboard/Widgets/Counter';
import List from 'pages/Dashboard/Widgets/List';
import { appColors } from 'theme/variables';

export default function DevDash() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { data, fetching } = useSelector((state) => state.dashboard);
  const { data: user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getDashboard());
  }, []);

  const handleTaskClick = (id, level, type) => {
    history.push({
      pathname: `${history.location.pathname}/${
        type.toLowerCase().includes('task') ? 'task' : 'campaign'
      }/${id}`,
      state: {
        background: location,
        subtask: type.toLowerCase().includes('task') ? `${level > 1}` : null,
      },
    });
  };

  return (
    <Stack sx={{ backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      {/* Header */}
      <Header user={user} />

      <Box px={4} py={3}>
        {/* Navigation */}
        <Stack
          direction="row"
          justifyContent="space-between"
          mb={5}
          alignItems="center"
        >
          <Box>
            <Typography fontWeight={700} variant="h4">
              Dashboard
            </Typography>
          </Box>
          <Box>
            <Button
              variant="outlined"
              startIcon={<AssessmentOutlinedIcon />}
              color="secondary"
              disableElevation
              component={Link}
              to="/eod-report"
              sx={{
                '&:hover': {
                  backgroundColor: appColors.dashboard.secondary,
                  color: '#fff',
                },
              }}
            >
              EOD Report
            </Button>
          </Box>
        </Stack>
        {data == null ? (
          <SkeletonLoader />
        ) : (
          <Fade in={data != null}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <Counter
                  color="error"
                  count={data?.task_with_revision}
                  options={counter_options}
                  name="Task with Revision"
                  icon={<HistoryEduIcon sx={{ color: '#fff' }} />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <Counter
                  color="warning"
                  count={data?.task_approved}
                  options={counter_options}
                  name="Task Approved"
                  icon={<CheckIcon sx={{ color: '#fff' }} />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <Counter
                  color="success"
                  count={data?.task_completed}
                  options={counter_options}
                  name="Task Completed"
                  icon={<EmojiEventsIcon sx={{ color: '#fff' }} />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <Counter
                  color="default"
                  count={data?.open_tickets?.data.length}
                  options={counter_options}
                  name="Open Tickets"
                  nameInput="Open Tickets"
                  icon={<LocalActivityIcon sx={{ color: '#fff' }} />}
                />
              </Grid>
              {/* List */}
              <Grid item xs={12} md={4}>
                <List
                  type="button"
                  options={inprogress_options}
                  optionsColor={['error', 'warning', 'success', 'default']}
                  name="In Progress"
                  nameInput="In Progress"
                  nameColor="warning"
                  onClick={handleTaskClick}
                  data={data?.in_progress?.data}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <List
                  type="button"
                  options={open_options}
                  optionsColor={['error', 'warning', 'success']}
                  name="Open Tickets"
                  nameInput="Open Tickets"
                  nameColor="error"
                  onClick={handleTaskClick}
                  data={data?.open_tickets?.data}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <List
                  type="button"
                  options={my_tasks_options}
                  name="My Tasks"
                  nameInput="My Tasks"
                  nameColor="success"
                  onClick={handleTaskClick}
                  data={data?.open_tickets?.data}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <List
                  type="selection"
                  options={['H5', 'Video', 'Design', 'QA']}
                  optionsColor={[]}
                  name="All Tasks"
                  nameInput="All Tasks"
                  nameColor="default"
                  subheader={`${data?.all_tasks?.data.length} Item`}
                  data={data?.all_tasks?.data}
                  allData={data}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <List
                  type="selection"
                  options={['H5', 'Video', 'Design', 'QA']}
                  color={[]}
                  name={`Resources`}
                  nameInput="Resources"
                  nameColor="secondary"
                  subheader={`${
                    data?.resources?.data?.filter((item) => item.active == '1')
                      .length
                  } Active`}
                  data={data?.resources?.data}
                />
              </Grid>
            </Grid>
          </Fade>
        )}
      </Box>
    </Stack>
  );
}
