'use client'
// components/Navbar.tsx
import React, {useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { clearUser } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

const Navbar: React.FC = () => {
  const router = useRouter();
  
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.user);
  const user = useSelector((state: RootState) => state.user);
  const isLoggedIn = typeof window !== 'undefined' && useSelector((state: RootState) => state.user.isLoggedIn);
  //console.log(isLoggedIn)

  const handleLogout = () => {
    dispatch(clearUser());
    router.push('/login');
  };

  useEffect(() => {
    console.log(` Navbar says ${state.isLoggedIn}`)
  }, [dispatch])

  // Define a custom theme with a consistent color scheme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#0d47a1', // Dark blue
      },
      secondary: {
        main: '#ffb300', // Amber
      },
      background: {
        default: '#f5f5f5', // Light gray
      },
      text: {
        primary: '#ffffff', // White text for buttons
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <Button color="inherit" sx={{ color: 'inherit' }}>
                Home
              </Button>
            </Link>
          </Typography>
          <Box>
            {!isLoggedIn ? (
              <>
                <Link href="/login" passHref>
                  <Button color="secondary" sx={{ mr: 2 }}>Login</Button>
                </Link>
                <Link href="/register" passHref>
                  <Button color="secondary">Register</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/profile" passHref>
                  <Button color="inherit" sx={{ color: 'inherit', mr: 2 }}>Profile</Button>
                </Link>
                <Link href="/create-post" passHref>
                  <Button color="inherit" sx={{ color: 'inherit', mr: 2 }}>Create Post</Button>
                </Link>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
