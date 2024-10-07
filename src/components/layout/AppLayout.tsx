import { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider, PaletteMode, StyledEngineProvider } from '@mui/material/styles'
import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'
import createCache from '@emotion/cache'
 
import getAppTheme from '@/theme/getAppTheme'
import Container from '@mui/material/Container'

import Navbar from '@/components/layout/Navbar'
import { Outlet } from 'react-router-dom'
import { CacheProvider } from '@emotion/react'
import { useCategoryStore } from '@/stores/category'
import { useLocation } from 'react-router-dom'
import Footer from '@/components/layout/Footer'

export default function AppLayout() {
  const location = useLocation()

  const [mode, setMode] = useState<PaletteMode>('light')
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }
  const { resetCategory } = useCategoryStore()
  const appTheme = createTheme(getAppTheme(mode))
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  })
   useEffect(() => {
    resetCategory()
  }, [location.pathname])


  return (
    // <CacheProvider value={cacheRtl}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={appTheme}>
          <CssBaseline enableColorScheme />
          <Navbar toggleTheme={toggleTheme} mode={mode} />
          <Container
            maxWidth='xl'
            component='main'
            sx={{ display: 'flex', flexDirection: 'column', mt: { xs: 12, md: 16 }, mb: 2, gap: 4 }}
          >
            <Outlet />
          </Container>
          <Footer />
        </ThemeProvider>
      </StyledEngineProvider>
    // </CacheProvider>
  )
}
