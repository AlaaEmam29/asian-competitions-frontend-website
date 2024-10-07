import { useQuery } from '@tanstack/react-query'
import { getContinents } from '@/services/continents'
 
const useContinents = () => {
   const {
    data: continents,
    error: continentsError,
    isLoading: continentsLoading,
  } = useQuery<any, Error>({
    queryKey:['continents'],
    queryFn: getContinents
  })
  return { continents, continentsError, continentsLoading }
}
export default useContinents
