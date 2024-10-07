import { Box, CircularProgress, Typography } from '@mui/material'

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress color='primary' size={60} />
      <Typography variant='h6' sx={{ mt: 2 }}>
        Loading, please wait...
      </Typography>
    </Box>
  )
}

export default Loading
