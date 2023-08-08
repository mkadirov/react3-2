import { Avatar, Box, Typography } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import React from 'react'

function CommentBox({list}) {
  return (
    <Box>
        {
        list.map(item => {
            return(
                <Box marginBottom={2} key={item.id} display='flex' gap={2}>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>U2</Avatar>
                    <Box >
                         <Typography fontSize={12}>
                             @user2
                        </Typography>
                        <Typography>
                         {item.text}
                         </Typography>
                    </Box>
                </Box>
            )
            })
        }
    </Box>
  )
}

export default CommentBox