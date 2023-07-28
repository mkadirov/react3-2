import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Box, Button } from '@mui/material';
import Feed from './components/Feed/Feed';
import Header from './components/Header/Header';
import { useState } from 'react';
import VideoDetail from './components/VideoDetail/VideoDetail';




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
        </Routes>
      </Box>
      
    </BrowserRouter>

    
    
    </>
  );
}

export default App;
