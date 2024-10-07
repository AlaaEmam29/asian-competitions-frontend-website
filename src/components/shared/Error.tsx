import { Box, Typography, Button } from '@mui/material'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'

const ErrorPage = () => {
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
      <ReportProblemIcon sx={{ fontSize: 80, color: 'orange' }} />
      <Typography variant='h4' sx={{ mt: 2 }}>
        Something Went Wrong
      </Typography>
      <Typography variant='subtitle1' sx={{ mt: 1 }}>
        An unexpected error has occurred. Please try again later.
      </Typography>
      <Button variant='contained' color='secondary' sx={{ mt: 3 }}>
        Refresh Page
      </Button>
    </Box>
  )
}

export default ErrorPage
