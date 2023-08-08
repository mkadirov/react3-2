import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material';
import Feed from './pages/HomePage/HomePage';
import Header from './components/Header/Header';
import { useState } from 'react';
import VideoDetail from './pages/VideoDetail/VideoDetail';
import MyCannels from './pages/MyCannels/MyCannels';
import VideoContainer from './components/VideoContainer/VideoContainer';





function App() {

  const [open, setOpen] = useState(false);
  const [activeBtn, setActiveBtn] = useState('All')

  const handlleOpen = () =>{
      setOpen(!open);
  }
  return (
    <>
    <BrowserRouter>
      <Box >
        <Header handlleOpen = {handlleOpen}/>
       
        <Routes>
          <Route path='/' element={<Feed open = {open} activeBtn= {activeBtn} setActiveBtn={setActiveBtn}/>}/>
          <Route path='/video/:id' element={<VideoDetail/>}/>
          <Route path='/my_channels' element= {<MyCannels/>}/> 
        </Routes>
      </Box>
      
    </BrowserRouter>
    </>
  );
}

export default App;
