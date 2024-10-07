import * as React from 'react'
import { alpha, styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Search from '@/components/layout/Search'
import HomeIcon from '@mui/icons-material/Home'
import ArticleIcon from '@mui/icons-material/Article'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import SettingsIcon from '@mui/icons-material/Settings'
import Typography from '@mui/material/Typography'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '1.4rem 2.4rem',
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
  { title: 'More', url: '/more', icon: <SettingsIcon /> },
]

export default function Navbar({
  toggleTheme,
  mode,
}: {
  toggleTheme: () => void
  mode: 'light' | 'dark'
}) {
  return (
    <AppBar
      position='fixed'
      sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 4 }}
    >
      <Container maxWidth='xl'>
        <StyledToolbar variant='dense' disableGutters sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              px: 0,
              gap: { xs: 0, md: 2, lg: 4 },
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 0,
                justifyContent: 'space-between',
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
                    fontWeight: 500,
                    px: 0.6,
                    py: 0.6,
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'transparent',
                    },
                    '&:hover .MuiTypography-root': {
                      color: 'primary.main',
                    },
                  }}
                  startIcon={link.icon}
                  size='large'
                >
                  <Typography variant='h4' color='text.secondary' px={{ xs: 0.6, md: 1.2 }}>
                    {link.title}
                  </Typography>
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexGrow: 1,
              }}
            >
              <Search />
            </Box>

            <IconButton
              onClick={toggleTheme}
              sx={{
                width: '3.5rem',
                height: '3.5rem',
              }}
              aria-label='Theme toggle button'
            >
              {mode === 'dark' ? (
                <WbSunnyRoundedIcon fontSize='medium' color='primary' />
              ) : (
                <ModeNightRoundedIcon fontSize='medium' color='primary' />
              )}
            </IconButton>
          </Box>
        </StyledToolbar>

        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'center',
            gap: 2,
            width: '90%',
            margin: 'auto',
            alignItems: 'center',
          }}
        >
          <Search />
        </Box>
      </Container>
    </AppBar>
  )
}
