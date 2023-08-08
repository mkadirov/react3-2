import { Box, Button, Card, CardContent, CardMedia, Grid, Stack, Typography, colors, styled } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { Profiler, useEffect, useState } from 'react'
import VideoCard from '../../components/Card/VideoCard'
import { Link } from 'react-router-dom'
import { getVideos } from '../../api'
import { NavList2, navList } from '../../data/NavList';
import ErrorBoundry from '../../components/ErrorBoundry/ErrorBoundry'
import VideoContainer from '../../components/VideoContainer/VideoContainer'


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

const AsideStyled = styled(Box)({
    width: '15%',
    minWidth: '300px',
    minHeight: '100vh',
    position: 'sticky',
    top: 0,
    paddingTop: '90px',
})

const listNav = navList;
const listNav2 = NavList2;


const categoryList = ['All', 'Music', 'Sport', 'Comedy', 'Mixe', 'Watched', 'Only For You', 'Live', 'Animation', "Nature"]

function Feed({open, activeBtn, setActiveBtn}) {
    const [state, setState] = useState(0)

    const [videos, setVideos] = useState([]);

    useEffect( () => {
        async function fetchData() {
            const res = await getVideos();
            if(res.success) {
                setVideos(res.data)
            }
        }
        fetchData();
    }, [videos]);

    function onRenderCallback(
        id, // the "id" prop of the Profiler tree that has just committed
        phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
        actualDuration, // time spent rendering the committed update
        baseDuration, // estimated time to render the entire subtree without memoization
        startTime, // when React began rendering this update
        commitTime, // when React committed this update
        interactions // the Set of interactions belonging to this update
      ) {
        if(state == 0) {
            console.log("Duration: " + actualDuration);
            setState(1)
        } 
      }
  return (
    <VideoContainer>
        <Box>
        <Stack direction='row' spacing={{xs: 0, md: 4}}>
            <AsideStyled className={open? 'open': 'hide'} sx={{px: 2, }}>

                <ErrorBoundry>
                <Box sx={{borderBottom: '1px solid rgba(204, 204, 219, 0.863)', pb: 2}}>
                {
                    listNav?.map((item) => {
                        return (
                            <Link key={item.title} to={item.link}>
                            <NavStyled  borderRadius={2} sx={{ p: 1.5}} display='flex'>
                                {item.icon}
                                <Typography marginLeft={2} fontWeight={300}>
                                    {item.title}
                                </Typography>
                            </NavStyled>
                            </Link>
                        ) 
                    })
                }
                </Box>
                </ErrorBoundry>

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

                  <Profiler id='VideoProfiler' onRender={onRenderCallback}>
                        <Box marginTop={4}>
                            <Grid container spacing={3} justifyContent='center'>
                           
                            {
                                videos?.map((item, idx) =>{
                                   return(
                                    <Grid key={item.id + idx} item xs={12} md= {4} lg= {3} justifyContent='center' display='flex'>
                                        <Link  to={`/video/${item.id}`}>

                                            <ErrorBoundry>
                                               <VideoCard item= {item}/>
                                            </ErrorBoundry>

                                        </Link>
                                    </Grid>
                                   )
                                })
                            }
                            </Grid>
                        </Box>
                  </Profiler>
                   


                </Stack>
            </Box>
        </Stack>
    </Box>
    </VideoContainer>
  )
}

export default Feed