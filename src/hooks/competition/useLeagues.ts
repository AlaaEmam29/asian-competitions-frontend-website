import { useQuery } from '@tanstack/react-query'
import { useSearchStore } from '@/stores/search'
import { useCategoryStore } from '@/stores/category'
import { getLeagues } from '@/services/leagues'
import { ILeague } from '@/types/leagues'

const useLeagues = () => {
  const { search } = useSearchStore()
  const { selectedCategory: category } = useCategoryStore()
  const {
    data: leagues,
    error: leaguesError,
    isLoading: leaguesLoading,
  } = useQuery<ILeague[], Error>({
    queryKey:
      search && category
        ? ['leagues', search, category]
        : search
          ? ['leagues', search]
          : ['leagues', category],
    queryFn: () => getLeagues({ search, category }),
  })
  return { leagues, leaguesError, leaguesLoading }
}
export default useLeagues
