import { Avatar, Box, Button, Grid, IconButton, TextField, Typography, setRef } from '@mui/material'
import React, { useEffect, useState } from 'react'
import VideoCard from '../../components/Card/VideoCard'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import { addComment, deleteFollower, deleteVideoLike, editLike, getAuthor, getComments, 
    getFollowers, getVideoLikes, getVideos, postFollower, postVideoLike } from '../../api';
import { deepPurple } from '@mui/material/colors';
import ErrorBoundry from '../../components/ErrorBoundry/ErrorBoundry';
import CommentBox from '../../components/CommentBox/CommentBox';

function VideoDetail() {
   
    const { id } = useParams();
    const [videos, setVideos] = useState([]);
    const [video, setVideo] = useState({});
    const [author, setAuthor] = useState({});
    const [likeObj, setLikeObj] = useState({like: 0})
    const [followerId, setFollowerId] = useState(0);
    const [commentList, setCommentList] = useState([]);
    const [myComment, setMyComment] = useState('');
    const [refresh, setRefresh] = useState(0)


    useEffect( () => {
        async function fetchData() {
            const res = await getVideos();
            
            if(res.success) {
                const videoById = res.data.find(item => item.id == id)
                setVideo(videoById);
                setVideos(res.data)
            }
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        async function fetchData() {
            
            if(Object.keys(video).length !== 0) {
                const res = await getAuthor(video.authorId);
                if(res.success) {
                    setAuthor(res.data)
                }
            }
        }
        fetchData();
    }, [video])

    
    useEffect(() => {
        async function fetchData() {
            const res = await getFollowers();
            
            if(res.success) {

                const result = res.data.find(element => element.authorId == author.id && element.userId==2);
                if(result) {
                    setFollowerId(result.id)
                }else {
                    setFollowerId(0)
                }
            }
        }
        fetchData();

    }, [followerId, author, id])

    useEffect(() => {
        async function fetchData() {
            
            const res = await getVideoLikes();
            if(res.success) {
                const result = res.data.find(element => element.videoId== id && element.userId == 2);
                if(result) {
                    setLikeObj(result)
                } else {
                    setLikeObj({like: 0})
                }
            }
        }
        fetchData();

    }, [video])

    useEffect(() => {
        async function fetchData() {
           
            const res = await getComments();
            if(res.success) {
                const list = res.data.filter(item => item.videoId == id)
                setCommentList(list)
            }
        }
        fetchData();
    }, [refresh, id])


    
    async function addFollower() {
        const res =  await postFollower({"userId": 2, "authorId": author.id})
        setFollowerId(res.data.id)
        
    }

    async function deleteFollowerById() {
        await deleteFollower(followerId);
    }

    async function addLike(value) {
        if(likeObj.like == 0){
           const res = await postVideoLike( {"userId": 2, "videoId": video.id, "like": value});
           if(res.success) {
            setLikeObj(res.data)
           }  
        } else {
           const res = await editLike(likeObj.id, {"userId": 2, "videoId": video.id, "like": value })
           if(res.success) {
            setLikeObj(res.data)
           }  
        }
       
    }

    async function deleteLike() {
        const res = await deleteVideoLike(likeObj.id);
        if(res.success) {
            setLikeObj({like: 0})
        }
        
    }

    async function addMyComment(){
        const res = await addComment({"userId": 2, "videoId": id, "text": myComment})
        if(res.success){    
        }
        setMyComment('')
        setRefresh(prev => prev +1)
    }
    
  return (

    <Box >
        <Box sx={{width: '100%', height: '10vh'}}>

        </Box>
        <Box  sx={{ width: {xs: '100vw', md: '90vw'}, margin: 'auto'}}>
        <Grid container spacing={4}>
            <Grid item xs={12} md={8} >
                <Box sx={{width: '100%', top: '110px'}}>

                <ErrorBoundry>
                    <ReactPlayer
                    width='100%'
                    height='60vh'
                    url = {video.url}
                    controls={true}
                    />
                </ErrorBoundry>

                
                <Typography variant='h5' marginY={2}>
                    {video.title}
                </Typography>

                    <Box display='flex' alignItems='center' justifyContent='space-between'>
                        <Box display='flex' gap={1}>
                            <Avatar src={author.img}/>
                            <Box>
                            <Typography>
                                {author.name}
                            </Typography>
                            <Typography fontSize={12}>
                                12.000 Subscribers
                            </Typography>

                    
                            </Box>

                            {
                              (followerId>0)? (<button 
                              style={{backgroundColor: 'black', color: 'white', width: '140px', borderRadius: '30px'}}
                              onClick={() => {
                                deleteFollowerById();
                                setFollowerId(0)
                              }}
                              >
                              Stop following
                              </button>)  : (<button 
                              style={{backgroundColor: 'black', color: 'white', width: '140px', borderRadius: '30px'}}
                              onClick={() => {
                                addFollower();
                                setFollowerId(1);
                              }}
                              >
                              Follow
                              </button>)
                            }
                    
                        </Box>

                        <Box>

                            {
                                (likeObj.like <= 0)? (<IconButton onClick= {() => {
                                    addLike(1);
                                  }}>
                                
                                    <ThumbUpOffAltIcon />
                            </IconButton>) : (<IconButton onClick={() => {
                                    deleteLike();
                                  }}>
                                    <ThumbUpIcon />
                            </IconButton>)
                            }

                            {
                                (likeObj.like >= 0)? (<IconButton onClick= {() => {
                                   addLike(-1)
                                  }}>
                                    <ThumbDownOffAltIcon />
                            </IconButton>) : (<IconButton onClick={() => {
                                    deleteLike();
                                  }}>
                                    <ThumbDownIcon />
                            </IconButton>)
                            }
                        </Box>
                    </Box>

                    
                    <Box>
                    <Box className = 'commentBox' marginTop={4} display='flex' gap={2} alignItems='center'>
                       <Avatar sx={{ bgcolor: deepPurple[500] }}>U2</Avatar>
                       <TextField 
                       id="standard-basic" 
                       label="Your comment" 
                       variant="standard"  
                       fullWidth
                       value={myComment}
                       onChange={(e) => setMyComment(e.target.value)}

                       />
                    </Box>

                    <Box display='flex' justifyContent='end'>
                        <Button onClick={addMyComment} variant='contained' sx={{my: 2}}>
                            Send
                        </Button>
                    </Box>

                    <ErrorBoundry>
                       <CommentBox list= {commentList}/>
                    </ErrorBoundry>

                    </Box>
                    
                </Box>
            </Grid>
            <Grid item xs={12} md={4} >
                {
                    videos.map((item, idx) => {
                        return(
                            
                            <Box key={item.id} marginBottom={2}>
                                <Link  to={`/video/${item.id}`}>
                                  <VideoCard  item={item} />
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