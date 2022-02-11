import React from 'react'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
    return (
                <div style={{display: 'flex',position:"fixed", width: "100vw", justifyContent: "center", alignItems: "center", height: '100vh',background:'#ffffff',zIndex:'9999',top:'0',left:'0' }}>
            <div className="No_data_IN" style={{position:"absolute" }}>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div></div>
    )
}

export default Loading