import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, selectAuth } from "../features/authSlice";
import { toast } from 'react-toastify';


const Dashboard = () => {
  const { name } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Выход произошёл успешно')
    navigate('/signin')
  }
  return (
    <Container sx={{ py: 12 }} component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
            <h2>Добро пожаловать</h2>
            <h4>Имя: {name}</h4>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=> handleLogout()}
            >
              Выйти
            </Button>
        </Box>
    </Container>
  );
};

export default Dashboard;
