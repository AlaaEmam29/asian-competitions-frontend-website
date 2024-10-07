import { Box, Typography, Button } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/AccessTime'
import { useNavigate } from 'react-router-dom'
import { useCategoryStore } from '@/stores/category'
import { usePaginationStore } from '@/stores/pagination'

const NotFound = () => {
  const navigate = useNavigate()
   const {resetCategory} = useCategoryStore();
  const {reset} = usePaginationStore();
  const goToHome = () => {
    resetCategory();
    reset();
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
      <ErrorOutlineIcon sx={{ fontSize: 60, color: 'grey.500' }} />
      <Typography variant='h4' sx={{ mt: 2 }}>
        404 Not Found
      </Typography>
      <Typography variant='subtitle1' sx={{ mt: 1 }}>
        The page you are looking for does not exist.
      </Typography>
      <Button variant='contained' color='primary' sx={{ mt: 3 }} onClick={goToHome}>
        Back to Home
      </Button>
    </Box>
  )
}

export default NotFound
