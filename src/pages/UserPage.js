import { Helmet } from 'react-helmet-async';

import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';


// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination, TableHead,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { supabase } from "../createClient";
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------



export default function UserPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  async function fetchUsers() {
    const { data } = await supabase.from("users").select("*").order("id", { ascending: true });
    setUsers(data);
    console.log(data);
  }
  async function handleDelete(id) {
    // Logique pour supprimer l'utilisateur de la base de données
    const { data, error } = await supabase.from("users").delete().eq("id", id);
    if (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error.message);
    } else {
      console.log("Utilisateur supprimé avec succès :", data);
      fetchUsers();
    }
  }
  function addUser(){
    navigate('/dashboard/user/add');

  }
  function handleUpdate(id){
    navigate(`/dashboard/user/edit/${id}`);
  }

  useEffect(() => {
    fetchUsers();
    console.log(users)
  }, []);


  return (
      <>
        <Helmet>
          <title> User | Minimal UI </title>
        </Helmet>

        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              User
            </Typography>
            <Button variant="contained" onClick={()=>addUser()} startIcon={<Iconify icon="eva:plus-fill" />}>
              New User
            </Button>
          </Stack>

          <Card>

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        id
                      </TableCell>
                      <TableCell>
                        FirstName
                      </TableCell>
                      <TableCell>
                        LastName
                      </TableCell>
                      <TableCell>
                        Email
                      </TableCell>
                      <TableCell>
                        isAdmin
                      </TableCell>
                      <TableCell>
                        Update
                      </TableCell>
                      <TableCell>
                        Delete
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((row) => (
                          <TableRow  key={row.id} >
                            <TableCell  padding="normal">
                              {row.id}
                            </TableCell>

                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt="" src="" />
                                <Typography variant="subtitle2" noWrap>
                                  {row.firstname}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{row.lastname}</TableCell>

                            <TableCell align="left">{row.email}</TableCell>
                            <TableCell align="left">{row.role==="admin" ?"Yes" : "No"}</TableCell>

                            <TableCell align="left"> <Button style={{background:"#5cb85c"}} onClick={()=>handleUpdate(row.id)} variant="contained" >
                              Update
                            </Button></TableCell>

                            <TableCell align="left"> <Button onClick={()=> handleDelete(row.id)}  style={{background:"#DC3545"}} variant="contained" >
                              Delete
                            </Button></TableCell>

                          </TableRow>
                      ))}


                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>


          </Card>
        </Container>

      </>
);
}
