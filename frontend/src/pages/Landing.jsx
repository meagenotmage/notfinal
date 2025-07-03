import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  CssBaseline,
  Divider,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Link,
  Popover,
} from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { Twitter, Facebook, Instagram } from '@mui/icons-material';

// --- STYLES ---

const ComponentStyles = `
  /* Calendar Styles */
  .custom-calendar {
    border: none !important;
    font-family: 'Inter', 'Helvetica', 'Arial', sans-serif;
    width: 100%;
  }
  .custom-calendar .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 0 0.5rem;
  }
  .custom-calendar .react-calendar__navigation__label {
    font-weight: bold;
    font-size: 1.1rem;
    color: black;
    flex-grow: 0 !important;
  }
  .custom-calendar .react-calendar__navigation button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 1.25rem;
    color: #333;
    min-width: 40px;
  }
  .custom-calendar .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: bold;
    color: #000;
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }
  .custom-calendar .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    font-weight: 500;
  }
  .custom-calendar .react-calendar__tile {
    position: relative;
    max-width: 100%;
    text-align: center;
    padding: 0.6em 0.4em;
    background: none;
    border: none;
    font-weight: 500;
    color: #000;
    height: 45px;
    border-radius: 4px;
  }
  .custom-calendar .react-calendar__tile:disabled {
    background: #f0f0f0 !important;
    color: #ababab;
  }
  .custom-calendar .react-calendar__month-view__days__day--neighboringMonth {
     color: #ababab;
  }
  .event-day {
    background-color: #9a2424 !important;
    color: white !important;
    border-radius: 4px;
  }
  .today-day {
    background-color: #c96d6d !important;
    color: white !important;
    border-radius: 4px;
  }
  
  /* Invisible Scrollbar Styles */
  .announcements-scroll-container {
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }
  .announcements-scroll-container::-webkit-scrollbar {
    width: 8px;
  }
  .announcements-scroll-container::-webkit-scrollbar-track {
    background: transparent;
  }
  .announcements-scroll-container::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 10px;
    transition: background-color 0.3s;
  }
  .announcements-scroll-container:hover::-webkit-scrollbar-thumb {
    background-color: #d6d6d6;
  }
`;

// --- MOCK DATA (for non-announcement sections) ---

const organizations = [
    { name: 'BROADCAST GUILD', logo: 'https://i.imgur.com/g5z2AnH.png', details: ['Beberapa', 'Foto', 'Ketika', 'Wisida', 'Tahfidz', 'Murid', '-', 'Murid', 'SMP', 'Negeri', '1', 'Cibadak'] },
    { name: 'THE MEDIATOR', logo: 'https://i.imgur.com/uFw2L14.png', details: ['Beberapa', 'Foto', 'Ketika', 'Wisida', 'Tahfidz', 'Murid', '-', 'Murid', 'SMP', 'Negeri', '1', 'Cibadak'] },
    { name: 'YOUNG JOURNALIST\'S SOCIETY', logo: 'https://i.imgur.com/fRb2p8x.png', details: ['Beberapa', 'Foto', 'Ketika', 'Wisida', 'Tahfidz', 'Murid', '-', 'Murid', 'SMP', 'Negeri', '1', 'Cibadak'] },
    { name: 'STUDIOCITAS', logo: 'https://i.imgur.com/4zYgL3g.png', details: ['Beberapa', 'Foto', 'Ketika', 'Wisida', 'Tahfidz', 'Murid', '-', 'Murid', 'SMP', 'Negeri', '1', 'Cibadak'] },
    { name: 'DEVELOPMENT COMMUNICATOR\'S SOCIETY', logo: 'https://i.imgur.com/dJq2k7D.png', details: ['Beberapa', 'Foto', 'Ketika', 'Wisida', 'Tahfidz', 'Murid', '-', 'Murid', 'SMP', 'Negeri', '1', 'Cibadak'] },
    { name: 'SINEMASKOM', logo: 'https://i.imgur.com/0D3yRzt.png', details: ['Beberapa', 'Foto', 'Ketika', 'Wisida', 'Tahfidz', 'Murid', '-', 'Murid', 'SMP', 'Negeri', '1', 'Cibadak'] },
];

const calendarEvents = { 18: true, 27: true };

export default function Landing() {
  const [date, setDate] = useState(new Date('2025-06-01'));
  const [announcements, setAnnouncements] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [popoverDate, setPopoverDate] = useState(null);

  useEffect(() => {
    axios.get('https://coc-website.onrender.com/api/announcements')
      .then(res => setAnnouncements(res.data))
      .catch(err => {
        console.error("Failed to fetch announcements:", err);
        setAnnouncements([
          { _id: 'fallback1', title: 'Opening of Classes', description: 'Opening of classes will be on august', date: '2025-07-27T10:23:00Z' },
          { _id: 'fallback2', title: 'Claiming of Orders', description: 'Orders can be claim in the COCSC Officer during vacant hours', date: '2025-01-17T10:23:00Z' },
        ]);
      });
  }, []);

  const handleOpenModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAnnouncement(null);
  };

  const handlePopoverOpen = (event, date) => {
    setPopoverAnchor(event.currentTarget);
    setPopoverDate(date);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
    setPopoverDate(null);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && date.getMonth() === 5) {
      if (date.getDate() === 18) return 'event-day';
      if (date.getDate() === 27) return 'today-day';
    }
    return null;
  };
  
  const tileRenderer = ({ date, view }) => {
    const day = date.getDate();
    if (view === 'month' && date.getMonth() === 5 && calendarEvents[day]) {
      const monthName = "August"; 
      return (
        <Box
          onMouseEnter={(e) => handlePopoverOpen(e, `${monthName} ${day}`)}
          onMouseLeave={handlePopoverClose}
          sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      );
    }
    return null;
  };

  return (
    <>
      <CssBaseline />
      <style>{ComponentStyles}</style>

      {/* --- HERO BANNER --- */}
      <Box
        sx={{
          height: '100vh',
          width: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
          display: 'flex',
          flexDirection: 'column',
          color: 'white',
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2, width: '100%' }}>
                <Box component="img" src="https://i.imgur.com/2290M45.png" alt="Logo" sx={{ height: '55px', width: '55px' }} />
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', typography: 'body1' }}>
                    <Typography sx={{ color: 'white', borderBottom: '2px solid #9a2424', cursor: 'pointer', fontWeight: 'bold' }}>Home</Typography>
                    <Typography sx={{ color: 'white', cursor: 'pointer', '&:hover': { color: '#ddd' } }}>Order</Typography>
                    <Typography sx={{ color: 'white', cursor: 'pointer', '&:hover': { color: '#ddd' } }}>Feedback</Typography>
                    <Typography sx={{ color: 'white', cursor: 'pointer', '&:hover': { color: '#ddd' } }}>Processing Logs</Typography>
                    <Typography sx={{ color: 'white', cursor: 'pointer', '&:hover': { color: '#ddd' } }}>About Us</Typography>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left' }}>
                <Typography variant="overline" sx={{ color: '#d32f2f', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '0.5px' }}>
                    THE VOICE OF THE UNIVERSITY
                </Typography>
                <Typography variant="h3" component="h1" fontWeight="bold">
                    College of Communications
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ color: '#eee', fontWeight: 'normal', fontSize: '0.9rem', mt: 1}}>
                    Ano ang description ka college
                </Typography>
                <Button
                    variant="contained"
                    sx={{ 
                        mt: 3, px: 5, py: 1.5, backgroundColor: '#9a2424', 
                        '&:hover': { backgroundColor: '#7f1f1f' },
                        textTransform: 'none', borderRadius: '4px', fontSize: '1rem'
                    }}
                >
                    Know More
                </Button>
            </Box>
        </Container>
      </Box>

      {/* --- MAIN CONTENT AREA --- */}
      <Box sx={{ backgroundColor: '#fff', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            
            {/* LEFT COLUMN */}
            <Grid item xs={12} md={5}>
              {/* ANNOUNCEMENTS */}
              <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', mb: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.05)', height: '400px', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ color: '#9a2424', fontWeight: 'bold', mb: 1, flexShrink: 0 }}>
                  Announcements
                </Typography>
                <Box className="announcements-scroll-container" sx={{ flexGrow: 1, overflowY: 'auto' }}>
                  {announcements.map((announcement, index) => (
                    <Box key={announcement._id || index} onClick={() => handleOpenModal(announcement)} sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#fafafa' }, pr: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
                          <Box>
                              <Typography component="h3" variant="h6" fontWeight="600" fontSize="1rem">
                                  {announcement.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">{announcement.description}</Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', ml: 2, pt: 0.5 }}>
                              {new Date(announcement.date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
                          </Typography>
                      </Box>
                      {index < announcements.length - 1 && <Divider />}
                    </Box>
                  ))}
                </Box>
              </Paper>

              {/* CALENDAR */}
              <Paper elevation={0} sx={{ p: {xs: 2, sm: 2}, borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
                <Calendar
                  onChange={setDate}
                  value={date}
                  className="custom-calendar"
                  tileClassName={tileClassName}
                  tileContent={tileRenderer}
                  showFixedNumberOfWeeks // Ensures calendar size is consistent
                  next2Label={null}
                  prev2Label={null}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, pt: 2, pb: 1}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Box sx={{ width: 14, height: 14, backgroundColor: '#9a2424', borderRadius: '3px' }} />
                        <Typography variant="caption" fontWeight="medium">EVENT</Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Box sx={{ width: 14, height: 14, backgroundColor: '#c96d6d', borderRadius: '3px' }} />
                        <Typography variant="caption" fontWeight="medium">DATE TODAY</Typography>
                    </Box>
                </Box>
                <Link href="#" underline="always" variant="caption" color="text.secondary" textAlign="center" display="block" mt={1}>
                    COCSC Calendar of Activities 2025-2026
                </Link>
              </Paper>
            </Grid>

            {/* RIGHT COLUMN */}
            <Grid item xs={12} md={5}>
                <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
                  Student Organizations
                </Typography>
                <Grid container spacing={2}>
                  {organizations.map((org) => (
                    <Grid item xs={12} sm={6} key={org.name}>
                      <Paper variant="outlined" sx={{ borderRadius: '8px', overflow: 'hidden', borderColor: '#e0e0e0', height: '100%' }}>
                        <Box sx={{ p: 1.5, backgroundColor: '#9a2424' }}>
                            <Typography sx={{ color: 'white', textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                {org.name}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', p: 2, gap: 2, alignItems: 'center' }}>
                            <Box
                                component="img"
                                src={org.logo}
                                alt={`${org.name} logo`}
                                sx={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                            />
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    {org.details.join(' ')}
                                </Typography>
                                <Link href="#" underline="hover" sx={{ mt: 0.5, fontWeight: 'bold', fontSize: '0.8rem' }}>
                                    Learn More
                                </Link>
                            </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* --- ANNOUNCEMENT MODAL --- */}
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
            {selectedAnnouncement?.title}
            <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent dividers>
            <DialogContentText sx={{ fontSize: '1rem', color: 'text.primary' }}>
                {selectedAnnouncement?.description}
            </DialogContentText>
        </DialogContent>
      </Dialog>
      
      {/* --- CALENDAR HOVER POPOVER --- */}
      <Popover
        sx={{ pointerEvents: 'none' }}
        open={Boolean(popoverAnchor)}
        anchorEl={popoverAnchor}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Paper sx={{ py: 1.5, px: 3, borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <Typography sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>{popoverDate}</Typography>
        </Paper>
      </Popover>

      {/* --- FOOTER --- */}
      <Box component="footer" sx={{ backgroundColor: '#f5f5f5', borderTop: '1px solid #e0e0e0', py: 6 }}>
        <Container maxWidth="lg">
            <Grid container spacing={5}>
                <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'center', alignItems: 'center', mb: 2 }}>
                        <Box component="img" src="https://i.imgur.com/2290M45.png" alt="Footer Logo" sx={{ height: '50px', width: '50px', mr: 1.5 }} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
                        WVSU College of Communication, Luna St., La Paz <br />
                        Iloilo City, Philippines 5000
                    </Typography>
                    <Typography variant="body2" color="text.primary" fontWeight="medium" sx={{mt: 2}}>{'coc-sc@wvsu.edu.ph'}</Typography>
                    <Typography variant="body2" color="text.primary" fontWeight="medium">{'admission.coc@wvsu.edu.ph'}</Typography>
                </Grid>
                <Grid item xs={6} md={2}>
                    <Typography fontWeight="bold" gutterBottom sx={{mb: 2}}>Menu</Typography>
                    <Link href="#" color="textSecondary" display="block" variant="body2" sx={{mb: 1.5}} underline="hover">Orders</Link>
                    <Link href="#" color="textSecondary" display="block" variant="body2" sx={{mb: 1.5}} underline="hover">Feedback</Link>
                    <Link href="#" color="textSecondary" display="block" variant="body2" sx={{mb: 1.5}} underline="hover">Processing Logs</Link>
                    <Link href="#" color="textSecondary" display="block" variant="body2" sx={{mb: 1.5}} underline="hover">About Us</Link>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Typography fontWeight="bold" gutterBottom sx={{mb: 2}}>Social Media</Typography>
                    <Box>
                        <IconButton sx={{border: '1px solid #ccc', borderRadius: '8px', mr: 1}}><Twitter fontSize="small"/></IconButton>
                        <IconButton sx={{border: '1px solid #ccc', borderRadius: '8px', mr: 1}}><Facebook fontSize="small"/></IconButton>
                        <IconButton sx={{border: '1px solid #ccc', borderRadius: '8px'}}><Instagram fontSize="small"/></IconButton>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'left', justifyContent: {xs: 'flex-start', md: 'center'}, gap: 5, mt: {xs: 4, md: 0}}}>
                    <Box component="img" src="https://i.imgur.com/L9eBso7.png" alt="WVSU Logo" sx={{ height: 70, objectFit: 'contain' }} />
                    <Box component="img" src="https://i.imgur.com/fMOMzAJ.png" alt="Communication College Logo" sx={{ height: 70, objectFit: 'contain' }} />
                </Grid>
            </Grid>
             <Divider sx={{ my: 4 }} />
             <Typography variant="body2" color="text.secondary" textAlign="center">
                Copyright © COCSC 2025. All Rights Reserved.
             </Typography>
        </Container>
      </Box>
      <Box sx={{height: '10px', backgroundColor: '#9a2424'}} />
    </>
  );
}
