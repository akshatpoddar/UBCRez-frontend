// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import api from '../utils/api'

const Navbar: React.FC = () => {
  const router = useRouter();
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('token');

  const handleLogout = async () => {
    try {
      // Send logout request to API
      await api.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      // Remove token from localStorage
      localStorage.removeItem('token');
      // Redirect to login page
      router.push('/login');
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Link href="/" passHref>
            <Button color="inherit">
              <Typography variant="h6" sx={{ color: 'inherit' }}>
                Home
              </Typography>
            </Button>
          </Link>
          {isLoggedIn && (
            <Link href="/profile" passHref>
              <Button color="inherit">
                <Typography variant="h6" sx={{ color: 'inherit' }}>
                  Profile
                </Typography>
              </Button>
            </Link>
          )}
        </Box>
        <Box>
          {!isLoggedIn ? (
            <>
              <Link href="/login" passHref>
                <Button color="inherit">Login</Button>
              </Link>
              <Link href="/register" passHref>
                <Button color="inherit">Register</Button>
              </Link>
            </>
          ) : (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
