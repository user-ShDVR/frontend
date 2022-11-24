import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

const LoadingToRedirect = () => {
    const [count, setCount] =React.useState(5)
    const navigate = useNavigate()
    React.useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((currentCount)=> currentCount - 1)
        }, 1000)
        count === 0 && navigate('/auth')
        return () => clearInterval(interval);
    },[count, navigate])
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
        <Box sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <h2>Перенаправлю вас через {count}сек</h2>
        <CircularProgress />
      </Box>
      </Container>
    );
};

export default LoadingToRedirect;