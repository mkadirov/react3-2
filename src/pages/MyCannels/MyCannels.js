import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAuthors, getFollowers } from '../../api';

function MyCannels() {

    const [myChannels, setMyChannels] = useState([]);

    useEffect(() => {
       async function fetchData() {
        const authorRes = await getAuthors();
        const followerRes = await getFollowers();
        if(authorRes && followerRes) {  
            const myChannelList = authorRes.data.filter(author => followerRes.data.some(item => item.authorId == author.id))
            setMyChannels(myChannelList);
        }else {
            setMyChannels([]);
        }
       }
       fetchData();
    }, [])

    
  return (
    <Box>
        <Box sx={{width: '100%', height: '10vh'}}></Box>

        <Container>
            <Typography variant='h3' textAlign='center' marginBottom={6}>
                My Channels
            </Typography>
            <Grid container spacing={2}>
                {
                    myChannels.map(item => {
                        return (
                            <Grid item xs= {3}>
                                <Card >
                              <CardMedia
                                sx={{ height: 340 }}
                                image={item.img}
                                title="green iguana"
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                  {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Lizards are a widespread group of squamate reptiles, with over 6,000
                                  species, ranging across all continents except Antarctica
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                              </CardActions>
                            </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Container>
    </Box>
  )
}

export default MyCannels