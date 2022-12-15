import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
// import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import SignIn from './pages/SignIn';
import { useAppDispatch } from './app/hooks';
import { setUser } from './features/authSlice';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/header';
import Main from './pages/Main';
import AdminPanel from './pages/AdminPanel';




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
  const dispatch = useAppDispatch()
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  React.useEffect(() => {
    dispatch(setUser(user))
  },[])
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <ToastContainer/>
      <Header themeCallbak={ThemeSwitch} theme={theme}/>
      <Routes>
        <Route path='/' element={<Navigate to='/main' replace />} />
        {/* <Route path='/signin' element={<SignIn />} /> */}
        {/* <Route path='/auth' element={<Auth />} /> */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/main' element={<Main />} />{/*fix PrivateRoute */}
      </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
// Запрос с бэкенда через await 
// полученный массив перебираем циклом foreach/map
//  
//
//
//
//
//
//
//
//
//
