import { useQuery } from '@tanstack/react-query'
import { getLeague } from '@/services/leagues'
import { ILeague } from '@/types/leagues'
import { useParams } from 'react-router-dom'

const useLeague = () => {
  const { id } = useParams<{ id: string }>()
  if (!id) {
    return {
      league: undefined,
      leagueError: undefined,
      leagueLoading: false,
    }
  }
  const {
    data: league,
    error: leagueError,
    isLoading: leagueLoading,
  } = useQuery<ILeague, Error>({
    queryKey: ['league', id],

    queryFn: () => getLeague(id),

    enabled: !!id,
  })
  return { league, leagueError, leagueLoading }
}
export default useLeague
