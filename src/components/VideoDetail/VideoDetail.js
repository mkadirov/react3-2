import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import VideoCard from '../Card/VideoCard'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player';
import { getVideo, getVideos } from '../../api';

function VideoDetail() {
    
    const { id } = useParams();
    const [videos, setVideos] = useState([]);
    const [video, setVideo] = useState({})

    useEffect( () => {
        async function fetchData() {
            const data = await getVideo(id);
            setVideo(data)
        }
        fetchData();
    }, [id]);

    useEffect( () => {
        async function fetchData() {
            const data = await getVideos();
            setVideos(data)
            console.log(data);
        }
        fetchData();
    }, []);
    
    
    
  return (

    <Box >
        <Box sx={{width: '100%', height: '10vh'}}>

        </Box>
        <Box  sx={{ width: {xs: '100vw', md: '90vw'}, margin: 'auto'}}>
        <Grid container spacing={4}>
            <Grid item xs={12} md={8} >
                <Box sx={{width: '100%', height: {xs: '30vh', md: '60vh'}, position: {xs: 'fixed', md: 'sticky'}, top: '110px'}}>
                <ReactPlayer
                width='100%'
                height='100%'
                url = {video.url}
                controls={true}
                />
                <Typography variant='h5' marginY={2}>
                    {video.title}
                </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={4} >
                
                {
                    videos.map((item, idx) => {
                        return(
                            
                               <Box marginBottom={2}>
                                <Link key={item.id + idx} to={`/video/${item.id}`}>
                                  
                                  <VideoCard key={idx + item.id} item={item} />
                                
                                </Link>
                               </Box>
                        )
                    })
                }
               
            </Grid>
        </Grid>
    </Box>
    </Box>
  )
}

export default VideoDetail