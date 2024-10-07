import { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import useLeagues from '@/hooks/competition/useLeagues'
import { useNavigate } from 'react-router-dom'

export default function Team() {
  const { leagues } = useLeagues()
  const [expanded, setExpanded] = useState<string | false>(false)
  const navigate = useNavigate()

  const handleExpansion =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const handleNavigate = (event: React.MouseEvent, leagueId: string) => {
    event.stopPropagation()
    navigate(`/leagues/${leagueId}`)
  }
  return (
    <Box sx={{ width: '100%' }}>
      {leagues && leagues.length > 0 ? (
        leagues.map((league) => (
          <Accordion
            key={league.id}
            expanded={expanded === league.id}
            onChange={handleExpansion(league.id)}
            sx={{ my: 2 }}
          >
            <AccordionSummary
              aria-controls={`panel${league.id}-content`}
              id={`panel${league.id}-header`}
              expandIcon={<ExpandMoreIcon />}
            >
              <Box
                onClick={(e) => handleNavigate(e, league.id)}
                sx={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
              >
                <img src={league.imageUrl} alt={league.name} className='league-image' />
                <Typography variant='h5' fontWeight='bold' color='text.primary'>
                  {league.name}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Fade in={expanded === league.id}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  <Typography variant='subtitle1'>
                    <strong>Country:</strong> {league.country}
                  </Typography>
                  <Typography variant='subtitle1'>
                    <strong>Founded:</strong> {league.founded}
                  </Typography>
                  <Typography variant='subtitle1'>
                    <strong>Stadium:</strong> {league.stadium} (Capacity: {league.capacity})
                  </Typography>
                  <Typography variant='subtitle1'>
                    <strong>Top Teams:</strong> {league.topTeams.join(', ')}
                  </Typography>
                  <Typography variant='subtitle1' sx={{ mt: 1 }}>
                    <strong>Description:</strong> {league.description}
                  </Typography>
                  <Typography variant='subtitle1' sx={{ mt: 1 }}>
                    <strong>History:</strong> {league.history}
                  </Typography>
                </Box>
              </Fade>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography
          className='active'
          sx={{
            mt: 1,
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            padding: '4rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '30rem',
            width: '100%',
          }}
          variant='h3'
        >
          No leagues found
        </Typography>
      )}
    </Box>
  )
}
