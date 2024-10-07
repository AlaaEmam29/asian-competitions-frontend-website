import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/Home'
import ArticleIcon from '@mui/icons-material/Article'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Typography from '@mui/material/Typography'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  backdropFilter: 'blur(24px)',
  backgroundColor: 'white',
  boxShadow: theme.shadows[1],
  padding: '2rem 1rem',
}))

type LinkProps = {
  title: string
  url: string
  icon: React.ReactNode
}

const links: LinkProps[] = [
  { title: 'Leagues', url: '/', icon: <HomeIcon /> },
  { title: 'News', url: '/news', icon: <ArticleIcon /> },
  { title: 'Matches', url: '/matches', icon: <SportsSoccerIcon /> },
  { title: 'Coupons', url: '/coupons', icon: <LocalOfferIcon /> },
  { title: 'More', url: '/more', icon: <MoreHorizIcon /> },
]

export default function Footer() {
  return (
    <AppBar
      position='fixed'
      sx={{
        top: 'auto',
        bottom: 0,
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        borderTop: '1px solid',
        borderColor: 'divider',
        display: { xs: 'flex', md: 'none' },
      }}
    >
      <Box>
        <StyledToolbar variant='dense' disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            {links.map((link: LinkProps) => (
              <Button
                component={NavLink}
                to={link.url}
                key={link.title}
                color='inherit'
                variant='text'
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textTransform: 'none',
                  minWidth: 'auto',
                  padding: '0.5rem',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'transparent',
                  },
                  '&:hover .MuiTypography-root': {
                    color: 'primary.main',
                  },
                }}
              >
                {link.icon}
                <Typography
                  variant='caption'
                  sx={{ mt: 0.5, fontSize: '1.2rem', '&:hover': { color: 'primary.main' } }}
                  color='text.secondary'
                >
                  {link.title}
                </Typography>
              </Button>
            ))}
          </Box>
        </StyledToolbar>
      </Box>
    </AppBar>
  )
}
