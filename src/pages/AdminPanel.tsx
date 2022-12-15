import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from '@mui/material/Typography';
import photo1 from "../asssets/1.jpg";
import photo2 from "../asssets/2.jpg";
import photo3 from "../asssets/3.jpg";
import photo4 from "../asssets/4.jpg";
import photo5 from "../asssets/5.jpg";
import photo6 from "../asssets/6.jpg";
import photo7 from "../asssets/7.jpg";
import photo8 from "../asssets/8.jpg";
import photo9 from "../asssets/9.jpg";
import photo10 from "../asssets/10.jpg";

const objects: Array<{
  id: number;
  title: string;
  src: any;
}> = [
  {
    id: 1,
    title: "Объект 1",
    src: photo1,
  },
  {
    id: 2,
    title: "Объект 2",
    src: photo2,
  },
  {
    id: 3,
    title: "Объект 3",
    src: photo3,
  },
  {
    id: 4,
    title: "Объект 4",
    src: photo4,
  },
  {
    id: 5,
    title: "Объект 5",
    src: photo5,
  },
];

const AdminPanel = () => {
  const [open, setOpen] = React.useState(true);

  const Objects = () => {
    return (
      <div>
        <Typography
          component="h2"
          variant="h6"
          color="primary"
          gutterBottom
        >База данных</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Путь до фотографии</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {objects.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.src}</TableCell>
                <TableCell><button>Удалить</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <button>Добавить</button>
        <button>Обновить</button>
        
      </div>
    );
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Database */}
            <Grid item xs={12}>
              <Paper
                sx={{ p: 2, display: "flex", flexDirection: "column" }}
              ><Objects/></Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminPanel;
