import React, {useEffect, useState} from "react";
import { TextField, FormControl, Button, Checkbox } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../createClient";

const EditUserForm =  () => {
    const navigate = useNavigate();
     const  {id} = useParams();


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastnamename] = useState("")
    const  [isAdmin, setIsAdmin] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault()
 
        
 
 
        if (email  && password && firstname && lastname) {
            console.log(email, password, firstname, lastname)
            const newUser={
                "firstname": firstname,
                "lastname": lastname,
                'email': email,
                'password': password,
                "role": isAdmin ? "admin" : "user"
                

            }
            const { data, error } =  await supabase.from("users").update(newUser).eq("id", id);
            if (error) {
              console.error("Erreur lors de l'ajout de l'utilisateur :", error.message);
            } else {
                console.log("Utilisateur ajouté avec succès :", data);
                navigate('/dashboard/user');
            }
        }
    }
    function fetchUser(id) {
        supabase
          .from("users")
          .select("*")
          .eq("id", id)
          .then(({ data: users, error }) => {
            if (error) {
              console.error("Erreur lors de la récupération de l'utilisateur :", error.message);
            } else {
              console.log("Utilisateur récupéré avec succès :", users);
              setFirstname(users[0].firstname);
              setLastnamename(users[0].lastname);
              setEmail(users[0].email);
              setPassword(users[0].password);
              setIsAdmin(users[0].role === "admin");
            }
          });
      }
    useEffect(() => {
        console.log(id);
        fetchUser(id);
    }, [])            
     
    return ( 
        <>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h2>Edit User</h2>
                <TextField 
                    label="FirstName"
                    onChange={e => setFirstname(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={firstname}
                 />
                <TextField 
                    label="LastName"
                    onChange={e => setLastnamename(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={lastname}
                 />
                <TextField 
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{mb: 3}}
                    fullWidth
                    value={email}
                 />
                 <TextField 
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={password}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <Checkbox name="isAdmin" label="isAdmin"  onChange={()=>setIsAdmin(!isAdmin)} checked={isAdmin} />

                 <Button  color="secondary" type="submit">Save</Button>
             
        </form>
        </>
     );
  
}

export default EditUserForm


