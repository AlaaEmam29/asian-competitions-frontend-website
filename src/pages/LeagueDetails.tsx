import Loading from '@/components/shared/Loading'
import useLeague from '@/hooks/competition/useLeague'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { CardContent } from '@mui/material'
import { useEffect } from 'react'
import { useCategoryStore } from '@/stores/category'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export default function LeagueDetails() {
  const { league, leagueLoading, leagueError } = useLeague()
  const { resetCategory } = useCategoryStore()
  useEffect(() => {
    resetCategory()
  }, [])
  console.log('leagueError', leagueError)
  if (leagueLoading) return <Loading />
  if (leagueError || !league) {
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
          {leagueError?.message}
        </Typography>
      </Box>
    )
  }
  return (
    <Box
      sx={{
        padding: {
          xs: '1rem',
          sm: '2rem',
          md: '3rem',
          lg: '4rem',
          xl: '5rem',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          minWidth: {
            xs: '90%',
            sm: '60%',
            md: '50%',
            lg: '40%',
            xl: '30%',
          },
          maxWidth: 1200,
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem' }}
        >
          <Avatar
            src={league.imageUrl}
            alt={league.name}
            sx={{ width: 150, height: 150, marginBottom: '1.5rem', border: '2px solid #ddd' }}
          />

          <Typography variant='h4' fontWeight='bold' color='black' gutterBottom>
            {league.name}
          </Typography>

          <Typography variant='h5' color='black' gutterBottom>
            <strong>Country:</strong>
            {league.country}
          </Typography>

          <CardContent
            sx={{
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              width: '100%',
            }}
          >
            <Typography variant='h5' color='black'>
              <strong>Founded:</strong> {league.founded}
            </Typography>
            <Typography variant='h5' color='black'>
              <strong>Stadium:</strong> {league.stadium}
            </Typography>
            <Typography variant='h5'>
              <strong>Capacity:</strong> {league.capacity.toLocaleString()} seats
            </Typography>

            <Typography variant='h5' color='black'>
              <strong>Top Teams:</strong> {league.topTeams.join(', ')}
            </Typography>

            <Typography variant='h5' color='black'>
              <strong>Description:</strong> {league.description}
            </Typography>

            <Typography variant='h5' color='black'>
              <strong>History:</strong> {league.history}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  )
}
