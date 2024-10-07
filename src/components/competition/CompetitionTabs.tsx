import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
 import Team from './Team';
import { useCategoryStore } from '@/stores/category';
import useContinents from '@/hooks/continents/useContinents';
import Loading from '@/components/shared/Loading';
import { usePaginationStore } from '@/stores/pagination';

function a11yProps(index: number) {
  return {
    id: `competition-tabs-${index}`,
    'aria-controls': `competition-tabpanel-${index}`,
    value: index,
  };
}

// const categories = ['All', 'Asia', 'Africa', 'Europe'] as const;
// const localize = {
//   All: 'الكل',
//   Asia: 'آسيوي',
//   Africa: 'أفريقي',
//   Europe: 'أوروبي',
// } as any;
export default function CompetitionTabs() {
  const {reset:resetPatination} = usePaginationStore();

  const { selectedCategory, setCategory } = useCategoryStore();
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    resetPatination();
    setCategory(newValue);
  };
  const { continents, continentsError, continentsLoading } = useContinents();


  if (continentsLoading) {
    return <Loading />;
  }

//   const filteredContinents = continents?.data?.filter((continent: any) =>
//     categories.includes(continent.name)
//   );
// console.log(filteredContinents,"filteredContinents")
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'grey.500' }}>
        <Tabs
          value={selectedCategory}
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
          <Tab label='All' {...a11yProps(0)} />
          {
            continents?.data?.map((category: any) => (
              <Tab
                key={category.id}
                label={category.name}
                {...a11yProps(category.id)}
              />
            ))

          }
        </Tabs>
      </Box>
     
     {
      selectedCategory === 0 && ( <Team value={selectedCategory} index={0}/> )
     }  
      
      {continents?.data?.map((category: any) => (
       selectedCategory === category.id && ( <Team key={category.id} value={selectedCategory} index={category.id}/>)
      ))}
    </Box>
  );
}
