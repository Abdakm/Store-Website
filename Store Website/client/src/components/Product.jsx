import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { addToCart, setAvailableQuantities } from '../features/cart/cartSlice'

export default function MediaCard({ id ,src, price, name, desc, quantity, category, subcategory, realQuantity }) {
  const truncatedDesc = desc.split(' ').slice(0, 3).join(' ')

  const dispatch = useDispatch()

   useEffect(() => {
      // dispatch({
      //   type: 'cart/setAvailableQuantities',
      //   payload: { [id]: quantity } // {1: 100}
      // });
      dispatch(setAvailableQuantities({ [id]: quantity }))
    }, [dispatch, id, quantity]);
  
   // Construct the full image source URL
  const imageUrl = `/images/products/${
    category === 1 ? 'men/' :
    category === 2 ? 'women/' :
    category === 3 ? 'children/' : ''
  }${subcategory}/${src}`;

  const handleAddToCart = () => {
    dispatch(addToCart({
      id,
      imageUrl,
      price,
      name,
      quantity,
      realQuantity: quantity - realQuantity + 1, // quantity - availableQuantity[id] + 1
    }))
  }

  return (
    <Card key={id} sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 200 }} image={imageUrl} alt={name} className='w-[250px]' title={name}/>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div"> {name} </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}> {truncatedDesc} </Typography>
        <Typography variant="body1" color="text.primary"> ${price} </Typography>
        <Typography variant="body2" color="text.secondary"> Available Quantity: {realQuantity} </Typography>
      </CardContent>
      <CardActions>
        <Button className='text-red-300' size="small">Show</Button>
        <Button onClick={handleAddToCart} disabled={realQuantity === 0} size="small">
          {realQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardActions>
    </Card>
  );
}
