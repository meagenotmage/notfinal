import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  CssBaseline,
  Divider,
  Modal,
  Tooltip,
} from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

// Sample events for hover tooltips
const sampleEvents = {
  '2026-04-10': {
    title: 'Journalism Fair',
    description: 'Visit booths and join workshops at the Main Hall.',
  },
  '2026-04-22': {
    title: 'Org Registration Deadline',
    description: 'Last day to submit forms for org registration.',
  },
};

// Calendar styles
const CalendarStyles = `
  .custom-calendar {
    border: none !important;
    font-family: inherit;
    width: 100%; 
  }
  .custom-calendar .react-calendar__navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  .custom-calendar .react-calendar__navigation button {
    background: transparent;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
    color: #333;
  }
  .custom-calendar .react-calendar__tile {
    padding: 0.75em;
    border-radius: 8px;
  }
  .custom-calendar .active-day {
    background-color: #7f1f1f !important;
    color: white !important;
  }
`;

export default function Landing() {
  const [date, setDate] = useState(new Date('2026-04-01'));
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const today = new Date();

  useEffect(() => {
    axios
      .get('https://coc-website.onrender.com')
      .then((res) => setAnnouncements(res.data.announcements || []))
      .catch(() => {
        setAnnouncements([
          {
            title: 'Hello, Welcome Back',
            description:
              'Ready to kickstart the year? Meet us at the lobby at 10:30 AM.',
            date: '2025-06-21T23:42:00Z',
          },
          {
            title: 'Opening of Classes',
            description: 'Classes start August 5, 2025.',
            date: '2025-06-21T23:05:00Z',
          },
        ]);
      });
  }, []);

  const tileContent = ({ date }) => {
    const key = date.toISOString().split('T')[0];
    const event = sampleEvents[key];
    return event ? (
      <Tooltip title={event.title} placement="top" arrow>
        <div
          className="event-dot"
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#7f1f1f',
            margin: '4px auto 0',
          }}
        />
      </Tooltip>
    ) : null;
  };

  const tileClassName = ({ date, view }) => {
    if (
      view === 'month' &&
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    ) {
      return 'active-day';
    }
    return null;
  };

  return (
    <>
      <CssBaseline />
      <style>{CalendarStyles}</style>

      {/* Hero Section */}
      <Box
        sx={{
          height: '850px',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              py: 2,
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src="https://i.imgur.com/5JOU2jC.png"
              alt="Logo"
              sx={{ height: 50 }}
            />
            <Box sx={{ display: 'flex', gap: 4 }}>
              {['Home', 'Order', 'Feedback', 'Processing Logs', 'About Us'].map(
                (item, i) => (
                  <Typography key={i} sx={{ cursor: 'pointer', color: 'white' }}>
                    {item}
                  </Typography>
                )
              )}
            </Box>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              mt: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="overline">THE VOICE OF THE UNIVERSITY</Typography>
            <Typography variant="h3" fontWeight="bold">
              College of Communications
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#e0e0e0' }}>
              Ano ang description ka college
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                px: 4,
                py: 1,
                backgroundColor: '#9a2424',
                '&:hover': { backgroundColor: '#7f1f1f' },
              }}
            >
              Apply Here
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
            {/* Calendar */}
            <Box sx={{ flex: '1 1 42%' }}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: '16px' }}>
                <Calendar
                  onChange={setDate}
                  value={date}
                  className="custom-calendar"
                  tileClassName={tileClassName}
                  tileContent={tileContent}
                  showFixedNumberOfWeeks
                  next2Label="»"
                  prev2Label="«"
                  nextLabel="›"
                  prevLabel="‹"
                />
              </Paper>
            </Box>

            {/* Announcements */}
            <Box sx={{ flex: '1 1 58%' }}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: '16px' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Announcements
                </Typography>

                {announcements.map((announcement, index) => (
                  <Box key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        py: 2,
                        cursor: 'pointer',
                      }}
                      onClick={() => setSelectedAnnouncement(announcement)}
                    >
                      <Box>
                        <Typography variant="body1" fontWeight="bold">
                          {announcement.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {announcement.description}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{ whiteSpace: 'nowrap', ml: 2 }}
                      >
                        {new Date(announcement.date).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </Typography>
                    </Box>
                    {index < announcements.length - 1 && <Divider />}
                  </Box>
                ))}
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Announcement Modal */}
      <Modal
        open={!!selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper sx={{ p: 4, maxWidth: 500, outline: 'none' }}>
          {selectedAnnouncement && (
            <>
              <Typography variant="h6" fontWeight="bold">
                {selectedAnnouncement.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(selectedAnnouncement.date).toLocaleString()}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                {selectedAnnouncement.description}
              </Typography>
            </>
          )}
        </Paper>
      </Modal>
    </>
  );
}
