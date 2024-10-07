import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CompetitionTabs from '@/components/competition/CompetitionTabs'
 
export default function Competition() {
 

  return (
    <Box sx={{ width: '100%', textAlign: 'center', maxHeight: '100vh' }}>
      <Typography variant='h1' gutterBottom sx={{ mb: 2 }}>
      Leagues
      </Typography>

      <CompetitionTabs />
    </Box>
  )
}
