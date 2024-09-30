import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/useAuth';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@material-ui/core';

const DashboardPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    console.log('Logout button clicked');
    logout();
    navigate("/signin");
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#eef2f3', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#4a90e2', color: '#fff', padding: '20px', textAlign: 'center', borderRadius: '8px' }}>
        <Typography variant="h4">Hello, {user?.name}!</Typography>
        <Typography variant="h6">Your Dashboard Awaits</Typography>
      </header>

      <Box marginTop={3}>
        <Typography variant="h5" style={{ color: '#333' }}>Recent Activity</Typography>
        <List>
          <ListItem>
            <ListItemText primary={`You logged in successfully!`} />
          </ListItem>
        </List>
      </Box>

      <Box marginTop={3} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h5" style={{ color: '#333' }}>Your Tasks</Typography>
        <List>
          <ListItem>
            <ListItemText primary="Complete the onboarding process" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Attend the team meeting at 3 PM" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Submit project feedback" />
          </ListItem>
        </List>
      </Box>

      <Box marginTop={3} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h5" style={{ color: '#333' }}>Upcoming Events</Typography>
        <List>
          <ListItem>
            <ListItemText primary="Project Kick-off - Next Monday" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Team Outing - Next Friday" />
          </ListItem>
        </List>
      </Box>

      {/* Logout button */}
      <Button 
        onClick={handleLogout} 
        variant="contained" 
        color="secondary" 
        style={{ marginTop: '30px', padding: '12px 20px' }}
      >
        Logout
      </Button>
    </div>
  );
};

export default DashboardPage;
