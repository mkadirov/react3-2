import { Box, Button, Card, CardContent, CardMedia, Grid, Stack, Typography, colors, styled } from '@mui/material'
import { grey } from '@mui/material/colors'

import React, { useEffect, useState } from 'react'
import { NavList2, navList, videoList } from '../../data/NavList'
import VideoCard from '../Card/VideoCard'
import { Link } from 'react-router-dom'
import { getVideos } from '../../api'

const AsideStyled = styled(Box)({
    width: '15%',
    minWidth: '300px',
    minHeight: '100vh',
    
    position: 'sticky',
    top: 0,
    paddingTop: '90px',
    
})

const StyledBox = styled(Box)({
    flexShrink: 0,
    position: 'sticky',
    
    top: 0,
    
    zIndex: '500',
    overflowX: 'auto', 
    display: 'flex', 
    backgroundColor: 'white',
    paddingBottom: '20px'
    
})

const Btn = styled(Button)({
    backgroundColor: grey[100],
    color: 'black',
    marginRight: 15,
    minWidth: '120px',
    '&:hover': {
        backgroundColor: grey[200]
    }
})

const NavStyled = styled(Box)({
    '&:hover': {
        backgroundColor: grey[200]
    }
})

const listNav = navList;
const listNav2 = NavList2;
const videoLists = videoList;

const categoryList = ['All', 'Music', 'Sport', 'Comedy', 'Mixe', 'Watched', 'Only For You', 'Live', 'Animation', "Nature"]
function Feed({open, activeBtn, setActiveBtn}) {

    const [videos, setVideos] = useState([]);

    useEffect( () => {
        async function fetchData() {
            const data = await getVideos();
            setVideos(data)
        }
        fetchData();
    }, [videos]);
  return (
    <Box>
        <Stack direction='row' spacing={{xs: 0, md: 4}}>
            <AsideStyled className={open? 'open': 'hide'} sx={{px: 2, }}>
                <Box sx={{borderBottom: '1px solid rgba(204, 204, 219, 0.863)', pb: 2}}>
                {
                    listNav?.map((item, index )=> {
                        return (
                            <NavStyled key={index+ item.title}  borderRadius={2} sx={{ p: 1.5}} display='flex'>
                                {item.icon}
                                <Typography marginLeft={2} fontWeight={300}>
                                    {item.title}
                                </Typography>
                            </NavStyled>
                        )
                            
                        
                    })
                }
                </Box>

                <Box marginTop={2}>
                {
                    listNav2?.map((item, index) => {
                        return (
                            <NavStyled key={index+ item.title}  borderRadius={2} sx={{ p: 1.5}} display='flex'>
                                {item.icon}
                                <Typography marginLeft={2} fontWeight={300}>
                                    {item.title}
                                </Typography>
                            </NavStyled>
                        )
                            
                        
                    })
                }
                </Box>

                
            </AsideStyled>
            <Box  flex={1} sx={{maxHeight: '100vh',  overflow: 'auto'}}>
                <Stack>
                    <StyledBox flex={1}  sx={{paddingTop: {xs: '60px', md: '90px'}, pl: {xs: 2, md: 0}}}>
                     
                     {
                        categoryList.map((btn, idx) => {
                            return(
                                <Btn 
                                className={activeBtn===btn? 'activeBtn': 'simple'}  
                                key= {idx + btn}
                                onClick={() => setActiveBtn(btn)}
                                >
                                    {btn}
                                </Btn>
                            )
                        })
                     }
                      
                    </StyledBox>
                    <Box marginTop={4}>
                        <Grid container spacing={3} justifyContent='center'>
                            {
                                videos?.map((item, idx) =>{
                                   return(
                                    <Grid key={item.id + idx} item xs={12} md= {4} lg= {3} justifyContent='center' display='flex'>
                                        <Link  to={`/video/${item.id}`}>
                                            <VideoCard item= {item}/>
                                        </Link>
                                    </Grid>
                                   )
                                })
                            }
                            
                           
                        </Grid>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    </Box>
  )
}

export default Feed