/* eslint-disable no-return-assign */

import { Button, Grid } from '@mui/material'

import React, { useEffect, useState } from 'react'

import ShopProductCard from '../sections/@dashboard/products/ProductCard'
import { supabase } from '../createClient';


const ProductList = () => {
    const [products, setProducts] = useState([]);
  
    async function fetchMeuble() {
      const { data } = await supabase.from("meuble").select("*").order("id", { ascending: true });
      data.forEach(element => {
        element.image=`https://yhikhgxbyhmqhfwzaexx.supabase.co/storage/v1/object/public/upload/${element.image}`;
        const filteredArray = element
        .colors.filter(item => item !== '');
        element.colors=filteredArray;
      });

      setProducts(data);

    }
    useEffect(() => {
        fetchMeuble();
        console.log(products)
        }, []);



  async function handleDeleteClick (productId)  {
    // Supprimer le produit de Supabase
    const { data, error } = await supabase.from('meuble').delete().eq('id', productId);

    if (error) {
      console.error("Meuble :", error.message);
    } else {
      console.log("Meuble supprimé avec succès :", data);
      fetchMeuble();
    }
  };
        
  return (
    <Grid container spacing={3} >
    {products.map((product) => (
      <Grid key={product.id} item xs={12} sm={6} md={3}> 
        <ShopProductCard product={product}/>
       
        <Button onClick={()=> handleDeleteClick(product.id)}  style={{background:"#DC3545", marginLeft: '100px'}} variant="contained"  >
                              Delete
                            </Button>
        
      </Grid>
      
    ))}
  </Grid>  )
}

export default ProductList