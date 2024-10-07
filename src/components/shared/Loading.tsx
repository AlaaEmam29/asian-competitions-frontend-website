import { Box, Typography } from '@mui/material'

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position:'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '100vh',
        backgroundColor: 'white',
        zIndex: 9999,
      }}
    >
       <div className="spinner-container">
  <div className="circular-progress"></div>
</div>
      <Typography variant='h6' sx={{ mt: 2 }}>
        Loading, please wait...
      </Typography>
    </Box>
  )
}

export default Loading
