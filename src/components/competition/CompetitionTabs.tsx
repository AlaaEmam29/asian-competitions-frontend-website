import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Team from './Team'
import TabPanel from './TabPanel'
import { useCategoryStore } from '@/stores/category'

function a11yProps(index: number) {
  return {
    id: `competition-tabs-${index}`,
    'aria-controls': `competition-tabpanel-${index}`,
    value: index,
  }
}

const categories = ['All', 'Asian', 'African', 'European'] as const

export default function CompetitionTabs() {
  const { selectedCategory, setCategory } = useCategoryStore()

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCategory(categories[newValue])
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'grey.500' }}>
        <Tabs
          value={categories.indexOf(selectedCategory)}
          onChange={handleChange}
          aria-label='competition tabs'
          indicatorColor='primary'
          variant='scrollable'
          scrollButtons
          allowScrollButtonsMobile
          textColor='secondary'
          sx={{
            '.MuiTabScrollButton-root': {
              transform: 'scaleX(1)',
            },
          }}
        >
          <Tab label='الكل' {...a11yProps(0)} />
          <Tab label='آسيوي' {...a11yProps(1)} />
          <Tab label='آفريقي' {...a11yProps(2)} />
          <Tab label='آوروبي' {...a11yProps(3)} />
        </Tabs>
      </Box>
      {categories.map((_Category, index) => {
        return (
          <TabPanel value={categories.indexOf(selectedCategory)} index={index}>
            <Team />
          </TabPanel>
        )
      })}
    </Box>
  )
}
