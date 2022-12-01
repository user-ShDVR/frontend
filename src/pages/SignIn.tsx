import React from "react";
import { toast } from 'react-toastify';
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
import { useLoginUserMutation } from "../services/authApi";
import { useAppDispatch } from "../app/hooks";
import { selectAuth, setUser } from "../features/authSlice";
import { useSelector } from "react-redux";


const SignIn = () => {
  const {token} = useSelector(selectAuth)
  const navigate = useNavigate();
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [isLoginSuccess, setIsLoginSuccess] = React.useState(false)
  const [formValue, setFormValue] = React.useState(initialState)
  const [loginUser, {data, isSuccess, isError, error}] = useLoginUserMutation();
  const {email, password} = formValue

  const dispatch = useAppDispatch()

  const handleChange = (e:any) => {
    setFormValue({...formValue, [e.target.name]: e.target.value})
  }

  const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email && password) {
      await loginUser({email, password})
      setIsLoginSuccess(true)
    } else {
      toast.error("Пожалйста проверьте заполнение полей")
    }

  };
  React.useEffect(()=>{
    if (token){
      navigate('/main')
    }
    if (isLoginSuccess && isSuccess) {
      toast.success("Авторизация прошла успешно")
      dispatch(setUser({name: data.result.name, token: data.token}))
      navigate('/dashboard')
    }
  },[isLoginSuccess])

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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            onChange={handleChange}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              
              fullWidth
              id="email"
              label="Е-мейл"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3}}
            >
              Войти
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item >
                <Link to={'/recovery'} >
                  Забыли пароль?
                </Link>
              </Grid>
              <Grid item>
                <Link to={'/auth'} >
                  {"Нету аккаунта? Зарегистрируйтесь"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
};

export default SignIn;
