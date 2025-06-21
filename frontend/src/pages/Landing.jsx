import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  CssBaseline,
  Divider,
} from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

// Custom styles updated to exactly match the image.
const CalendarStyles = `
  .custom-calendar {
    border: none !important;
    font-family: inherit;
    width: 100%; 
  }
  .custom-calendar .react-calendar__navigation {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
    height: 44px; /* Fixed height for stability */
  }
  .custom-calendar .react-calendar__navigation__label {
    font-weight: bold;
    font-size: 1.25rem;
    color: black;
  }
  .custom-calendar .react-calendar__navigation button {
    position: absolute;
    top: 0;
    bottom: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 1.5rem;
    color: #333;
  }
  .custom-calendar .react-calendar__navigation__prev2-button { left: 1rem; }
  .custom-calendar .react-calendar__navigation__prev-button { left: 3.5rem; }
  .custom-calendar .react-calendar__navigation__next-button { right: 3.5rem; }
  .custom-calendar .react-calendar__navigation__next2-button { right: 1rem; }
  
  .custom-calendar .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: bold;
    color: #9e9e9e;
    font-size: 0.9rem;
    text-transform: uppercase;
  }
  .custom-calendar .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }
  .custom-calendar .react-calendar__tile {
    max-width: 100%;
    text-align: center;
    padding: 0.75em 0.5em;
    background: none;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    color: #000;
  }
  .custom-calendar .react-calendar__tile:disabled {
    color: #e0e0e0;
  }
  .custom-calendar .react-calendar__month-view__days__day--neighboringMonth {
    color: #d3d3d3;
  }
  .custom-calendar .active-day {
    background-color: #7f1f1f !important; /* Blue color from new image */
    color: white !important;
    border-radius: 8px;
  }
`;

export default function Landing() {
  // Set date to April 2026 to match the new image
  const [date, setDate] = useState(new Date('2026-04-01'));
  const [announcements, setAnnouncements] = useState([]);
  const today = new Date();

  useEffect(() => {
    axios.get('https://coc-website.onrender.com/api/announcements')
      .then(res => setAnnouncements(res.data))
      .catch(err => {
        console.error(err);
        setAnnouncements([
          { title: 'Hello, Welcome Back', description: 'Ready to kickstart the year? Meet us at the lobby at 10:30 AM.', date: '2025-06-21T23:42:00Z' },
          { title: 'Opening of Classes', description: 'Classes start August 5, 2025.', date: '2025-06-21T23:05:00Z' },
          { title: 'Opening of Classes', description: 'Classes start August 5, 2025.', date: '2025-06-21T23:04:00Z' },
        ]);
      });
  }, []);
  
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      // Check if the date being rendered is the same year, month, and day as today.
      if (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      ) {
        // If it is, apply the 'active-day' class to highlight it.
        return 'active-day';
      }
    }
    return null;
  };

  return (
    <>
      <CssBaseline />
      <style>{CalendarStyles}</style>

      {/* Hero Banner with Header */}
      <Box
        sx={{
          height: '850px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg')`,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container maxWidth="lg">
           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
                <Box component="img" src="https://i.imgur.com/5JOU2jC.png" alt="Logo" sx={{ height: '50px', width: '50px' }} />
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <Typography sx={{ color: 'white', borderBottom: '2px solid red', pb: 0.5, cursor: 'pointer' }}>Home</Typography>
                    <Typography sx={{ color: 'white', cursor: 'pointer' }}>Order</Typography>
                    <Typography sx={{ color: 'white', cursor: 'pointer' }}>Feedback</Typography>
                    <Typography sx={{ color: 'white', cursor: 'pointer' }}>Processing Logs</Typography>
                    <Typography sx={{ color: 'white', cursor: 'pointer' }}>About Us</Typography>
                </Box>
            </Box>
        </Container>
        
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="overline">
                THE VOICE OF THE UNIVERSITY
            </Typography>
            <Typography variant="h3" fontWeight="bold">
                College of Communications
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#e0e0e0' }}>
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
                    textTransform: 'none',
                    borderRadius: '4px',
                    fontSize: '1rem'
                }}
            >
                Apply Here
            </Button>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 6 }}>
        <Container maxWidth="lg">
          {/* Flexbox container to force side-by-side layout */}
          <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
            
            {/* CARD 1: CALENDAR */}
            <Box sx={{ flex: '1 2 42%' }}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: '16px', height: '100%' }}>
                <Calendar
                  onChange={setDate}
                  value={date}
                  className="custom-calendar"
                  view="month"
                  tileClassName={tileClassName}
                  showFixedNumberOfWeeks // **Prevents resizing**
                  // The 'calendarType' prop that was causing the crash has been removed.
                  // The week will start on Sunday by default.
                  next2Label="»"
                  prev2Label="«"
                  nextLabel="›"
                  prevLabel="‹"
                />
              </Paper>
            </Box>

            {/* CARD 2: ANNOUNCEMENTS */}
            <Box sx={{ flex: '1 2 58%' }}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: '16px', height: '100%' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Announcements
                </Typography>
                
                {announcements.map((announcement, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', py: 2 }}>
                        <Box>
                            <Typography variant="body1" fontWeight="bold">
                                {announcement.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">{announcement.description}</Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', ml: 2, pt: 0.5 }}>
                            {new Date(announcement.date).toLocaleString([], { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
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
    </>
  );
}