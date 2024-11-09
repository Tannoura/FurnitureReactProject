import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
import { supabase } from "../../../createClient"
    ;

export default function LoginForm() {
  const navigate = useNavigate();
    const useInput = (initialValue) => {
        const [value, setValue] = useState(initialValue);
        const handleChange = (e) => setValue(e.target.value);
        return [value, handleChange];
    };

  const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useInput("");
    const [password, setPassword] = useInput("");
    const [redirect, setRedirect] = useState(false); // Ajout de l'état de redirection
    const localuser = localStorage.getItem("user");
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Vérifier les informations d'identification avec Supabase
            const { data ,error} = await supabase.from("users").select("*").eq("email", email).eq("password", password);
            localStorage.setItem("user", JSON.stringify(data[0]));
            navigate('/dashboard/app', { replace: true });
         
            if (error) {
                throw new Error(error.message);
            }

            console.log("Connexion réussie :", data);
            setRedirect(true); // Mettre à jour l'état de redirection après une connexion réussie

        } catch (error) {
            console.error("Erreur lors de la connexion :", error.message);
            alert("Adresse e-mail ou mot de passe incorrect.");
        }    };
  useEffect(() => {
    const localuser = localStorage.getItem("user");
    if(localuser)
    {
         const user = JSON.parse(localuser);
            navigate('/dashboard/app', { replace: true });
    
    }
  },[]);

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address"  value={email} onChange={setEmail}  />

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={setPassword}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogin}>
        Login
      </LoadingButton>
    </>
  );
}
