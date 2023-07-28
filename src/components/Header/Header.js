import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';


export default function Header({handlleOpen}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{backgroundColor: 'white', height: {xs: '6vh', lg: '10vh', xl: '6vh'}, boxShadow: 0}}>
        <Toolbar sx={{justifyContent: 'space-between'}}>
          
       
           <Box alignItems='center' display='flex' > 
           <Box display='inline-block'>
            <IconButton 
            aria-label="delete" 
            size="large" 
            sx={{display: {xs: 'none',sm:'none', md: 'flex'}}}
            onClick={handlleOpen}
            >
                <MenuIcon />
            </IconButton>
            </Box>
            <Link to='/'>

            <Box display='flex' alignItems='center'>
               <Box  width={40} display={'inline-block'}>
               <img src="https://img.icons8.com/?size=512&id=19318&format=png" alt="" />
               </Box>
               <Typography sx={{color: 'black'}}>
                YouTube
               </Typography>
            </Box>
            </Link>
           </Box>

           
           <Box  alignItems='center' sx={{display: {xs: 'none', md: 'flex'}}}>
             <div className="search-box">
                <input type="text" className='search' />
                <button className='search-btn'>
                   <SearchIcon/>
                </button> 
             </div>
             <IconButton sx={{backgroundColor: 'rgba(172, 166, 166, 0.514)', marginLeft: 2}} aria-label="delete" >
                <MicIcon />
              </IconButton>
           </Box>

           <Box>
              <IconButton sx={{color: 'black'}}>
                <PhotoCameraFrontIcon/>
              </IconButton >
              <IconButton sx={{color: 'black'}}>
                <NotificationsNoneIcon/>
              </IconButton>
              <IconButton sx={{color: 'black'}}>
                <PersonIcon/>
              </IconButton>
           </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}