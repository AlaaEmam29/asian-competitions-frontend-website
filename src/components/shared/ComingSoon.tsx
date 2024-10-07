import { Box, Typography, Button } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useNavigate } from 'react-router-dom'

const ComingSoon = () => {
  const navigate = useNavigate()
  const goToHome = () => {
    navigate('/')
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}
    >
      <AccessTimeIcon sx={{ fontSize: 60, color: 'grey.500' }} />
      <Typography variant='h4' sx={{ mt: 2 }}>
        Coming Soon
      </Typography>
      <Typography variant='subtitle1' sx={{ mt: 1 }}>
        We are working hard to bring this feature to you!
      </Typography>
      <Button variant='contained' color='primary' sx={{ mt: 3 }} onClick={goToHome}>
        Back to Home
      </Button>
    </Box>
  )
}

export default ComingSoon
