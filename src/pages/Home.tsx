import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CompetitionTabs from '@/components/competition/CompetitionTabs'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import useLeagues from '@/hooks/competition/useLeagues'

export default function Competition() {
  const { leaguesError } = useLeagues()
  if (leaguesError) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <ErrorOutlineIcon color='error' sx={{ fontSize: 50 }} />
        <Typography
          variant='h5'
          color='error'
          textAlign='center'
          sx={{ fontWeight: 'bold', fontSize: '1.8rem' }}
        >
          {leaguesError?.message}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ width: '100%', textAlign: 'center', maxHeight: '100vh' }}>
      <Typography variant='h1' gutterBottom>
        البطولات
      </Typography>

      <CompetitionTabs />
    </Box>
  )
}
