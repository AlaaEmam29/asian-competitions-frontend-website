import React, { useState, useRef, useCallback } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { StarRate } from '@mui/icons-material';
import useCountriesList from '@/hooks/countries/useCountries';
import { Fade } from '@mui/material';
import Avatar from '@mui/material/Avatar';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function Team(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    status,
    hasNextPage,
    isFetching,
  } = useCountriesList();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [addToFav, setAddToFav] = useState<Record<string, boolean>>({});

  const handleAddToFav = (teamId: string) => {
    setAddToFav((prev) => ({ ...prev, [teamId]: !prev[teamId] }));
  };

  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching || status === 'pending') return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, status]
  );

  const handleExpansion = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const isEmpty = !data?.pages?.some((page: any) => page.data.length > 0) && !hasNextPage;  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            backgroundColor: 'background.paper',
            height: '65vh',
            overflowY: 'auto',
          }}
        >
          <Box sx={{ width: '100%', padding: '1rem' }}>
            {status === 'pending' ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '50vh',
                }}
              >
                <div className="spinner-container">
                  <div className="circular-progress"></div>
                </div>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Loading, please wait...
                </Typography>
              </Box>
            ) : error ? (
              <Typography
                sx={{
                  textAlign: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  padding: '2rem',
                  color: 'red',
                }}
              >
                Error loading data. Please try again.
              </Typography>
            ) : (
              <Box>
                {!isEmpty ? (
                  data?.pages.map((page: any) =>
                    page?.data?.map((league: any) => (
                      <Accordion
                        key={league.id}
                        expanded={expanded === league.id}
                        onChange={handleExpansion(league.id)}
                        sx={{ my: 2 }}
                        ref={lastElementRef}
                      >
                        <AccordionSummary
                          aria-controls={`panel${league.id}-content`}
                          id={`panel${league.id}-header`}
                          expandIcon={<ExpandMoreIcon />}
                        >
                          <Box
                            sx={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
                          >
                            <img src={league.image_path} alt={league.name} loading="lazy" className="league-image" />
                            <Typography variant="h5" fontWeight="bold" color="text.primary">
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
                                textAlign: 'left',
                                width: '100%',
                                gap: '1rem',
                                borderTop: '1px solid #EBEBEF',
                                paddingTop: '2rem',
                              }}
                            >
                              {league.leagues.length > 0 ? (
                                league.leagues.map((team: any) => (
                                  <Box
                                    key={team.id}
                                    sx={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                      <img src={team.image_path} alt={team.name} loading="lazy" className="team-image" />
                                      <Typography variant="h5" color="text.primary" sx={{ fontWeight: 'medium' }}>
                                        {team.name}
                                      </Typography>
                                    </Box>
                                    <Button variant="text" className="fav-button" onClick={() => handleAddToFav(team.id)}>
                                      <StarRate className={`fav-icon ${addToFav[team.id] ? 'active-fav' : ''} icon`} />
                                    </Button>
                                  </Box>
                                ))
                              ) : (
                                <Typography variant="h6" color="text.primary" sx={{ width: '100%', textAlign: 'center' }}>
                                  No League available.
                                </Typography>
                              )}
                            </Box>
                          </Fade>
                        </AccordionDetails>
                      </Accordion>
                    ))
                  )
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '50vh',
                    }}
                  >
                    <Avatar
    sx={{
      bgcolor: 'grey.300',
      width: 50,
      height: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CloseIcon sx={{ fontSize: '3rem', color: 'grey.700' }} />
  </Avatar>
  <Typography variant="h4" sx={{ mt: 2 }}>
    No data available.
  </Typography>

                  </Box>
                )}
                {isFetchingNextPage && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '2rem',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '10rem',
                    }}
                  >
                    <div className="spinner-container">
                      <div className="circular-progress"></div>
                    </div>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </div>
  );
}