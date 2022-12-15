import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppDispatch } from "../app/hooks";
import { useRegisterUserMutation } from "../services/authApi";
import { toast } from 'react-toastify';
import { selectAuth, setUser } from "../features/authSlice";
import { useSelector } from "react-redux";


const Auth = () => {
  const {token} = useSelector(selectAuth)
  const navigate = useNavigate();
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false)
  const [formValue, setFormValue] = React.useState(initialState)
  const [registerUser, {data, isSuccess, isError, error}] = useRegisterUserMutation();
  const {firstName, lastName, email, password} = formValue

  const dispatch = useAppDispatch()
  const handleChange = (e:any) => {
    setFormValue({...formValue, [e.target.name]: e.target.value})
  }

  const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (firstName && lastName && email && password) {
      await registerUser({firstName, lastName, email, password})
      setIsRegisterSuccess(true)
    } else {
      toast.error("Пожалйста проверьте заполнение полей")
    }

  };
  React.useEffect(()=>{
    if (token){
      navigate('/main')
    }
    if (isRegisterSuccess && isSuccess) {
      toast.success("Регистрация прошла успешно")
      dispatch(setUser({name: data.result.name, token: data.token}))
      navigate('/dashboard')
    } 
  },[isRegisterSuccess])

  React.useEffect(()=>{
   if (isError) {
    toast.error((error as any).data.message)
   }
  },[isError])

  return (
    <Container sx={{ py: 12 }} component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#90caf9" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Регистрация
        </Typography>
        <Box component="form" noValidate onChange={handleChange} onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="Имя"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Фамилия"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Е-мейл"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Зарегистрироваться
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={"/signin"}>Уже есть аккаунт? Войти</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Auth;
