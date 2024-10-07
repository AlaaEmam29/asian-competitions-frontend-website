import API from './index'
import { ILeague } from '@/types/leagues'

const getLeagues = async ({
  search = '',
  category = '',
}: {
  search: string
  category: string
}): Promise<ILeague[]> => {
  console.log(search, category, 'search , category')
  const { data } = await API.get('/api/leagues', {
    params: {
      ...(search ? { search } : {}),
      ...(category ? { category } : {}),
    },
  })

  return data
}
const getLeague = async (id: string): Promise<ILeague> => {
  const { data } = await API.get(`/api/leagues/${id}`)
  return data
}
export { getLeague, getLeagues }
