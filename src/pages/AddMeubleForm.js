import { TextField,Button, Grid, MenuItem, ListItem} from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Container } from 'reactstrap';
import { supabase } from '../createClient';

// eslint-disable-next-line arrow-body-style
const AddMeubleForm = ()=>{
  const navigate = useNavigate();
  
  const handlefileUpload = async (file) => {
    const  time=new Date()
    const { data, error } = await supabase.storage.from('upload').upload(`${file.name}-${time.valueOf()}`, file);
    if (error) {
      console.error('Error uploading file:', error.message);
    }
    console.log(data);
    return data.path;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileUrl = file ? await handlefileUpload(file) : null;

    const { data, error } = await supabase
      .from('meuble')
      .insert({ name, image: fileUrl, price ,colors:Colors});
    
    if (error) {
      console.error('Error adding product:', error.message);
    } else {
      navigate('/dashboard/products', { replace: true });     
    }
  };
    const handleChange=(idx,v)=>{
        Colors[idx]=v;
        setColors(Colors);
        console.log(Colors);
    }

    
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [file, setFile] = useState("");
    const [Colors, setColors] = useState([
        "",
        "",
        "",
    ]);
    


    return ( 
    <Container>
    <form autoComplete="off" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Add meuble</h2>
            <TextField
                label="Name"
                onChange={e => setName(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="text"
                sx={{mb: 3}}
                fullWidth
                value={name}
             />
            <TextField 
                label="Price"
                onChange={e => setPrice(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="number"
                sx={{mb: 3}}
                fullWidth
                value={price}
             />
            
<Grid container spacing={2}>
<Grid item xs={12} md={1} lg={1}>
    <ListItem><input type='color' onChange={e=>handleChange(0,e.target.value)} /> </ListItem >
  </Grid>
 
<Grid item xs={12} md={1} lg={1}>
    <ListItem><input type='color' onChange={e=>handleChange(1,e.target.value)} /> </ListItem >
  </Grid>
 
<Grid item xs={12} md={1} lg={1}>
    <ListItem><input type='color' onChange={e=>handleChange(2,e.target.value)} /> </ListItem >
  </Grid>
 
</Grid>
             <TextField 
                onChange={e => setFile(e.target.files[0])}
                required
                variant="outlined"
                color="secondary"
                type="file"
                accept="file/*"
        
                fullWidth
                sx={{mb: 3}}
             />

             <Button  color="secondary" type="submit">Save</Button>
         
    </form>
    </Container>
 );}



export default AddMeubleForm