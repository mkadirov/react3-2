import React from 'react'
import { Box, Button, Card, CardContent, CardMedia, Stack, Typography, colors, styled } from '@mui/material'
import { Link } from 'react-router-dom'

function VideoCard({item}) {

  return (
    
    <Card sx={{ maxWidth: 430 , pb: 3}}>
       <Box>
       <CardMedia
            sx={{ height: 200 }}
            image={item.coverImg}  
        />

        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                 {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
            </Typography>
        </CardContent>
       </Box>
    </Card>
   
  )
}

export default VideoCard