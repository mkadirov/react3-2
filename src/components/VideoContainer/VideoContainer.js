import { Box } from '@mui/material'
import React from 'react'
import {createPortal} from 'react-dom'

const videoContainer = document.getElementById('videos')

function VideoContainer({children}) {
    const containerBody = <Box>{children}</Box>
    return createPortal(containerBody, videoContainer);
}

export default VideoContainer