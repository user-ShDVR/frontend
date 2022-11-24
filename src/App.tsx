import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react';
import IconButton from '@mui/material/IconButton';




function App() {

  const [userTheme, useUserTheme] = React.useState<true | false>(true)
  
  const theme = createTheme({
    palette: {
      mode: userTheme == true? 'light' : 'dark',
    },
  });
  const ThemeSwitch = ()=>{
    useUserTheme(!userTheme)
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <h2>
      <IconButton  onClick={ThemeSwitch} color="inherit">
      Auth
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      </h2>
      <Routes>
        <Route path='/' element={<Navigate to='/auth' replace />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
